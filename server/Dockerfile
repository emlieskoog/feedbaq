FROM openjdk:17-alpine

WORKDIR /spring-app

COPY /build/libs/feedbaq-0.0.1-SNAPSHOT.jar /spring-app

EXPOSE 8080

CMD ["java", "-jar", "feedbaq-0.0.1-SNAPSHOT.jar"]