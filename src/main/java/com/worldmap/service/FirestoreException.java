package com.worldmap.service;

/**
 * Custom exception for Firestore-related errors
 */
public class FirestoreException extends RuntimeException {

    public FirestoreException(String message) {
        super(message);
    }

    public FirestoreException(String message, Throwable cause) {
        super(message, cause);
    }
}
