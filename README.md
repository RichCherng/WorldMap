# WorldMap - Chinese Flashcard Learning App

A React web application for learning Chinese vocabulary with interactive flashcards, powered by a direct connection to Firebase/Firestore.

## 🏗️ Architecture

- **Frontend**: React 18 with TypeScript
- **Database**: Firebase/Firestore for data persistence
- **Build System**: Vite for fast development and optimized production builds
- **Data Fetching**: Direct communication with Firestore using the Firebase Web SDK.

## 📁 Project Structure

```
WorldMap/
├── frontend/
│   ├── package.json                      # Dependencies and scripts
│   ├── vite.config.ts                    # Vite configuration
│   ├── public/                           # Static assets
│   └── src/
│       ├── App.tsx                       # Main application component
│       ├── main.tsx                      # Application entry point
│       ├── Pages/                        # Page components
│       │   └── FlashCard/                # Flashcard feature
│       │       ├── VocabCollections/     # Vocabulary collections
│       │       └── components/           # Reusable flashcard UI components
│       ├── components/                   # Shared components
│       ├── services/                     # Firebase services & data logic
│       └── types/                        # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/WorldMap.git
cd WorldMap/frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

- Application runs on **http://localhost:3000**
- Hot module replacement for instant updates
- Open your browser and visit the URL shown in the terminal

### Production Build

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚢 Deployment to Firebase

### Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created at https://console.firebase.google.com

### Deploy Steps

1. **Build the React app**:
```bash
cd frontend
npm run build
```

2. **Login to Firebase** (first time only):
```bash
firebase login
```

3. **Deploy to Firebase Hosting**:
```bash
cd ..
firebase deploy --only hosting
```

### Clean Build & Deploy

Full rebuild and deploy:
```bash
cd frontend
rm -rf node_modules build
npm install
npm run build
cd ..
firebase deploy --only hosting
```

### Test Locally Before Deploy

Preview production build with Firebase:
```bash
firebase serve
```
Visit http://localhost:5000 to test

## ✨ Features

### Chinese Flashcard Learning

- **Vocabulary Collections**: Browse and study Chinese vocabulary flashcards
- **CRUD Operations**: Create, read, update, and delete flashcards
- **Pinyin Support**: Each card includes pinyin pronunciation guide
- **Image Support**: Optional images for visual learning
- **Real-time Sync**: Data persisted to Firebase/Firestore

### Data Model

Each flashcard contains:
```typescript
{
  id: string,
  chineseWord: string,    // e.g., "你好"
  englishWord: string,    // e.g., "Hello"
  pinyin: string,         // e.g., "nǐ hǎo"
  img?: string            // Optional image URL
}
```

## 🔧 Configuration

### Firebase Setup

To enable data persistence with Firebase/Firestore:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database in your Firebase console
3. Go to Project Settings → General → Your apps → Add web app
4. Copy the Firebase configuration object
5. Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

**Note**: The `.env` file is gitignored for security. Never commit your Firebase credentials.

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## 📦 Available npm Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Testing
- `npm test` - Run tests
- `npm run test:coverage` - Generate test coverage report

### Code Quality
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier

## 🎯 Key Technologies

- **React 18**: Modern UI with hooks and functional components
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Firebase/Firestore**: Cloud database for real-time data sync
- **React Router**: Client-side routing
- **CSS Modules**: Scoped styling

## 🛠️ Customization

### Adding New Pages

1. Create a new component in `frontend/src/Pages/`
2. Add the route in `App.tsx`:
   ```tsx
   import YourPage from './Pages/YourPage';

   // In your router configuration
   <Route path="/your-path" element={<YourPage />} />
   ```

### Styling

- **Global styles**: `frontend/src/index.css`
- **Component styles**: Use CSS modules (`.module.css`) for component-specific styles
- **Scoped styling**: Each component can have its own CSS module for isolation

### Adding New Features

1. Create service functions in `frontend/src/services/`
2. Create data layer functions in `frontend/src/data/`
3. Define TypeScript types in `frontend/src/types/`
4. Build UI components in `frontend/src/components/` or `frontend/src/Pages/`

## 📝 Notes

- Environment variables are loaded from `.env` files (not committed to git)
- Firebase credentials should never be committed to version control
- The application uses Vite for fast development and optimized production builds
- All dependencies are managed through npm/yarn
- TypeScript provides compile-time type checking for safer development

## 🔍 Troubleshooting

### Development Issues

- **Port already in use**:
  - Kill the process using port 5173: `lsof -ti:5173 | xargs kill -9`
  - Or change the port in `vite.config.ts`

- **Changes not appearing**:
  - Check that dev server is running
  - Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
  - Clear browser cache

- **Module not found errors**:
  - Delete `node_modules` and run `npm install` again
  - Check that all imports use correct paths
  - Ensure TypeScript paths are configured correctly in `tsconfig.json`

### Firebase Issues

- **Firebase connection errors**:
  - Verify `.env` file exists in `frontend/` directory
  - Check that all Firebase environment variables are set correctly
  - Ensure Firebase project is active in Firebase Console
  - Verify Firestore is enabled for your Firebase project

- **Authentication errors**:
  - Check Firebase API key is valid
  - Verify Firebase project ID matches your configuration

### Build Issues

- **Build fails**:
  - Run `npm run lint` to check for code errors
  - Check for TypeScript type errors
  - Ensure all dependencies are installed

- **Out of memory errors**:
  - Increase Node.js memory: `NODE_OPTIONS=--max_old_space_size=4096 npm run build`

## 💡 Development Tips

- **Hot Module Replacement**: Vite provides instant updates without full page reload
- **Component Development**: Build components in isolation before integrating
- **Type Safety**: Let TypeScript catch errors during development, not in production
- **Firebase Development**: Set up Firebase early to avoid data sync issues later
- **Code Organization**: Keep related files together (component + styles + types)
- **Browser DevTools**: Use React Developer Tools extension for debugging
- **Console Logging**: Remove console.logs before committing code

## 🎓 Learning Resources

- **React Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Vite Guide**: https://vitejs.dev/guide/
- **Firebase Documentation**: https://firebase.google.com/docs
- **Firestore Guide**: https://firebase.google.com/docs/firestore
- **React Router**: https://reactrouter.com/

---

This setup provides a solid foundation for building modern, responsive web applications with React, TypeScript, and Firebase! 🎉
