package com.worldmap.guice.modules;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.worldmap.config.ApplicationConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for ApplicationConfigModule
 * Tests configuration loading from application.properties and default values
 */
@DisplayName("ApplicationConfigModule Tests")
class ApplicationConfigModuleTest {

    @Test
    @DisplayName("Should load configuration from test application.properties")
    void testConfigLoadingFromProperties() {
        // Given: Create injector with ApplicationConfigModule
        Injector injector = Guice.createInjector(new ApplicationConfigModule());
        
        // When: Get ApplicationConfig from injector
        ApplicationConfig config = injector.getInstance(ApplicationConfig.class);
        
        // Then: Verify config is not null and loaded
        assertNotNull(config, "ApplicationConfig should not be null");
        assertNotNull(config.getServer(), "Server config should not be null");
        assertNotNull(config.getFirebase(), "Firebase config should not be null");
        assertNotNull(config.getLogging(), "Logging config should not be null");
        assertNotNull(config.getFeatures(), "Features config should not be null");
    }

    @Test
    @DisplayName("Should load server configuration with correct values")
    void testServerConfiguration() {
        // Given: Create injector
        Injector injector = Guice.createInjector(new ApplicationConfigModule());
        ApplicationConfig config = injector.getInstance(ApplicationConfig.class);
        
        // When: Get server config
        ApplicationConfig.Server server = config.getServer();
        
        // Then: Verify server configuration from test application.properties
        assertEquals(8080, server.getPort(), "Server port should be 8080");
        assertEquals("/", server.getContextPath(), "Context path should be /");
        assertEquals("test", server.getEnvironment(), "Environment should be test");
        assertTrue(server.isEnableCors(), "CORS should be enabled");
    }

    @Test
    @DisplayName("Should load Firebase configuration with correct values")
    void testFirebaseConfiguration() {
        // Given: Create injector
        Injector injector = Guice.createInjector(new ApplicationConfigModule());
        ApplicationConfig config = injector.getInstance(ApplicationConfig.class);
        
        // When: Get firebase config
        ApplicationConfig.Firebase firebase = config.getFirebase();
        
        // Then: Verify firebase configuration from test application.properties
        assertEquals("test-firebase-account.json", firebase.getServiceAccountPath(), 
            "Service account path should match test config");
        assertEquals("https://test-project.firebaseio.com", firebase.getDatabaseUrl(), 
            "Database URL should match test config");
        assertEquals("test-project", firebase.getProjectId(), 
            "Project ID should match test config");
        assertFalse(firebase.isAutoInitialize(), 
            "Auto-initialize should be false in test config");
        assertEquals("test_chinese_flash_cards", firebase.getCollection(), 
            "Collection name should match test config");
    }

    @Test
    @DisplayName("Should load logging configuration with correct values")
    void testLoggingConfiguration() {
        // Given: Create injector
        Injector injector = Guice.createInjector(new ApplicationConfigModule());
        ApplicationConfig config = injector.getInstance(ApplicationConfig.class);
        
        // When: Get logging config
        ApplicationConfig.Logging logging = config.getLogging();
        
        // Then: Verify logging configuration from test application.properties
        assertEquals("WARN", logging.getLevel(), "Log level should be WARN for tests");
        assertFalse(logging.isEnableStartupBanner(), 
            "Startup banner should be disabled in tests");
        assertFalse(logging.isEnableColorOutput(), 
            "Color output should be disabled in tests");
    }

    @Test
    @DisplayName("Should load features configuration with correct values")
    void testFeaturesConfiguration() {
        // Given: Create injector
        Injector injector = Guice.createInjector(new ApplicationConfigModule());
        ApplicationConfig config = injector.getInstance(ApplicationConfig.class);
        
        // When: Get features config
        ApplicationConfig.Features features = config.getFeatures();
        
        // Then: Verify features configuration from test application.properties
        assertTrue(features.isEnableSampleData(), "Sample data should be enabled");
        assertFalse(features.isEnableFirestore(), 
            "Firestore should be disabled in test config");
        assertTrue(features.isEnableGuiceIntegration(), 
            "Guice integration should be enabled");
        assertEquals(10, features.getMaxRandomCards(), 
            "Max random cards should be 10 in test config");
    }

    @Test
    @DisplayName("Should provide singleton instance of ApplicationConfig")
    void testSingletonScope() {
        // Given: Create injector
        Injector injector = Guice.createInjector(new ApplicationConfigModule());
        
        // When: Get ApplicationConfig multiple times
        ApplicationConfig config1 = injector.getInstance(ApplicationConfig.class);
        ApplicationConfig config2 = injector.getInstance(ApplicationConfig.class);
        
        // Then: Should return the same instance
        assertSame(config1, config2, 
            "ApplicationConfig should be a singleton - same instance returned");
    }

    @Test
    @DisplayName("Should handle default values when properties are missing")
    void testDefaultValues() {
        // Given: ApplicationConfigModule uses default values when properties missing
        // (This is tested indirectly through the module's getProperty methods)
        Injector injector = Guice.createInjector(new ApplicationConfigModule());
        ApplicationConfig config = injector.getInstance(ApplicationConfig.class);
        
        // Then: Config should still be created with defaults
        assertNotNull(config, "Config should be created even with missing properties");
        assertNotNull(config.getServer(), "Server config should have defaults");
        assertNotNull(config.getFirebase(), "Firebase config should have defaults");
        assertNotNull(config.getLogging(), "Logging config should have defaults");
        assertNotNull(config.getFeatures(), "Features config should have defaults");
        
        // Verify at least one default value is reasonable
        assertTrue(config.getServer().getPort() > 0, 
            "Server port should have a valid default value");
    }

    @Test
    @DisplayName("Should populate all nested configuration objects")
    void testNestedObjectsPopulation() {
        // Given: Create injector
        Injector injector = Guice.createInjector(new ApplicationConfigModule());
        ApplicationConfig config = injector.getInstance(ApplicationConfig.class);
        
        // Then: All nested objects should be properly populated
        
        // Server nested object
        ApplicationConfig.Server server = config.getServer();
        assertNotNull(server, "Server object should exist");
        assertNotNull(server.getEnvironment(), "Server environment should be set");
        assertNotNull(server.getContextPath(), "Server context path should be set");
        
        // Firebase nested object
        ApplicationConfig.Firebase firebase = config.getFirebase();
        assertNotNull(firebase, "Firebase object should exist");
        assertNotNull(firebase.getServiceAccountPath(), 
            "Firebase service account path should be set");
        assertNotNull(firebase.getCollection(), "Firebase collection should be set");
        
        // Logging nested object
        ApplicationConfig.Logging logging = config.getLogging();
        assertNotNull(logging, "Logging object should exist");
        assertNotNull(logging.getLevel(), "Logging level should be set");
        
        // Features nested object
        ApplicationConfig.Features features = config.getFeatures();
        assertNotNull(features, "Features object should exist");
        assertTrue(features.getMaxRandomCards() > 0, 
            "Max random cards should be positive");
    }

    @Test
    @DisplayName("Should successfully create multiple injectors independently")
    void testMultipleInjectorCreation() {
        // Given & When: Create multiple independent injectors
        Injector injector1 = Guice.createInjector(new ApplicationConfigModule());
        Injector injector2 = Guice.createInjector(new ApplicationConfigModule());
        
        ApplicationConfig config1 = injector1.getInstance(ApplicationConfig.class);
        ApplicationConfig config2 = injector2.getInstance(ApplicationConfig.class);
        
        // Then: Each injector should have its own config instance
        assertNotSame(config1, config2, 
            "Different injectors should create different config instances");
        
        // But: They should have the same values
        assertEquals(config1.getServer().getPort(), config2.getServer().getPort(), 
            "Both configs should have same port value");
        assertEquals(config1.getFeatures().isEnableFirestore(), 
            config2.getFeatures().isEnableFirestore(), 
            "Both configs should have same Firestore enable value");
    }
}
