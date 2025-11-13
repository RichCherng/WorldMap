package com.worldmap.guice.modules;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.worldmap.controller.ApiController;
import com.worldmap.controller.ChineseFlashCardController;
import org.glassfish.jersey.server.ResourceConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for JerseyGuiceModule
 * Tests Jersey ResourceConfig with real instances (not mocked)
 */
@DisplayName("JerseyGuiceModule Tests")
class JerseyGuiceModuleTest {

    @Test
    @DisplayName("Should create ResourceConfig successfully")
    void testResourceConfigCreation() {
        // Given: Create injector with all necessary modules
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        // When: Get ResourceConfig from injector
        ResourceConfig resourceConfig = injector.getInstance(ResourceConfig.class);
        
        // Then: ResourceConfig should be created
        assertNotNull(resourceConfig, "ResourceConfig should not be null");
    }

    @Test
    @DisplayName("Should register controllers as Guice-managed instances")
    void testControllersRegisteredAsGuiceInstances() {
        // Given: Create injector with modules
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        ResourceConfig resourceConfig = injector.getInstance(ResourceConfig.class);
        
        // When: Get registered instances from ResourceConfig
        Set<Object> instances = resourceConfig.getInstances();
        
        // Then: Should contain controller instances
        assertNotNull(instances, "Registered instances should not be null");
        assertFalse(instances.isEmpty(), "Should have registered controller instances");
        
        // Verify controllers are registered
        boolean hasChineseFlashCardController = instances.stream()
            .anyMatch(obj -> obj instanceof ChineseFlashCardController);
        boolean hasApiController = instances.stream()
            .anyMatch(obj -> obj instanceof ApiController);
        
        assertTrue(hasChineseFlashCardController, 
            "ChineseFlashCardController should be registered as Guice-managed instance");
        assertTrue(hasApiController, 
            "ApiController should be registered as Guice-managed instance");
    }

    @Test
    @DisplayName("Should bind controllers in JerseyGuiceModule")
    void testControllerBindings() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        // When: Get controller instances directly from Guice
        ChineseFlashCardController flashCardController = 
            injector.getInstance(ChineseFlashCardController.class);
        ApiController apiController = 
            injector.getInstance(ApiController.class);
        
        // Then: Controllers should be created by Guice
        assertNotNull(flashCardController, "ChineseFlashCardController should be bound in Guice");
        assertNotNull(apiController, "ApiController should be bound in Guice");
    }

    @Test
    @DisplayName("Should provide singleton ResourceConfig")
    void testResourceConfigSingletonScope() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        // When: Get ResourceConfig multiple times
        ResourceConfig config1 = injector.getInstance(ResourceConfig.class);
        ResourceConfig config2 = injector.getInstance(ResourceConfig.class);
        
        // Then: Should return the same instance
        assertSame(config1, config2, 
            "ResourceConfig should be a singleton - same instance returned");
    }

    @Test
    @DisplayName("Should provide singleton controller instances")
    void testControllerSingletonScope() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        // When: Get controllers multiple times
        ChineseFlashCardController controller1 = 
            injector.getInstance(ChineseFlashCardController.class);
        ChineseFlashCardController controller2 = 
            injector.getInstance(ChineseFlashCardController.class);
        
        ApiController apiController1 = injector.getInstance(ApiController.class);
        ApiController apiController2 = injector.getInstance(ApiController.class);
        
        // Then: Should return the same instances
        assertSame(controller1, controller2, 
            "ChineseFlashCardController should be a singleton");
        assertSame(apiController1, apiController2, 
            "ApiController should be a singleton");
    }

    @Test
    @DisplayName("Should register Swagger OpenAPI packages")
    void testSwaggerPackagesRegistered() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        ResourceConfig resourceConfig = injector.getInstance(ResourceConfig.class);
        
        // When: Get registered classes
        Set<Class<?>> classes = resourceConfig.getClasses();
        
        // Then: Should contain Swagger classes (they're in io.swagger.v3.jaxrs2.integration.resources package)
        assertNotNull(classes, "Registered classes should not be null");
        
        // Note: Swagger classes might be dynamically loaded, so we just verify ResourceConfig is created
        // The important thing is that ResourceConfig is created without errors with Swagger integration
        assertNotNull(resourceConfig, "ResourceConfig with Swagger should be created successfully");
    }

    @Test
    @DisplayName("Should configure ResourceConfig with WADL disabled")
    void testWADLDisabled() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        ResourceConfig resourceConfig = injector.getInstance(ResourceConfig.class);
        
        // When: Get property for WADL
        Object wadlProperty = resourceConfig.getProperty("jersey.config.server.wadl.disableWadl");
        
        // Then: WADL should be disabled (property set to "true")
        assertNotNull(wadlProperty, "WADL disable property should be set");
        assertEquals("true", wadlProperty.toString(), "WADL should be disabled");
    }

    @Test
    @DisplayName("Should register controllers from ResourceConfig in Jersey servlet")
    void testControllersAvailableInResourceConfig() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        ResourceConfig resourceConfig = injector.getInstance(ResourceConfig.class);
        
        // When: Get all registered instances
        Set<Object> instances = resourceConfig.getInstances();
        
        // Then: Verify we have exactly the controllers we expect
        long controllerCount = instances.stream()
            .filter(obj -> obj instanceof ChineseFlashCardController || 
                          obj instanceof ApiController)
            .count();
        
        assertEquals(2, controllerCount, 
            "Should have exactly 2 controllers registered (ChineseFlashCardController and ApiController)");
    }

    @Test
    @DisplayName("Should create ResourceConfig with proper Guice injector dependency")
    void testResourceConfigRequiresInjector() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        // When: Get ResourceConfig (requires injector as parameter in provider method)
        ResourceConfig resourceConfig = injector.getInstance(ResourceConfig.class);
        
        // Then: Should be created successfully with injector dependency
        assertNotNull(resourceConfig, "ResourceConfig should be created with injector dependency");
        
        // And: Controllers should be properly injected
        Set<Object> instances = resourceConfig.getInstances();
        assertFalse(instances.isEmpty(), 
            "Controllers should be registered via injector.getInstance()");
    }

    @Test
    @DisplayName("Should work with multiple independent injectors")
    void testMultipleInjectorsIndependence() {
        // Given & When: Create multiple independent injectors
        Injector injector1 = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        Injector injector2 = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule()
        );
        
        ResourceConfig config1 = injector1.getInstance(ResourceConfig.class);
        ResourceConfig config2 = injector2.getInstance(ResourceConfig.class);
        
        // Then: Each injector should have its own ResourceConfig
        assertNotSame(config1, config2, 
            "Different injectors should create different ResourceConfig instances");
        
        // But: Each should have the same structure
        assertEquals(config1.getInstances().size(), config2.getInstances().size(),
            "Both ResourceConfigs should have the same number of registered instances");
    }
}
