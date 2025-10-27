# WorldMap - Spring Boot + React Application

A full-stack web application that demonstrates the integration of Spring Boot (Java) backend with React frontend, built using Gradle.

## 🏗️ Architecture

- **Backend**: Spring Boot 3.2 with Java 17
- **Frontend**: React 18 with React Router
- **Build System**: Gradle with Node.js plugin
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

- Java 17 or higher
- Gradle 7.0 or higher (or use the Gradle wrapper)

### Development Mode

1. **Start the Spring Boot backend**:
   ```bash
   ./gradlew bootRun
   ```
   The backend will run on http://localhost:8080

2. **Start the React development server** (in a separate terminal):
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The React dev server will run on http://localhost:3000 with proxy to backend

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
spring.web.resources.static-locations=classpath:/static/
spring.web.resources.cache.period=3600
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

- `./gradlew bootRun` - Run Spring Boot application
- `./gradlew build` - Build entire application
- `./gradlew npmInstall` - Install React dependencies
- `./gradlew buildReact` - Build React application
- `./gradlew copyReactBuild` - Copy React build to Spring resources
- `./gradlew clean` - Clean build directories

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

- Ensure Java 17+ is installed and `JAVA_HOME` is set
- Check that Node.js tasks complete successfully during build
- Verify React build output exists in `frontend/build/`

### Runtime Issues

- Check that API endpoints return expected JSON
- Verify React routing configuration matches server-side fallbacks
- Ensure proxy configuration is correct for development mode

This setup provides a solid foundation for building full-stack applications with Spring Boot and React! 🎉
