package com.worldmap.web;

import com.worldmap.config.ApplicationConfig;
import org.eclipse.jetty.server.Server;

import javax.inject.Inject;
import javax.inject.Singleton;

/**
 * Jetty web server wrapper for the WorldMap application
 */
@Singleton
public class WebServer {
    
    private final Server jettyServer;
    private final ApplicationConfig config;
    
    @Inject
    public WebServer(Server jettyServer, ApplicationConfig config) {
        this.jettyServer = jettyServer;
        this.config = config;
    }
    
    public void start() throws Exception {
        System.out.println("Starting Jetty server on port " + config.getServer().getPort() + "...");
        jettyServer.start();
        System.out.println("Jetty server started successfully!");
    }
    
    public void stop() throws Exception {
        System.out.println("Stopping Jetty server...");
        jettyServer.stop();
        System.out.println("Jetty server stopped.");
    }
    
    public void join() throws InterruptedException {
        jettyServer.join();
    }
    
    public boolean isStarted() {
        return jettyServer.isStarted();
    }
    
    public boolean isStopped() {
        return jettyServer.isStopped();
    }
}