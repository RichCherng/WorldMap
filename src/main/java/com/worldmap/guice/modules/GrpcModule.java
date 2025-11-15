package com.worldmap.guice.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.google.inject.multibindings.Multibinder;
import com.worldmap.config.ApplicationConfig;
import com.worldmap.grpc.GrpcServer;
import io.grpc.BindableService;

import java.util.Set;

/**
 * Guice module for gRPC server configuration.
 * This module:
 * - Configures the GrpcServer as a singleton
 * - Sets up service registration via Multibinder
 * - Manages gRPC server port configuration
 */
public class GrpcModule extends AbstractModule {

    @Override
    protected void configure() {
        // Create a Multibinder for BindableService
        // This allows other modules to add gRPC services dynamically
        Multibinder<BindableService> serviceBinder = Multibinder.newSetBinder(binder(), BindableService.class);

        // Register ChineseFlashCardGrpcService
        serviceBinder.addBinding().to(com.worldmap.grpc.ChineseFlashCardGrpcService.class);

        System.out.println("🔧 GrpcModule configured with ChineseFlashCardGrpcService");
    }

    /**
     * Provides the GrpcServer singleton instance.
     *
     * @param config Application configuration (provides port number)
     * @param grpcServices Set of all registered gRPC services
     * @return GrpcServer instance
     */
    @Provides
    @Singleton
    public GrpcServer provideGrpcServer(ApplicationConfig config, Set<BindableService> grpcServices) {
        System.out.println("🚀 Creating GrpcServer with " + grpcServices.size() + " registered service(s)");
        return new GrpcServer(config, grpcServices);
    }
}
