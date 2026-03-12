# Build stage
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app

# Copy the maven wrapper and pom.xml from backend
COPY backend/.mvn/ .mvn/
COPY backend/mvnw backend/mvnw.cmd backend/pom.xml ./
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline

# Copy the source code and build the application
COPY backend/src ./src
RUN ./mvnw clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8083

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
