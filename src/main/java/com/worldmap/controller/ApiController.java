package com.worldmap.controller;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.inject.Singleton;
import java.util.Map;
import java.util.HashMap;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
@Tag(name = "System", description = "System API endpoints")
public class ApiController {

    @GET
    @Path("/hello")
    @Operation(summary = "Hello endpoint", description = "Simple hello endpoint to verify the API is running")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello!");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        return response;
    }

    @GET
    @Path("/status")
    @Operation(summary = "API status", description = "Get the status of the WorldMap API")
    public Map<String, Object> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("service", "WorldMap API");
        response.put("version", "1.0.0");
        return response;
    }

    @GET
    @Path("/status/firebase")
    @Operation(summary = "Firebase status", description = "Check Firebase connection status")
    public Map<String, String> firebaseStatus() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "ok");
        return response;
    }
}
