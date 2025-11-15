package com.worldmap.service;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.worldmap.config.ApplicationConfig;
import com.worldmap.flashcard.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import java.util.*;

/**
 * Business logic service for Chinese Flash Card operations.
 * Handles validation, Firestore integration, and response building.
 *
 * This service:
 * - Validates flashcard data (required fields: chineseWord, englishWord, pinyin)
 * - Uses FirestoreService for all database operations
 * - Returns protobuf response objects
 * - Throws errors when Firestore is not available
 * - Generates unique IDs and timestamps
 */
@Singleton
public class ChineseFlashCardService {

    private static final Logger logger = LoggerFactory.getLogger(ChineseFlashCardService.class);
    private static final String COLLECTION_NAME = "chinese_flashcards";

    private final FirestoreService firestoreService;

    /**
     * Constructor with dependency injection.
     *
     * @param firestoreService Firestore service for database operations (can be null)
     * @param config Application configuration
     */
    @Inject
    public ChineseFlashCardService(@Nullable FirestoreService firestoreService, ApplicationConfig config) {
        this.firestoreService = firestoreService;

        if (firestoreService == null || !firestoreService.isConnected()) {
            logger.warn("⚠️  ChineseFlashCardService initialized without Firestore connection.");
        } else {
            logger.info("✅ ChineseFlashCardService initialized with Firestore connection.");
        }
    }

    /**
     * Creates a new Chinese flashcard.
     *
     * @param request CreateChineseFlashCardRequest containing flashcard data
     * @return CreateChineseFlashCardResponse with created flashcard or error
     */
    public CreateChineseFlashCardResponse create(CreateChineseFlashCardRequest request) {
        logger.info("Creating Chinese flashcard: {}", request.getChineseWord());

        // Validate required fields
        List<String> errors = validateFlashCardData(
            request.getChineseWord(),
            request.getEnglishWord(),
            request.getPinyin()
        );

        if (!errors.isEmpty()) {
            logger.warn("Validation failed: {}", String.join(", ", errors));
            return CreateChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Validation failed: " + String.join(", ", errors))
                .build();
        }

        // Check if Firestore is available
        if (firestoreService == null || !firestoreService.isConnected()) {
            logger.error("Cannot create flashcard: Firestore is not configured");
            return CreateChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Firestore is not configured. Please configure Firebase credentials.")
                .build();
        }

        try {
            // Generate unique ID and timestamps
            long id = System.currentTimeMillis();
            long now = System.currentTimeMillis();

            // Build flashcard object
            ChineseFlashCard flashcard = ChineseFlashCard.newBuilder()
                .setId(id)
                .setChineseWord(request.getChineseWord())
                .setEnglishWord(request.getEnglishWord())
                .setPinyin(request.getPinyin())
                .setImg(request.getImg())
                .setCreatedAt(now)
                .setUpdatedAt(now)
                .build();

            // Convert to Firestore document
            Map<String, Object> docData = toFirestoreDoc(flashcard);

            // Save to Firestore
            firestoreService.create(COLLECTION_NAME, String.valueOf(id), docData, Map.class);

            logger.info("Successfully created Chinese flashcard with ID: {}", id);

            return CreateChineseFlashCardResponse.newBuilder()
                .setSuccess(true)
                .setData(flashcard)
                .setMessage("Chinese flashcard created successfully")
                .build();

        } catch (Exception e) {
            logger.error("Failed to create Chinese flashcard", e);
            return CreateChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Failed to create flashcard: " + e.getMessage())
                .build();
        }
    }

    /**
     * Retrieves all Chinese flashcards with pagination.
     *
     * @param request GetChineseFlashCardsRequest with pagination parameters
     * @return GetChineseFlashCardsResponse with list of flashcards or error
     */
    public GetChineseFlashCardsResponse getAll(GetChineseFlashCardsRequest request) {
        int page = request.getPage() > 0 ? request.getPage() - 1 : 0; // Convert to 0-based
        int pageSize = request.getPageSize() > 0 ? request.getPageSize() : 50;

        logger.info("Getting all Chinese flashcards (page: {}, pageSize: {})", page + 1, pageSize);

        // Check if Firestore is available
        if (firestoreService == null || !firestoreService.isConnected()) {
            logger.error("Cannot retrieve flashcards: Firestore is not configured");
            return GetChineseFlashCardsResponse.newBuilder()
                .setSuccess(false)
                .setError("Firestore is not configured. Please configure Firebase credentials.")
                .build();
        }

        try {
            // Get paginated results from Firestore
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> docs = (List<Map<String, Object>>) (List<?>) firestoreService.getAll(COLLECTION_NAME, page, pageSize, Map.class);

            // Convert to protobuf objects
            List<ChineseFlashCard> flashcards = new ArrayList<>();
            for (Map<String, Object> doc : docs) {
                flashcards.add(fromFirestoreDoc(doc));
            }

            // Get total count
            long totalCount = firestoreService.count(COLLECTION_NAME);

            logger.info("Retrieved {} Chinese flashcards (total: {})", flashcards.size(), totalCount);

            return GetChineseFlashCardsResponse.newBuilder()
                .setSuccess(true)
                .addAllData(flashcards)
                .setTotalCount((int) totalCount)
                .setMessage("Chinese flashcards retrieved successfully")
                .build();

        } catch (Exception e) {
            logger.error("Failed to retrieve Chinese flashcards", e);
            return GetChineseFlashCardsResponse.newBuilder()
                .setSuccess(false)
                .setError("Failed to retrieve flashcards: " + e.getMessage())
                .build();
        }
    }

    /**
     * Retrieves a single Chinese flashcard by ID.
     *
     * @param request GetChineseFlashCardRequest with flashcard ID
     * @return GetChineseFlashCardResponse with flashcard or error
     */
    public GetChineseFlashCardResponse getById(GetChineseFlashCardRequest request) {
        long id = request.getId();
        logger.info("Getting Chinese flashcard by ID: {}", id);

        // Check if Firestore is available
        if (firestoreService == null || !firestoreService.isConnected()) {
            logger.error("Cannot retrieve flashcard: Firestore is not configured");
            return GetChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Firestore is not configured. Please configure Firebase credentials.")
                .build();
        }

        try {
            // Get from Firestore
            @SuppressWarnings("unchecked")
            Map<String, Object> doc = (Map<String, Object>) firestoreService.get(COLLECTION_NAME, String.valueOf(id), Map.class);

            if (doc == null) {
                logger.warn("Chinese flashcard not found: {}", id);
                return GetChineseFlashCardResponse.newBuilder()
                    .setSuccess(false)
                    .setError("Chinese flashcard not found with ID: " + id)
                    .build();
            }

            ChineseFlashCard flashcard = fromFirestoreDoc(doc);

            logger.info("Retrieved Chinese flashcard: {}", id);

            return GetChineseFlashCardResponse.newBuilder()
                .setSuccess(true)
                .setData(flashcard)
                .setMessage("Chinese flashcard retrieved successfully")
                .build();

        } catch (Exception e) {
            logger.error("Failed to retrieve Chinese flashcard: {}", id, e);
            return GetChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Failed to retrieve flashcard: " + e.getMessage())
                .build();
        }
    }

    /**
     * Updates an existing Chinese flashcard.
     *
     * @param request UpdateChineseFlashCardRequest with updated data
     * @return UpdateChineseFlashCardResponse with updated flashcard or error
     */
    public UpdateChineseFlashCardResponse update(UpdateChineseFlashCardRequest request) {
        long id = request.getId();
        logger.info("Updating Chinese flashcard: {}", id);

        // Validate required fields
        List<String> errors = validateFlashCardData(
            request.getChineseWord(),
            request.getEnglishWord(),
            request.getPinyin()
        );

        if (!errors.isEmpty()) {
            logger.warn("Validation failed: {}", String.join(", ", errors));
            return UpdateChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Validation failed: " + String.join(", ", errors))
                .build();
        }

        // Check if Firestore is available
        if (firestoreService == null || !firestoreService.isConnected()) {
            logger.error("Cannot update flashcard: Firestore is not configured");
            return UpdateChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Firestore is not configured. Please configure Firebase credentials.")
                .build();
        }

        try {
            // Check if flashcard exists
            if (!firestoreService.exists(COLLECTION_NAME, String.valueOf(id))) {
                logger.warn("Cannot update non-existent Chinese flashcard: {}", id);
                return UpdateChineseFlashCardResponse.newBuilder()
                    .setSuccess(false)
                    .setError("Chinese flashcard not found with ID: " + id)
                    .build();
            }

            // Get existing flashcard to preserve createdAt
            @SuppressWarnings("unchecked")
            Map<String, Object> existingDoc = (Map<String, Object>) firestoreService.get(COLLECTION_NAME, String.valueOf(id), Map.class);
            long createdAt = existingDoc != null && existingDoc.containsKey("createdAt")
                ? ((Number) existingDoc.get("createdAt")).longValue()
                : System.currentTimeMillis();

            // Build updated flashcard
            ChineseFlashCard flashcard = ChineseFlashCard.newBuilder()
                .setId(id)
                .setChineseWord(request.getChineseWord())
                .setEnglishWord(request.getEnglishWord())
                .setPinyin(request.getPinyin())
                .setImg(request.getImg())
                .setCreatedAt(createdAt)
                .setUpdatedAt(System.currentTimeMillis())
                .build();

            // Convert to Firestore document
            Map<String, Object> docData = toFirestoreDoc(flashcard);

            // Update in Firestore
            firestoreService.update(COLLECTION_NAME, String.valueOf(id), docData, Map.class);

            logger.info("Successfully updated Chinese flashcard: {}", id);

            return UpdateChineseFlashCardResponse.newBuilder()
                .setSuccess(true)
                .setData(flashcard)
                .setMessage("Chinese flashcard updated successfully")
                .build();

        } catch (Exception e) {
            logger.error("Failed to update Chinese flashcard: {}", id, e);
            return UpdateChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Failed to update flashcard: " + e.getMessage())
                .build();
        }
    }

    /**
     * Deletes a Chinese flashcard.
     *
     * @param request DeleteChineseFlashCardRequest with flashcard ID
     * @return DeleteChineseFlashCardResponse with success or error
     */
    public DeleteChineseFlashCardResponse delete(DeleteChineseFlashCardRequest request) {
        long id = request.getId();
        logger.info("Deleting Chinese flashcard: {}", id);

        // Check if Firestore is available
        if (firestoreService == null || !firestoreService.isConnected()) {
            logger.error("Cannot delete flashcard: Firestore is not configured");
            return DeleteChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Firestore is not configured. Please configure Firebase credentials.")
                .build();
        }

        try {
            // Check if flashcard exists
            if (!firestoreService.exists(COLLECTION_NAME, String.valueOf(id))) {
                logger.warn("Cannot delete non-existent Chinese flashcard: {}", id);
                return DeleteChineseFlashCardResponse.newBuilder()
                    .setSuccess(false)
                    .setError("Chinese flashcard not found with ID: " + id)
                    .build();
            }

            // Delete from Firestore
            firestoreService.delete(COLLECTION_NAME, String.valueOf(id));

            logger.info("Successfully deleted Chinese flashcard: {}", id);

            return DeleteChineseFlashCardResponse.newBuilder()
                .setSuccess(true)
                .setMessage("Chinese flashcard deleted successfully")
                .build();

        } catch (Exception e) {
            logger.error("Failed to delete Chinese flashcard: {}", id, e);
            return DeleteChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Failed to delete flashcard: " + e.getMessage())
                .build();
        }
    }

    // ========== Private Helper Methods ==========

    /**
     * Validates flashcard data.
     *
     * @return List of validation errors (empty if valid)
     */
    private List<String> validateFlashCardData(String chineseWord, String englishWord, String pinyin) {
        List<String> errors = new ArrayList<>();

        if (chineseWord == null || chineseWord.trim().isEmpty()) {
            errors.add("Chinese word is required");
        }

        if (englishWord == null || englishWord.trim().isEmpty()) {
            errors.add("English word is required");
        }

        if (pinyin == null || pinyin.trim().isEmpty()) {
            errors.add("Pinyin is required");
        }

        return errors;
    }

    /**
     * Converts a protobuf ChineseFlashCard to a Firestore document map.
     */
    private Map<String, Object> toFirestoreDoc(ChineseFlashCard flashcard) {
        Map<String, Object> doc = new HashMap<>();
        doc.put("id", flashcard.getId());
        doc.put("chineseWord", flashcard.getChineseWord());
        doc.put("englishWord", flashcard.getEnglishWord());
        doc.put("pinyin", flashcard.getPinyin());
        doc.put("img", flashcard.getImg());
        doc.put("createdAt", flashcard.getCreatedAt());
        doc.put("updatedAt", flashcard.getUpdatedAt());
        return doc;
    }

    /**
     * Converts a Firestore document map to a protobuf ChineseFlashCard.
     */
    private ChineseFlashCard fromFirestoreDoc(Map<String, Object> doc) {
        ChineseFlashCard.Builder builder = ChineseFlashCard.newBuilder();

        if (doc.containsKey("id")) {
            builder.setId(((Number) doc.get("id")).longValue());
        }
        if (doc.containsKey("chineseWord")) {
            builder.setChineseWord((String) doc.get("chineseWord"));
        }
        if (doc.containsKey("englishWord")) {
            builder.setEnglishWord((String) doc.get("englishWord"));
        }
        if (doc.containsKey("pinyin")) {
            builder.setPinyin((String) doc.get("pinyin"));
        }
        if (doc.containsKey("img")) {
            builder.setImg((String) doc.get("img"));
        }
        if (doc.containsKey("createdAt")) {
            builder.setCreatedAt(((Number) doc.get("createdAt")).longValue());
        }
        if (doc.containsKey("updatedAt")) {
            builder.setUpdatedAt(((Number) doc.get("updatedAt")).longValue());
        }

        return builder.build();
    }
}
