package com.worldmap.guice.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.worldmap.config.ApplicationConfig;

/**
 * Guice module for ApplicationConfig binding
 * Uses the Spring-managed ApplicationConfig instance directly
 */
public class ApplicationConfigModule extends AbstractModule {

    private final ApplicationConfig springApplicationConfig;

    public ApplicationConfigModule(ApplicationConfig springApplicationConfig) {
        this.springApplicationConfig = springApplicationConfig;
    }

    @Override
    protected void configure() {
        // Configuration binding is done in the provider method
    }

    @Provides
    @Singleton
    public ApplicationConfig provideApplicationConfig() {
        System.out.println("Using Spring-managed ApplicationConfig for Guice");
        return springApplicationConfig;
    }
}