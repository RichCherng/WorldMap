
package com.worldmap.grpc;

import com.worldmap.config.ApplicationConfig;
import io.grpc.BindableService;
import io.grpc.Server;
import io.grpc.ServerBuilder;
import io.grpc.health.v1.HealthCheckResponse;
import io.grpc.protobuf.services.HealthStatusManager;
import io.grpc.protobuf.services.ProtoReflectionService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * Centralized gRPC server that hosts all gRPC services.
 * Replaces Jetty server for API endpoints, providing a single entry point
 * for all gRPC services (Chinese FlashCard, French FlashCard, etc.)
 */
@Singleton
public class GrpcServer {

    private final Server server;
    private final ApplicationConfig config;
    private final Set<BindableService> grpcServices;
    private final HealthStatusManager healthStatusManager;

    /**
     * Constructor with Guice dependency injection.
     *
     * @param config Application configuration
     * @param grpcServices Set of all gRPC service implementations to register
     */
    @Inject
    public GrpcServer(ApplicationConfig config, Set<BindableService> grpcServices) {
        this.config = config;
        this.grpcServices = grpcServices;
        this.healthStatusManager = new HealthStatusManager();
        this.server = buildServer();
    }

    /**
     * Builds the gRPC server with all registered services.
     * Enables gRPC Server Reflection for grpcui support.
     * Enables standard gRPC health checking protocol.
     */
    private Server buildServer() {
        int port = config.getServer().getPort();
        ServerBuilder<?> serverBuilder = ServerBuilder.forPort(port);

        // Register all gRPC services
        for (BindableService service : grpcServices) {
            serverBuilder.addService(service);
            System.out.println("  ✓ Registered gRPC service: " + service.getClass().getSimpleName());

            // Set health status for this service to SERVING
            String serviceName = service.bindService().getServiceDescriptor().getName();
            healthStatusManager.setStatus(serviceName, HealthCheckResponse.ServingStatus.SERVING);
        }

        // Enable gRPC Health Checking (standard protocol)
        serverBuilder.addService(healthStatusManager.getHealthService());
        System.out.println("  ✓ Enabled gRPC Health Checking Service");

        // Enable gRPC Server Reflection (required for grpcui)
        serverBuilder.addService(ProtoReflectionService.newInstance());
        System.out.println("  ✓ Enabled gRPC Server Reflection");

        return serverBuilder.build();
    }

    /**
     * Starts the gRPC server.
     */
    public void start() throws IOException {
        System.out.println("Starting gRPC server on port " + config.getServer().getPort() + "...");
        server.start();

        // Mark overall server health as SERVING
        healthStatusManager.setStatus("", HealthCheckResponse.ServingStatus.SERVING);

        System.out.println("gRPC server started successfully!");

        // Add shutdown hook for graceful shutdown
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.err.println("*** Shutting down gRPC server (JVM shutdown hook)");
            try {
                GrpcServer.this.stop();
            } catch (InterruptedException e) {
                e.printStackTrace(System.err);
            }
            System.err.println("*** gRPC server shut down");
        }));
    }

    /**
     * Stops the gRPC server with a 30-second timeout.
     */
    public void stop() throws InterruptedException {
        if (server != null) {
            System.out.println("Stopping gRPC server...");

            // Mark server as NOT_SERVING before shutdown
            healthStatusManager.enterTerminalState();

            server.shutdown().awaitTermination(30, TimeUnit.SECONDS);
            System.out.println("gRPC server stopped.");
        }
    }

    /**
     * Awaits termination of the server.
     */
    public void awaitTermination() throws InterruptedException {
        if (server != null) {
            server.awaitTermination();
        }
    }

    /**
     * Checks if the server is running.
     */
    public boolean isRunning() {
        return server != null && !server.isShutdown() && !server.isTerminated();
    }

    /**
     * Gets the port the server is listening on.
     */
    public int getPort() {
        return server != null ? server.getPort() : -1;
    }

    /**
     * Gets the health status manager for manual health check updates.
     * Useful for marking services as unhealthy based on external conditions.
     */
    public HealthStatusManager getHealthStatusManager() {
        return healthStatusManager;
    }
}
