package com.worldmap.service;

import com.worldmap.config.ApplicationConfig;
import com.worldmap.flashcard.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for ChineseFlashCardService.
 *
 * Test Coverage:
 * - Create operations (success, validation errors, Firestore errors)
 * - GetAll operations (with results, empty results, pagination)
 * - GetById operations (found, not found)
 * - Update operations (success, not found, validation errors)
 * - Delete operations (success, not found)
 * - Firestore not configured scenarios
 */
@ExtendWith(MockitoExtension.class)
class ChineseFlashCardServiceTest {

    @Mock
    private FirestoreService firestoreService;

    @Mock
    private ApplicationConfig config;

    private ChineseFlashCardService service;

    private static final String COLLECTION_NAME = "chinese_flashcards";

    @BeforeEach
    void setUp() {
        // Mock Firestore as connected by default
        when(firestoreService.isConnected()).thenReturn(true);

        // Initialize service with mocked dependencies
        service = new ChineseFlashCardService(firestoreService, config);
    }

    // ========== CREATE Tests ==========

    @Test
    void testCreate_Success() {
        // Arrange
        CreateChineseFlashCardRequest request = CreateChineseFlashCardRequest.newBuilder()
            .setChineseWord("你好")
            .setEnglishWord("Hello")
            .setPinyin("nǐ hǎo")
            .setImg("http://example.com/image.jpg")
            .build();

        // Mock Firestore create operation
        when(firestoreService.create(eq(COLLECTION_NAME), anyString(), anyMap(), eq(Map.class)))
            .thenReturn(new HashMap<>());

        // Act
        CreateChineseFlashCardResponse response = service.create(request);

        // Assert
        assertTrue(response.getSuccess());
        assertEquals("Chinese flashcard created successfully", response.getMessage());
        assertNotNull(response.getData());
        assertEquals("你好", response.getData().getChineseWord());
        assertEquals("Hello", response.getData().getEnglishWord());
        assertEquals("nǐ hǎo", response.getData().getPinyin());
        assertEquals("http://example.com/image.jpg", response.getData().getImg());
        assertTrue(response.getData().getId() > 0);
        assertTrue(response.getData().getCreatedAt() > 0);
        assertTrue(response.getData().getUpdatedAt() > 0);

        // Verify Firestore was called
        verify(firestoreService).create(eq(COLLECTION_NAME), anyString(), anyMap(), eq(Map.class));
    }

    @Test
    void testCreate_ValidationError_MissingChineseWord() {
        // Arrange
        CreateChineseFlashCardRequest request = CreateChineseFlashCardRequest.newBuilder()
            .setChineseWord("") // Empty Chinese word
            .setEnglishWord("Hello")
            .setPinyin("nǐ hǎo")
            .build();

        // Act
        CreateChineseFlashCardResponse response = service.create(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Chinese word is required"));

        // Verify Firestore was NOT called
        verify(firestoreService, never()).create(anyString(), anyString(), anyMap(), any());
    }

    @Test
    void testCreate_ValidationError_MissingEnglishWord() {
        // Arrange
        CreateChineseFlashCardRequest request = CreateChineseFlashCardRequest.newBuilder()
            .setChineseWord("你好")
            .setEnglishWord("") // Empty English word
            .setPinyin("nǐ hǎo")
            .build();

        // Act
        CreateChineseFlashCardResponse response = service.create(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("English word is required"));
    }

    @Test
    void testCreate_ValidationError_MissingPinyin() {
        // Arrange
        CreateChineseFlashCardRequest request = CreateChineseFlashCardRequest.newBuilder()
            .setChineseWord("你好")
            .setEnglishWord("Hello")
            .setPinyin("") // Empty pinyin
            .build();

        // Act
        CreateChineseFlashCardResponse response = service.create(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Pinyin is required"));
    }

    @Test
    void testCreate_ValidationError_MultipleErrors() {
        // Arrange
        CreateChineseFlashCardRequest request = CreateChineseFlashCardRequest.newBuilder()
            .setChineseWord("") // Empty
            .setEnglishWord("") // Empty
            .setPinyin("") // Empty
            .build();

        // Act
        CreateChineseFlashCardResponse response = service.create(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Chinese word is required"));
        assertTrue(response.getError().contains("English word is required"));
        assertTrue(response.getError().contains("Pinyin is required"));
    }

    @Test
    void testCreate_FirestoreNotConnected() {
        // Arrange
        when(firestoreService.isConnected()).thenReturn(false);
        service = new ChineseFlashCardService(firestoreService, config);

        CreateChineseFlashCardRequest request = CreateChineseFlashCardRequest.newBuilder()
            .setChineseWord("你好")
            .setEnglishWord("Hello")
            .setPinyin("nǐ hǎo")
            .build();

        // Act
        CreateChineseFlashCardResponse response = service.create(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Firestore is not configured"));

        // Verify Firestore was NOT called
        verify(firestoreService, never()).create(anyString(), anyString(), anyMap(), any());
    }

    @Test
    void testCreate_FirestoreException() {
        // Arrange
        CreateChineseFlashCardRequest request = CreateChineseFlashCardRequest.newBuilder()
            .setChineseWord("你好")
            .setEnglishWord("Hello")
            .setPinyin("nǐ hǎo")
            .build();

        // Mock Firestore to throw exception
        when(firestoreService.create(anyString(), anyString(), anyMap(), any()))
            .thenThrow(new FirestoreException("Firestore operation failed"));

        // Act
        CreateChineseFlashCardResponse response = service.create(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Failed to create flashcard"));
    }

    // ========== GET ALL Tests ==========

    @Test
    void testGetAll_Success() {
        // Arrange
        GetChineseFlashCardsRequest request = GetChineseFlashCardsRequest.newBuilder()
            .setPage(1)
            .setPageSize(10)
            .build();

        // Mock Firestore data
        List<Map<String, Object>> mockDocs = Arrays.asList(
            createMockDoc(1L, "你好", "Hello", "nǐ hǎo"),
            createMockDoc(2L, "谢谢", "Thank you", "xiè xiè")
        );

        when(firestoreService.getAll(eq(COLLECTION_NAME), eq(0), eq(10), eq(Map.class)))
            .thenAnswer(invocation -> mockDocs);
        when(firestoreService.count(COLLECTION_NAME)).thenReturn(2L);

        // Act
        GetChineseFlashCardsResponse response = service.getAll(request);

        // Assert
        assertTrue(response.getSuccess());
        assertEquals(2, response.getDataCount());
        assertEquals(2, response.getTotalCount());
        assertEquals("你好", response.getData(0).getChineseWord());
        assertEquals("谢谢", response.getData(1).getChineseWord());

        // Verify Firestore was called with correct parameters
        verify(firestoreService).getAll(eq(COLLECTION_NAME), eq(0), eq(10), eq(Map.class));
        verify(firestoreService).count(COLLECTION_NAME);
    }

    @Test
    void testGetAll_EmptyResults() {
        // Arrange
        GetChineseFlashCardsRequest request = GetChineseFlashCardsRequest.newBuilder()
            .setPage(1)
            .setPageSize(10)
            .build();

        // Mock empty Firestore data
        when(firestoreService.getAll(eq(COLLECTION_NAME), eq(0), eq(10), eq(Map.class)))
            .thenReturn(Collections.emptyList());
        when(firestoreService.count(COLLECTION_NAME)).thenReturn(0L);

        // Act
        GetChineseFlashCardsResponse response = service.getAll(request);

        // Assert
        assertTrue(response.getSuccess());
        assertEquals(0, response.getDataCount());
        assertEquals(0, response.getTotalCount());
    }

    @Test
    void testGetAll_DefaultPagination() {
        // Arrange - No page or pageSize specified
        GetChineseFlashCardsRequest request = GetChineseFlashCardsRequest.newBuilder().build();

        when(firestoreService.getAll(eq(COLLECTION_NAME), eq(0), eq(50), eq(Map.class)))
            .thenReturn(Collections.emptyList());
        when(firestoreService.count(COLLECTION_NAME)).thenReturn(0L);

        // Act
        GetChineseFlashCardsResponse response = service.getAll(request);

        // Assert
        assertTrue(response.getSuccess());

        // Verify default pagination was used (page 0, pageSize 50)
        verify(firestoreService).getAll(eq(COLLECTION_NAME), eq(0), eq(50), eq(Map.class));
    }

    @Test
    void testGetAll_FirestoreNotConnected() {
        // Arrange
        when(firestoreService.isConnected()).thenReturn(false);
        service = new ChineseFlashCardService(firestoreService, config);

        GetChineseFlashCardsRequest request = GetChineseFlashCardsRequest.newBuilder().build();

        // Act
        GetChineseFlashCardsResponse response = service.getAll(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Firestore is not configured"));
    }

    // ========== GET BY ID Tests ==========

    @Test
    void testGetById_Success() {
        // Arrange
        GetChineseFlashCardRequest request = GetChineseFlashCardRequest.newBuilder()
            .setId(123L)
            .build();

        Map<String, Object> mockDoc = createMockDoc(123L, "你好", "Hello", "nǐ hǎo");
        when(firestoreService.get(eq(COLLECTION_NAME), eq("123"), eq(Map.class)))
            .thenReturn(mockDoc);

        // Act
        GetChineseFlashCardResponse response = service.getById(request);

        // Assert
        assertTrue(response.getSuccess());
        assertNotNull(response.getData());
        assertEquals(123L, response.getData().getId());
        assertEquals("你好", response.getData().getChineseWord());
        assertEquals("Hello", response.getData().getEnglishWord());

        verify(firestoreService).get(eq(COLLECTION_NAME), eq("123"), eq(Map.class));
    }

    @Test
    void testGetById_NotFound() {
        // Arrange
        GetChineseFlashCardRequest request = GetChineseFlashCardRequest.newBuilder()
            .setId(999L)
            .build();

        when(firestoreService.get(eq(COLLECTION_NAME), eq("999"), eq(Map.class)))
            .thenReturn(null);

        // Act
        GetChineseFlashCardResponse response = service.getById(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("not found"));
        assertTrue(response.getError().contains("999"));
    }

    @Test
    void testGetById_FirestoreNotConnected() {
        // Arrange
        when(firestoreService.isConnected()).thenReturn(false);
        service = new ChineseFlashCardService(firestoreService, config);

        GetChineseFlashCardRequest request = GetChineseFlashCardRequest.newBuilder()
            .setId(123L)
            .build();

        // Act
        GetChineseFlashCardResponse response = service.getById(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Firestore is not configured"));
    }

    // ========== UPDATE Tests ==========

    @Test
    void testUpdate_Success() {
        // Arrange
        UpdateChineseFlashCardRequest request = UpdateChineseFlashCardRequest.newBuilder()
            .setId(123L)
            .setChineseWord("再见")
            .setEnglishWord("Goodbye")
            .setPinyin("zài jiàn")
            .setImg("http://example.com/goodbye.jpg")
            .build();

        Map<String, Object> existingDoc = createMockDoc(123L, "你好", "Hello", "nǐ hǎo");

        when(firestoreService.exists(eq(COLLECTION_NAME), eq("123"))).thenReturn(true);
        when(firestoreService.get(eq(COLLECTION_NAME), eq("123"), eq(Map.class)))
            .thenReturn(existingDoc);
        when(firestoreService.update(eq(COLLECTION_NAME), eq("123"), anyMap(), eq(Map.class)))
            .thenReturn(new HashMap<>());

        // Act
        UpdateChineseFlashCardResponse response = service.update(request);

        // Assert
        assertTrue(response.getSuccess());
        assertNotNull(response.getData());
        assertEquals("再见", response.getData().getChineseWord());
        assertEquals("Goodbye", response.getData().getEnglishWord());
        assertEquals("zài jiàn", response.getData().getPinyin());

        verify(firestoreService).exists(eq(COLLECTION_NAME), eq("123"));
        verify(firestoreService).update(eq(COLLECTION_NAME), eq("123"), anyMap(), eq(Map.class));
    }

    @Test
    void testUpdate_NotFound() {
        // Arrange
        UpdateChineseFlashCardRequest request = UpdateChineseFlashCardRequest.newBuilder()
            .setId(999L)
            .setChineseWord("再见")
            .setEnglishWord("Goodbye")
            .setPinyin("zài jiàn")
            .build();

        when(firestoreService.exists(eq(COLLECTION_NAME), eq("999"))).thenReturn(false);

        // Act
        UpdateChineseFlashCardResponse response = service.update(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("not found"));

        // Verify update was NOT called
        verify(firestoreService, never()).update(anyString(), anyString(), anyMap(), any());
    }

    @Test
    void testUpdate_ValidationError() {
        // Arrange
        UpdateChineseFlashCardRequest request = UpdateChineseFlashCardRequest.newBuilder()
            .setId(123L)
            .setChineseWord("") // Empty
            .setEnglishWord("Goodbye")
            .setPinyin("zài jiàn")
            .build();

        // Act
        UpdateChineseFlashCardResponse response = service.update(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Chinese word is required"));

        // Verify Firestore was NOT called
        verify(firestoreService, never()).update(anyString(), anyString(), anyMap(), any());
    }

    @Test
    void testUpdate_FirestoreNotConnected() {
        // Arrange
        when(firestoreService.isConnected()).thenReturn(false);
        service = new ChineseFlashCardService(firestoreService, config);

        UpdateChineseFlashCardRequest request = UpdateChineseFlashCardRequest.newBuilder()
            .setId(123L)
            .setChineseWord("再见")
            .setEnglishWord("Goodbye")
            .setPinyin("zài jiàn")
            .build();

        // Act
        UpdateChineseFlashCardResponse response = service.update(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Firestore is not configured"));
    }

    // ========== DELETE Tests ==========

    @Test
    void testDelete_Success() {
        // Arrange
        DeleteChineseFlashCardRequest request = DeleteChineseFlashCardRequest.newBuilder()
            .setId(123L)
            .build();

        when(firestoreService.exists(eq(COLLECTION_NAME), eq("123"))).thenReturn(true);
        doNothing().when(firestoreService).delete(eq(COLLECTION_NAME), eq("123"));

        // Act
        DeleteChineseFlashCardResponse response = service.delete(request);

        // Assert
        assertTrue(response.getSuccess());
        assertEquals("Chinese flashcard deleted successfully", response.getMessage());

        verify(firestoreService).exists(eq(COLLECTION_NAME), eq("123"));
        verify(firestoreService).delete(eq(COLLECTION_NAME), eq("123"));
    }

    @Test
    void testDelete_NotFound() {
        // Arrange
        DeleteChineseFlashCardRequest request = DeleteChineseFlashCardRequest.newBuilder()
            .setId(999L)
            .build();

        when(firestoreService.exists(eq(COLLECTION_NAME), eq("999"))).thenReturn(false);

        // Act
        DeleteChineseFlashCardResponse response = service.delete(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("not found"));

        // Verify delete was NOT called
        verify(firestoreService, never()).delete(anyString(), anyString());
    }

    @Test
    void testDelete_FirestoreNotConnected() {
        // Arrange
        when(firestoreService.isConnected()).thenReturn(false);
        service = new ChineseFlashCardService(firestoreService, config);

        DeleteChineseFlashCardRequest request = DeleteChineseFlashCardRequest.newBuilder()
            .setId(123L)
            .build();

        // Act
        DeleteChineseFlashCardResponse response = service.delete(request);

        // Assert
        assertFalse(response.getSuccess());
        assertTrue(response.getError().contains("Firestore is not configured"));
    }

    // ========== Helper Methods ==========

    /**
     * Creates a mock Firestore document for testing.
     */
    private Map<String, Object> createMockDoc(Long id, String chineseWord, String englishWord, String pinyin) {
        Map<String, Object> doc = new HashMap<>();
        doc.put("id", id);
        doc.put("chineseWord", chineseWord);
        doc.put("englishWord", englishWord);
        doc.put("pinyin", pinyin);
        doc.put("img", "");
        doc.put("createdAt", System.currentTimeMillis());
        doc.put("updatedAt", System.currentTimeMillis());
        return doc;
    }
}
