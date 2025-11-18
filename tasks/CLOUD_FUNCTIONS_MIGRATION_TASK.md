# Cloud Functions Migration Task

**Description:** Migrate Java gRPC backend to serverless Google Cloud Functions for improved scalability, reduced costs, and simplified deployment.

**Architecture:** Frontend → Cloud Functions (HTTP/HTTPS) → Firestore

**Main Branch:** `main`

**Feature Branch:** `cloud-functions`

**Applies To:** All flashcard languages (Chinese, French, future languages)

**Branching Strategy:** Each language will have its own branch for Cloud Functions migration, all merging into the `cloud-functions` feature branch. Once complete, merge into `main`.

**Date Started:** November 17, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Overview

This task involves converting the existing Java gRPC backend into serverless Google Cloud Functions. The migration provides:

- **Serverless Architecture:** No server management, automatic scaling
- **Cost Optimization:** Pay-per-use pricing (~$0.40/million requests, 2M free/month)
- **High Availability:** Built-in load balancing and redundancy
- **Easy Deployment:** Simplified CI/CD with Cloud Build
- **Auto-Scaling:** Handles traffic spikes automatically

### Trade-offs

**Advantages:**
- ✅ Zero server maintenance
- ✅ Automatic scaling (0 to thousands of instances)
- ✅ Cost-effective for variable traffic
- ✅ Built-in monitoring and logging
- ✅ Easy deployment and rollback

**Disadvantages:**
- ⚠️ Cold starts (1-3 seconds for first request)
- ⚠️ Stateless (no in-memory state between requests)
- ⚠️ Execution time limits (60s for HTTP, 9min for background)
- ⚠️ May be more expensive for very high sustained traffic

---

## Architecture Decisions

### Function Design Pattern

**Recommended: One Function Per Operation**

Each CRUD operation becomes a separate Cloud Function:
- `createChineseFlashcard` - POST /flashcards/chinese
- `getChineseFlashcards` - GET /flashcards/chinese
- `getChineseFlashcard` - GET /flashcards/chinese/:id
- `updateChineseFlashcard` - PUT /flashcards/chinese/:id
- `deleteChineseFlashcard` - DELETE /flashcards/chinese/:id

**Benefits:**
- Independent scaling per operation
- Smaller cold start times
- Easier debugging and monitoring
- Clear separation of concerns
- Better cost optimization

**Alternative: Single Function with Routing**
- One function handles all routes
- Internal routing based on HTTP method and path
- Simpler deployment but larger cold starts

### Technology Stack

- **Runtime:** Java 17 or Java 21
- **Framework:** Cloud Functions Framework for Java
- **Database:** Firestore (existing)
- **Serialization:** Gson or Jackson for JSON
- **Deployment:** gcloud CLI and Cloud Build

---

## Tasks

### 1. Infrastructure Setup

- ❌ **Setup Google Cloud Project**
    - **Description:** Configure Google Cloud environment for Cloud Functions
    - **Branch:** `cloud-functions-setup`
    - **Subtasks:**
        - ❌ Create or configure Google Cloud Project
        - ❌ Enable required APIs:
            - Cloud Functions API
            - Cloud Build API
            - Cloud Logging API
            - Cloud Firestore API (if not already enabled)
        - ❌ Set up billing account
        - ❌ Install Google Cloud SDK (`gcloud` CLI)
        - ❌ Authenticate: `gcloud auth login`
        - ❌ Set default project: `gcloud config set project PROJECT_ID`
        - ❌ Set default region: `gcloud config set functions/region us-central1`
        - ❌ Create service account for Cloud Functions (optional, for fine-grained permissions)
        - ❌ Document project setup in README
    - **Requirements:**
        - ❌ Google Cloud Project with billing enabled
        - ❌ All necessary APIs enabled
        - ❌ gcloud CLI installed and configured
        - ❌ Service accounts configured (if using)
    - **Date:** November 17, 2025

### 2. Chinese Flashcard Cloud Functions

- ❌ **Implement Chinese Flashcard Cloud Functions**
    - **Description:** Create serverless functions for Chinese flashcard CRUD operations
    - **Branch:** `chinese-flashcard-cloud-functions`
    - **Dependencies:**
        - ✅ FirestoreService logic from existing backend (can be adapted)
        - ✅ Validation logic from ChineseFlashCardService
        - ❌ Infrastructure setup complete
    
    - **Subtasks:**
        - ❌ **Setup Project Structure**
            - Create new Gradle/Maven module or separate project
            - Add Cloud Functions dependencies:
                ```gradle
                dependencies {
                    implementation 'com.google.cloud.functions:functions-framework-api:1.1.0'
                    implementation 'com.google.cloud:google-cloud-firestore:3.25.2'
                    implementation 'com.google.code.gson:gson:2.10.1'
                    implementation 'javax.inject:javax.inject:1'
                }
                ```
            - Configure build for Cloud Functions deployment
        
        - ❌ **Create Data Transfer Objects (DTOs)**
            - **Package:** `com.worldmap.functions.dto`
            - **Files to create:**
                - `ChineseFlashcardDTO.java` - Main flashcard data
                - `CreateChineseFlashcardRequest.java`
                - `UpdateChineseFlashcardRequest.java`
                - `GetFlashcardsQueryParams.java` (page, pageSize)
                - `ChineseFlashcardResponse.java`
                - `FlashcardListResponse.java` (items + totalCount)
                - `ErrorResponse.java`
            - Add JSON annotations for Gson/Jackson
        
        - ❌ **Create Shared Utilities**
            - **File:** `FirestoreUtil.java` - Firestore connection and helpers
            - **File:** `ValidationUtil.java` - Request validation
            - **File:** `CorsUtil.java` - CORS headers helper
            - **File:** `ResponseUtil.java` - Standard response formatting
        
        - ❌ **Implement CreateChineseFlashcard Function**
            - **File:** `functions/CreateChineseFlashcard.java`
            - **Implementation:**
                ```java
                public class CreateChineseFlashcard implements HttpFunction {
                    private final Firestore firestore;
                    private final Gson gson;
                    
                    public CreateChineseFlashcard() {
                        this.firestore = FirestoreOptions.getDefaultInstance().getService();
                        this.gson = new Gson();
                    }
                    
                    @Override
                    public void service(HttpRequest request, HttpResponse response) throws Exception {
                        // Handle CORS preflight
                        if ("OPTIONS".equals(request.getMethod())) {
                            CorsUtil.setHeaders(response);
                            response.setStatusCode(204);
                            return;
                        }
                        
                        try {
                            // Parse request
                            CreateChineseFlashcardRequest req = gson.fromJson(
                                request.getReader(), CreateChineseFlashcardRequest.class
                            );
                            
                            // Validate
                            ValidationUtil.validateChineseFlashcard(req);
                            
                            // Generate ID and timestamps
                            String id = String.valueOf(System.currentTimeMillis());
                            long now = System.currentTimeMillis();
                            
                            // Create document
                            Map<String, Object> data = new HashMap<>();
                            data.put("id", id);
                            data.put("chineseWord", req.getChineseWord());
                            data.put("englishWord", req.getEnglishWord());
                            data.put("pinyin", req.getPinyin());
                            data.put("img", req.getImg());
                            data.put("createdAt", now);
                            data.put("updatedAt", now);
                            
                            // Save to Firestore
                            firestore.collection("chinese_flashcards")
                                .document(id)
                                .set(data)
                                .get();
                            
                            // Return response
                            ChineseFlashcardResponse result = new ChineseFlashcardResponse(
                                true, data, "Flashcard created successfully", null
                            );
                            
                            CorsUtil.setHeaders(response);
                            response.setStatusCode(201);
                            response.setContentType("application/json");
                            response.getWriter().write(gson.toJson(result));
                            
                        } catch (ValidationException e) {
                            ResponseUtil.sendError(response, 400, e.getMessage());
                        } catch (Exception e) {
                            ResponseUtil.sendError(response, 500, "Internal server error");
                        }
                    }
                }
                ```
        
        - ❌ **Implement GetChineseFlashcards Function**
            - **File:** `functions/GetChineseFlashcards.java`
            - Query Firestore with pagination
            - Support query parameters: `page`, `pageSize`
            - Return list with totalCount
        
        - ❌ **Implement GetChineseFlashcard Function**
            - **File:** `functions/GetChineseFlashcard.java`
            - Get single document by ID from path parameter
            - Return 404 if not found
        
        - ❌ **Implement UpdateChineseFlashcard Function**
            - **File:** `functions/UpdateChineseFlashcard.java`
            - Update existing document
            - Validate required fields
            - Update timestamps
            - Return 404 if not found
        
        - ❌ **Implement DeleteChineseFlashcard Function**
            - **File:** `functions/DeleteChineseFlashcard.java`
            - Delete document by ID
            - Return success message
            - Return 404 if not found
        
        - ❌ **Configure CORS**
            - Create `CorsUtil.java` helper:
                ```java
                public class CorsUtil {
                    public static void setHeaders(HttpResponse response) {
                        response.appendHeader("Access-Control-Allow-Origin", "*");
                        response.appendHeader("Access-Control-Allow-Methods", 
                            "GET,POST,PUT,DELETE,OPTIONS");
                        response.appendHeader("Access-Control-Allow-Headers", 
                            "Content-Type,Authorization");
                        response.appendHeader("Access-Control-Max-Age", "3600");
                    }
                }
                ```
            - Handle OPTIONS preflight in all functions
        
        - ❌ **Deploy Functions**
            - Create deployment script: `deploy-chinese-flashcards.sh`
                ```bash
                #!/bin/bash
                PROJECT_ID="your-project-id"
                REGION="us-central1"
                
                # Deploy all functions
                gcloud functions deploy createChineseFlashcard \
                  --gen2 \
                  --runtime=java17 \
                  --region=$REGION \
                  --source=. \
                  --entry-point=com.worldmap.functions.CreateChineseFlashcard \
                  --trigger-http \
                  --allow-unauthenticated \
                  --set-env-vars GOOGLE_CLOUD_PROJECT=$PROJECT_ID
                
                gcloud functions deploy getChineseFlashcards \
                  --gen2 \
                  --runtime=java17 \
                  --region=$REGION \
                  --source=. \
                  --entry-point=com.worldmap.functions.GetChineseFlashcards \
                  --trigger-http \
                  --allow-unauthenticated
                
                # ... deploy remaining functions
                ```
            - Test each endpoint after deployment
            - Document function URLs
        
        - ❌ **Test Cloud Functions**
            - Test with `curl`:
                ```bash
                # Create
                curl -X POST https://REGION-PROJECT.cloudfunctions.net/createChineseFlashcard \
                  -H "Content-Type: application/json" \
                  -d '{"chineseWord":"你好","englishWord":"Hello","pinyin":"nǐ hǎo"}'
                
                # Get all
                curl https://REGION-PROJECT.cloudfunctions.net/getChineseFlashcards?page=1&pageSize=10
                
                # Get by ID
                curl https://REGION-PROJECT.cloudfunctions.net/getChineseFlashcard/123456
                
                # Update
                curl -X PUT https://REGION-PROJECT.cloudfunctions.net/updateChineseFlashcard/123456 \
                  -H "Content-Type: application/json" \
                  -d '{"chineseWord":"谢谢","englishWord":"Thank you","pinyin":"xiè xiè"}'
                
                # Delete
                curl -X DELETE https://REGION-PROJECT.cloudfunctions.net/deleteChineseFlashcard/123456
                ```
            - Verify CORS works from browser
            - Test error cases (validation, not found, etc.)
    
    - **Requirements:**
        - ❌ All 5 CRUD operations deployed as Cloud Functions
        - ❌ Proper error handling and HTTP status codes
        - ❌ CORS configured for browser requests
        - ❌ JSON request/response format
        - ❌ Firestore integration working
        - ❌ Validation for required fields
    
    - **Date:** November 17, 2025

### 3. French Flashcard Cloud Functions

- ❌ **Implement French Flashcard Cloud Functions**
    - **Description:** Create serverless functions for French flashcard CRUD operations
    - **Branch:** `french-flashcard-cloud-functions`
    - **Dependencies:**
        - ✅ Chinese flashcard Cloud Functions (use as template)
        - ❌ Infrastructure setup complete
    
    - **Subtasks:**
        - ❌ **Create DTOs for French Flashcards**
            - `FrenchFlashcardDTO.java`
            - `CreateFrenchFlashcardRequest.java`
            - `UpdateFrenchFlashcardRequest.java`
            - `FrenchFlashcardResponse.java`
            - Validate: frenchWord, englishWord, pronunciation
        
        - ❌ **Implement 5 Cloud Functions**
            - `CreateFrenchFlashcard.java`
            - `GetFrenchFlashcards.java`
            - `GetFrenchFlashcard.java`
            - `UpdateFrenchFlashcard.java`
            - `DeleteFrenchFlashcard.java`
            - Collection: `french_flashcards`
        
        - ❌ **Deploy Functions**
            - Create `deploy-french-flashcards.sh`
            - Deploy all 5 functions
            - Test endpoints
        
        - ❌ **Test Cloud Functions**
            - Verify all CRUD operations
            - Test CORS and error handling
    
    - **Note:** Reuses most infrastructure from Chinese flashcards, only different collection and field names
    
    - **Date:** November 17, 2025

### 4. Frontend Integration

- ❌ **Update Frontend to Use Cloud Functions**
    - **Description:** Replace gRPC calls with HTTP requests to Cloud Functions
    - **Branch:** `frontend-cloud-functions-integration`
    - **Dependencies:**
        - ✅ Cloud Functions deployed and tested
        - ✅ Frontend gRPC integration exists (as reference)
    
    - **Subtasks:**
        - ❌ **Create HTTP Service Layer for Chinese Flashcards**
            - **File:** `frontend/src/services/chineseFlashcardHttpService.ts`
            - **Implementation:**
                ```typescript
                const CLOUD_FUNCTIONS_BASE_URL = process.env.REACT_APP_CLOUD_FUNCTIONS_URL || 
                    'https://us-central1-PROJECT.cloudfunctions.net';
                
                export async function createFlashcard(data: CreateFlashcardData): Promise<ChineseCardData> {
                    const response = await fetch(
                        `${CLOUD_FUNCTIONS_BASE_URL}/createChineseFlashcard`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        }
                    );
                    
                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.message || 'Failed to create flashcard');
                    }
                    
                    const result = await response.json();
                    return result.data;
                }
                
                export async function getAllFlashcards(page: number, pageSize: number) {
                    const response = await fetch(
                        `${CLOUD_FUNCTIONS_BASE_URL}/getChineseFlashcards?page=${page}&pageSize=${pageSize}`
                    );
                    
                    if (!response.ok) {
                        throw new Error('Failed to fetch flashcards');
                    }
                    
                    return await response.json();
                }
                
                // ... implement remaining operations
                ```
            - Implement all 5 CRUD operations
            - Add error handling
            - Add TypeScript types
        
        - ❌ **Create HTTP Service Layer for French Flashcards**
            - **File:** `frontend/src/services/frenchFlashcardHttpService.ts`
            - Follow same pattern as Chinese flashcards
            - Use French flashcard Cloud Functions endpoints
        
        - ❌ **Add Feature Flag Support**
            - **File:** `frontend/src/config/apiConfig.ts`
            - **Implementation:**
                ```typescript
                export enum ApiBackend {
                    GRPC = 'grpc',
                    CLOUD_FUNCTIONS = 'cloud-functions',
                    FIRESTORE_DIRECT = 'firestore-direct'
                }
                
                export const API_BACKEND: ApiBackend = 
                    (process.env.REACT_APP_API_BACKEND as ApiBackend) || ApiBackend.GRPC;
                ```
            - Update data layer to support switching:
                ```typescript
                export async function fetchChineseCards(): Promise<ChineseCardData[]> {
                    switch (API_BACKEND) {
                        case ApiBackend.GRPC:
                            return await grpcService.getAllFlashcards();
                        case ApiBackend.CLOUD_FUNCTIONS:
                            return await httpService.getAllFlashcards();
                        case ApiBackend.FIRESTORE_DIRECT:
                            return await firestoreService.getAllFlashcards();
                        default:
                            throw new Error('Unknown API backend');
                    }
                }
                ```
        
        - ❌ **Update Environment Variables**
            - Update `.env.development`:
                ```
                REACT_APP_API_BACKEND=cloud-functions
                REACT_APP_CLOUD_FUNCTIONS_URL=https://us-central1-PROJECT.cloudfunctions.net
                ```
            - Update `.env.production`:
                ```
                REACT_APP_API_BACKEND=cloud-functions
                REACT_APP_CLOUD_FUNCTIONS_URL=https://us-central1-PROJECT.cloudfunctions.net
                ```
            - Update `.env.example` with documentation
        
        - ❌ **Test Frontend Integration**
            - Test all CRUD operations from UI
            - Verify error handling
            - Test with backend down (error messages)
            - Verify network tab shows HTTP requests to Cloud Functions
            - Test on different browsers
    
    - **Requirements:**
        - ❌ HTTP service layer for both Chinese and French flashcards
        - ❌ Feature flag to switch between gRPC, Cloud Functions, and Firestore
        - ❌ All CRUD operations working from UI
        - ❌ Error handling with user-friendly messages
        - ❌ Environment variables configured
    
    - **Date:** November 17, 2025

### 5. Monitoring and Optimization

- ❌ **Setup Monitoring and Logging**
    - **Description:** Configure Cloud Logging, monitoring, and alerts
    - **Branch:** `cloud-functions-monitoring`
    
    - **Subtasks:**
        - ❌ **Add Structured Logging**
            - Use Java logging in Cloud Functions:
                ```java
                import java.util.logging.Logger;
                
                private static final Logger logger = 
                    Logger.getLogger(CreateChineseFlashcard.class.getName());
                
                logger.info("Creating flashcard: " + data.getChineseWord());
                logger.warning("Validation failed: " + error.getMessage());
                logger.severe("Firestore error: " + e.getMessage());
                ```
            - Log important events (requests, errors, performance)
            - Include request IDs for tracing
        
        - ❌ **Create Cloud Monitoring Dashboard**
            - Navigate to Cloud Console → Monitoring → Dashboards
            - Create dashboard with widgets:
                - Function invocation count (by function)
                - Error rate percentage
                - Latency (p50, p95, p99)
                - Active instances
                - Memory usage
                - Cold start frequency
            - Save and share dashboard
        
        - ❌ **Configure Alerts**
            - Error rate > 5%
            - Latency p95 > 2 seconds
            - Function execution failures
            - Send to email or Slack
        
        - ❌ **Setup Log-based Metrics**
            - Create custom metrics from logs
            - Track business metrics (flashcards created, deleted, etc.)
            - Monitor validation errors
    
    - **Date:** November 17, 2025

- ❌ **Optimize for Cold Starts**
    - **Description:** Reduce cold start latency for better performance
    - **Branch:** `cloud-functions-optimization`
    
    - **Subtasks:**
        - ❌ **Minimize Dependencies**
            - Review and remove unnecessary dependencies
            - Use lazy initialization for expensive resources
            - Keep functions small and focused
        
        - ❌ **Configure Minimum Instances (Optional)**
            - For critical functions, set min instances:
                ```bash
                gcloud functions deploy FUNCTION_NAME \
                  --min-instances=1  # Keeps 1 instance always warm
                ```
            - **Note:** Increases cost but reduces cold starts
            - Recommended for frequently-used functions
        
        - ❌ **Implement Warmup Endpoint (Optional)**
            - Create Cloud Scheduler job to ping functions every 5 minutes
            - Keeps functions warm during business hours
            - Example:
                ```bash
                gcloud scheduler jobs create http warmup-flashcards \
                  --schedule="*/5 * * * *" \
                  --uri="https://REGION-PROJECT.cloudfunctions.net/getChineseFlashcards" \
                  --http-method=GET
                ```
        
        - ❌ **Optimize Firestore Queries**
            - Use proper indexing
            - Minimize data transfer
            - Cache frequently accessed data
    
    - **Date:** November 17, 2025

### 6. CI/CD and Deployment

- ❌ **Setup Automated Deployment**
    - **Description:** Configure CI/CD pipeline with Cloud Build
    - **Branch:** `cloud-functions-cicd`
    
    - **Subtasks:**
        - ❌ **Create cloudbuild.yaml**
            - **File:** `cloudbuild.yaml`
            - **Implementation:**
                ```yaml
                steps:
                  # Build Java functions
                  - name: 'gradle:7.6-jdk17'
                    args: ['gradle', 'build', '--no-daemon']
                  
                  # Deploy Chinese flashcard functions
                  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
                    args:
                      - gcloud
                      - functions
                      - deploy
                      - createChineseFlashcard
                      - --gen2
                      - --runtime=java17
                      - --region=us-central1
                      - --source=.
                      - --entry-point=com.worldmap.functions.CreateChineseFlashcard
                      - --trigger-http
                      - --allow-unauthenticated
                  
                  # Deploy remaining functions...
                  
                timeout: 1200s
                ```
        
        - ❌ **Connect to GitHub**
            - Link Cloud Build to GitHub repository
            - Configure trigger on push to `main` branch
            - Add build status badge to README
        
        - ❌ **Setup Staging Environment**
            - Create separate project or use labels for staging
            - Deploy to staging first
            - Run integration tests
            - Promote to production on success
        
        - ❌ **Document Deployment Process**
            - Add deployment guide to README
            - Document manual deployment commands
            - Document rollback procedure
    
    - **Date:** November 17, 2025

### 7. Documentation and Migration Guide

- ❌ **Update Documentation**
    - **Description:** Comprehensive documentation for Cloud Functions architecture
    - **Branch:** `cloud-functions-docs`
    
    - **Subtasks:**
        - ❌ **Update README.md**
            - Add Cloud Functions section
            - Document architecture diagram
            - Add setup instructions
            - Document environment variables
            - Add troubleshooting guide
        
        - ❌ **Create Migration Guide**
            - **File:** `docs/CLOUD_FUNCTIONS_MIGRATION.md`
            - Document migration process from gRPC to Cloud Functions
            - Include comparison table (gRPC vs Cloud Functions)
            - Document feature flag usage
            - Add rollback instructions
        
        - ❌ **Document API Endpoints**
            - List all Cloud Functions endpoints
            - Document request/response formats
            - Add example `curl` commands
            - Document error codes and messages
        
        - ❌ **Document Costs**
            - Add cost breakdown and estimates
            - Compare with gRPC backend costs
            - Document free tier limits
            - Add monitoring guide for cost tracking
    
    - **Date:** November 17, 2025

---

## Cost Analysis

### Pricing (as of Nov 2025)

- **Invocations:** $0.40 per million (first 2 million free/month)
- **Compute Time:** $0.0000025 per GB-second (first 400,000 GB-seconds free)
- **Networking:** $0.12 per GB egress (first 5 GB free)

### Example Scenarios

**Small App (10,000 requests/day)**
- Monthly requests: ~300,000
- Average function: 256 MB, 200ms
- Cost: **$0-5/month** (mostly free tier)

**Medium App (100,000 requests/day)**
- Monthly requests: ~3 million
- Average function: 512 MB, 300ms
- Cost: **$10-30/month**

**Large App (1 million requests/day)**
- Monthly requests: ~30 million
- Average function: 512 MB, 300ms
- Cost: **$100-200/month**

**Comparison with VM/Container:**
- **Cloud Run/GKE:** $20-50/month minimum (always running)
- **Dedicated VM:** $50-200/month minimum
- **Cloud Functions:** $0-200/month (scales with usage)

---

## Migration Strategy

### Phased Approach (Recommended)

1. **Phase 1: Deploy alongside gRPC** (Week 1)
   - Deploy Cloud Functions to production
   - Keep gRPC server running
   - No user-facing changes

2. **Phase 2: Canary Testing** (Week 2)
   - Enable Cloud Functions for 5% of users (feature flag)
   - Monitor performance and errors
   - Gather feedback

3. **Phase 3: Gradual Rollout** (Week 3-4)
   - Increase to 25%, 50%, 75% of users
   - Monitor costs and performance
   - Fix any issues

4. **Phase 4: Full Migration** (Week 5)
   - Switch 100% of users to Cloud Functions
   - Keep gRPC server running for rollback

5. **Phase 5: Deprecation** (Week 6+)
   - Monitor for 1-2 weeks
   - Shut down gRPC server
   - Remove gRPC code (optional)

### Rollback Plan

If issues occur:
1. Change feature flag: `REACT_APP_API_BACKEND=grpc`
2. Redeploy frontend
3. Users revert to gRPC backend
4. Fix Cloud Functions issues
5. Retry migration

---

## Success Criteria

- ✅ All CRUD operations working via Cloud Functions
- ✅ Response times < 500ms (p95)
- ✅ Error rate < 1%
- ✅ Cost < gRPC backend for equivalent traffic
- ✅ Frontend integration complete with feature flags
- ✅ Monitoring and alerts configured
- ✅ Documentation complete
- ✅ CI/CD pipeline operational

---

## References

- **Main Task Overview:** [TASK.md](../TASK.md)
- **Chinese Flashcard Tasks:** [CHINESE_FLASHCARD_TASK.md](CHINESE_FLASHCARD_TASK.md)
- **French Flashcard Tasks:** [FRENCH_FLASHCARD_TASK.md](FRENCH_FLASHCARD_TASK.md)
- **Google Cloud Functions Docs:** https://cloud.google.com/functions/docs
- **Cloud Functions Java Runtime:** https://cloud.google.com/functions/docs/concepts/java-runtime
- **Firestore Documentation:** https://cloud.google.com/firestore/docs
