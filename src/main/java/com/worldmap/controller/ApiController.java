package com.worldmap.controller;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import javax.inject.Singleton;
import java.util.Map;
import java.util.HashMap;

@Path("/")
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class ApiController {

    @GET
    @Path("/hello")
    public Map<String, String> hello() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello!");
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        return response;
    }

    @GET
    @Path("/status")
    public Map<String, Object> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("service", "WorldMap API");
        response.put("version", "1.0.0");
        return response;
    }
}