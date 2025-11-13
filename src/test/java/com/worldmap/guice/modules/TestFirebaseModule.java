package com.worldmap.guice.modules;

import com.google.cloud.firestore.Firestore;
import com.google.inject.AbstractModule;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.worldmap.firebase.config.GuiceFirebaseConfig;

/**
 * Test-only Guice module that provides null Firestore for testing.
 * This module replaces FirebaseModule in tests to avoid real Firebase initialization.
 * 
 * Usage in tests:
 * <pre>
 * Injector injector = Guice.createInjector(
 *     new ApplicationConfigModule(),
 *     new TestFirebaseModule(),  // Use this instead of FirebaseModule
 *     new JerseyGuiceModule()
 * );
 * </pre>
 */
public class TestFirebaseModule extends AbstractModule {

    @Override
    protected void configure() {
        // No bindings needed - everything provided via provider methods
    }

    /**
     * Provides a mock GuiceFirebaseConfig that is safe for testing.
     * This config will not attempt to initialize Firebase.
     */
    @Provides
    @Singleton
    public GuiceFirebaseConfig provideGuiceFirebaseConfig(com.worldmap.config.ApplicationConfig config) {
        GuiceFirebaseConfig firebaseConfig = new GuiceFirebaseConfig(config);
        // Do NOT call initialize() - we want to avoid Firebase initialization in tests
        System.out.println("🧪 Test GuiceFirebaseConfig created (Firebase initialization skipped)");
        return firebaseConfig;
    }

    /**
     * Provides null Firestore for testing.
     * Controllers should handle null Firestore gracefully by using mock data.
     */
    @Provides
    @Singleton
    public Firestore provideFirestore() {
        System.out.println("🧪 Test Firestore provider returning null (mock data will be used)");
        return null;
    }
}
