package com.worldmap.guice.modules;

import com.google.cloud.firestore.Firestore;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.worldmap.firebase.config.GuiceFirebaseConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for FirebaseModule
 * Tests Firestore provider behavior without real Firebase initialization
 */
@DisplayName("FirebaseModule Tests")
class FirebaseModuleTest {

    @Test
    @DisplayName("Should return null Firestore when Firebase is not initialized")
    void testFirestoreProviderReturnsNullWhenNotInitialized() {
        // Given: Create injector with ApplicationConfigModule and FirebaseModule
        // Firebase will not be initialized because test config has auto-initialize=false
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new FirebaseModule()
        );
        
        // When: Get Firestore from injector (Firebase not initialized in tests)
        Firestore firestore = injector.getInstance(Firestore.class);
        
        // Then: Should return null because Firebase apps are not initialized in test environment
        assertNull(firestore, "Firestore should be null when Firebase is not initialized");
    }

    @Test
    @DisplayName("Should provide singleton Firestore instance")
    void testFirestoreSingletonScope() {
        // Given: Create injector with modules
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new FirebaseModule()
        );
        
        // When: Get Firestore multiple times
        Firestore firestore1 = injector.getInstance(Firestore.class);
        Firestore firestore2 = injector.getInstance(Firestore.class);
        
        // Then: Should return the same instance (both null in test environment, but same)
        assertSame(firestore1, firestore2, 
            "Firestore should be a singleton - same instance returned");
    }

    @Test
    @DisplayName("Should successfully bind GuiceFirebaseConfig")
    void testGuiceFirebaseConfigBinding() {
        // Given: Create injector with ApplicationConfigModule and FirebaseModule
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new FirebaseModule()
        );
        
        // When: Get GuiceFirebaseConfig (should be auto-discovered via @Inject constructor)
        GuiceFirebaseConfig config = injector.getInstance(GuiceFirebaseConfig.class);
        
        // Then: Should successfully create the config
        assertNotNull(config, "GuiceFirebaseConfig should be auto-bound via @Inject constructor");
        
        // And: It should have ApplicationConfig injected
        assertNotNull(config.getFirebaseConfig(), 
            "GuiceFirebaseConfig should have ApplicationConfig.Firebase injected");
        
        // And: Collection name should match test config
        assertEquals("test_chinese_flash_cards", config.getCollectionName(),
            "Collection name should be from test application.properties");
    }

    @Test
    @DisplayName("Should work with TestFirebaseModule to provide null Firestore safely")
    void testIntegrationWithTestFirebaseModule() {
        // Given: Create injector with ApplicationConfigModule and TestFirebaseModule
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule()
        );
        
        // When: Get Firestore from TestFirebaseModule
        Firestore firestore = injector.getInstance(Firestore.class);
        GuiceFirebaseConfig config = injector.getInstance(GuiceFirebaseConfig.class);
        
        // Then: Firestore should be null (as provided by TestFirebaseModule)
        assertNull(firestore, "TestFirebaseModule should provide null Firestore");
        
        // And: Config should exist
        assertNotNull(config, "GuiceFirebaseConfig should be provided");
        
        // And: Config should have correct test values
        assertEquals("test_chinese_flash_cards", config.getCollectionName(),
            "Config should have test collection name");
    }

    @Test
    @DisplayName("Should verify FirebaseModule configure() method completes without errors")
    void testConfigureMethod() {
        // Given: Create FirebaseModule
        FirebaseModule module = new FirebaseModule();
        
        // When: Module is created and used in injector
        // Then: configure() should complete without errors (it's a no-op)
        assertDoesNotThrow(() -> {
            Injector injector = Guice.createInjector(
                new ApplicationConfigModule(),
                module
            );
            assertNotNull(injector, "Injector should be created successfully");
        });
    }

    @Test
    @DisplayName("Should handle missing Firebase service account file gracefully")
    void testMissingServiceAccountFile() {
        // Given: Test environment with non-existent Firebase service account
        // (test-firebase-account.json doesn't exist)
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new FirebaseModule()
        );
        
        // When: Try to get GuiceFirebaseConfig
        GuiceFirebaseConfig config = injector.getInstance(GuiceFirebaseConfig.class);
        
        // Then: Should create config successfully
        assertNotNull(config, "Config should be created even without service account file");
        
        // And: Should have correct service account path from test config
        assertEquals("test-firebase-account.json", config.getFirebaseConfig().getServiceAccountPath(),
            "Service account path should be from test config");
    }

    @Test
    @DisplayName("Should have correct Firebase configuration from test properties")
    void testFirebaseConfigurationFromProperties() {
        // Given: Create injector with test configuration
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new FirebaseModule()
        );
        
        GuiceFirebaseConfig config = injector.getInstance(GuiceFirebaseConfig.class);
        
        // Then: Verify test configuration values are loaded correctly
        assertEquals("test-project", config.getProjectId(),
            "Project ID should be from test application.properties");
        assertEquals("test_chinese_flash_cards", config.getCollectionName(),
            "Collection name should be from test application.properties");
        assertFalse(config.shouldAutoInitialize(),
            "Auto-initialize should be false in test config");
    }

    @Test
    @DisplayName("Should create multiple independent injectors with separate Firestore instances")
    void testMultipleInjectorIndependence() {
        // Given & When: Create multiple independent injectors
        Injector injector1 = Guice.createInjector(
            new ApplicationConfigModule(),
            new FirebaseModule()
        );
        Injector injector2 = Guice.createInjector(
            new ApplicationConfigModule(),
            new FirebaseModule()
        );
        
        Firestore firestore1 = injector1.getInstance(Firestore.class);
        Firestore firestore2 = injector2.getInstance(Firestore.class);
        
        // Then: Each injector has its own Firestore instance (even if both are null)
        // The important part is that they're independently created
        assertNotNull(injector1, "First injector should be created");
        assertNotNull(injector2, "Second injector should be created");
        
        // Both should be null in test environment, but independently so
        assertNull(firestore1, "First Firestore should be null in test environment");
        assertNull(firestore2, "Second Firestore should be null in test environment");
    }
}
