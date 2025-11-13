# WorldMap - Jetty + Guice + React Application

A full-stack web application with Chinese flashcard learning features, built with Jetty, Google Guice, JAX-RS (Jersey), Firebase/Firestore, and React, using Gradle.

## 🏗️ Architecture

- **Backend**: Jetty 11 + Google Guice + JAX-RS (Jersey) with Java 21
- **Frontend**: React 18 with React Router
- **Database**: Firebase/Firestore for data persistence
- **API Contracts**: Protocol Buffers (protobuf) for type-safe APIs
- **Build System**: Gradle with Node.js plugin
- **Development**: Dual terminal setup with hot reloading
- **Packaging**: Single executable JAR with embedded React build

## 📁 Project Structure

```
WorldMap/
├── build.gradle                 # Main Gradle build configuration
├── settings.gradle             # Gradle settings
├── src/
│   ├── main/
│   │   ├── java/com/worldmap/
│   │   │   ├── WorldMapApplication.java      # Application entry point with Guice
│   │   │   ├── config/
│   │   │   │   └── ApplicationConfig.java    # Configuration POJO
│   │   │   ├── controller/
│   │   │   │   ├── ApiController.java        # System API endpoints
│   │   │   │   └── ChineseFlashCardController.java  # Flashcard CRUD endpoints
│   │   │   ├── guice/modules/
│   │   │   │   ├── ApplicationConfigModule.java     # Config DI module
│   │   │   │   ├── FirebaseModule.java              # Firebase/Firestore DI module
│   │   │   │   ├── JerseyGuiceModule.java           # JAX-RS integration module
│   │   │   │   └── WebServerModule.java             # Jetty server module
│   │   │   ├── firebase/
│   │   │   │   └── config/GuiceFirebaseConfig.java  # Firebase config
│   │   │   └── web/
│   │   │       └── WebServer.java            # Jetty server wrapper
│   │   └── resources/
│   │       ├── application.properties        # Application configuration
│   │       ├── firebase-service-account.json # Firebase credentials
│   │       ├── static/                       # React build output (auto-generated)
│   │       └── webapp/                       # Static web resources
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

### Development Mode (Recommended: Dual Terminal Approach)

For the best development experience with hot reloading:

#### Terminal 1 - Backend Server
```bash
gradle run
```
- Jetty backend runs on **http://localhost:8080**
- Serves API endpoints and production static files
- Firebase/Firestore enabled for data persistence
- You'll see a startup banner with local addresses

#### Terminal 2 - Frontend Development Server
```bash
gradle npm_start
```
- React dev server runs on **http://localhost:3000**
- Hot reloading for instant React changes
- Automatically proxies API calls to backend at :8080

### Development Workflow

1. **For active development**: Use **http://localhost:3000**
   - ✅ Instant hot reloading for React changes
   - ✅ Full React development tools support
   - ✅ API calls automatically forwarded to Jetty backend

2. **For production testing**: Use **http://localhost:8080**
   - ✅ Tests the actual production build
   - ✅ Verifies static resource serving

### Alternative: Single Terminal Development

If you prefer rebuilding for each change:
```bash
gradle build && gradle run
```
Visit http://localhost:8080 (rebuild required for React changes)

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

### API Documentation

The API is fully documented with Swagger/OpenAPI:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api/openapi.json

All endpoints include `@Tag`, `@Operation`, and `@Parameter` annotations for comprehensive documentation.

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

1. **Full-stack Integration**: Seamless communication between React and Jetty/JAX-RS backend
2. **Chinese Flashcard Learning**: Interactive flashcards with vocabulary management
3. **Firebase/Firestore Integration**: Real-time data persistence with fallback to mock data
4. **Dependency Injection**: Google Guice for clean, testable architecture
5. **Protocol Buffers**: Type-safe API contracts with code generation
6. **REST API**: JSON endpoints with CRUD operations consumed by React
7. **Single JAR Deployment**: Deploy both frontend and backend as one artifact
8. **Client-side Routing**: React Router with server-side fallback
9. **Modern Build System**: Gradle + Node.js plugin + Protobuf integration
10. **Development Workflow**: Separate dev servers with proxy configuration

## 🛠️ Customization

### Adding New React Routes

1. Create a new component in `frontend/src/components/` or `frontend/src/Pages/`
2. Add the route in `App.tsx`
3. Jetty automatically serves `index.html` for unmatched routes

### Adding New API Endpoints

1. Create a new controller class in `src/main/java/com/worldmap/controller/`
2. Annotate with `@Path`, `@Singleton`, and JAX-RS annotations (`@GET`, `@POST`, etc.)
3. Use the `/api/` prefix for API routes (configured in servlet mapping)
4. Inject dependencies via `@Inject` constructor parameter with Guice
5. React can call these endpoints using the service layer pattern

### Adding Protobuf Definitions

1. Create `.proto` files in the `proto/` directory
2. Define messages and services using proto3 syntax
3. Run `gradle generateProto` to generate Java classes
4. Generated classes will be in `build/generated/source/proto/main/java/`
5. Use generated classes for type-safe API development

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
- **Protobuf Updates**: Regenerate Java classes with `gradle generateProto` after modifying `.proto` files
- **TypeScript API Types**: Keep frontend TypeScript interfaces in sync with protobuf definitions

## 🎓 Learning Resources

- **JAX-RS Tutorial**: https://docs.oracle.com/javaee/7/tutorial/jaxrs.htm
- **Google Guice Guide**: https://github.com/google/guice/wiki/GettingStarted
- **Guice Dependency Injection (WorldMap)**: [docs/GUICE_DEPENDENCY_INJECTION.md](docs/GUICE_DEPENDENCY_INJECTION.md) - Comprehensive guide to DI patterns in this project
- **Protocol Buffers**: https://protobuf.dev/
- **Firebase/Firestore**: https://firebase.google.com/docs/firestore
- **React Router**: https://reactrouter.com/

This setup provides a solid foundation for building modern, scalable full-stack applications with Jetty, Guice, Firebase, and React! 🎉
