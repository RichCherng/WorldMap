package com.worldmap;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.worldmap.config.ApplicationConfig;
import com.worldmap.guice.modules.ApplicationConfigModule;
import com.worldmap.guice.modules.FirebaseModule;
import com.worldmap.guice.modules.JerseyGuiceModule;
import com.worldmap.guice.modules.WebServerModule;
import com.worldmap.web.WebServer;

/**
 * Guice application main class
 * Bootstraps web server and dependency injection without Spring
 */
public class WorldMapApplication {

    public static void main(String[] args) {
        try {
            // Create Guice injector with all modules including Firebase and Jersey-Guice integration
            Injector injector = Guice.createInjector(
                new ApplicationConfigModule(),
                new FirebaseModule(),
                new JerseyGuiceModule(),
                new WebServerModule()
            );

            // Get configuration for startup banner
            ApplicationConfig config = injector.getInstance(ApplicationConfig.class);
            
            // Start the web server
            WebServer webServer = injector.getInstance(WebServer.class);
            webServer.start();

            // Display startup banner
            displayStartupBanner(config);

            // Add shutdown hook
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                System.out.println("Shutting down WorldMap Application...");
                try {
                    webServer.stop();
                } catch (Exception e) {
                    System.err.println("Error during shutdown: " + e.getMessage());
                }
            }));

            System.out.println("WorldMap Application is running. Press Ctrl+C to stop.");

        } catch (Exception e) {
            System.err.println("Failed to start WorldMap Application: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void displayStartupBanner(ApplicationConfig config) {
        ApplicationConfig.Server serverConfig = config.getServer();
        ApplicationConfig.Firebase firebaseConfig = config.getFirebase();
        ApplicationConfig.Features featuresConfig = config.getFeatures();
        
        if (config.getLogging().isEnableStartupBanner()) {
            System.out.println("\n" + "=".repeat(70));
            System.out.println("🌍 WorldMap Application Started Successfully!");
            System.out.println("=".repeat(70));
            System.out.println("🔗 Local Address: http://localhost:" + serverConfig.getPort() + serverConfig.getContextPath());
            System.out.println("🔗 Network Address: http://0.0.0.0:" + serverConfig.getPort() + serverConfig.getContextPath());
            System.out.println("🌐 Environment: " + serverConfig.getEnvironment());
            System.out.println("🔥 Firebase: " + (featuresConfig.isEnableFirestore() ? "Enabled" : "Disabled"));
            System.out.println("💉 Guice Integration: Native");
            System.out.println("📝 Collection: " + firebaseConfig.getCollection());
            System.out.println("🚀 Web Server: Jetty");
            System.out.println("=".repeat(70) + "\n");
        }
    }
}