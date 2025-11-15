package com.worldmap.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Generic Firestore service for common database operations.
 * Provides type-safe CRUD operations that can be reused across different flashcard types.
 *
 * This service handles:
 * - Common Firestore CRUD operations (create, read, update, delete, query)
 * - Type-safe document conversion utilities
 * - Firestore connection and error management
 * - Pagination and filtering
 *
 * The service gracefully handles cases where Firebase is not configured,
 * allowing the application to continue with mock data.
 */
@Singleton
public class FirestoreService {

    private static final Logger logger = LoggerFactory.getLogger(FirestoreService.class);
    private final Firestore firestore;

    /**
     * Constructor with dependency injection.
     * Accepts nullable Firestore to handle cases where Firebase is not configured.
     *
     * @param firestore Firestore instance (can be null if Firebase not configured)
     */
    @Inject
    public FirestoreService(@Nullable Firestore firestore) {
        this.firestore = firestore;

        if (firestore == null) {
            logger.warn("⚠️  Firestore is not configured. Service will throw exceptions on operations.");
            logger.warn("   Configure Firebase credentials to enable Firestore functionality.");
        } else {
            logger.info("✅ FirestoreService initialized successfully with active Firestore connection.");
        }
    }

    /**
     * Checks if Firestore is connected and available.
     *
     * @return true if Firestore is initialized and connected, false otherwise
     */
    public boolean isConnected() {
        if (firestore == null) {
            logger.debug("Firestore connection check: Not connected (null instance)");
            return false;
        }

        try {
            // Attempt to get a collection reference as a simple connectivity check
            // This doesn't make a network call but verifies the Firestore instance is valid
            firestore.collection("_connection_test");
            logger.debug("Firestore connection check: Connected");
            return true;
        } catch (Exception e) {
            logger.error("Firestore connection check failed: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Validates that Firestore is connected before performing operations.
     *
     * @throws FirestoreException if Firestore is not connected
     */
    private void validateConnection() {
        if (firestore == null) {
            throw new FirestoreException(
                "Firestore is not configured. Please configure Firebase credentials in application.properties"
            );
        }
    }

    /**
     * Validates that a parameter is not null.
     *
     * @param param Parameter to validate
     * @param paramName Name of the parameter for error message
     * @throws IllegalArgumentException if parameter is null
     */
    private void validateParameters(Object param, String paramName) {
        if (param == null) {
            throw new IllegalArgumentException(paramName + " cannot be null");
        }
    }

    /**
     * Creates a new document in the specified collection.
     *
     * @param collection Collection name
     * @param docId Document ID
     * @param data Document data as a map
     * @param type Class type for the result
     * @param <T> Type of the result object
     * @return The created document converted to type T
     * @throws FirestoreException if creation fails or Firestore is not connected
     * @throws IllegalArgumentException if any parameter is null
     */
    @SuppressWarnings("null")
    public <T> T create(String collection, String docId, Map<String, Object> data, Class<T> type) {
        validateConnection();
        validateParameters(collection, "collection");
        validateParameters(docId, "docId");
        validateParameters(data, "data");
        validateParameters(type, "type");

        try {
            logger.info("Creating document in collection '{}' with ID '{}'", collection, docId);

            DocumentReference docRef = firestore.collection(collection).document(docId);
            ApiFuture<WriteResult> future = docRef.set(data);

            // Wait for the operation to complete
            WriteResult result = future.get();
            logger.info("Document created successfully at {}", result.getUpdateTime());

            // Retrieve the created document
            return get(collection, docId, type);

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Document creation interrupted for collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Document creation was interrupted", e);
        } catch (ExecutionException e) {
            logger.error("Failed to create document in collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Failed to create document: " + e.getMessage(), e);
        }
    }

    /**
     * Retrieves a single document by ID.
     *
     * @param collection Collection name
     * @param docId Document ID
     * @param type Class type for the result
     * @param <T> Type of the result object
     * @return The document converted to type T, or null if not found
     * @throws FirestoreException if retrieval fails or Firestore is not connected
     * @throws IllegalArgumentException if any parameter is null
     */
    @SuppressWarnings("null")
    public <T> T get(String collection, String docId, Class<T> type) {
        validateConnection();
        validateParameters(collection, "collection");
        validateParameters(docId, "docId");
        validateParameters(type, "type");

        try {
            logger.debug("Retrieving document from collection '{}' with ID '{}'", collection, docId);

            DocumentReference docRef = firestore.collection(collection).document(docId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if (!document.exists()) {
                logger.debug("Document not found: collection '{}', ID '{}'", collection, docId);
                return null;
            }

            T result = document.toObject(type);
            logger.debug("Document retrieved successfully from collection '{}'", collection);
            return result;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Document retrieval interrupted for collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Document retrieval was interrupted", e);
        } catch (ExecutionException e) {
            logger.error("Failed to retrieve document from collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Failed to retrieve document: " + e.getMessage(), e);
        }
    }

    /**
     * Retrieves all documents from a collection with pagination.
     *
     * @param collection Collection name
     * @param page Page number (0-based)
     * @param pageSize Number of items per page
     * @param type Class type for the result objects
     * @param <T> Type of the result objects
     * @return List of documents converted to type T
     * @throws FirestoreException if retrieval fails or Firestore is not connected
     * @throws IllegalArgumentException if any parameter is null
     */
    @SuppressWarnings("null")
    public <T> List<T> getAll(String collection, int page, int pageSize, Class<T> type) {
        validateConnection();
        validateParameters(collection, "collection");
        validateParameters(type, "type");

        try {
            logger.info("Retrieving all documents from collection '{}' (page: {}, size: {})",
                       collection, page, pageSize);

            // Calculate offset
            int offset = page * pageSize;

            // Query with pagination
            Query query = firestore.collection(collection)
                .offset(offset)
                .limit(pageSize);

            ApiFuture<QuerySnapshot> future = query.get();
            QuerySnapshot querySnapshot = future.get();

            List<T> results = new ArrayList<>();
            for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                T item = document.toObject(type);
                if (item != null) {
                    results.add(item);
                }
            }

            logger.info("Retrieved {} documents from collection '{}'", results.size(), collection);
            return results;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Document retrieval interrupted for collection '{}'", collection, e);
            throw new FirestoreException("Document retrieval was interrupted", e);
        } catch (ExecutionException e) {
            logger.error("Failed to retrieve documents from collection '{}'", collection, e);
            throw new FirestoreException("Failed to retrieve documents: " + e.getMessage(), e);
        }
    }

    /**
     * Updates an existing document.
     *
     * @param collection Collection name
     * @param docId Document ID
     * @param data Updated document data
     * @param type Class type for the result
     * @param <T> Type of the result object
     * @return The updated document converted to type T
     * @throws FirestoreException if update fails or Firestore is not connected
     * @throws IllegalArgumentException if any parameter is null
     */
    @SuppressWarnings("null")
    public <T> T update(String collection, String docId, Map<String, Object> data, Class<T> type) {
        validateConnection();
        validateParameters(collection, "collection");
        validateParameters(docId, "docId");
        validateParameters(data, "data");
        validateParameters(type, "type");

        try {
            logger.info("Updating document in collection '{}' with ID '{}'", collection, docId);

            // Check if document exists
            if (!exists(collection, docId)) {
                logger.warn("Cannot update non-existent document: collection '{}', ID '{}'", collection, docId);
                throw new FirestoreException("Document not found: " + docId);
            }

            DocumentReference docRef = firestore.collection(collection).document(docId);
            ApiFuture<WriteResult> future = docRef.update(data);

            WriteResult result = future.get();
            logger.info("Document updated successfully at {}", result.getUpdateTime());

            // Retrieve the updated document
            return get(collection, docId, type);

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Document update interrupted for collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Document update was interrupted", e);
        } catch (ExecutionException e) {
            logger.error("Failed to update document in collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Failed to update document: " + e.getMessage(), e);
        }
    }

    /**
     * Deletes a document from a collection.
     *
     * @param collection Collection name
     * @param docId Document ID
     * @throws FirestoreException if deletion fails or Firestore is not connected
     * @throws IllegalArgumentException if any parameter is null
     */
    @SuppressWarnings("null")
    public void delete(String collection, String docId) {
        validateConnection();
        validateParameters(collection, "collection");
        validateParameters(docId, "docId");

        try {
            logger.info("Deleting document from collection '{}' with ID '{}'", collection, docId);

            DocumentReference docRef = firestore.collection(collection).document(docId);
            ApiFuture<WriteResult> future = docRef.delete();

            WriteResult result = future.get();
            logger.info("Document deleted successfully at {}", result.getUpdateTime());

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Document deletion interrupted for collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Document deletion was interrupted", e);
        } catch (ExecutionException e) {
            logger.error("Failed to delete document from collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Failed to delete document: " + e.getMessage(), e);
        }
    }

    /**
     * Counts the total number of documents in a collection.
     *
     * @param collection Collection name
     * @return Total number of documents
     * @throws FirestoreException if count fails or Firestore is not connected
     * @throws IllegalArgumentException if collection is null
     */
    @SuppressWarnings("null")
    public long count(String collection) {
        validateConnection();
        validateParameters(collection, "collection");

        try {
            logger.debug("Counting documents in collection '{}'", collection);

            // Note: Firestore doesn't have a native count operation, so we need to fetch all documents
            // For production use with large collections, consider using aggregation queries
            // or maintaining a separate counter document
            ApiFuture<QuerySnapshot> future = firestore.collection(collection).get();
            QuerySnapshot querySnapshot = future.get();

            long count = querySnapshot.size();
            logger.debug("Collection '{}' contains {} documents", collection, count);
            return count;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Document count interrupted for collection '{}'", collection, e);
            throw new FirestoreException("Document count was interrupted", e);
        } catch (ExecutionException e) {
            logger.error("Failed to count documents in collection '{}'", collection, e);
            throw new FirestoreException("Failed to count documents: " + e.getMessage(), e);
        }
    }

    /**
     * Checks if a document exists in a collection.
     *
     * @param collection Collection name
     * @param docId Document ID
     * @return true if the document exists, false otherwise
     * @throws FirestoreException if check fails or Firestore is not connected
     * @throws IllegalArgumentException if any parameter is null
     */
    @SuppressWarnings("null")
    public boolean exists(String collection, String docId) {
        validateConnection();
        validateParameters(collection, "collection");
        validateParameters(docId, "docId");

        try {
            logger.debug("Checking if document exists: collection '{}', ID '{}'", collection, docId);

            DocumentReference docRef = firestore.collection(collection).document(docId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            boolean exists = document.exists();
            logger.debug("Document existence check: collection '{}', ID '{}', exists: {}",
                        collection, docId, exists);
            return exists;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Document existence check interrupted for collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Document existence check was interrupted", e);
        } catch (ExecutionException e) {
            logger.error("Failed to check document existence for collection '{}', ID '{}'", collection, docId, e);
            throw new FirestoreException("Failed to check document existence: " + e.getMessage(), e);
        }
    }
}
