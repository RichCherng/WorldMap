package com.worldmap.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;

/**
 * Swagger configuration for the WorldMap REST API.
 * Uses OpenAPI 3.0 annotations to document the API endpoints.
 */
@OpenAPIDefinition(
        info = @Info(
                title = "WorldMap API",
                description = "API for WorldMap application - Chinese Flash Card Learning System",
                version = "1.0.0",
                contact = @Contact(
                        name = "WorldMap Team",
                        url = "https://github.com/RichCherng/WorldMap"
                ),
                license = @License(
                        name = "MIT"
                )
        ),
        servers = @Server(
                url = "http://localhost:8080",
                description = "Local Development Server"
        )
)
public class SwaggerInitializer {
    // This class serves as a marker for OpenAPI definitions
}

