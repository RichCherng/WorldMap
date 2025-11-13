package com.worldmap.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.worldmap.model.ChineseFlashCard;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.annotation.Nullable;
import java.util.*;
import java.util.concurrent.ExecutionException;

/**
 * JAX-RS REST controller for Chinese Flash Cards
 */
@Path("/flashcards/chinese")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Singleton
@Tag(name = "Chinese Flash Cards", description = "API for managing Chinese language flash cards")
public class ChineseFlashCardController {

    private static final String COLLECTION_NAME = "chinese_flash_cards";
    private final Firestore firestore;

    @Inject
    public ChineseFlashCardController(@Nullable Firestore firestore) {
        this.firestore = firestore;
        
        if (firestore != null) {
            System.out.println("✅ ChineseFlashCardController initialized with Firestore via Guice injection");
            // Initialize with sample data if collection is empty
            try {
                initializeSampleDataIfNeeded();
            } catch (Exception e) {
                System.err.println("Failed to initialize sample data: " + e.getMessage());
            }
        } else {
            System.out.println("⚠️  ChineseFlashCardController initialized with null Firestore (will use mock data)");
        }
    }

    private void initializeSampleDataIfNeeded() throws ExecutionException, InterruptedException {
        // Check if collection is empty
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).limit(1).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        
        if (documents.isEmpty()) {
            // Add sample data
            List<ChineseFlashCard> sampleCards = Arrays.asList(
                new ChineseFlashCard(1, "你好", "Hello", "nǐ hǎo", "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400"),
                new ChineseFlashCard(2, "谢谢", "Thank you", "xiè xiè", "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400"),
                new ChineseFlashCard(3, "再见", "Goodbye", "zài jiàn", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"),
                new ChineseFlashCard(4, "水", "Water", "shuǐ", "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400"),
                new ChineseFlashCard(5, "食物", "Food", "shí wù", "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400"),
                new ChineseFlashCard(6, "学习", "Study", "xué xí", "https://images.unomath.com/photo-1434030216411-0b793f4b4173?w=400"),
                new ChineseFlashCard(7, "朋友", "Friend", "péng yǒu", "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=400"),
                new ChineseFlashCard(8, "家", "Home", "jiā", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400")
            );
            
            for (ChineseFlashCard card : sampleCards) {
                firestore.collection(COLLECTION_NAME).document(String.valueOf(card.getId())).set(card);
            }
            System.out.println("Initialized Firestore with sample Chinese flash cards");
        }
    }

    /**
     * GET /flashcards/chinese - Get all Chinese cards
     */
    @GET
    @Operation(summary = "Get all Chinese flash cards", description = "Retrieves all Chinese flash cards with optional pagination")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved cards"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public Map<String, Object> getAllCards(
            @QueryParam("page") @DefaultValue("1") @Parameter(description = "Page number (default: 1)") int page,
            @QueryParam("pageSize") @DefaultValue("50") @Parameter(description = "Page size (default: 50)") int pageSize) {

        Map<String, Object> response = new HashMap<>();

        if (firestore == null) {
            // Return mock data when Firebase is not configured
            List<ChineseFlashCard> mockCards = getMockCards();
            response.put("success", true);
            response.put("data", mockCards);
            response.put("totalCount", mockCards.size());
            response.put("message", "Chinese cards retrieved successfully (mock data)");
        } else {
            try {
                ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
                List<QueryDocumentSnapshot> documents = future.get().getDocuments();

                List<ChineseFlashCard> cards = new ArrayList<>();
                for (QueryDocumentSnapshot document : documents) {
                    cards.add(document.toObject(ChineseFlashCard.class));
                }

                response.put("success", true);
                response.put("data", cards);
                response.put("totalCount", cards.size());
                response.put("message", "Chinese cards retrieved successfully");
            } catch (ExecutionException | InterruptedException e) {
                response.put("success", false);
                response.put("error", "Failed to retrieve cards: " + e.getMessage());
                response.put("data", new ArrayList<>());
                response.put("totalCount", 0);
            }
        }

        return response;
    }

    /**
     * GET /flashcards/chinese/{id} - Get a single Chinese card by ID
     */
    @GET
    @Path("/{id}")
    @Operation(summary = "Get a single Chinese flash card", description = "Retrieves a specific flash card by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the card"),
            @ApiResponse(responseCode = "404", description = "Card not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public Map<String, Object> getCardById(@PathParam("id") @Parameter(description = "Card ID") long id) {
        Map<String, Object> response = new HashMap<>();

        if (firestore == null) {
            // Return mock data
            ChineseFlashCard card = getMockCards().stream()
                    .filter(c -> c.getId() == id)
                    .findFirst()
                    .orElse(null);

            if (card != null) {
                response.put("success", true);
                response.put("data", card);
                response.put("message", "Card retrieved successfully (mock data)");
            } else {
                response.put("success", false);
                response.put("error", "Card not found with id: " + id);
            }
        } else {
            try {
                DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(String.valueOf(id));
                ApiFuture<DocumentSnapshot> future = docRef.get();
                DocumentSnapshot document = future.get();

                if (document.exists()) {
                    ChineseFlashCard card = document.toObject(ChineseFlashCard.class);
                    response.put("success", true);
                    response.put("data", card);
                    response.put("message", "Card retrieved successfully");
                } else {
                    response.put("success", false);
                    response.put("error", "Card not found with id: " + id);
                }
            } catch (ExecutionException | InterruptedException e) {
                response.put("success", false);
                response.put("error", "Failed to retrieve card: " + e.getMessage());
            }
        }

        return response;
    }

    /**
     * POST /flashcards/chinese - Create a new Chinese card
     */
    @POST
    @Operation(summary = "Create a new Chinese flash card", description = "Creates a new flash card with Chinese word, English translation, and Pinyin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Card created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request body"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public Map<String, Object> createCard(@Parameter(description = "Card data containing chineseWord, englishWord, pinyin, and img") Map<String, String> cardData) {
        Map<String, Object> response = new HashMap<>();

        try {
            String chineseWord = cardData.get("chineseWord");
            String englishWord = cardData.get("englishWord");
            String pinyin = cardData.get("pinyin");
            String img = cardData.get("img");

            // Validate required fields
            if (chineseWord == null || englishWord == null || pinyin == null) {
                response.put("success", false);
                response.put("error", "Missing required fields: chineseWord, englishWord, and pinyin are required");
                return response;
            }

            long newId = System.currentTimeMillis();
            ChineseFlashCard newCard = new ChineseFlashCard(newId, chineseWord, englishWord, pinyin, img);

            if (firestore == null) {
                // Mock response
                response.put("success", true);
                response.put("data", newCard);
                response.put("message", "Card created successfully (mock data)");
            } else {
                firestore.collection(COLLECTION_NAME).document(String.valueOf(newId)).set(newCard);
                response.put("success", true);
                response.put("data", newCard);
                response.put("message", "Card created successfully");
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Failed to create card: " + e.getMessage());
        }

        return response;
    }

    /**
     * PUT /flashcards/chinese/{id} - Update an existing Chinese card
     */
    @PUT
    @Path("/{id}")
    @Operation(summary = "Update a Chinese flash card", description = "Updates an existing flash card with new information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Card updated successfully"),
            @ApiResponse(responseCode = "404", description = "Card not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public Map<String, Object> updateCard(@PathParam("id") @Parameter(description = "Card ID") long id, @Parameter(description = "Updated card data") Map<String, String> cardData) {
        Map<String, Object> response = new HashMap<>();

        try {
            String chineseWord = cardData.get("chineseWord");
            String englishWord = cardData.get("englishWord");
            String pinyin = cardData.get("pinyin");
            String img = cardData.get("img");

            ChineseFlashCard updatedCard = new ChineseFlashCard(id, chineseWord, englishWord, pinyin, img);

            if (firestore == null) {
                // Mock response
                response.put("success", true);
                response.put("data", updatedCard);
                response.put("message", "Card updated successfully (mock data)");
            } else {
                DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(String.valueOf(id));
                ApiFuture<DocumentSnapshot> future = docRef.get();
                DocumentSnapshot document = future.get();

                if (document.exists()) {
                    docRef.set(updatedCard);
                    response.put("success", true);
                    response.put("data", updatedCard);
                    response.put("message", "Card updated successfully");
                } else {
                    response.put("success", false);
                    response.put("error", "Card not found with id: " + id);
                }
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Failed to update card: " + e.getMessage());
        }

        return response;
    }

    /**
     * DELETE /flashcards/chinese/{id} - Delete a Chinese card
     */
    @DELETE
    @Path("/{id}")
    @Operation(summary = "Delete a Chinese flash card", description = "Deletes a flash card by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Card deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Card not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public Map<String, Object> deleteCard(@PathParam("id") @Parameter(description = "Card ID") long id) {
        Map<String, Object> response = new HashMap<>();

        if (firestore == null) {
            // Mock response
            response.put("success", true);
            response.put("message", "Card deleted successfully (mock data)");
        } else {
            try {
                DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(String.valueOf(id));
                ApiFuture<DocumentSnapshot> future = docRef.get();
                DocumentSnapshot document = future.get();

                if (document.exists()) {
                    docRef.delete();
                    response.put("success", true);
                    response.put("message", "Card deleted successfully");
                } else {
                    response.put("success", false);
                    response.put("error", "Card not found with id: " + id);
                }
            } catch (ExecutionException | InterruptedException e) {
                response.put("success", false);
                response.put("error", "Failed to delete card: " + e.getMessage());
            }
        }

        return response;
    }

    /**
     * GET /flashcards/chinese/initialize - Initialize Firebase with default data if empty
     * 
     * Checks if Firebase collection has data. If empty, populates it with default flash cards.
     * This endpoint is idempotent - safe to call multiple times.
     */
    @GET
    @Path("/initialize")
    @Operation(summary = "Initialize Firebase with default Chinese flash cards", description = "Checks if Firebase has data and populates with default cards if empty")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Firebase checked/initialized successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error or Firebase not configured")
    })
    public Map<String, Object> initializeData() {
        Map<String, Object> response = new HashMap<>();

        if (firestore == null) {
            response.put("success", false);
            response.put("error", "Firebase/Firestore is not configured");
            response.put("message", "Cannot initialize data without Firebase connection");
            return response;
        }

        try {
            // Check if data already exists
            ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).limit(1).get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (!documents.isEmpty()) {
                // Data already exists, return existing count
                ApiFuture<QuerySnapshot> allFuture = firestore.collection(COLLECTION_NAME).get();
                int existingCount = allFuture.get().getDocuments().size();

                response.put("success", true);
                response.put("message", "Data already exists in Firebase");
                response.put("existingCount", existingCount);
                response.put("initialized", false);
                return response;
            }

            // No data exists, populate with mock/default data
            List<ChineseFlashCard> defaultCards = getDefaultCards();
            int successCount = 0;
            int failCount = 0;
            List<String> errors = new ArrayList<>();

            for (ChineseFlashCard card : defaultCards) {
                try {
                    firestore.collection(COLLECTION_NAME)
                            .document(String.valueOf(card.getId()))
                            .set(card)
                            .get(); // Wait for completion
                    successCount++;
                } catch (Exception e) {
                    failCount++;
                    errors.add("Failed to add card " + card.getId() + ": " + e.getMessage());
                    System.err.println("Error adding card " + card.getId() + ": " + e.getMessage());
                }
            }

            response.put("success", true);
            response.put("message", "Firebase initialized with default Chinese flashcard data");
            response.put("initialized", true);
            response.put("cardsAdded", successCount);
            response.put("cardsFailed", failCount);
            if (!errors.isEmpty()) {
                response.put("errors", errors);
            }

            System.out.println("✅ Firebase initialized with " + successCount + " Chinese flashcards");

        } catch (ExecutionException | InterruptedException e) {
            response.put("success", false);
            response.put("error", "Failed to initialize Firebase: " + e.getMessage());
            System.err.println("❌ Firebase initialization failed: " + e.getMessage());
        }

        return response;
    }

    /**
     * Helper method to get default Chinese cards data for initialization
     */
    private List<ChineseFlashCard> getDefaultCards() {
        return Arrays.asList(
            new ChineseFlashCard(1, "你好", "Hello", "Nǐ hǎo", "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400"),
            new ChineseFlashCard(2, "谢谢", "Thank you", "Xiè xiè", "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400"),
            new ChineseFlashCard(3, "再见", "Goodbye", "Zài jiàn", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"),
            new ChineseFlashCard(4, "水", "Water", "Shuǐ", "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400"),
            new ChineseFlashCard(5, "食物", "Food", "Shí wù", "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400"),
            new ChineseFlashCard(6, "学习", "Study", "Xué xí", "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400"),
            new ChineseFlashCard(7, "朋友", "Friend", "Péng yǒu", "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=400"),
            new ChineseFlashCard(8, "家", "Home", "Jiā", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400"),
            new ChineseFlashCard(9, "学校", "School", "Xué xiào", "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400"),
            new ChineseFlashCard(10, "书", "Book", "Shū", "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400"),
            new ChineseFlashCard(11, "电脑", "Computer", "Diàn nǎo", "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400"),
            new ChineseFlashCard(12, "爱", "Love", "Ài", "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400"),
            new ChineseFlashCard(13, "时间", "Time", "Shí jiān", "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400"),
            new ChineseFlashCard(14, "工作", "Work", "Gōng zuò", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400"),
            new ChineseFlashCard(15, "钱", "Money", "Qián", "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400")
        );
    }

    /**
     * Helper method to get mock Chinese cards data (for when Firebase is not configured)
     */
    private List<ChineseFlashCard> getMockCards() {
        return getDefaultCards(); // Reuse the same default data
    }

}