import React from 'react';

const About: React.FC = () => {
  return (
    <div className="card">
      <h2>About WorldMap</h2>
      <p>
        WorldMap is a demonstration of a modern full-stack web application architecture
        that combines the power of Spring Boot for the backend with React and TypeScript for the frontend.
      </p>
      
      <h3>Technology Stack</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h4>Backend</h4>
          <ul>
            <li>Java 21</li>
            <li>Spring Boot 3.3.5</li>
            <li>Spring Web MVC</li>
            <li>Embedded Tomcat</li>
          </ul>
        </div>
        <div>
          <h4>Frontend</h4>
          <ul>
            <li>React 18</li>
            <li>TypeScript 5</li>
            <li>React Router</li>
            <li>Axios for HTTP requests</li>
            <li>Modern CSS</li>
          </ul>
        </div>
      </div>

      <h3>Build System</h3>
      <p>
        The project uses Gradle 9.1.0 with the Node.js plugin to seamlessly integrate
        the React build process with the Java application build. When you build
        the project, Gradle will:
      </p>
      <ol>
        <li>Install Node.js and npm dependencies</li>
        <li>Build the React TypeScript application</li>
        <li>Copy the built React files to Spring Boot's static resources</li>
        <li>Package everything into a single executable JAR</li>
      </ol>

      <h3>Features</h3>
      <ul>
        <li>Single-page application with client-side routing</li>
        <li>RESTful API endpoints with type safety</li>
        <li>Static file serving</li>
        <li>Development and production build support</li>
        <li>Hot reload during development</li>
        <li>TypeScript for enhanced developer experience</li>
      </ul>
    </div>
  );
};

export default About;