package com.worldmap.guice;

import com.worldmap.config.ApplicationConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Spring component that initializes GuiceInjectorFactory with Spring's ApplicationConfig
 */
@Component
public class GuiceInitializer {
    
    @Autowired
    @Qualifier("applicationConfig")
    private ApplicationConfig applicationConfig;
    
    @PostConstruct
    public void initializeGuice() {
        GuiceInjectorFactory.initialize(applicationConfig);
        System.out.println("GuiceInjectorFactory initialized with Spring's ApplicationConfig");
    }
}