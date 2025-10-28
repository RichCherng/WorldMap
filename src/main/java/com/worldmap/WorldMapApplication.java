package com.worldmap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class WorldMapApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorldMapApplication.class, args);
    }

    @Component
    public static class StartupListener {
        
        @Autowired
        private Environment environment;

        @EventListener(ApplicationReadyEvent.class)
        public void onApplicationReady() {
            String port = environment.getProperty("server.port", "8080");
            String contextPath = environment.getProperty("server.servlet.context-path", "");
            
            System.out.println("\n" + "=".repeat(60));
            System.out.println("🌍 WorldMap Application Started Successfully!");
            System.out.println("=".repeat(60));
            System.out.println("🔗 Local Address: http://localhost:" + port + contextPath);
            System.out.println("🔗 Network Address: http://0.0.0.0:" + port + contextPath);
            System.out.println("=".repeat(60) + "\n");
        }
    }
}