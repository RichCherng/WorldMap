# Backend Java Setup Tasks

**Description:** Work with chat to define requirements and architecture for what the Java backend service should look like. Modernize backend structure with proper dependency injection, service patterns, and scalable architecture.

**Date Started:** November 13, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Tasks ##

### Backend Infrastructure

- ❌ **Overhaul Java Backend Setup**
    - **Description:** Work with chat to define requirements and architecture for what the Java backend service should look like. Modernize backend structure with proper dependency injection, service patterns, and scalable architecture.
    - **Branch:** `Java-backend`
    - **Subtasks:**
        - ✅ **Check build tool gradle vs bazel**
            - ✅ Research Gradle vs Bazel for Java projects
            - ✅ Compare build performance and caching capabilities
            - ✅ Evaluate dependency management approaches
            - ✅ Assess integration with existing project structure
            - ✅ Document recommendation and rationale
        - ✅ **Implement Google Guice for Dependency Injection**
            - ✅ Add Google Guice dependencies to `build.gradle`
            - ✅ Create Guice modules for service bindings
            - ✅ Configure application-level injector
            - ✅ Refactor existing services to use @Inject
            - ✅ Document DI patterns and usage
            - ❌ **Create unit tests for Guice modules and DI integration**
                - ❌ Create test resources file: `src/test/resources/application.properties` with test configuration values
                - ❌ **Test `ApplicationConfigModule`**: `src/test/java/com/worldmap/guice/modules/ApplicationConfigModuleTest.java`
                    - ❌ Test config loading from properties, verify all values (server.port=8080, firebase paths)
                    - ❌ Test default values when properties missing
                    - ❌ Assert nested objects (Server, Firebase, Logging, Features) are properly populated
                - ❌ **Test `FirebaseModule`**: `src/test/java/com/worldmap/guice/modules/FirebaseModuleTest.java`
                    - ❌ Mock GuiceFirebaseConfig, test Firestore instance creation
                    - ❌ Verify null handling when Firebase disabled
                    - ❌ Test initialize() is called
                - ❌ **Test `JerseyGuiceModule`**: `src/test/java/com/worldmap/guice/modules/JerseyGuiceModuleTest.java`
                    - ❌ Verify ResourceConfig registers controllers as Guice-managed instances (not Jersey)
                    - ❌ Test singleton behavior
                    - ❌ Confirm Swagger configuration
                - ❌ **Test `ChineseFlashCardController`**: `src/test/java/com/worldmap/controller/ChineseFlashCardControllerTest.java`
                    - ❌ Mock Firestore (collection, document, futures)
                    - ❌ Test all CRUD operations (GET all, GET by ID, POST, PUT, DELETE)
                    - ❌ Verify mock data fallback when Firestore is null
                - ❌ **Test `ApiController`**: `src/test/java/com/worldmap/controller/ApiControllerTest.java`
                    - ❌ Test hello, status, and firebaseStatus endpoints
                    - ❌ Verify response structure and correct values (no mocking needed)
                - ❌ **Integration test**: `src/test/java/com/worldmap/guice/modules/GuiceIntegrationTest.java`
                    - ❌ Create full injector with all modules
                    - ❌ Verify all bindings resolve without errors
                    - ❌ Test singleton scope, verify no circular dependencies
                - ❌ **Create helper**: `src/test/java/com/worldmap/guice/modules/TestFirebaseModule.java` - Test-only module that safely provides null Firestore
                - ❌ **Run and verify**: Execute `gradle test`, verify all pass, check coverage > 80%
        - ❌ **Update README.md**
            - ❌ Document project structure and module organization
    - **Requirements:**
        - ✅ Establish dependency injection patterns with Google Guice
        - ✅ Serve Web API endpoints
        - ✅ Implement API documentation (Swagger/OpenAPI compatible)
    - **Date:** November 13, 2025

- ❌ **Setup Basic API**
    - **Description:** Create a simple API with dependency injection to test and verify the DI setup works correctly and can serve API endpoints.
    - **Branch:** `Java-backend`
    - **Subtasks:**
        - ❌ Create a simple health check endpoint (GET /api/health)
        - ❌ Implement a sample service with @Inject annotation
        - ❌ Configure Jersey JAX-RS resource with Guice integration
        - ❌ Test dependency injection flow end-to-end
        - ❌ Verify API responds correctly via Swagger/browser
    - **Requirements:**
        - ❌ Health check endpoint returns 200 OK with status info
        - ❌ Demonstrate working dependency injection pattern
        - ❌ API accessible and testable via HTTP
    - **Date:** November 13, 2025

---

## Tech Decisions & Context

### Build Tool Decision
**Status:** ✅ Decided  
**Date:** November 13, 2025  
**Decision:** Gradle (Keep Current Setup)  
**Context:**
- Current setup uses Gradle
- Need to evaluate if Bazel offers significant benefits for our use case
- Key considerations: build performance, caching, dependency management, team familiarity

**Rationale:** 
Staying with Gradle for the following reasons:
1. **Project Size** - Small-to-medium single-module project; Bazel's monorepo benefits don't apply
2. **Working Setup** - Existing Gradle configuration successfully integrates Java backend, React frontend, and Protocol Buffers
3. **Ecosystem Fit** - Better plugin support for our stack (Maven Central, Node.js, protobuf)
4. **Team Productivity** - Migration effort (days/weeks) provides no immediate value
5. **Maintainability** - Gradle's DSL is more intuitive and has larger community support

**When to Revisit:** Consider Bazel if project grows to 50+ modules or build times exceed 10+ minutes despite optimization.

### Unit Testing Strategy for Guice DI
**Status:** 🔄 Planned  
**Date:** November 13, 2025  
**Approach:** Comprehensive testing of dependency injection setup

**Test Structure:**
```
src/test/java/com/worldmap/
├── guice/modules/
│   ├── ApplicationConfigModuleTest.java
│   ├── FirebaseModuleTest.java
│   ├── JerseyGuiceModuleTest.java
│   └── GuiceIntegrationTest.java
└── controller/
    ├── ChineseFlashCardControllerTest.java
    └── ApiControllerTest.java
```

**Testing Approach:**

1. **Module Tests (Unit Level)**
   - Test each Guice module in isolation
   - Verify provider methods return correct instances
   - Test configuration loading and default values
   - Mock external dependencies (files, Firebase)

2. **Controller Tests (Unit Level)**
   - Use Mockito to mock injected dependencies (Firestore, ApplicationConfig)
   - Test business logic without requiring real Firebase connection
   - Verify JAX-RS annotations and response formats
   - Test error handling and edge cases

3. **Integration Tests**
   - Create full Guice injector with all modules
   - Verify all bindings resolve without errors
   - Test that Singleton scope works correctly
   - Verify dependency graph is acyclic

4. **Test Dependencies** (already in build.gradle)
   - JUnit Jupiter 5.10.1 ✅
   - Mockito Core 5.8.0 ✅
   - May add: Guice testing utilities if needed

**Success Criteria:**
- All Guice modules have corresponding test classes
- Controllers tested with mocked dependencies
- Integration test verifies injector bootstraps successfully
- Test coverage > 80% for DI-related code
- All tests pass with `gradle test`


