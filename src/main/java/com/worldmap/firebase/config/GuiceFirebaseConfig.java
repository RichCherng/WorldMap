package com.worldmap.firebase.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.worldmap.config.ApplicationConfig;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Guice-compatible Firebase configuration class that uses ApplicationConfig
 */
@Singleton
public class GuiceFirebaseConfig {

    private final ApplicationConfig applicationConfig;
    private volatile boolean initialized = false;

    @Inject
    public GuiceFirebaseConfig(ApplicationConfig applicationConfig) {
        this.applicationConfig = applicationConfig;
    }

    public synchronized void initialize() {
        if (initialized) {
            return;
        }

        try {
            // Check if Firebase app is already initialized
            if (FirebaseApp.getApps().isEmpty()) {
                String serviceAccountPath = applicationConfig.getFirebase().getServiceAccountPath();
                
                // Check if service account file exists
                if (serviceAccountPath == null || serviceAccountPath.contains("demo") || !java.nio.file.Files.exists(java.nio.file.Paths.get(serviceAccountPath))) {
                    System.out.println("⚠️  Firebase initialization skipped - no valid service account file found");
                    System.out.println("   Expected path: " + serviceAccountPath);
                    System.out.println("   Firebase features will use mock data");
                    initialized = true;
                    return;
                }
                
                InputStream serviceAccount = getServiceAccountStream();

                FirebaseOptions.Builder optionsBuilder = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount));

                FirebaseApp.initializeApp(optionsBuilder.build());
                
                System.out.println("✅ Firebase has been initialized successfully via Guice!");
                System.out.println("   Service Account Path: " + applicationConfig.getFirebase().getServiceAccountPath());
                System.out.println("   Project ID: " + applicationConfig.getFirebase().getProjectId());
                System.out.println("   Collection: " + applicationConfig.getFirebase().getCollection());
            }
            initialized = true;
        } catch (Exception e) {
            System.err.println("⚠️  Firebase initialization failed, continuing with mock data: " + e.getMessage());
            initialized = true; // Mark as initialized to prevent retries
        }
    }

    private InputStream getServiceAccountStream() throws IOException {
        String serviceAccountPath = applicationConfig.getFirebase().getServiceAccountPath();
        
        try {
            return new FileInputStream(serviceAccountPath);
        } catch (Exception e) {
            throw new IOException("Failed to load Firebase service account from file system path: " + serviceAccountPath + ". Error: " + e.getMessage(), e);
        }
    }

    public boolean isInitialized() {
        return initialized;
    }

    /**
     * Gets the configured Firebase collection name
     */
    public String getCollectionName() {
        return applicationConfig.getFirebase().getCollection();
    }

    /**
     * Gets the configured Firebase project ID
     */
    public String getProjectId() {
        return applicationConfig.getFirebase().getProjectId();
    }

    /**
     * Checks if Firebase should auto-initialize
     */
    public boolean shouldAutoInitialize() {
        return applicationConfig.getFirebase().isAutoInitialize();
    }

    /**
     * Gets the Firebase configuration for debugging/logging
     */
    public ApplicationConfig.Firebase getFirebaseConfig() {
        return applicationConfig.getFirebase();
    }
}