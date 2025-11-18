# Cloud Functions Migration Task

**Description:** Migrate existing Java backend to serverless Google Cloud Functions

**Branch:** `cloud-functions`

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## 1. Setup

- ❌ **Install gcloud CLI**
  ```bash
  # Install Google Cloud SDK
  brew install google-cloud-sdk
  
  # Authenticate
  gcloud auth login
  
  # Set project
  gcloud config set project YOUR_PROJECT_ID
  gcloud config set functions/region us-central1
  ```

- ❌ **Enable Required APIs**
  ```bash
  gcloud services enable cloudfunctions.googleapis.com
  gcloud services enable cloudbuild.googleapis.com
  gcloud services enable firestore.googleapis.com
  ```

- ❌ **Create Cloud Functions Directory**
  ```bash
  mkdir -p Cloud_Functions/src/main/java/com/worldmap/functions
  ```

- ❌ **Add Dependencies**
  - Create `Cloud_Functions/build.gradle`:
  ```gradle
  plugins {
      id 'java'
  }
  
  dependencies {
      implementation 'com.google.cloud.functions:functions-framework-api:1.1.0'
      implementation 'com.google.cloud:google-cloud-firestore:3.25.2'
      implementation 'com.google.code.gson:gson:2.10.1'
  }
  ```

---

## 2. Migrate Existing Code

### Chinese Flashcards

- ❌ **Create Function Class**
  - File: `Cloud_Functions/src/main/java/com/worldmap/functions/ChineseFlashcardFunction.java`
  - Copy logic from existing `ChineseFlashCardService`
  - Adapt to `HttpFunction` interface

- ❌ **Implement HTTP Handlers**
  - `POST /` - Create flashcard
  - `GET /` - Get all flashcards (with pagination)
  - `GET /{id}` - Get single flashcard
  - `PUT /{id}` - Update flashcard
  - `DELETE /{id}` - Delete flashcard

- ❌ **Add CORS Support**
  ```java
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  ```

### French Flashcards

- ❌ **Create Function Class**
  - File: `Cloud_Functions/src/main/java/com/worldmap/functions/FrenchFlashcardFunction.java`
  - Copy logic from existing `FrenchFlashCardService`
  - Same pattern as Chinese flashcards

---

## 3. Deploy to Google Cloud Functions

- ❌ **Build Functions**
  ```bash
  cd Cloud_Functions
  gradle build
  ```

- ❌ **Deploy Chinese Flashcard Function**
  ```bash
  gcloud functions deploy chineseFlashcards \
    --gen2 \
    --runtime=java17 \
    --region=us-central1 \
    --source=. \
    --entry-point=com.worldmap.functions.ChineseFlashcardFunction \
    --trigger-http \
    --allow-unauthenticated
  ```

- ❌ **Deploy French Flashcard Function**
  ```bash
  gcloud functions deploy frenchFlashcards \
    --gen2 \
    --runtime=java17 \
    --region=us-central1 \
    --source=. \
    --entry-point=com.worldmap.functions.FrenchFlashcardFunction \
    --trigger-http \
    --allow-unauthenticated
  ```

- ❌ **Test Deployed Functions**
  ```bash
  # Get function URL
  gcloud functions describe chineseFlashcards --region=us-central1
  
  # Test with curl
  curl -X POST https://YOUR-FUNCTION-URL \
    -H "Content-Type: application/json" \
    -d '{"chineseWord":"你好","englishWord":"Hello","pinyin":"nǐ hǎo"}'
  ```

- ❌ **Update Frontend**
  - Change API URLs to Cloud Functions endpoints
  - Update environment variables

---

## References

- [Google Cloud Functions Docs](https://cloud.google.com/functions/docs)
- [Java Runtime](https://cloud.google.com/functions/docs/concepts/java-runtime)
