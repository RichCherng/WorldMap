package com.worldmap.guice.modules;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.FirestoreClient;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.worldmap.firebase.config.GuiceFirebaseConfig;

/**
 * Guice module for Firebase-only bindings
 * Provides Firebase configuration and Firestore instance
 */
public class FirebaseModule extends AbstractModule {

    @Override
    protected void configure() {
        // Let Guice auto-discover the @Inject constructor
    }

    @Provides
    @Singleton
    public Firestore provideFirestore(GuiceFirebaseConfig firebaseConfig) {
        // Initialize Firebase if not already done
        firebaseConfig.initialize();
        
        try {
            // Try to get Firestore client
            if (!FirebaseApp.getApps().isEmpty()) {
                return FirestoreClient.getFirestore();
            } else {
                System.out.println("⚠️  Firebase not initialized, Firestore will be null (using mock data)");
                return null;
            }
        } catch (Exception e) {
            System.err.println("⚠️  Failed to get Firestore client: " + e.getMessage());
            return null;
        }
    }
}