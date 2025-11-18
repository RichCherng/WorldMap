# WorldMap Frontend

## Firebase Setup

This project uses Firebase for direct Firestore access. To configure Firebase:

1. Copy `.env.example` to `.env.development` and `.env.production`.
2. Fill in your Firebase project credentials for each environment variable:
    - `REACT_APP_FIREBASE_API_KEY`
    - `REACT_APP_FIREBASE_AUTH_DOMAIN`
    - `REACT_APP_FIREBASE_PROJECT_ID`
    - `REACT_APP_FIREBASE_STORAGE_BUCKET`
    - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
    - `REACT_APP_FIREBASE_APP_ID`
3. These files are ignored by git for security.

## Firebase Initialization

Firebase is initialized in `src/config/firebase.ts` using environment variables. Firestore is available via the exported `db` object.

## Legacy gRPC

The gRPC URL is still present in environment files for migration purposes. It will be removed after migration is complete.

## References
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
