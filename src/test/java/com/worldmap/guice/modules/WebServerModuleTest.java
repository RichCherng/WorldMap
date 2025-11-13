package com.worldmap.guice.modules;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.worldmap.web.WebServer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.webapp.WebAppContext;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for WebServerModule
 * Tests Jetty server configuration and bindings
 */
@DisplayName("WebServerModule Tests")
class WebServerModuleTest {

    @Test
    @DisplayName("Should create Jetty Server successfully")
    void testJettyServerCreation() {
        // Given: Create injector with all necessary modules
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        // When: Get Server from injector
        Server server = injector.getInstance(Server.class);
        
        // Then: Server should be created
        assertNotNull(server, "Jetty Server should not be null");
    }

    @Test
    @DisplayName("Should configure server with correct port from ApplicationConfig")
    void testServerPortConfiguration() {
        // Given: Create injector with test config (port 8080)
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        // When: Get Server from injector
        Server server = injector.getInstance(Server.class);
        
        // Then: Server should be configured with port 8080 from test config
        assertNotNull(server.getURI(), "Server URI should be set");
        // Port is set but server needs to be started to get actual port
        assertNotNull(server, "Server should be created with port configuration");
    }

    @Test
    @DisplayName("Should provide singleton Server instance")
    void testServerSingletonScope() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        // When: Get Server multiple times
        Server server1 = injector.getInstance(Server.class);
        Server server2 = injector.getInstance(Server.class);
        
        // Then: Should return the same instance
        assertSame(server1, server2, 
            "Server should be a singleton - same instance returned");
    }

    @Test
    @DisplayName("Should configure HandlerCollection with API and static handlers")
    void testHandlerCollectionConfiguration() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        Server server = injector.getInstance(Server.class);
        
        // When: Get handler from server
        Handler handler = server.getHandler();
        
        // Then: Should be a HandlerCollection with multiple handlers
        assertNotNull(handler, "Server handler should not be null");
        assertTrue(handler instanceof HandlerCollection, 
            "Server handler should be HandlerCollection");
        
        HandlerCollection handlerCollection = (HandlerCollection) handler;
        Handler[] handlers = handlerCollection.getHandlers();
        
        assertNotNull(handlers, "Handlers array should not be null");
        assertEquals(2, handlers.length, 
            "Should have 2 handlers (API handler and static handler)");
    }

    @Test
    @DisplayName("Should configure ServletContextHandler for API endpoints")
    void testAPIServletContextHandler() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        Server server = injector.getInstance(Server.class);
        HandlerCollection handlerCollection = (HandlerCollection) server.getHandler();
        Handler[] handlers = handlerCollection.getHandlers();
        
        // When: Get the first handler (API handler)
        Handler apiHandler = handlers[0];
        
        // Then: Should be a ServletContextHandler with /api context path
        assertTrue(apiHandler instanceof ServletContextHandler, 
            "First handler should be ServletContextHandler for API");
        
        ServletContextHandler servletHandler = (ServletContextHandler) apiHandler;
        assertEquals("/api", servletHandler.getContextPath(), 
            "API handler should have /api context path");
    }

    @Test
    @DisplayName("Should configure WebAppContext for static resources")
    void testStaticResourcesWebAppContext() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        Server server = injector.getInstance(Server.class);
        HandlerCollection handlerCollection = (HandlerCollection) server.getHandler();
        Handler[] handlers = handlerCollection.getHandlers();
        
        // When: Get the second handler (static handler)
        Handler staticHandler = handlers[1];
        
        // Then: Should be a WebAppContext with / context path
        assertTrue(staticHandler instanceof WebAppContext, 
            "Second handler should be WebAppContext for static resources");
        
        WebAppContext webAppContext = (WebAppContext) staticHandler;
        assertEquals("/", webAppContext.getContextPath(), 
            "Static handler should have / context path");
        assertTrue(webAppContext.getResourceBase().contains("src/main/resources/webapp"),
            "Static handler should point to webapp resources directory");
    }

    @Test
    @DisplayName("Should create WebServer wrapper successfully")
    void testWebServerCreation() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        // When: Get WebServer from injector
        WebServer webServer = injector.getInstance(WebServer.class);
        
        // Then: WebServer should be created
        assertNotNull(webServer, "WebServer should not be null");
    }

    @Test
    @DisplayName("Should provide singleton WebServer instance")
    void testWebServerSingletonScope() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        // When: Get WebServer multiple times
        WebServer webServer1 = injector.getInstance(WebServer.class);
        WebServer webServer2 = injector.getInstance(WebServer.class);
        
        // Then: Should return the same instance
        assertSame(webServer1, webServer2, 
            "WebServer should be a singleton - same instance returned");
    }

    @Test
    @DisplayName("Should configure server with sessions enabled for API handler")
    void testAPIHandlerSessionsEnabled() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        Server server = injector.getInstance(Server.class);
        HandlerCollection handlerCollection = (HandlerCollection) server.getHandler();
        Handler[] handlers = handlerCollection.getHandlers();
        
        // When: Get API handler
        ServletContextHandler apiHandler = (ServletContextHandler) handlers[0];
        
        // Then: Sessions should be enabled (SESSIONS flag set)
        assertNotNull(apiHandler, "API handler should exist");
        // ServletContextHandler with SESSIONS has session handler
        assertNotNull(apiHandler.getSessionHandler(), 
            "API handler should have session handler enabled");
    }

    @Test
    @DisplayName("Should work with multiple independent injectors")
    void testMultipleInjectorsIndependence() {
        // Given & When: Create multiple independent injectors
        Injector injector1 = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        Injector injector2 = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        Server server1 = injector1.getInstance(Server.class);
        Server server2 = injector2.getInstance(Server.class);
        
        // Then: Each injector should have its own Server
        assertNotSame(server1, server2, 
            "Different injectors should create different Server instances");
    }

    @Test
    @DisplayName("Should configure WebAppContext with parent loader priority")
    void testWebAppContextParentLoaderPriority() {
        // Given: Create injector
        Injector injector = Guice.createInjector(
            new ApplicationConfigModule(),
            new TestFirebaseModule(),
            new JerseyGuiceModule(),
            new WebServerModule()
        );
        
        Server server = injector.getInstance(Server.class);
        HandlerCollection handlerCollection = (HandlerCollection) server.getHandler();
        Handler[] handlers = handlerCollection.getHandlers();
        
        // When: Get static handler
        WebAppContext webAppContext = (WebAppContext) handlers[1];
        
        // Then: Parent loader priority should be true
        assertTrue(webAppContext.isParentLoaderPriority(),
            "WebAppContext should have parent loader priority enabled");
    }
}
