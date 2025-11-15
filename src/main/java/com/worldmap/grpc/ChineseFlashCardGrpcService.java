package com.worldmap.grpc;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.worldmap.flashcard.*;
import com.worldmap.service.ChineseFlashCardService;
import io.grpc.stub.StreamObserver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * gRPC service implementation for Chinese Flash Card operations.
 * This layer handles gRPC requests and delegates business logic to ChineseFlashCardService.
 *
 * Responsibilities:
 * - Handle incoming gRPC requests
 * - Delegate to business logic layer (ChineseFlashCardService)
 * - Send responses via StreamObserver
 * - Handle gRPC-specific error handling
 */
@Singleton
public class ChineseFlashCardGrpcService extends ChineseFlashCardServiceGrpc.ChineseFlashCardServiceImplBase {

    private static final Logger logger = LoggerFactory.getLogger(ChineseFlashCardGrpcService.class);

    private final ChineseFlashCardService chineseFlashCardService;

    /**
     * Constructor with dependency injection.
     *
     * @param chineseFlashCardService Business logic service for Chinese flashcards
     */
    @Inject
    public ChineseFlashCardGrpcService(ChineseFlashCardService chineseFlashCardService) {
        this.chineseFlashCardService = chineseFlashCardService;
        logger.info("✅ ChineseFlashCardGrpcService initialized");
    }

    /**
     * Creates a new Chinese flashcard.
     *
     * @param request CreateChineseFlashCardRequest containing flashcard data
     * @param responseObserver StreamObserver for sending response
     */
    @Override
    public void createChineseFlashCard(
        CreateChineseFlashCardRequest request,
        StreamObserver<CreateChineseFlashCardResponse> responseObserver
    ) {
        logger.info("gRPC: CreateChineseFlashCard - {}", request.getChineseWord());

        try {
            // Delegate to service layer
            CreateChineseFlashCardResponse response = chineseFlashCardService.create(request);

            // Send response
            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            logger.error("gRPC error in createChineseFlashCard", e);

            // Build error response
            CreateChineseFlashCardResponse errorResponse = CreateChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Internal server error: " + e.getMessage())
                .build();

            responseObserver.onNext(errorResponse);
            responseObserver.onCompleted();
        }
    }

    /**
     * Retrieves all Chinese flashcards with pagination.
     *
     * @param request GetChineseFlashCardsRequest with pagination parameters
     * @param responseObserver StreamObserver for sending response
     */
    @Override
    public void getChineseFlashCards(
        GetChineseFlashCardsRequest request,
        StreamObserver<GetChineseFlashCardsResponse> responseObserver
    ) {
        logger.info("gRPC: GetChineseFlashCards - page: {}, pageSize: {}", request.getPage(), request.getPageSize());

        try {
            // Delegate to service layer
            GetChineseFlashCardsResponse response = chineseFlashCardService.getAll(request);

            // Send response
            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            logger.error("gRPC error in getChineseFlashCards", e);

            // Build error response
            GetChineseFlashCardsResponse errorResponse = GetChineseFlashCardsResponse.newBuilder()
                .setSuccess(false)
                .setError("Internal server error: " + e.getMessage())
                .build();

            responseObserver.onNext(errorResponse);
            responseObserver.onCompleted();
        }
    }

    /**
     * Retrieves a single Chinese flashcard by ID.
     *
     * @param request GetChineseFlashCardRequest with flashcard ID
     * @param responseObserver StreamObserver for sending response
     */
    @Override
    public void getChineseFlashCard(
        GetChineseFlashCardRequest request,
        StreamObserver<GetChineseFlashCardResponse> responseObserver
    ) {
        logger.info("gRPC: GetChineseFlashCard - ID: {}", request.getId());

        try {
            // Delegate to service layer
            GetChineseFlashCardResponse response = chineseFlashCardService.getById(request);

            // Send response
            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            logger.error("gRPC error in getChineseFlashCard", e);

            // Build error response
            GetChineseFlashCardResponse errorResponse = GetChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Internal server error: " + e.getMessage())
                .build();

            responseObserver.onNext(errorResponse);
            responseObserver.onCompleted();
        }
    }

    /**
     * Updates an existing Chinese flashcard.
     *
     * @param request UpdateChineseFlashCardRequest with updated data
     * @param responseObserver StreamObserver for sending response
     */
    @Override
    public void updateChineseFlashCard(
        UpdateChineseFlashCardRequest request,
        StreamObserver<UpdateChineseFlashCardResponse> responseObserver
    ) {
        logger.info("gRPC: UpdateChineseFlashCard - ID: {}", request.getId());

        try {
            // Delegate to service layer
            UpdateChineseFlashCardResponse response = chineseFlashCardService.update(request);

            // Send response
            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            logger.error("gRPC error in updateChineseFlashCard", e);

            // Build error response
            UpdateChineseFlashCardResponse errorResponse = UpdateChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Internal server error: " + e.getMessage())
                .build();

            responseObserver.onNext(errorResponse);
            responseObserver.onCompleted();
        }
    }

    /**
     * Deletes a Chinese flashcard.
     *
     * @param request DeleteChineseFlashCardRequest with flashcard ID
     * @param responseObserver StreamObserver for sending response
     */
    @Override
    public void deleteChineseFlashCard(
        DeleteChineseFlashCardRequest request,
        StreamObserver<DeleteChineseFlashCardResponse> responseObserver
    ) {
        logger.info("gRPC: DeleteChineseFlashCard - ID: {}", request.getId());

        try {
            // Delegate to service layer
            DeleteChineseFlashCardResponse response = chineseFlashCardService.delete(request);

            // Send response
            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (Exception e) {
            logger.error("gRPC error in deleteChineseFlashCard", e);

            // Build error response
            DeleteChineseFlashCardResponse errorResponse = DeleteChineseFlashCardResponse.newBuilder()
                .setSuccess(false)
                .setError("Internal server error: " + e.getMessage())
                .build();

            responseObserver.onNext(errorResponse);
            responseObserver.onCompleted();
        }
    }
}
