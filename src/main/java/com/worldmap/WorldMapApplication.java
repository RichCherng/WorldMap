package com.worldmap;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.worldmap.config.ApplicationConfig;
import com.worldmap.guice.modules.ApplicationConfigModule;
import com.worldmap.guice.modules.FirebaseModule;
import com.worldmap.guice.modules.GrpcModule;
import com.worldmap.grpc.GrpcServer;

/**
 * WorldMap Application main class
 * Bootstraps gRPC server and dependency injection using Guice
 */
public class WorldMapApplication {

    public static void main(String[] args) {
        try {
            // Create Guice injector with all modules including Firebase and gRPC
            Injector injector = Guice.createInjector(
                new ApplicationConfigModule(),
                new FirebaseModule(),
                new GrpcModule()
            );

            // Get configuration for startup banner
            ApplicationConfig config = injector.getInstance(ApplicationConfig.class);

            // Start the gRPC server
            GrpcServer grpcServer = injector.getInstance(GrpcServer.class);
            grpcServer.start();

            // Display startup banner
            displayStartupBanner(config);

            // Add shutdown hook
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                System.out.println("Shutting down WorldMap Application...");
                try {
                    grpcServer.stop();
                } catch (Exception e) {
                    System.err.println("Error during shutdown: " + e.getMessage());
                }
            }));

            System.out.println("WorldMap Application is running. Press Ctrl+C to stop.");

            // Block until server is terminated
            grpcServer.awaitTermination();

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
            System.out.println("🔗 gRPC Server: localhost:" + serverConfig.getPort());
            System.out.println("🔗 Network Address: 0.0.0.0:" + serverConfig.getPort());
            System.out.println("🌐 Environment: " + serverConfig.getEnvironment());
            System.out.println("🔥 Firebase: " + (featuresConfig.isEnableFirestore() ? "Enabled" : "Disabled"));
            System.out.println("💉 Guice Integration: Native");
            System.out.println("📝 Collection: " + firebaseConfig.getCollection());
            System.out.println("🚀 Server Type: gRPC (replaced Jetty)");
            System.out.println("🔍 gRPC Reflection: Enabled (for grpcui support)");
            System.out.println("📚 Test with grpcui: grpcui -plaintext localhost:" + serverConfig.getPort());
            System.out.println("=".repeat(70) + "\n");
        }
    }
}