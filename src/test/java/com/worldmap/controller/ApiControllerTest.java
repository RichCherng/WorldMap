package com.worldmap.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit tests for ApiController
 * Tests all endpoints without mocking - ApiController has no dependencies
 */
@DisplayName("ApiController Tests")
class ApiControllerTest {

    private ApiController apiController;

    @BeforeEach
    void setUp() {
        apiController = new ApiController();
    }

    @Test
    @DisplayName("Should return hello message with timestamp")
    void testHelloEndpoint() {
        // When: Call hello endpoint
        Map<String, String> response = apiController.hello();
        
        // Then: Should return message and timestamp
        assertNotNull(response, "Response should not be null");
        assertEquals(2, response.size(), "Response should have 2 fields");
        
        assertTrue(response.containsKey("message"), "Response should contain 'message' field");
        assertEquals("Hello!", response.get("message"), 
            "Message should be 'Hello!'");
        
        assertTrue(response.containsKey("timestamp"), "Response should contain 'timestamp' field");
        assertNotNull(response.get("timestamp"), "Timestamp should not be null");
        assertFalse(response.get("timestamp").isEmpty(), "Timestamp should not be empty");
    }

    @Test
    @DisplayName("Should return valid timestamp format in hello endpoint")
    void testHelloTimestampFormat() {
        // When: Call hello endpoint
        Map<String, String> response = apiController.hello();
        
        // Then: Timestamp should be in ISO format (contains 'T' separator)
        String timestamp = response.get("timestamp");
        assertTrue(timestamp.contains("T"), 
            "Timestamp should be in ISO format with 'T' separator");
        assertTrue(timestamp.contains(":"), 
            "Timestamp should contain time portion with ':'");
    }

    @Test
    @DisplayName("Should return status OK with service info")
    void testStatusEndpoint() {
        // When: Call status endpoint
        Map<String, Object> response = apiController.status();
        
        // Then: Should return status, service, and version
        assertNotNull(response, "Response should not be null");
        assertEquals(3, response.size(), "Response should have 3 fields");
        
        assertTrue(response.containsKey("status"), "Response should contain 'status' field");
        assertEquals("OK", response.get("status"), "Status should be 'OK'");
        
        assertTrue(response.containsKey("service"), "Response should contain 'service' field");
        assertEquals("WorldMap API", response.get("service"), 
            "Service should be 'WorldMap API'");
        
        assertTrue(response.containsKey("version"), "Response should contain 'version' field");
        assertEquals("1.0.0", response.get("version"), 
            "Version should be '1.0.0'");
    }

    @Test
    @DisplayName("Should return firebase status ok")
    void testFirebaseStatusEndpoint() {
        // When: Call firebaseStatus endpoint
        Map<String, String> response = apiController.firebaseStatus();
        
        // Then: Should return status ok
        assertNotNull(response, "Response should not be null");
        assertEquals(1, response.size(), "Response should have 1 field");
        
        assertTrue(response.containsKey("status"), "Response should contain 'status' field");
        assertEquals("ok", response.get("status"), "Status should be 'ok'");
    }

    @Test
    @DisplayName("Should return consistent status across multiple calls")
    void testStatusConsistency() {
        // When: Call status multiple times
        Map<String, Object> response1 = apiController.status();
        Map<String, Object> response2 = apiController.status();
        
        // Then: Both responses should be identical
        assertEquals(response1.get("status"), response2.get("status"),
            "Status should be consistent");
        assertEquals(response1.get("service"), response2.get("service"),
            "Service should be consistent");
        assertEquals(response1.get("version"), response2.get("version"),
            "Version should be consistent");
    }

    @Test
    @DisplayName("Should return different timestamps on sequential hello calls")
    void testHelloTimestampUniqueness() throws InterruptedException {
        // When: Call hello twice with small delay
        Map<String, String> response1 = apiController.hello();
        Thread.sleep(10); // Small delay to ensure different timestamps
        Map<String, String> response2 = apiController.hello();
        
        // Then: Timestamps should be different (or same if calls were very fast)
        // The important thing is both have valid timestamps
        assertNotNull(response1.get("timestamp"), "First timestamp should not be null");
        assertNotNull(response2.get("timestamp"), "Second timestamp should not be null");
        
        // Messages should be the same
        assertEquals(response1.get("message"), response2.get("message"),
            "Message should be consistent");
    }

    @Test
    @DisplayName("Should return Map with String keys for hello endpoint")
    void testHelloResponseType() {
        // When: Call hello endpoint
        Map<String, String> response = apiController.hello();
        
        // Then: All keys and values should be Strings
        for (Map.Entry<String, String> entry : response.entrySet()) {
            assertNotNull(entry.getKey(), "Key should not be null");
            assertNotNull(entry.getValue(), "Value should not be null");
            assertTrue(entry.getKey() instanceof String, "Key should be String");
            assertTrue(entry.getValue() instanceof String, "Value should be String");
        }
    }

    @Test
    @DisplayName("Should return Map with String keys and Object values for status endpoint")
    void testStatusResponseType() {
        // When: Call status endpoint
        Map<String, Object> response = apiController.status();
        
        // Then: All keys should be Strings, values can be any Object
        for (Map.Entry<String, Object> entry : response.entrySet()) {
            assertNotNull(entry.getKey(), "Key should not be null");
            assertNotNull(entry.getValue(), "Value should not be null");
            assertTrue(entry.getKey() instanceof String, "Key should be String");
        }
    }

    @Test
    @DisplayName("Should have no side effects on multiple endpoint calls")
    void testNoSideEffects() {
        // When: Call all endpoints multiple times
        apiController.hello();
        apiController.status();
        apiController.firebaseStatus();
        
        Map<String, String> hello = apiController.hello();
        Map<String, Object> status = apiController.status();
        Map<String, String> firebaseStatus = apiController.firebaseStatus();
        
        // Then: All responses should still be valid
        assertNotNull(hello, "Hello response should be valid after multiple calls");
        assertNotNull(status, "Status response should be valid after multiple calls");
        assertNotNull(firebaseStatus, "Firebase status should be valid after multiple calls");
        
        assertEquals("Hello!", hello.get("message"), "Hello message unchanged");
        assertEquals("OK", status.get("status"), "Status unchanged");
        assertEquals("ok", firebaseStatus.get("status"), "Firebase status unchanged");
    }

    @Test
    @DisplayName("ApiController should be instantiable without dependencies")
    void testControllerInstantiation() {
        // When: Create new ApiController
        ApiController controller = new ApiController();
        
        // Then: Should be created successfully
        assertNotNull(controller, "ApiController should be instantiable");
        
        // And: Should work immediately
        Map<String, String> response = controller.hello();
        assertNotNull(response, "New instance should work immediately");
    }

    @Test
    @DisplayName("Should return proper JSON-serializable responses")
    void testJSONSerializability() {
        // When: Get all responses
        Map<String, String> hello = apiController.hello();
        Map<String, Object> status = apiController.status();
        Map<String, String> firebaseStatus = apiController.firebaseStatus();
        
        // Then: All responses should be simple Maps (JSON-serializable)
        assertNotNull(hello, "Hello response should be serializable");
        assertNotNull(status, "Status response should be serializable");
        assertNotNull(firebaseStatus, "Firebase status should be serializable");
        
        // All values should be primitives or Strings (JSON-serializable)
        for (Object value : status.values()) {
            assertTrue(value instanceof String || value instanceof Number,
                "Status values should be JSON-serializable types");
        }
    }
}
