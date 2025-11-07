package com.worldmap;

import com.worldmap.config.ApplicationConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.event.EventListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@SpringBootApplication
@EnableConfigurationProperties(ApplicationConfig.class)
public class WorldMapApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorldMapApplication.class, args);
    }

    @Component
    public static class StartupListener {
        
        @Autowired
        private ApplicationConfig applicationConfig;

        @EventListener(ApplicationReadyEvent.class)
        public void onApplicationReady() {
            ApplicationConfig.Server serverConfig = applicationConfig.getServer();
            ApplicationConfig.Firebase firebaseConfig = applicationConfig.getFirebase();
            ApplicationConfig.Features featuresConfig = applicationConfig.getFeatures();
            
            if (applicationConfig.getLogging().isEnableStartupBanner()) {
                System.out.println("\n" + "=".repeat(70));
                System.out.println("🌍 WorldMap Application Started Successfully!");
                System.out.println("=".repeat(70));
                System.out.println("🔗 Local Address: http://localhost:" + serverConfig.getPort() + serverConfig.getContextPath());
                System.out.println("🔗 Network Address: http://0.0.0.0:" + serverConfig.getPort() + serverConfig.getContextPath());
                System.out.println("🌐 Environment: " + serverConfig.getEnvironment());
                System.out.println("🔥 Firebase: " + (featuresConfig.isEnableFirestore() ? "Enabled" : "Disabled"));
                System.out.println("💉 Guice Integration: " + (featuresConfig.isEnableGuiceIntegration() ? "Enabled" : "Disabled"));
                System.out.println("📝 Collection: " + firebaseConfig.getCollection());
                System.out.println("=".repeat(70) + "\n");
            }
        }
    }
}