package com.worldmap.controller;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.worldmap.config.ApplicationConfig;
import com.worldmap.guice.GuiceInjectorFactory;
import com.worldmap.model.ChineseFlashCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.concurrent.ExecutionException;

// @RestController
// @RequestMapping("/api/flashcards/chinese")
// @CrossOrigin(origins = "*")
public class ChineseFlashCardController {

    // private static final String COLLECTION_NAME = "chinese_flash_cards";
    // private Firestore firestore;

    // @Autowired
    // private ApplicationConfig applicationConfig;

    // @PostConstruct
    // public void initialize() {
    //     try {
    //         // Initialize Guice after Spring context is ready
    //         this.firestore = GuiceInjectorFactory.getInstance(Firestore.class);
            
    //         // Initialize with sample data if collection is empty
    //         initializeSampleDataIfNeeded();
    //     } catch (Exception e) {
    //         System.err.println("Failed to initialize Firestore or sample data: " + e.getMessage());
    //         e.printStackTrace();
    //     }
    // }

    // private void initializeSampleDataIfNeeded() throws ExecutionException, InterruptedException {
    //     // Check if collection is empty
    //     ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).limit(1).get();
    //     List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        
    //     if (documents.isEmpty()) {
    //         // Add sample data
    //         List<ChineseFlashCard> sampleCards = Arrays.asList(
    //             new ChineseFlashCard(1, "你好", "Hello", "nǐ hǎo", "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400"),
    //             new ChineseFlashCard(2, "谢谢", "Thank you", "xiè xiè", "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400"),
    //             new ChineseFlashCard(3, "再见", "Goodbye", "zài jiàn", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"),
    //             new ChineseFlashCard(4, "水", "Water", "shuǐ", "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400"),
    //             new ChineseFlashCard(5, "食物", "Food", "shí wù", "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400"),
    //             new ChineseFlashCard(6, "学习", "Study", "xué xí", "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400"),
    //             new ChineseFlashCard(7, "朋友", "Friend", "péng yǒu", "https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?w=400"),
    //             new ChineseFlashCard(8, "家", "Home", "jiā", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400")
    //         );
            
    //         for (ChineseFlashCard card : sampleCards) {
    //             firestore.collection(COLLECTION_NAME).document(String.valueOf(card.getId())).set(card);
    //         }
    //         System.out.println("Initialized Firestore with sample Chinese flash cards");
    //     }
    // }

    // @GetMapping
    // public Map<String, Object> getAllCards() {
    //     Map<String, Object> response = new HashMap<>();
    //     try {
    //         ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
    //         List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            
    //         List<ChineseFlashCard> cards = new ArrayList<>();
    //         for (QueryDocumentSnapshot document : documents) {
    //             cards.add(document.toObject(ChineseFlashCard.class));
    //         }
            
    //         response.put("cards", cards);
    //         response.put("total", cards.size());
    //         response.put("success", true);
    //         response.put("source", "Guice + Firestore");
    //     } catch (ExecutionException | InterruptedException e) {
    //         response.put("error", "Failed to retrieve cards: " + e.getMessage());
    //         response.put("success", false);
    //     }
    //     response.put("timestamp", java.time.LocalDateTime.now().toString());
    //     return response;
    // }

    // @GetMapping("/{id}")
    // public Map<String, Object> getCardById(@PathVariable int id) {
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

    // @GetMapping("/random")
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

    // @GetMapping("/random/{count}")
    // public Map<String, Object> getRandomCards(@PathVariable int count) {
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

    // @PostMapping
    // public Map<String, Object> createCard(@RequestBody ChineseFlashCard newCard) {
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

    // @PutMapping("/{id}")
    // public Map<String, Object> updateCard(@PathVariable int id, @RequestBody ChineseFlashCard updatedCard) {
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

    // @DeleteMapping("/{id}")
    // public Map<String, Object> deleteCard(@PathVariable int id) {
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