package com.worldmap.guice.modules;

import com.google.inject.AbstractModule;
import com.google.inject.Injector;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import org.glassfish.jersey.server.ResourceConfig;
import io.swagger.v3.oas.integration.SwaggerConfiguration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.servers.Server;

import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Guice module to set up Jersey-Guice bridge integration
 * This allows Jersey to use Guice-managed dependencies in JAX-RS controllers
 */
public class JerseyGuiceModule extends AbstractModule {

    @Override
    protected void configure() {
        // Explicitly bind the controller so Guice manages its lifecycle
        bind(com.worldmap.controller.ChineseFlashCardController.class);
        bind(com.worldmap.controller.ApiController.class);
    }

    @Provides
    @Singleton
    public ResourceConfig provideResourceConfig(Injector injector) {
        ResourceConfig config = new ResourceConfig();
        
        // IMPORTANT: Do NOT use packages() scanning as it causes Jersey to instantiate controllers directly
        // Instead, register Guice-created controller instances explicitly
        // config.packages("com.worldmap.controller");  // <- REMOVED
        
        // Register controller instances created by Guice (with proper dependency injection)
        config.register(injector.getInstance(com.worldmap.controller.ChineseFlashCardController.class));
        config.register(injector.getInstance(com.worldmap.controller.ApiController.class));
        
        // Register Swagger OpenAPI resources to auto-generate openapi.json
        config.packages("io.swagger.v3.jaxrs2.integration.resources");
        
        // No need for lifecycle listener - controllers are already managed by Guice
        
        // Configure OpenAPI metadata programmatically
        OpenAPI openAPI = new OpenAPI()
            .info(new Info()
                .title("WorldMap API")
                .description("API for WorldMap application - Chinese Flash Card Learning System")
                .version("1.0.0")
                .contact(new Contact()
                    .name("WorldMap Team")
                    .url("https://github.com/RichCherng/WorldMap")))
            .addServersItem(new Server()
                .url("http://localhost:8080/api")
                .description("Local Development Server"));
        
        SwaggerConfiguration oasConfig = new SwaggerConfiguration()
            .openAPI(openAPI)
            .prettyPrint(true)
            .resourcePackages(Stream.of("com.worldmap.controller").collect(Collectors.toSet()));
        
        try {
            new io.swagger.v3.jaxrs2.integration.JaxrsOpenApiContextBuilder<>()
                .openApiConfiguration(oasConfig)
                .buildContext(true);
        } catch (Exception e) {
            System.err.println("Failed to initialize Swagger OpenAPI context: " + e.getMessage());
        }
        
        // Enable CORS and other Jersey features if needed
        config.property("jersey.config.server.wadl.disableWadl", "true");
        
        System.out.println("🔧 Jersey ResourceConfig created - controllers registered as Guice singletons");
        System.out.println("📚 Swagger auto-generates OpenAPI spec from annotations at /api/openapi.json");
        System.out.println("📚 Swagger API documentation available at http://localhost:8080/api/swagger-ui.html");
        return config;
    }
}