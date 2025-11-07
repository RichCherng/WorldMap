package com.worldmap.guice.modules;

import com.google.cloud.firestore.Firestore;
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
        // Need explicit binding since it's used as dependency in @Provides method
        bind(GuiceFirebaseConfig.class).in(Singleton.class);
    }

    @Provides
    @Singleton
    public Firestore provideFirestore(GuiceFirebaseConfig firebaseConfig) {
        // Initialize Firebase if not already done
        firebaseConfig.initialize();
        return FirestoreClient.getFirestore();
    }
}