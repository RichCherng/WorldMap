# ChatGPT Flashcard Generation Task

**Description:** Integrate OpenAI's ChatGPT API to intelligently generate Chinese flashcard data from flexible user inputs (Chinese, Pinyin, and/or English) using Firebase Cloud Functions for secure API key management.

**Architecture:** Frontend → Firebase Cloud Function → OpenAI API → AI-Generated Data → Frontend → Firestore

**Main Branch:** `main`

**Feature Branch:** `ChatGPT_Integration`

**Date Started:** November 17, 2025

**Status Legend:** ❌ Not Started | 🔄 In Progress | ✅ Completed

---

## Overview

This task involves integrating OpenAI's ChatGPT API to automatically generate complete Chinese flashcard data from partial user inputs. Users can provide any combination of Chinese word, Pinyin, or English translation, and ChatGPT will intelligently fill in the missing fields.

### Use Cases

**Input Scenarios:**
1. **Chinese Only:** User provides `你好` → AI generates `Pinyin: Nǐ hǎo`, `English: Hello`
2. **English Only:** User provides `Hello` → AI generates `Chinese: 你好`, `Pinyin: Nǐ hǎo`
3. **Pinyin Only:** User provides `Nǐ hǎo` → AI generates `Chinese: 你好`, `English: Hello`
4. **Partial Input:** User provides `Chinese: 水` + `English: Water` → AI generates `Pinyin: Shuǐ`
5. **Validation:** User provides all three fields → AI validates correctness and suggests corrections

### Benefits

- **Enhanced UX:** Users don't need to know all three fields
- **Learning Aid:** Students can learn by entering what they know
- **Accuracy:** AI ensures correct Pinyin and translations
- **Efficiency:** Reduces manual data entry
- **Smart Corrections:** AI can detect and fix errors in user input
- **Security:** API key protected in serverless function

### Architecture Decision: Firebase Cloud Functions

**Why Serverless?**
- ✅ **Security:** API keys never exposed to client
- ✅ **Cost Effective:** Pay only when used (~$0.40 per million invocations)
- ✅ **Scalability:** Auto-scales with demand
- ✅ **Firebase Integration:** Same ecosystem as Firestore
- ✅ **HTTPS Endpoints:** Built-in CORS and authentication

**Architecture Flow:**
```
User Input (Partial)
    ↓
Frontend Validation
    ↓
HTTPS Request to Cloud Function
    ↓
Firebase Cloud Function (Node.js)
    ├── Validate Request
    ├── Call OpenAI API (GPT-4o-mini)
    ├── Parse Response
    └── Return Structured Data
    ↓
Frontend
    ├── Display Generated Data
    └── Save to Firestore
```

### Trade-offs

**Advantages:**
- ✅ Dramatically improved user experience
- ✅ Reduces user friction and errors
- ✅ Educational value (users learn missing information)
- ✅ API key security
- ✅ Serverless scalability

**Disadvantages:**
- ⚠️ API costs (~$0.002 per generation)
- ⚠️ Cloud Function costs (~$0.0004 per invocation)
- ⚠️ Requires internet connection
- ⚠️ Potential latency (2-4 seconds per request)
- ⚠️ Cold start delays (first request ~1-2s)

---

## Technology Stack

- **Serverless Platform:** Firebase Cloud Functions (Node.js)
- **AI Model:** GPT-4o-mini (cost-effective, fast, accurate)
- **API:** OpenAI Chat Completions API
- **Frontend:** React + TypeScript
- **API Key Storage:** Firebase Cloud Functions environment variables
- **Deployment:** Firebase CLI
- **Runtime:** Node.js 20+

---

## Tasks

### 1. Firebase Cloud Functions Setup

- ❌ **Initialize Firebase Cloud Functions**
    - **Description:** Set up Firebase Cloud Functions for the project
    - **Branch:** `ChatGPT_Integration`
    - **Dependencies:**
        - ✅ Firebase project exists
        - ✅ Firestore configured

    - **Subtasks:**
        - ❌ **Install Firebase Tools**
            ```bash
            npm install -g firebase-tools
            firebase login
            ```

        - ❌ **Initialize Cloud Functions**
            ```bash
            cd /path/to/WorldMap
            firebase init functions
            ```
            - Choose JavaScript or TypeScript (TypeScript recommended)
            - Choose to install dependencies
            - Creates `functions/` directory

        - ❌ **Project Structure**
            ```
            WorldMap/
            ├── functions/
            │   ├── package.json
            │   ├── tsconfig.json (if TypeScript)
            │   ├── src/
            │   │   └── index.ts
            │   └── .env (for local testing)
            ├── frontend/
            ├── firestore.rules
            └── firebase.json
            ```

        - ❌ **Configure Functions Region**
            - Update `firebase.json`:
                ```json
                {
                  "functions": {
                    "source": "functions",
                    "runtime": "nodejs20",
                    "region": "us-central1"
                  }
                }
                ```

    - **Requirements:**
        - ❌ Firebase Tools installed
        - ❌ Functions initialized
        - ❌ Project structure created

    - **Date:** TBD

### 2. OpenAI API Setup

- ❌ **Configure OpenAI Account and Secrets**
    - **Description:** Set up OpenAI account and configure API key in Firebase
    - **Branch:** `ChatGPT_Integration`
    - **Dependencies:**
        - ✅ Firebase Cloud Functions initialized

    - **Subtasks:**
        - ❌ **Create OpenAI Account**
            - Go to https://platform.openai.com
            - Sign up or log in
            - Navigate to API keys section

        - ❌ **Generate API Key**
            - Create new secret key
            - Copy and save securely
            - Set usage limits ($5-10/month recommended for testing)

        - ❌ **Install OpenAI SDK in Cloud Functions**
            ```bash
            cd functions
            npm install openai
            ```

        - ❌ **Configure Firebase Secrets**
            ```bash
            # Set secret for Cloud Functions
            firebase functions:secrets:set OPENAI_API_KEY
            # Paste your API key when prompted
            ```

        - ❌ **Local Development Setup**
            - Create `functions/.env` (gitignored):
                ```
                OPENAI_API_KEY=sk-proj-...your-key...
                OPENAI_MODEL=gpt-4o-mini
                ```
            - Add to `functions/.gitignore`:
                ```
                .env
                ```

    - **Requirements:**
        - ❌ OpenAI account created
        - ❌ API key generated
        - ❌ Secret configured in Firebase
        - ❌ OpenAI SDK installed

    - **Date:** TBD

### 3. Cloud Function Implementation

- ❌ **Create generateFlashcard Cloud Function**
    - **Description:** Implement the serverless function to call OpenAI API
    - **Branch:** `ChatGPT_Integration`
    - **Dependencies:**
        - ✅ Cloud Functions setup complete
        - ✅ OpenAI API configured

    - **Subtasks:**
        - ❌ **Implement Cloud Function**
            - **File:** `functions/src/index.ts`
            - **Function name:** `generateChineseFlashcard`
            - **HTTP trigger** (callable from frontend)
            - **CORS enabled** for frontend domain

        - ❌ **Add Request Validation**
            - Validate input structure
            - Require at least one field (Chinese/Pinyin/English)
            - Sanitize inputs

        - ❌ **Implement OpenAI API Call**
            - Use `gpt-4o-mini` model
            - Structured JSON output
            - Error handling and retries
            - Timeout handling (10 seconds max)

        - ❌ **Add Response Formatting**
            - Parse AI response
            - Validate output structure
            - Return standardized format

        - ❌ **Implement Rate Limiting** (Optional)
            - Limit requests per IP
            - Prevent abuse

    - **Sample Implementation:**
        ```typescript
        // functions/src/index.ts
        import * as functions from 'firebase-functions';
        import OpenAI from 'openai';

        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

        interface FlashcardInput {
          chineseWord?: string;
          pinyin?: string;
          englishWord?: string;
        }

        interface FlashcardOutput {
          chineseWord: string;
          pinyin: string;
          englishWord: string;
          confidence: 'high' | 'medium' | 'low';
          notes?: string;
        }

        export const generateChineseFlashcard = functions
          .region('us-central1')
          .https.onCall(async (data: FlashcardInput, context) => {
            // Validate input
            if (!data.chineseWord && !data.pinyin && !data.englishWord) {
              throw new functions.https.HttpsError(
                'invalid-argument',
                'At least one field (Chinese, Pinyin, or English) is required'
              );
            }

            const systemPrompt = `You are a Chinese language expert. Generate complete Chinese flashcard data from partial inputs.

            Rules:
            - Provide accurate Chinese characters, Pinyin (with tone marks), and English translation
            - If given Chinese, provide correct Pinyin and English
            - If given English, provide appropriate Chinese and Pinyin
            - If given Pinyin, provide correct Chinese and English
            - Use proper tone marks (ā á ǎ à)
            - Provide common/basic usage when multiple options exist
            - Return confidence level: high (certain), medium (likely), low (uncertain)

            Return ONLY valid JSON in this format:
            {
              "chineseWord": "你好",
              "pinyin": "Nǐ hǎo",
              "englishWord": "Hello",
              "confidence": "high",
              "notes": "Common greeting"
            }`;

            try {
              const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                  { role: 'system', content: systemPrompt },
                  { role: 'user', content: `Generate flashcard data from: ${JSON.stringify(data)}` }
                ],
                temperature: 0.3,
                max_tokens: 150,
                response_format: { type: 'json_object' }
              });

              const content = response.choices[0].message.content;
              if (!content) {
                throw new functions.https.HttpsError(
                  'internal',
                  'No response from ChatGPT'
                );
              }

              const parsed: FlashcardOutput = JSON.parse(content);

              // Validate response
              if (!parsed.chineseWord || !parsed.pinyin || !parsed.englishWord) {
                throw new functions.https.HttpsError(
                  'internal',
                  'Invalid response structure from ChatGPT'
                );
              }

              return parsed;
            } catch (error: any) {
              console.error('ChatGPT API error:', error);
              throw new functions.https.HttpsError(
                'internal',
                `Failed to generate flashcard: ${error.message}`
              );
            }
          });
        ```

    - **Requirements:**
        - ❌ Cloud Function implemented
        - ❌ Input validation working
        - ❌ OpenAI API integration functional
        - ❌ Error handling comprehensive

    - **Date:** TBD

### 4. Deploy and Test Cloud Function

- ❌ **Deploy Cloud Function to Firebase**
    - **Description:** Deploy function and test it works
    - **Branch:** `ChatGPT_Integration`
    - **Dependencies:**
        - ✅ Cloud Function implemented

    - **Subtasks:**
        - ❌ **Deploy Function**
            ```bash
            cd functions
            npm run build  # If using TypeScript
            firebase deploy --only functions
            ```

        - ❌ **Test Function**
            - Use Firebase Console Functions logs
            - Test with curl:
                ```bash
                curl -X POST \
                  https://us-central1-YOUR_PROJECT.cloudfunctions.net/generateChineseFlashcard \
                  -H "Content-Type: application/json" \
                  -d '{"data": {"englishWord": "Hello"}}'
                ```
            - Verify response structure

        - ❌ **Monitor Logs**
            ```bash
            firebase functions:log
            ```

        - ❌ **Test Edge Cases**
            - Empty input
            - Invalid characters
            - Very long inputs
            - API timeout scenarios

    - **Requirements:**
        - ❌ Function deployed successfully
        - ❌ Function accessible via HTTPS
        - ❌ Logs showing successful calls
        - ❌ Edge cases handled

    - **Date:** TBD

### 5. Frontend Integration

- ❌ **Integrate Cloud Function into Frontend**
    - **Description:** Call Cloud Function from React UI
    - **Branch:** `ChatGPT_Integration`
    - **Dependencies:**
        - ✅ Cloud Function deployed

    - **Subtasks:**
        - ❌ **Create Frontend Service**
            - **File:** `frontend/src/services/chatgptService.ts`
            - Use Firebase Functions SDK
            - Call `generateChineseFlashcard` function

        - ❌ **Install Firebase Functions SDK**
            ```bash
            cd frontend
            npm install firebase  # Already installed
            ```

        - ❌ **Implement Service**
            ```typescript
            // frontend/src/services/chatgptService.ts
            import { getFunctions, httpsCallable } from 'firebase/functions';

            const functions = getFunctions();
            const generateFlashcard = httpsCallable(functions, 'generateChineseFlashcard');

            export interface FlashcardInput {
              chineseWord?: string;
              pinyin?: string;
              englishWord?: string;
            }

            export interface FlashcardOutput {
              chineseWord: string;
              pinyin: string;
              englishWord: string;
              confidence: 'high' | 'medium' | 'low';
              notes?: string;
            }

            export async function generateChineseFlashcardData(
              input: FlashcardInput
            ): Promise<FlashcardOutput> {
              try {
                const result = await generateFlashcard(input);
                return result.data as FlashcardOutput;
              } catch (error: any) {
                console.error('Failed to generate flashcard:', error);
                throw new Error(error.message || 'Failed to generate flashcard');
              }
            }
            ```

        - ❌ **Update VocabCollection Component**
            - Add "Generate with AI" button
            - Call `generateChineseFlashcardData()`
            - Show loading state
            - Display generated data
            - Allow user to review/edit

        - ❌ **Add UI Feedback**
            - Loading spinner during generation
            - Success message with confidence level
            - Error message with retry option
            - Editable generated fields

    - **Requirements:**
        - ❌ Frontend service created
        - ❌ UI updated with AI generation
        - ❌ User can generate and review
        - ❌ Error handling in place

    - **Date:** TBD

### 6. Testing & Optimization

- ❌ **Test End-to-End Integration**
    - **Description:** Comprehensive testing of the entire flow
    - **Branch:** `ChatGPT_Integration`

    - **Subtasks:**
        - ❌ **Functional Testing**
            - Test various input combinations
            - Verify accuracy (90%+ target)
            - Test error scenarios
            - Validate response times

        - ❌ **Performance Testing**
            - Measure average response time (target: <4s)
            - Test concurrent requests
            - Monitor cold start times

        - ❌ **Cost Monitoring**
            - Track OpenAI API usage
            - Monitor Cloud Function invocations
            - Calculate cost per flashcard
            - Set up billing alerts

        - ❌ **User Testing**
            - Get feedback on AI generation quality
            - Test with non-technical users
            - Identify edge cases

    - **Requirements:**
        - ❌ 90%+ accuracy on common words
        - ❌ < 4 second average response time
        - ❌ Error handling works correctly
        - ❌ Cost tracking implemented

    - **Date:** TBD

### 7. Documentation

- ❌ **Document ChatGPT Integration**
    - **Description:** Create comprehensive documentation
    - **Branch:** `ChatGPT_Integration`

    - **Subtasks:**
        - ❌ **Update README**
            - Add ChatGPT integration section
            - Document Cloud Functions setup
            - Environment variable setup

        - ❌ **Create User Guide**
            - How to use AI generation
            - Tips for best results
            - What to do when AI makes mistakes

        - ❌ **Technical Documentation**
            - Cloud Function architecture
            - API costs and limits
            - Deployment instructions
            - Monitoring and logs

    - **Requirements:**
        - ❌ README updated
        - ❌ User guide complete
        - ❌ Technical docs available

    - **Date:** TBD

---

## Cost Analysis

### Combined Costs (OpenAI + Cloud Functions)

**Per Flashcard Generation:**
- OpenAI API: ~$0.002
- Cloud Function: ~$0.0004
- **Total:** ~$0.0024 per generation

### Monthly Scenarios

**Light Usage (50 cards/month):**
- OpenAI: $0.10
- Cloud Functions: $0.02
- **Total: ~$0.12/month**

**Medium Usage (500 cards/month):**
- OpenAI: $1.00
- Cloud Functions: $0.20
- **Total: ~$1.20/month**

**Heavy Usage (5,000 cards/month):**
- OpenAI: $10.00
- Cloud Functions: $2.00
- **Total: ~$12/month**

**Free Tier:**
- Cloud Functions: 2M invocations/month free
- Likely to stay within free tier for most usage

**Comparison:**
- **Firestore only:** $0-2/month
- **Firestore + ChatGPT + Functions:** $1-15/month
- **Backend server alternative:** $50-200/month ❌

---

## Success Criteria

- ✅ Users can generate flashcards from partial inputs
- ✅ AI accurately generates missing fields (90%+ accuracy)
- ✅ Response time < 4 seconds average
- ✅ API key secure (never exposed to client)
- ✅ Cost remains under $10/month for typical usage
- ✅ Documentation complete
- ✅ Production ready

---

## References

- **Main Task Overview:** [TASK.md](../TASK.md)
- **Firebase Integration:** [FIREBASE_DIRECT_INTEGRATION_TASK.md](FIREBASE_DIRECT_INTEGRATION_TASK.md)
- **Firebase Cloud Functions:** https://firebase.google.com/docs/functions
- **OpenAI API Docs:** https://platform.openai.com/docs/api-reference
- **Firebase Functions Secrets:** https://firebase.google.com/docs/functions/config-env
