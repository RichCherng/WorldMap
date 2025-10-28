# WorldMap - Spring Boot + React Application

A full-stack web application that demonstrates the integration of Spring Boot (Java) backend with React frontend, built using Gradle.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.3.5 with Java 21
- **Frontend**: React 18 with React Router
- **Build System**: Gradle 9.1.0 with Node.js plugin
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
│   │   │   ├── WorldMapApplication.java      # Spring Boot main class
│   │   │   └── controller/
│   │   │       ├── HomeController.java       # Serves React routes
│   │   │       └── ApiController.java        # REST API endpoints
│   │   └── resources/
│   │       ├── application.properties        # Spring Boot configuration
│   │       └── static/                       # React build output (auto-generated)
│   └── test/java/com/worldmap/              # Java tests
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
gradle bootRun
```
- Spring Boot backend runs on **http://localhost:8080**
- Serves API endpoints and production static files
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
   - ✅ API calls automatically forwarded to Spring Boot

2. **For production testing**: Use **http://localhost:8080**
   - ✅ Tests the actual production build
   - ✅ Verifies static resource serving

### Alternative: Single Terminal Development

If you prefer rebuilding for each change:
```bash
gradle build && gradle bootRun
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

- **Client-side routing**: React Router handles `/`, `/home`, `/about`, `/contact`
- **Server-side fallback**: Spring Boot's `HomeController` forwards unmatched routes to `index.html`
- **API routes**: `/api/*` endpoints are handled by Spring Boot controllers

### API Endpoints

- `GET /api/hello` - Returns a greeting message with timestamp
- `GET /api/status` - Returns application status information

## 🔧 Configuration

### Spring Boot Configuration (`application.properties`)

```properties
server.port=8080
server.servlet.context-path=/

# Static resources configuration
spring.web.resources.static-locations=classpath:/static/
spring.web.resources.cache.period=3600

# Logging configuration
logging.level.com.worldmap=INFO
logging.level.root=WARN
logging.level.org.springframework.boot.web.embedded.tomcat=INFO

# Application name
spring.application.name=WorldMap

# Show startup info
spring.main.banner-mode=console
spring.output.ansi.enabled=always
```

### React Configuration (`package.json`)

```json
{
  "homepage": ".",
  "proxy": "http://localhost:8080"
}
```

## 🧪 Testing

Run Java tests:
```bash
./gradlew test
```

Run React tests:
```bash
cd frontend
npm test
```

## 📦 Available Gradle Tasks

### Development Tasks
- `gradle bootRun` - Run Spring Boot application (backend server)
- `gradle npm_start` - Run React development server with hot reloading
- `gradle clean` - Clean build directories

### Build Tasks
- `gradle build` - Build entire application (React + Spring Boot)
- `gradle npmInstall` - Install React dependencies only
- `gradle buildReact` - Build React application only
- `gradle copyReactBuild` - Copy React build to Spring resources

### Testing Tasks
- `gradle test` - Run Java tests
- `gradle npm_test` - Run React tests

## 🎯 Features Demonstrated

1. **Full-stack Integration**: Seamless communication between React and Spring Boot
2. **Single JAR Deployment**: Deploy both frontend and backend as one artifact
3. **Client-side Routing**: React Router with server-side fallback
4. **REST API**: JSON endpoints consumed by React
5. **Modern Build System**: Gradle + Node.js plugin integration
6. **Development Workflow**: Separate dev servers with proxy configuration

## 🛠️ Customization

### Adding New React Routes

1. Create a new component in `frontend/src/components/`
2. Add the route in `App.js`
3. Update `HomeController.java` to include the new route in the mapping

### Adding New API Endpoints

1. Add methods to `ApiController.java` or create new controller classes
2. Use the `/api/` prefix for API routes
3. React can call these endpoints using axios

### Styling

- Global styles: `frontend/src/index.css`
- Component-specific styles: Create CSS modules or styled-components

## 📝 Notes

- The React app is configured with `"homepage": "."` for proper routing in the JAR
- API calls use relative URLs that work both in development (with proxy) and production
- The build process automatically handles Node.js installation and React building
- All static assets are served by Spring Boot from the `static` directory

## 🔍 Troubleshooting

### Build Issues

- Ensure Java 21+ is installed and `JAVA_HOME` is set
- Check that Node.js tasks complete successfully during build
- Verify React build output exists in `frontend/build/`
- If Gradle daemon issues occur, try `gradle build --no-daemon`

### Development Issues

- **React changes not appearing**: Use http://localhost:3000 (dev server) not :8080
- **API calls failing**: Ensure Spring Boot backend is running on :8080
- **npm command not found**: Use `gradle npm_start` instead of `npm start`
- **Hot reload not working**: Restart the React dev server (`gradle npm_start`)

### Runtime Issues

- Check that API endpoints return expected JSON
- Verify React routing configuration matches server-side fallbacks
- Ensure proxy configuration is correct for development mode

## 💡 Development Tips

- **Hot Reloading**: Always use the dual terminal approach for active development
- **API Testing**: Backend runs independently on :8080 for API testing
- **Production Testing**: Build and test at :8080 before deployment
- **Port Conflicts**: Change ports in `application.properties` if needed

This setup provides a solid foundation for building full-stack applications with Spring Boot and React! 🎉
