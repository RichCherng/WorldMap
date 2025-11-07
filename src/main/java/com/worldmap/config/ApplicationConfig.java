package com.worldmap.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Compact application configuration properties.
 * Combines the benefits of @ConfigurationProperties with simplicity.
 */
@Component
@ConfigurationProperties(prefix = "app")
public class ApplicationConfig {

    private Server server = new Server();
    private Firebase firebase = new Firebase();
    private Logging logging = new Logging();
    private Features features = new Features();

    // Main getters/setters
    public Server getServer() { return server; }
    public void setServer(Server server) { this.server = server; }
    public Firebase getFirebase() { return firebase; }
    public void setFirebase(Firebase firebase) { this.firebase = firebase; }
    public Logging getLogging() { return logging; }
    public void setLogging(Logging logging) { this.logging = logging; }
    public Features getFeatures() { return features; }
    public void setFeatures(Features features) { this.features = features; }

    /** Server configuration */
    public static class Server {
        private int port = 8080;
        private String contextPath = "/";
        private String environment = "development";
        private boolean enableCors = true;

        public int getPort() { return port; }
        public void setPort(int port) { this.port = port; }
        public String getContextPath() { return contextPath; }
        public void setContextPath(String contextPath) { this.contextPath = contextPath; }
        public String getEnvironment() { return environment; }
        public void setEnvironment(String environment) { this.environment = environment; }
        public boolean isEnableCors() { return enableCors; }
        public void setEnableCors(boolean enableCors) { this.enableCors = enableCors; }
    }

    /** Firebase configuration */
    public static class Firebase {
        private String serviceAccountPath = "firebase-service-account.json";
        private String databaseUrl = "";
        private String projectId = "";
        private boolean autoInitialize = true;
        private String collection = "chinese_flash_cards";

        public String getServiceAccountPath() { return serviceAccountPath; }
        public void setServiceAccountPath(String serviceAccountPath) { this.serviceAccountPath = serviceAccountPath; }
        public String getDatabaseUrl() { return databaseUrl; }
        public void setDatabaseUrl(String databaseUrl) { this.databaseUrl = databaseUrl; }
        public String getProjectId() { return projectId; }
        public void setProjectId(String projectId) { this.projectId = projectId; }
        public boolean isAutoInitialize() { return autoInitialize; }
        public void setAutoInitialize(boolean autoInitialize) { this.autoInitialize = autoInitialize; }
        public String getCollection() { return collection; }
        public void setCollection(String collection) { this.collection = collection; }
    }

    /** Logging configuration */
    public static class Logging {
        private String level = "INFO";
        private boolean enableStartupBanner = true;
        private boolean enableColorOutput = true;

        public String getLevel() { return level; }
        public void setLevel(String level) { this.level = level; }
        public boolean isEnableStartupBanner() { return enableStartupBanner; }
        public void setEnableStartupBanner(boolean enableStartupBanner) { this.enableStartupBanner = enableStartupBanner; }
        public boolean isEnableColorOutput() { return enableColorOutput; }
        public void setEnableColorOutput(boolean enableColorOutput) { this.enableColorOutput = enableColorOutput; }
    }

    /** Feature flags */
    public static class Features {
        private boolean enableSampleData = true;
        private boolean enableFirestore = true;
        private boolean enableGuiceIntegration = true;
        private int maxRandomCards = 50;

        public boolean isEnableSampleData() { return enableSampleData; }
        public void setEnableSampleData(boolean enableSampleData) { this.enableSampleData = enableSampleData; }
        public boolean isEnableFirestore() { return enableFirestore; }
        public void setEnableFirestore(boolean enableFirestore) { this.enableFirestore = enableFirestore; }
        public boolean isEnableGuiceIntegration() { return enableGuiceIntegration; }
        public void setEnableGuiceIntegration(boolean enableGuiceIntegration) { this.enableGuiceIntegration = enableGuiceIntegration; }
        public int getMaxRandomCards() { return maxRandomCards; }
        public void setMaxRandomCards(int maxRandomCards) { this.maxRandomCards = maxRandomCards; }
    }
}