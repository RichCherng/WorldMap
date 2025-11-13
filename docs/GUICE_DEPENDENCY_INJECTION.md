# Google Guice Dependency Injection Guide

## Overview

WorldMap uses **Google Guice 7.0.0** for dependency injection (DI), providing a clean, testable, and maintainable architecture. This document explains the DI patterns, module structure, and how to extend the system.

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Guice Modules](#guice-modules)
3. [Dependency Injection Patterns](#dependency-injection-patterns)
4. [Adding New Components](#adding-new-components)
5. [Testing with Guice](#testing-with-guice)
6. [Best Practices](#best-practices)

---

## Architecture Overview

### Dependency Graph
```
WorldMapApplication (main entry point)
    └─> Guice Injector
        ├─> ApplicationConfigModule → ApplicationConfig
        ├─> FirebaseModule → Firestore, GuiceFirebaseConfig
        ├─> JerseyGuiceModule → ResourceConfig, Controllers
        └─> WebServerModule → WebServer, ServletContextHandler
```

### Key Dependencies in build.gradle
```gradle
// Core Guice
implementation 'com.google.inject:guice:7.0.0'
implementation 'com.google.inject.extensions:guice-servlet:7.0.0'
implementation 'javax.inject:javax.inject:1'

// Jersey-Guice Bridge
implementation 'org.glassfish.hk2:guice-bridge:3.0.5'
implementation 'org.glassfish.hk2:hk2-api:3.0.5'
implementation 'org.glassfish.hk2:hk2-locator:3.0.5'
```

---

## Guice Modules

### 1. ApplicationConfigModule

**Purpose**: Loads and provides application configuration from `application.properties`.

**Location**: `src/main/java/com/worldmap/guice/modules/ApplicationConfigModule.java`

**Bindings**:
- `ApplicationConfig` (Singleton) - Main configuration object

**Key Features**:
- Reads from `application.properties` in classpath
- Provides type-safe configuration with nested classes
- Handles default values for missing properties
- Validates configuration at startup

**Example Usage**:
```java
@Inject
public MyService(ApplicationConfig config) {
    int port = config.getServer().getPort();
    String environment = config.getServer().getEnvironment();
}
```

### 2. FirebaseModule

**Purpose**: Initializes Firebase and provides Firestore instances.

**Location**: `src/main/java/com/worldmap/guice/modules/FirebaseModule.java`

**Bindings**:
- `GuiceFirebaseConfig` (auto-discovered via `@Inject` constructor)
- `Firestore` (Singleton, provided via `@Provides` method)

**Key Features**:
- Lazy initialization of Firebase
- Null-safe: returns `null` Firestore if Firebase not configured
- Allows mock data fallback when Firebase is disabled
- Automatic error handling and logging

**Example Usage**:
```java
@Inject
public MyController(Firestore firestore) {
    if (firestore != null) {
        // Use real Firebase/Firestore
    } else {
        // Use mock data
    }
}
```

### 3. JerseyGuiceModule

**Purpose**: Integrates Jersey JAX-RS with Guice for REST API controllers.

**Location**: `src/main/java/com/worldmap/guice/modules/JerseyGuiceModule.java`

**Bindings**:
- `ChineseFlashCardController` (explicit binding)
- `ApiController` (explicit binding)
- `ResourceConfig` (Singleton, configured with Swagger)

**Key Features**:
- **Critical**: Controllers registered as Guice-managed instances (not Jersey instances)
- Avoids package scanning to prevent dual instantiation
- Configures Swagger/OpenAPI documentation
- Enables proper dependency injection in JAX-RS resources

**Why This Matters**:
```java
// ❌ WRONG: Jersey creates instance without DI
config.packages("com.worldmap.controller");

// ✅ CORRECT: Guice creates instance with DI
config.register(injector.getInstance(ChineseFlashCardController.class));
```

### 4. WebServerModule

**Purpose**: Configures and provides Jetty web server components.

**Location**: `src/main/java/com/worldmap/guice/modules/WebServerModule.java`

**Bindings**:
- `WebServer` (Singleton)
- `ServletContextHandler` (provided via `@Provides` method)
- Jersey servlet integration

**Key Features**:
- Jetty 11 embedded server configuration
- Static resource serving from `/webapp`
- Jersey servlet mapping to `/api/*`
- CORS support
- SPA routing fallback

---

## Dependency Injection Patterns

### 1. Constructor Injection (Recommended)

**Pattern**: Use `@Inject` on constructor for required dependencies.

```java
package com.worldmap.controller;

import com.google.cloud.firestore.Firestore;
import com.google.inject.Inject;
import javax.inject.Singleton;

@Singleton
@Path("/api/example")
public class ExampleController {
    
    private final Firestore firestore;
    private final ApplicationConfig config;
    
    @Inject
    public ExampleController(Firestore firestore, ApplicationConfig config) {
        this.firestore = firestore;
        this.config = config;
    }
    
    @GET
    public String getData() {
        // Use injected dependencies
        return "Data from " + config.getServer().getEnvironment();
    }
}
```

**Benefits**:
- Dependencies are immutable (final fields)
- Easy to test (pass mocks via constructor)
- Explicit about required dependencies
- Compile-time safety

### 2. Field Injection (Avoid)

**Anti-pattern**: Do not use field injection.

```java
// ❌ AVOID: Hard to test, mutable state
@Inject
private Firestore firestore;
```

### 3. Provider Methods

**Pattern**: Use `@Provides` in modules for complex object creation.

```java
@Provides
@Singleton
public MyService provideMyService(Firestore firestore, ApplicationConfig config) {
    // Complex initialization logic
    MyService service = new MyService(firestore);
    service.configure(config.getServer().getPort());
    return service;
}
```

### 4. Optional Dependencies

**Pattern**: Use `@Nullable` or check for null.

```java
@Inject
public MyController(@Nullable Firestore firestore) {
    this.firestore = firestore; // Can be null if Firebase disabled
}
```

---

## Adding New Components

### Adding a New Service

**Step 1**: Create service class with `@Inject` constructor

```java
package com.worldmap.service;

import com.google.cloud.firestore.Firestore;
import com.google.inject.Inject;
import javax.inject.Singleton;

@Singleton
public class UserService {
    
    private final Firestore firestore;
    
    @Inject
    public UserService(Firestore firestore) {
        this.firestore = firestore;
    }
    
    public User getUserById(String userId) {
        // Service logic
    }
}
```

**Step 2**: Inject into controllers or other services

```java
@Inject
public MyController(UserService userService) {
    this.userService = userService;
}
```

**Note**: No explicit binding needed! Guice auto-discovers classes with `@Inject` constructors.

### Adding a New JAX-RS Controller

**Step 1**: Create controller with `@Inject` constructor

```java
package com.worldmap.controller;

import com.worldmap.service.UserService;
import com.google.inject.Inject;
import javax.inject.Singleton;

@Path("/api/users")
@Singleton
public class UserController {
    
    private final UserService userService;
    
    @Inject
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GET
    @Path("/{id}")
    public User getUser(@PathParam("id") String id) {
        return userService.getUserById(id);
    }
}
```

**Step 2**: Register in `JerseyGuiceModule`

```java
@Override
protected void configure() {
    bind(ChineseFlashCardController.class);
    bind(ApiController.class);
    bind(UserController.class); // Add this line
}

@Provides
@Singleton
public ResourceConfig provideResourceConfig(Injector injector) {
    ResourceConfig config = new ResourceConfig();
    
    config.register(injector.getInstance(ChineseFlashCardController.class));
    config.register(injector.getInstance(ApiController.class));
    config.register(injector.getInstance(UserController.class)); // Add this line
    
    // ... rest of config
    return config;
}
```

### Adding a New Guice Module

**Step 1**: Create module class

```java
package com.worldmap.guice.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import javax.inject.Singleton;

public class EmailModule extends AbstractModule {
    
    @Override
    protected void configure() {
        // Explicit bindings if needed
        bind(EmailService.class).to(SmtpEmailService.class);
    }
    
    @Provides
    @Singleton
    public EmailConfig provideEmailConfig(ApplicationConfig appConfig) {
        // Derive email config from application config
        return new EmailConfig(
            appConfig.getProperty("email.host"),
            appConfig.getProperty("email.port")
        );
    }
}
```

**Step 2**: Add to injector in `WorldMapApplication.java`

```java
Injector injector = Guice.createInjector(
    new ApplicationConfigModule(),
    new FirebaseModule(),
    new JerseyGuiceModule(),
    new WebServerModule(),
    new EmailModule() // Add this line
);
```

### Adding Configuration Properties

**Step 1**: Add to `application.properties`

```properties
# Email configuration
app.email.host=smtp.gmail.com
app.email.port=587
app.email.username=your-email@gmail.com
app.email.enabled=true
```

**Step 2**: Add to `ApplicationConfig` class

```java
public static class Email {
    private String host;
    private int port;
    private String username;
    private boolean enabled;
    
    // Getters and setters
}

// In ApplicationConfig class
private Email email;

public Email getEmail() {
    return email;
}

public void setEmail(Email email) {
    this.email = email;
}
```

**Step 3**: Load in `ApplicationConfigModule`

```java
@Provides
@Singleton
public ApplicationConfig provideApplicationConfig() {
    ApplicationConfig config = new ApplicationConfig();
    
    // ... existing config
    
    // Email configuration
    ApplicationConfig.Email email = new ApplicationConfig.Email();
    email.setHost(getProperty("app.email.host", "localhost"));
    email.setPort(getIntProperty("app.email.port", 25));
    email.setUsername(getProperty("app.email.username", ""));
    email.setEnabled(getBooleanProperty("app.email.enabled", false));
    config.setEmail(email);
    
    return config;
}
```

---

## Testing with Guice

### Unit Testing with Mock Dependencies

```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {
    
    @Mock
    private Firestore mockFirestore;
    
    private UserService userService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(mockFirestore); // Direct constructor injection
    }
    
    @Test
    void testGetUserById() {
        // Given
        String userId = "user123";
        when(mockFirestore.collection(anyString())).thenReturn(/* mock collection */);
        
        // When
        User user = userService.getUserById(userId);
        
        // Then
        assertNotNull(user);
        verify(mockFirestore).collection("users");
    }
}
```

### Integration Testing with Guice Modules

```java
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.testing.fieldbinder.Bind;
import com.google.inject.testing.fieldbinder.BoundFieldModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class IntegrationTest {
    
    @Bind
    private Firestore mockFirestore = mock(Firestore.class);
    
    private Injector injector;
    
    @BeforeEach
    void setUp() {
        injector = Guice.createInjector(
            BoundFieldModule.of(this),
            new ApplicationConfigModule(),
            new FirebaseModule() // Will use mocked Firestore
        );
    }
    
    @Test
    void testFullStack() {
        UserService service = injector.getInstance(UserService.class);
        assertNotNull(service);
    }
}
```

### Test Module Pattern

Create a test-specific module:

```java
public class TestFirebaseModule extends AbstractModule {
    
    @Override
    protected void configure() {
        // No-op, we'll provide mocked Firestore
    }
    
    @Provides
    @Singleton
    public Firestore provideFirestore() {
        return null; // Or return a mock
    }
}
```

Use in tests:

```java
Injector injector = Guice.createInjector(
    new ApplicationConfigModule(),
    new TestFirebaseModule(), // Use test module instead of FirebaseModule
    new JerseyGuiceModule(),
    new WebServerModule()
);
```

---

## Best Practices

### 1. ✅ Do: Use Constructor Injection

```java
@Inject
public MyService(Firestore firestore, ApplicationConfig config) {
    this.firestore = firestore;
    this.config = config;
}
```

**Why**: Immutable dependencies, easy testing, explicit requirements.

### 2. ✅ Do: Mark Singletons Explicitly

```java
@Singleton
public class MyService { ... }
```

**Why**: Ensures single instance across application lifecycle.

### 3. ✅ Do: Use @Provides for Complex Creation

```java
@Provides
@Singleton
public ComplexObject provideComplexObject(Dependency1 dep1, Dependency2 dep2) {
    ComplexObject obj = new ComplexObject();
    obj.configure(dep1, dep2);
    obj.initialize();
    return obj;
}
```

**Why**: Centralizes complex initialization logic.

### 4. ❌ Don't: Use Field Injection

```java
// ❌ AVOID
@Inject
private Firestore firestore;
```

**Why**: Hard to test, mutable state, unclear dependencies.

### 5. ❌ Don't: Mix Guice and Manual Instantiation

```java
// ❌ AVOID
MyService service = new MyService(firestore); // Manual
otherService.setMyService(service);
```

**Why**: Defeats dependency injection benefits, inconsistent lifecycle.

### 6. ✅ Do: Handle Nullable Dependencies

```java
@Inject
public MyController(@Nullable Firestore firestore) {
    if (firestore == null) {
        System.out.println("Firebase disabled, using mock data");
    }
    this.firestore = firestore;
}
```

**Why**: Allows graceful degradation when services unavailable.

### 7. ✅ Do: Organize Modules by Domain

```
guice/modules/
├── ApplicationConfigModule.java  # Configuration
├── FirebaseModule.java           # Database
├── JerseyGuiceModule.java        # REST API
├── WebServerModule.java          # Web server
└── EmailModule.java              # Email service (future)
```

**Why**: Clear separation of concerns, easy to understand.

### 8. ✅ Do: Document Provider Methods

```java
/**
 * Provides Firestore instance for database operations.
 * Returns null if Firebase is not configured, allowing fallback to mock data.
 */
@Provides
@Singleton
public Firestore provideFirestore(GuiceFirebaseConfig firebaseConfig) {
    // ...
}
```

**Why**: Helps developers understand module behavior.

### 9. ❌ Don't: Use Package Scanning for Jersey

```java
// ❌ WRONG: Jersey creates instances, bypassing Guice
config.packages("com.worldmap.controller");

// ✅ CORRECT: Register Guice-managed instances
config.register(injector.getInstance(MyController.class));
```

**Why**: Package scanning causes Jersey to instantiate controllers directly, breaking DI.

### 10. ✅ Do: Use Injector Only in Main

```java
// ✅ Main entry point
public static void main(String[] args) {
    Injector injector = Guice.createInjector(...);
    WebServer server = injector.getInstance(WebServer.class);
}

// ❌ Avoid using injector in services
public class MyService {
    public void doSomething(Injector injector) { // AVOID
        SomeClass obj = injector.getInstance(SomeClass.class);
    }
}
```

**Why**: Injector should only be used at application bootstrap. Services should use constructor injection.

---

## Common Patterns

### 1. Configuration-Based Feature Flags

```java
@Provides
@Singleton
public EmailService provideEmailService(ApplicationConfig config) {
    if (config.getFeatures().isEnableEmail()) {
        return new SmtpEmailService(config.getEmail());
    } else {
        return new NoOpEmailService(); // Mock implementation
    }
}
```

### 2. Conditional Bindings

```java
@Override
protected void configure() {
    if (System.getProperty("env", "dev").equals("production")) {
        bind(EmailService.class).to(SmtpEmailService.class);
    } else {
        bind(EmailService.class).to(MockEmailService.class);
    }
}
```

### 3. Lazy Initialization

```java
@Inject
private Provider<ExpensiveService> expensiveServiceProvider;

public void doSomething() {
    if (needsExpensiveService) {
        ExpensiveService service = expensiveServiceProvider.get(); // Created on demand
        service.execute();
    }
}
```

### 4. Named Bindings

```java
// In module
@Provides
@Named("primary")
@Singleton
public Database providePrimaryDatabase() { ... }

@Provides
@Named("replica")
@Singleton
public Database provideReplicaDatabase() { ... }

// In service
@Inject
public MyService(@Named("primary") Database db) { ... }
```

---

## Troubleshooting

### Problem: Controller returns 500 error with "No suitable constructor"

**Cause**: Jersey is trying to instantiate controller instead of Guice.

**Solution**: Ensure controller is registered in `JerseyGuiceModule`:

```java
// In configure()
bind(MyController.class);

// In provideResourceConfig()
config.register(injector.getInstance(MyController.class));
```

### Problem: Dependency is null despite @Inject

**Cause**: Provider method returned null, or binding is missing.

**Solution**: Check module provider methods and ensure @Provides returns non-null (or handle null gracefully).

### Problem: "Binding already configured" error

**Cause**: Same class bound in multiple modules.

**Solution**: Remove duplicate bindings, or use `@Provides` with different qualifiers (`@Named`).

### Problem: Application fails to start with Guice error

**Cause**: Circular dependency or missing binding.

**Solution**: 
1. Check stack trace for circular dependency
2. Ensure all dependencies have `@Inject` constructors or explicit bindings
3. Break circular dependencies using `Provider<T>`

### Problem: Tests fail with injection errors

**Cause**: Missing test module or incorrect mock setup.

**Solution**: Create test-specific modules or use Mockito with direct constructor injection.

---

## Further Reading

- [Guice User Guide](https://github.com/google/guice/wiki/GettingStarted)
- [Guice Best Practices](https://github.com/google/guice/wiki/KeepConstructorsHidden)
- [Jersey-Guice Bridge](https://eclipse-ee4j.github.io/jersey.github.io/documentation/latest/spring.html)
- [Testing with Guice](https://github.com/google/guice/wiki/BoundFields)

---

## Summary

WorldMap's Guice implementation provides:

✅ **Clean Architecture**: Separation of concerns with modules  
✅ **Testability**: Easy to mock dependencies  
✅ **Type Safety**: Compile-time dependency resolution  
✅ **Flexibility**: Easy to add new services and modules  
✅ **Performance**: Singleton lifecycle reduces overhead  
✅ **Jersey Integration**: Seamless REST API with DI  
✅ **Configuration Management**: Type-safe config from properties  

The system is production-ready and follows industry best practices for dependency injection.
