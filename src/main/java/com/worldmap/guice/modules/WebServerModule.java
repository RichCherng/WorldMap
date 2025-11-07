package com.worldmap.guice.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Injector;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.worldmap.config.ApplicationConfig;
import com.worldmap.web.WebServer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.webapp.WebAppContext;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletContainer;

/**
 * Guice module for web server configuration using Jetty
 */
public class WebServerModule extends AbstractModule {

    @Override
    protected void configure() {
        // No explicit bindings needed
    }

    @Provides
    @Singleton
    public Server provideJettyServer(ApplicationConfig config, ResourceConfig resourceConfig, Injector injector) {
        int port = config.getServer().getPort();
        Server server = new Server(port);
        
        // Create servlet context handler for API endpoints
        ServletContextHandler apiHandler = new ServletContextHandler(ServletContextHandler.SESSIONS);
        apiHandler.setContextPath("/api");
        
        // Create Jersey servlet with custom ResourceConfig
        ServletContainer servletContainer = new ServletContainer(resourceConfig);
        ServletHolder jerseyServlet = new ServletHolder(servletContainer);
        jerseyServlet.setInitOrder(0);
        
        // Add the Jersey servlet to handle all API requests
        apiHandler.addServlet(jerseyServlet, "/*");
        
        // Initialize Jersey-Guice bridge
        // Note: This is a simplified approach - full bridge requires ServletContainer's ServiceLocator
        JerseyGuiceModule.initializeGuiceBridge(null, injector);
        
        System.out.println("🌉 Jersey configured with Guice ResourceConfig integration");
        
        // Create web application context for static resources
        WebAppContext staticHandler = new WebAppContext();
        staticHandler.setContextPath("/");
        staticHandler.setResourceBase("src/main/resources/webapp");
        staticHandler.setParentLoaderPriority(true);
        
        // Use handler collection to handle both API and static resources
        org.eclipse.jetty.server.handler.HandlerCollection handlers = new org.eclipse.jetty.server.handler.HandlerCollection();
        handlers.setHandlers(new org.eclipse.jetty.server.Handler[]{apiHandler, staticHandler});
        
        server.setHandler(handlers);
        
        return server;
    }

    @Provides
    @Singleton
    public WebServer provideWebServer(Server jettyServer, ApplicationConfig config) {
        return new WebServer(jettyServer, config);
    }
}