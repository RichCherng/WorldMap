
package com.worldmap.grpc;

import com.linecorp.armeria.common.HttpMethod;
import com.linecorp.armeria.server.Server;
import com.linecorp.armeria.server.ServerBuilder;
import com.linecorp.armeria.server.grpc.GrpcService;
import com.linecorp.armeria.server.cors.CorsService;
import com.worldmap.config.ApplicationConfig;
import io.grpc.BindableService;
import io.grpc.health.v1.HealthCheckResponse;
import io.grpc.protobuf.services.HealthStatusManager;
import io.grpc.protobuf.services.ProtoReflectionService;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

/**
 * Centralized gRPC server that hosts all gRPC services using Armeria.
 * Armeria provides native gRPC-Web support, CORS, and HTTP/2.
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
     * Builds the gRPC server with all registered services using Armeria.
     * Armeria natively supports gRPC, gRPC-Web, and Protobuf-JSON.
     * Enables gRPC Server Reflection for grpcui support.
     * Enables standard gRPC health checking protocol.
     * Enables CORS for browser requests.
     */
    private Server buildServer() {
        int port = config.getServer().getPort();
        ServerBuilder serverBuilder = Server.builder();
        serverBuilder.http(port);

        // Build GrpcService with all registered services
        com.linecorp.armeria.server.grpc.GrpcServiceBuilder grpcServiceBuilder = GrpcService.builder();

        // Register all gRPC services
        for (BindableService service : grpcServices) {
            grpcServiceBuilder.addService(service);
            System.out.println("  ✓ Registered gRPC service: " + service.getClass().getSimpleName());

            // Set health status for this service to SERVING
            String serviceName = service.bindService().getServiceDescriptor().getName();
            healthStatusManager.setStatus(serviceName, HealthCheckResponse.ServingStatus.SERVING);
        }

        // Enable gRPC Health Checking (standard protocol)
        grpcServiceBuilder.addService(healthStatusManager.getHealthService());
        System.out.println("  ✓ Enabled gRPC Health Checking Service");

        // Enable gRPC Server Reflection (required for grpcui)
        grpcServiceBuilder.addService(ProtoReflectionService.newInstance());
        System.out.println("  ✓ Enabled gRPC Server Reflection");

        // Build the gRPC service (Armeria automatically supports gRPC-Web)
        GrpcService grpcService = grpcServiceBuilder.build();

        // Wrap with CORS support for browser requests
        serverBuilder.service(grpcService,
            CorsService.builderForAnyOrigin()
                .allowRequestMethods(HttpMethod.GET, HttpMethod.POST, HttpMethod.OPTIONS)
                .allowRequestHeaders("*")
                .allowCredentials()
                .exposeHeaders("grpc-status", "grpc-message", "grpc-status-details-bin")
                .newDecorator());

        System.out.println("  ✓ Enabled gRPC-Web with CORS support (via Armeria)");

        return serverBuilder.build();
    }

    /**
     * Starts the gRPC server (Armeria).
     */
    public void start() {
        System.out.println("Starting gRPC server on port " + config.getServer().getPort() + "...");
        CompletableFuture<Void> future = server.start();
        future.join();

        // Mark overall server health as SERVING
        healthStatusManager.setStatus("", HealthCheckResponse.ServingStatus.SERVING);

        System.out.println("gRPC server started successfully!");

        // Add shutdown hook for graceful shutdown
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.err.println("*** Shutting down gRPC server (JVM shutdown hook)");
            GrpcServer.this.stop();
            System.err.println("*** gRPC server shut down");
        }));
    }

    /**
     * Stops the gRPC server gracefully (Armeria).
     */
    public void stop() {
        if (server != null) {
            System.out.println("Stopping gRPC server...");

            // Mark server as NOT_SERVING before shutdown
            healthStatusManager.enterTerminalState();

            CompletableFuture<Void> future = server.stop();
            future.join();
            System.out.println("gRPC server stopped.");
        }
    }

    /**
     * Awaits termination of the server (Armeria).
     */
    public void awaitTermination() {
        if (server != null) {
            server.closeOnJvmShutdown();
            try {
                server.blockUntilShutdown();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                System.err.println("Server interrupted during shutdown: " + e.getMessage());
            }
        }
    }

    /**
     * Checks if the server is running (Armeria).
     */
    public boolean isRunning() {
        return server != null && !server.activePorts().isEmpty();
    }

    /**
     * Gets the port the server is listening on (Armeria).
     */
    public int getPort() {
        if (server != null && !server.activePorts().isEmpty()) {
            return server.activePorts().values().iterator().next().localAddress().getPort();
        }
        return -1;
    }

    /**
     * Gets the health status manager for manual health check updates.
     * Useful for marking services as unhealthy based on external conditions.
     */
    public HealthStatusManager getHealthStatusManager() {
        return healthStatusManager;
    }
}
