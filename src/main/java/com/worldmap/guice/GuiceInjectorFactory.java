package com.worldmap.guice;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.worldmap.config.ApplicationConfig;
import com.worldmap.guice.modules.ApplicationConfigModule;
import com.worldmap.guice.modules.FirebaseModule;

/**
 * Bootstrap class for creating and managing the Guice injector
 */
public class GuiceInjectorFactory {

    private static volatile Injector injector;
    private static volatile ApplicationConfig applicationConfig;

    private GuiceInjectorFactory() {
        // Private constructor to prevent instantiation
    }

    /**
     * Initialize the factory with Spring's ApplicationConfig
     * This should be called before any getInstance() calls
     */
    public static void initialize(ApplicationConfig config) {
        applicationConfig = config;
        // Reset injector to force recreation with new config
        injector = null;
    }

    /**
     * Get the singleton Guice injector instance
     * @return Guice injector
     */
    public static Injector getInjector() {
        if (injector == null) {
            synchronized (GuiceInjectorFactory.class) {
                if (injector == null) {
                    injector = createInjector();
                }
            }
        }
        return injector;
    }

    /**
     * Create a new Guice injector with ApplicationConfig and Firebase modules
     * @return Guice injector
     */
    private static Injector createInjector() {
        if (applicationConfig == null) {
            throw new IllegalStateException("GuiceInjectorFactory must be initialized with ApplicationConfig before use. Call initialize(ApplicationConfig) first.");
        }
        
        return Guice.createInjector(
            new ApplicationConfigModule(applicationConfig),
            new FirebaseModule()
        );
    }

    /**
     * Get an instance of a class using Guice injection
     * @param clazz The class to instantiate
     * @param <T> Type parameter
     * @return Instance of the class with dependencies injected
     */
    public static <T> T getInstance(Class<T> clazz) {
        return getInjector().getInstance(clazz);
    }

    /**
     * Reset the injector (useful for testing)
     */
    public static synchronized void reset() {
        injector = null;
        applicationConfig = null;
    }
}