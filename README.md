# WorldMap - gRPC + Guice + React Application

A full-stack web application with Chinese flashcard learning features, built with gRPC, Google Guice, Protocol Buffers, Firebase/Firestore, and React, using Gradle.

## 🏗️ Architecture

- **Backend**: gRPC Server + Google Guice with Java 21
- **Frontend**: React 18 with gRPC-Web client
- **Database**: Firebase/Firestore for data persistence
- **API Protocol**: gRPC with Protocol Buffers for type-safe communication
- **Build System**: Gradle with Node.js and Protobuf plugins
- **Development**: Separate frontend and backend servers
- **API Testing**: grpcui (web-based gRPC testing tool, similar to Swagger)

## 📁 Project Structure

```
WorldMap/
├── build.gradle                 # Main Gradle build configuration
├── settings.gradle             # Gradle settings
├── proto/
│   └── chinese_card.proto      # Protocol Buffer definitions for Chinese flashcards
├── src/
│   ├── main/
│   │   ├── java/com/worldmap/
│   │   │   ├── WorldMapApplication.java      # Application entry point with Guice
│   │   │   ├── config/
│   │   │   │   └── ApplicationConfig.java    # Configuration POJO
│   │   │   ├── grpc/
│   │   │   │   └── GrpcServer.java           # Centralized gRPC server
│   │   │   ├── service/
│   │   │   │   └── FirestoreService.java     # Generic Firestore service layer
│   │   │   ├── guice/modules/
│   │   │   │   ├── ApplicationConfigModule.java     # Config DI module
│   │   │   │   ├── FirebaseModule.java              # Firebase/Firestore DI module
│   │   │   │   └── GrpcModule.java                  # gRPC server module
│   │   │   └── firebase/
│   │   │       └── config/GuiceFirebaseConfig.java  # Firebase config
│   │   └── resources/
│   │       ├── application.properties        # Application configuration
│   │       └── firebase-service-account.json # Firebase credentials
│   └── test/
│       ├── resources/
│       │   └── application.properties        # Test configuration (Firebase disabled)
│       └── java/com/worldmap/
│           ├── guice/modules/
│           │   ├── TestFirebaseModule.java   # Test helper for null Firestore
│           │   ├── ApplicationConfigModuleTest.java
│           │   ├── FirebaseModuleTest.java
│           │   ├── JerseyGuiceModuleTest.java
│           │   └── WebServerModuleTest.java
│           └── controller/
│               └── ApiControllerTest.java
├── docs/
│   └── GUICE_DEPENDENCY_INJECTION.md        # DI patterns documentation
└── frontend/
    ├── package.json                         # React dependencies
    ├── public/
    │   ├── index.html                       # React HTML template
    │   └── manifest.json                    # PWA manifest
    └── src/
        ├── App.js                           # Main React component
        ├── index.js                         # React entry point
        ├── index.css                        # Global styles
        └── components/
            ├── Navigation.js                # Navigation component
            ├── Home.js                      # Home page with API demo
            ├── About.js                     # About page
            └── Contact.js                   # Contact form demo
```

## 🚀 Getting Started

### Prerequisites

- Java 21 or higher
- Gradle 9.0 or higher (or use the Gradle wrapper)

### Running the Backend (gRPC Server)

Start the gRPC server:
```bash
gradle run
```

- gRPC server runs on **localhost:8080**
- Serves gRPC API endpoints
- Firebase/Firestore enabled for data persistence
- You'll see a startup banner with server information

### Running the Frontend (Development)

The frontend will be served separately using Vite dev server (to be configured):
```bash
cd frontend
npm run dev
```

- React dev server runs on **http://localhost:3000** (or configured port)
- Hot reloading for instant React changes
- Connects to gRPC server at localhost:8080 via gRPC-Web

### Production Build

Build the entire application (React + Spring Boot) into a single JAR:

```bash
./gradlew build
```

Run the production JAR:

```bash
java -jar build/libs/WorldMap-0.0.1-SNAPSHOT.jar
```

Visit http://localhost:8080 to see the application.

## 🔧 How It Works

### Build Process

1. **Gradle Node Plugin**: Downloads Node.js and npm automatically
2. **React Build**: Runs `npm install` and `npm run build` in the frontend directory
3. **Static Resources**: Copies React build output to `src/main/resources/static/`
4. **JAR Packaging**: Includes React build in the final Spring Boot JAR

### Routing

- **Client-side routing**: React Router handles `/`, `/home`, `/about`, `/contact`, `/flashcard`
- **Server-side fallback**: Jetty serves unmatched routes with `index.html` for React routing
- **API routes**: `/api/*` endpoints are handled by JAX-RS (Jersey) controllers with Guice injection

### gRPC Server Details

The application uses a centralized gRPC server that:
- Hosts all gRPC services on a single port (8080)
- Enables gRPC Server Reflection for service discovery
- Supports dynamic service registration via Guice dependency injection
- Follows industry-standard patterns used by Google, Uber, and Netflix

### API Testing with grpcui

grpcui provides a web-based interface for testing gRPC services (similar to Swagger UI for REST APIs):

Install grpcui (Go-based tool):
```bash
go install github.com/fullstorydev/grpcui/cmd/grpcui@latest
```

Run grpcui to test the gRPC server:
```bash
grpcui -plaintext localhost:8080
```

This will:
- Auto-discover all gRPC services via Server Reflection
- Provide an interactive web UI for testing RPC methods
- Display request/response messages in readable format
- Update automatically when protobuf definitions change

### API Endpoints

#### General API
- `GET /api/hello` - Returns a greeting message with timestamp
- `GET /api/status` - Returns application status information
- `GET /api/status/firebase` - Check Firebase connection status

#### Chinese Flashcard API (`/api/flashcards/chinese`)

All endpoints return JSON responses with the following structure:
```json
{
  "success": true/false,
  "data": {...},
  "message": "...",
  "error": "..." // only present on errors
}
```

**CRUD Operations:**

- `GET /api/flashcards/chinese` - Get all Chinese flashcards
  - Query params: `page` (default: 1), `pageSize` (default: 50)
  - Returns: List of flashcards with `totalCount`
  - Supports mock data when Firebase is not configured

- `GET /api/flashcards/chinese/{id}` - Get a single flashcard by ID
  - Path param: `id` (long)
  - Returns: Single flashcard object

- `POST /api/flashcards/chinese` - Create a new flashcard
  - Request body:
    ```json
    {
      "chineseWord": "你好",
      "englishWord": "Hello",
      "pinyin": "nǐ hǎo",
      "img": "https://..." // optional
    }
    ```
  - Validates required fields (chineseWord, englishWord, pinyin)
  - Returns: Created flashcard with generated ID

- `PUT /api/flashcards/chinese/{id}` - Update an existing flashcard
  - Path param: `id` (long)
  - Request body: Same as POST (all fields)
  - Returns: Updated flashcard object

- `DELETE /api/flashcards/chinese/{id}` - Delete a flashcard
  - Path param: `id` (long)
  - Returns: Success message

**Data Management:**

- `POST /api/flashcards/chinese/initialize` - Initialize Firebase with default data
  - Checks if data already exists in Firebase/Firestore
  - If empty, populates with 15 default Chinese vocabulary cards
  - Returns detailed response with `initialized`, `cardsAdded`, `cardsFailed`, `errors`
  - Only works when Firebase is properly configured

**Data Model:**
```typescript
{
  id: number,
  chineseWord: string,  // e.g., "你好"
  englishWord: string,  // e.g., "Hello"
  pinyin: string,       // e.g., "nǐ hǎo"
  img?: string          // Optional image URL
}
```

## 🔧 Configuration

### Application Configuration (`application.properties`)

```properties
# Server configuration
server.port=8080
server.host=0.0.0.0

# Firebase configuration
firebase.enabled=true
firebase.credentials.path=src/main/resources/firebase-credentials.json
firebase.database.url=https://worldmap-default-rtdb.firebaseio.com

# Guice configuration
guice.native.integration=true

# Application info
app.name=WorldMap
app.version=0.0.1-SNAPSHOT
app.environment=development
```

### Firebase Setup

To enable Firebase/Firestore integration:

1. Create a Firebase project at https://console.firebase.google.com
2. Generate a service account key (JSON)
3. Place the credentials file at `src/main/resources/firebase-credentials.json`
4. Update `firebase.database.url` in `application.properties`
5. Firestore will be automatically initialized on startup

**Note**: The application works with mock data if Firebase is not configured.

### React Configuration (`package.json`)

```json
{
  "homepage": ".",
  "proxy": "http://localhost:8080"
}
```

## 🧪 Testing

### Backend Testing

The backend includes comprehensive unit tests for all Guice modules and controllers:

```bash
gradle test
```

**Test Coverage:**
- ✅ 59 unit tests across 5 test files
- ✅ ApplicationConfigModuleTest (9 tests) - Configuration loading and binding
- ✅ FirebaseModuleTest (8 tests) - Firestore provider and initialization
- ✅ JerseyGuiceModuleTest (10 tests) - JAX-RS integration with Guice
- ✅ WebServerModuleTest (11 tests) - Jetty server configuration
- ✅ ApiControllerTest (11 tests) - API endpoint behavior

**Test Configuration:**
- Firebase is disabled in tests (`src/test/resources/application.properties`)
- TestFirebaseModule provides null Firestore safely for testing
- Real ResourceConfig instances used (not mocked) for Jersey integration tests
- Controllers tested for correct response structure and HTTP behavior

View test results:
```bash
open build/reports/tests/test/index.html
```

### Frontend Testing

Run React tests:
```bash
cd frontend
npm test
```

## 📦 Available Gradle Tasks

### Development Tasks
- `gradle run` - Run Jetty application (backend server)
- `gradle npm_start` - Run React development server with hot reloading
- `gradle clean` - Clean build directories

### Build Tasks
- `gradle build` - Build entire application (React + Jetty)
- `gradle generateProto` - Generate Java classes from protobuf definitions
- `gradle npmInstall` - Install React dependencies only
- `gradle buildReact` - Build React application only
- `gradle copyReactBuild` - Copy React build to static resources

### Testing Tasks
- `gradle test` - Run Java tests
- `gradle npm_test` - Run React tests

## 🎯 Features Demonstrated

1. **gRPC Architecture**: Modern RPC framework with Protocol Buffers for efficient communication
2. **Chinese Flashcard Learning**: Interactive flashcards with vocabulary management (to be implemented)
3. **Firebase/Firestore Integration**: Real-time data persistence with generic service layer
4. **Dependency Injection**: Google Guice for clean, testable architecture
5. **Protocol Buffers**: Type-safe API contracts with automatic code generation
6. **gRPC Server Reflection**: Auto-discovery for tools like grpcui
7. **Centralized Server**: Single gRPC server hosting multiple services
8. **Type-Safe APIs**: Shared protobuf definitions between backend (Java) and frontend (TypeScript)
9. **Modern Build System**: Gradle + Node.js plugin + Protobuf integration
10. **Scalable Architecture**: Industry-standard patterns for microservices-ready applications

## 🏛️ gRPC Architecture

### Overview

The application has been migrated from a REST/Jetty architecture to a modern gRPC-based architecture for improved performance and type safety.

**Key Components:**

1. **GrpcServer** ([src/main/java/com/worldmap/grpc/GrpcServer.java](src/main/java/com/worldmap/grpc/GrpcServer.java))
   - Centralized server hosting all gRPC services
   - Runs on port 8080 (configurable via `application.properties`)
   - Automatically registers services via Guice injection
   - Enables gRPC Server Reflection for grpcui support

2. **GrpcModule** ([src/main/java/com/worldmap/guice/modules/GrpcModule.java](src/main/java/com/worldmap/guice/modules/GrpcModule.java))
   - Guice module for gRPC server configuration
   - Uses Multibinder for dynamic service registration
   - Provides GrpcServer as a singleton

3. **Protocol Buffers** ([proto/](proto/))
   - Define message types and service interfaces
   - Generate type-safe Java classes and TypeScript types
   - Ensure frontend and backend use identical data structures

**Benefits:**
- **Performance**: Binary protocol, smaller payloads, HTTP/2 support
- **Type Safety**: Compile-time validation of API contracts
- **Code Generation**: Automatic client/server code from protobuf definitions
- **Streaming**: Support for bidirectional streaming (future enhancement)
- **Interoperability**: Works across languages and platforms

### Adding New gRPC Services

1. **Define the protobuf service** in `proto/your_service.proto`:
   ```protobuf
   syntax = "proto3";

   package worldmap.yourservice;

   service YourService {
     rpc GetData(GetDataRequest) returns (GetDataResponse);
   }

   message GetDataRequest {
     string id = 1;
   }

   message GetDataResponse {
     bool success = 1;
     string data = 2;
   }
   ```

2. **Generate Java classes**:
   ```bash
   gradle generateProto
   ```

3. **Implement the gRPC service** in `src/main/java/com/worldmap/grpc/`:
   ```java
   @Singleton
   public class YourGrpcService extends YourServiceGrpc.YourServiceImplBase {

       @Inject
       public YourGrpcService(/* dependencies */) {
           // Constructor injection
       }

       @Override
       public void getData(GetDataRequest request, StreamObserver<GetDataResponse> responseObserver) {
           // Implementation
       }
   }
   ```

4. **Register the service** in GrpcModule by uncommenting and using Multibinder:
   ```java
   Multibinder.newSetBinder(binder(), BindableService.class)
       .addBinding().to(YourGrpcService.class);
   ```

5. **Generate TypeScript types** for frontend:
   ```bash
   cd frontend && npm run generate:proto
   ```

## 🛠️ Customization

### Adding New React Routes

1. Create a new component in `frontend/src/components/` or `frontend/src/Pages/`
2. Add the route in `App.tsx`
3. Frontend is served independently via Vite dev server

### Protocol Buffers (Protobuf)

The project uses Protocol Buffers for type-safe API contracts between backend and frontend.

#### Current Protobuf Definitions

**Chinese FlashCard API** ([proto/chinese_card.proto](proto/chinese_card.proto))
- Package: `worldmap.flashcard`
- Messages: `ChineseFlashCard`, request/response types for CRUD operations
- Service: `ChineseFlashCardService`
- Generated Java classes: `build/generated/source/proto/main/java/com/worldmap/flashcard/`
- Generated TypeScript types: `frontend/src/types/proto/chinese_flashcard.d.ts`

#### Backend: Generate Java Classes from Protobuf

1. Create or modify `.proto` files in the `proto/` directory
2. Define messages and services using proto3 syntax
3. Run the following command to generate Java classes:
   ```bash
   gradle generateProto
   ```
4. Generated classes will be available in:
   ```
   build/generated/source/proto/main/java/com/worldmap/flashcard/
   ```
5. Use generated classes in your Java code for type-safe API development

#### Frontend: Generate TypeScript Types from Protobuf

1. Make sure protobuf dependencies are installed (already configured in `frontend/package.json`)
2. Run the following command to generate TypeScript types:
   ```bash
   cd frontend
   npm run generate:proto
   ```
3. Generated TypeScript definitions will be available in:
   ```
   frontend/src/types/proto/chinese_flashcard.d.ts
   frontend/src/types/proto/chinese_flashcard.js
   ```
4. Import and use the types in your React/TypeScript code:
   ```typescript
   import { worldmap } from './types/proto/chinese_flashcard';

   // Use the generated types
   const flashcard: worldmap.flashcard.IChineseFlashCard = {
     id: 1,
     chineseWord: "你好",
     englishWord: "Hello",
     pinyin: "nǐ hǎo"
   };
   ```

#### Keeping Backend and Frontend in Sync

After updating any `.proto` file:
1. **Regenerate Java classes**: `gradle generateProto`
2. **Regenerate TypeScript types**: `cd frontend && npm run generate:proto`
3. This ensures both backend and frontend use the same data structures

### Styling

- Global styles: `frontend/src/index.css`
- Component-specific styles: Create CSS modules or styled-components

## 📝 Notes

- The React app is configured with `"homepage": "."` for proper routing in the JAR
- API calls use relative URLs that work both in development (with proxy) and production
- The build process automatically handles Node.js installation, React building, and protobuf generation
- All static assets are served by Jetty from the `webapp` directory
- Firebase credentials are loaded from `application.properties` configuration
- Mock data is used when Firebase is not configured, allowing development without database setup
- Protobuf definitions in `proto/` are automatically compiled during the build process

## 🔍 Troubleshooting

### Build Issues

- Ensure Java 21+ is installed and `JAVA_HOME` is set
- Check that Node.js tasks complete successfully during build
- Verify React build output exists in `frontend/build/`
- If Gradle daemon issues occur, try `gradle build --no-daemon`

### Development Issues

- **React changes not appearing**: Use http://localhost:3000 (dev server) not :8080
- **API calls failing**: Ensure Jetty backend is running on :8080
- **npm command not found**: Use `gradle npm_start` instead of `npm start`
- **Hot reload not working**: Restart the React dev server (`gradle npm_start`)
- **Protobuf classes not found**: Run `gradle generateProto` to generate Java classes

### Runtime Issues

- **Firebase errors**: Check that `firebase-credentials.json` exists and is valid
- **Mock data used instead of Firebase**: Verify Firebase configuration in `application.properties`
- **API endpoints returning 404**: Ensure controllers are in the correct package and annotated properly
- **Guice injection failing**: Check that `@Inject` constructors are properly defined
- Verify React routing configuration matches server-side fallbacks
- Ensure proxy configuration is correct for development mode

## 💡 Development Tips

- **Hot Reloading**: Always use the dual terminal approach for active development
- **API Testing**: Backend runs independently on :8080 for API testing with tools like Postman
- **Production Testing**: Build and test at :8080 before deployment
- **Port Conflicts**: Change `server.port` in `application.properties` if needed
- **Firebase Development**: Use mock data mode during initial development, then connect Firebase later
- **Protobuf Updates**: After modifying `.proto` files:
  - Backend: `gradle generateProto` (regenerates Java classes)
  - Frontend: `cd frontend && npm run generate:proto` (regenerates TypeScript types)
- **TypeScript API Types**: Auto-generated from protobuf - always in sync with backend

## 🎓 Learning Resources

- **JAX-RS Tutorial**: https://docs.oracle.com/javaee/7/tutorial/jaxrs.htm
- **Google Guice Guide**: https://github.com/google/guice/wiki/GettingStarted
- **Guice Dependency Injection (WorldMap)**: [docs/GUICE_DEPENDENCY_INJECTION.md](docs/GUICE_DEPENDENCY_INJECTION.md) - Comprehensive guide to DI patterns in this project
- **Protocol Buffers**: https://protobuf.dev/
- **Firebase/Firestore**: https://firebase.google.com/docs/firestore
- **React Router**: https://reactrouter.com/

This setup provides a solid foundation for building modern, scalable full-stack applications with Jetty, Guice, Firebase, and React! 🎉
