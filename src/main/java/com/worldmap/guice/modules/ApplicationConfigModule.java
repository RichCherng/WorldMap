package com.worldmap.guice.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.worldmap.config.ApplicationConfig;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Guice module for ApplicationConfig binding
 * Reads configuration directly from application.properties
 */
public class ApplicationConfigModule extends AbstractModule {

    private final Properties properties;

    public ApplicationConfigModule() {
        this.properties = loadProperties();
    }

    @Override
    protected void configure() {
        // Configuration binding is done in the provider method
    }

    @Provides
    @Singleton
    public ApplicationConfig provideApplicationConfig() {
        ApplicationConfig config = new ApplicationConfig();
        
        // Server configuration
        ApplicationConfig.Server server = new ApplicationConfig.Server();
        server.setPort(getIntProperty("app.server.port", 8080));
        server.setContextPath(getProperty("app.server.context-path", "/"));
        server.setEnvironment(getProperty("app.server.environment", "development"));
        server.setEnableCors(getBooleanProperty("app.server.enable-cors", true));
        config.setServer(server);
        
        // Firebase configuration
        ApplicationConfig.Firebase firebase = new ApplicationConfig.Firebase();
        firebase.setServiceAccountPath(getProperty("app.firebase.service-account-path", "firebaseServiceAccountPath"));
        firebase.setDatabaseUrl(getProperty("app.firebase.database-url", ""));
        firebase.setProjectId(getProperty("app.firebase.project-id", ""));
        firebase.setAutoInitialize(getBooleanProperty("app.firebase.auto-initialize", true));
        firebase.setCollection(getProperty("app.firebase.collection", "chinese_flash_cards"));
        config.setFirebase(firebase);
        
        // Logging configuration
        ApplicationConfig.Logging logging = new ApplicationConfig.Logging();
        logging.setLevel(getProperty("app.logging.level", "INFO"));
        logging.setEnableStartupBanner(getBooleanProperty("app.logging.enable-startup-banner", true));
        logging.setEnableColorOutput(getBooleanProperty("app.logging.enable-color-output", true));
        config.setLogging(logging);
        
        // Features configuration
        ApplicationConfig.Features features = new ApplicationConfig.Features();
        features.setEnableSampleData(getBooleanProperty("app.features.enable-sample-data", true));
        features.setEnableFirestore(getBooleanProperty("app.features.enable-firestore", true));
        features.setEnableGuiceIntegration(getBooleanProperty("app.features.enable-guice-integration", true));
        features.setMaxRandomCards(getIntProperty("app.features.max-random-cards", 50));
        config.setFeatures(features);
        
        System.out.println("ApplicationConfig loaded from application.properties");
        return config;
    }

    private Properties loadProperties() {
        Properties props = new Properties();
        try (InputStream input = getClass().getClassLoader().getResourceAsStream("application.properties")) {
            if (input != null) {
                props.load(input);
                System.out.println("Successfully loaded application.properties");
            } else {
                System.err.println("Could not find application.properties file");
            }
        } catch (IOException e) {
            System.err.println("Error loading application.properties: " + e.getMessage());
        }
        return props;
    }

    private String getProperty(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }

    private int getIntProperty(String key, int defaultValue) {
        String value = properties.getProperty(key);
        if (value != null) {
            try {
                return Integer.parseInt(value);
            } catch (NumberFormatException e) {
                System.err.println("Invalid integer value for property " + key + ": " + value + ", using default: " + defaultValue);
            }
        }
        return defaultValue;
    }

    private boolean getBooleanProperty(String key, boolean defaultValue) {
        String value = properties.getProperty(key);
        if (value != null) {
            return Boolean.parseBoolean(value);
        }
        return defaultValue;
    }
}