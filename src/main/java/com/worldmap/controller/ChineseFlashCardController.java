package com.worldmap.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.worldmap.model.ChineseFlashCard;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.*;
import java.util.concurrent.ExecutionException;

/**
 * JAX-RS REST controller for Chinese Flash Cards
 */
@Path("/flashcards/chinese")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Singleton
public class ChineseFlashCardController {

    private static final String COLLECTION_NAME = "chinese_flash_cards";
    private final Firestore firestore;

    // Default constructor for Jersey (HK2) when Guice bridge is not fully active
    public ChineseFlashCardController() {
        this.firestore = null;
        System.out.println("⚠️  ChineseFlashCardController created by Jersey with default constructor (Firestore=null)");
        System.out.println("   📝 Will use mock data until full Jersey-Guice bridge is implemented");
    }

    @Inject
    public ChineseFlashCardController(Firestore firestore) {
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

    @GET
    public Map<String, Object> getAllCards() {
        Map<String, Object> response = new HashMap<>();
        
        if (firestore == null) {
            // Return mock data when Firebase is not configured
            List<Map<String, Object>> mockCards = Arrays.asList(
                createMockCard(1, "你好", "Hello", "nǐ hǎo"),
                createMockCard(2, "谢谢", "Thank you", "xiè xiè"),
                createMockCard(3, "再见", "Goodbye", "zài jiàn"),
                createMockCard(4, "水", "Water", "shuǐ"),
                createMockCard(5, "食物", "Food", "shí wù")
            );
            response.put("cards", mockCards);
            response.put("total", mockCards.size());
            response.put("success", true);
            response.put("source", "Mock Data (Guice injection working, Firebase not configured)");
        } else {
            try {
                ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
                List<QueryDocumentSnapshot> documents = future.get().getDocuments();
                
                List<ChineseFlashCard> cards = new ArrayList<>();
                for (QueryDocumentSnapshot document : documents) {
                    cards.add(document.toObject(ChineseFlashCard.class));
                }
                
                response.put("cards", cards);
                response.put("total", cards.size());
                response.put("success", true);
                response.put("source", "Firestore (Guice injection working)");
            } catch (ExecutionException | InterruptedException e) {
                response.put("error", "Failed to retrieve cards: " + e.getMessage());
                response.put("success", false);
            }
        }
        
        response.put("timestamp", java.time.LocalDateTime.now().toString());
        return response;
    }
    
    private Map<String, Object> createMockCard(int id, String chinese, String english, String pinyin) {
        Map<String, Object> card = new HashMap<>();
        card.put("id", id);
        card.put("chinese", chinese);
        card.put("english", english);
        card.put("pinyin", pinyin);
        card.put("imageUrl", "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400");
        return card;
    }

    // @GET
    // @Path("/{id}")
    // public Map<String, Object> getCardById(@PathParam("id") int id) {
    //     Map<String, Object> response = new HashMap<>();
    //     try {
    //         DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(String.valueOf(id));
    //         ApiFuture<DocumentSnapshot> future = docRef.get();
    //         DocumentSnapshot document = future.get();
            
    //         if (document.exists()) {
    //             ChineseFlashCard card = document.toObject(ChineseFlashCard.class);
    //             response.put("card", card);
    //             response.put("success", true);
    //         } else {
    //             response.put("error", "Card not found");
    //             response.put("success", false);
    //         }
    //     } catch (ExecutionException | InterruptedException e) {
    //         response.put("error", "Failed to retrieve card: " + e.getMessage());
    //         response.put("success", false);
    //     }
    //     return response;
    // }

    // @GET
    // @Path("/random")
    // public Map<String, Object> getRandomCard() {
    //     Map<String, Object> response = new HashMap<>();
    //     try {
    //         ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
    //         List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            
    //         if (!documents.isEmpty()) {
    //             Random random = new Random();
    //             QueryDocumentSnapshot randomDoc = documents.get(random.nextInt(documents.size()));
    //             ChineseFlashCard randomCard = randomDoc.toObject(ChineseFlashCard.class);
    //             response.put("card", randomCard);
    //             response.put("success", true);
    //         } else {
    //             response.put("error", "No cards available");
    //             response.put("success", false);
    //         }
    //     } catch (ExecutionException | InterruptedException e) {
    //         response.put("error", "Failed to retrieve random card: " + e.getMessage());
    //         response.put("success", false);
    //     }
    //     return response;
    // }

    // @GET
    // @Path("/random/{count}")
    // public Map<String, Object> getRandomCards(@PathParam("count") int count) {
    //     Map<String, Object> response = new HashMap<>();
        
    //     if (count <= 0) {
    //         response.put("error", "Count must be greater than 0");
    //         response.put("success", false);
    //         return response;
    //     }
        
    //     try {
    //         ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
    //         List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            
    //         if (documents.isEmpty()) {
    //             response.put("error", "No cards available");
    //             response.put("success", false);
    //             return response;
    //         }
            
    //         List<ChineseFlashCard> allCards = new ArrayList<>();
    //         for (QueryDocumentSnapshot document : documents) {
    //             allCards.add(document.toObject(ChineseFlashCard.class));
    //         }
            
    //         Collections.shuffle(allCards);
    //         int actualCount = Math.min(count, allCards.size());
    //         List<ChineseFlashCard> randomCards = allCards.subList(0, actualCount);
            
    //         response.put("cards", randomCards);
    //         response.put("requested", count);
    //         response.put("actual", actualCount);
    //         response.put("success", true);
    //     } catch (ExecutionException | InterruptedException e) {
    //         response.put("error", "Failed to retrieve random cards: " + e.getMessage());
    //         response.put("success", false);
    //     }
    //     return response;
    // }

    // @POST
    // public Map<String, Object> createCard(ChineseFlashCard newCard) {
    //     Map<String, Object> response = new HashMap<>();
    //     try {
    //         // Generate new ID if not provided
    //         if (newCard.getId() == 0) {
    //             DocumentReference docRef = firestore.collection(COLLECTION_NAME).document();
    //             newCard.setId(Math.abs(docRef.getId().hashCode()));
    //         }
            
    //         firestore.collection(COLLECTION_NAME).document(String.valueOf(newCard.getId())).set(newCard);
            
    //         response.put("card", newCard);
    //         response.put("message", "Card created successfully");
    //         response.put("success", true);
    //     } catch (Exception e) {
    //         response.put("error", "Failed to create card: " + e.getMessage());
    //         response.put("success", false);
    //     }
    //     return response;
    // }

    // @PUT
    // @Path("/{id}")
    // public Map<String, Object> updateCard(@PathParam("id") int id, ChineseFlashCard updatedCard) {
    //     Map<String, Object> response = new HashMap<>();
    //     try {
    //         // Check if card exists
    //         DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(String.valueOf(id));
    //         ApiFuture<DocumentSnapshot> future = docRef.get();
    //         DocumentSnapshot document = future.get();
            
    //         if (!document.exists()) {
    //             response.put("error", "Card not found");
    //             response.put("success", false);
    //             return response;
    //         }
            
    //         updatedCard.setId(id);
    //         docRef.set(updatedCard, SetOptions.merge());
            
    //         response.put("card", updatedCard);
    //         response.put("message", "Card updated successfully");
    //         response.put("success", true);
    //     } catch (ExecutionException | InterruptedException e) {
    //         response.put("error", "Failed to update card: " + e.getMessage());
    //         response.put("success", false);
    //     }
    //     return response;
    // }

    // @DELETE
    // @Path("/{id}")
    // public Map<String, Object> deleteCard(@PathParam("id") int id) {
    //     Map<String, Object> response = new HashMap<>();
    //     try {
    //         DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(String.valueOf(id));
    //         ApiFuture<DocumentSnapshot> future = docRef.get();
    //         DocumentSnapshot document = future.get();
            
    //         if (!document.exists()) {
    //             response.put("error", "Card not found");
    //             response.put("success", false);
    //             return response;
    //         }
            
    //         docRef.delete();
    //         response.put("message", "Card deleted successfully");
    //         response.put("success", true);
    //     } catch (ExecutionException | InterruptedException e) {
    //         response.put("error", "Failed to delete card: " + e.getMessage());
    //         response.put("success", false);
    //     }
    //     return response;
    // }
}