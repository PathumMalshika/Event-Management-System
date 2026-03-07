# Ticket Service

This is the Ticket Service microservice for the Event Management System. It provides CRUD operations for ticket types (VIP, Regular, etc.) associated with events.

## Endpoints
- `POST /tickets` - Create a new ticket type
- `GET /tickets` - List all ticket types
- `GET /tickets/{id}` - Get ticket by ID
- `GET /tickets/event/{eventId}` - List tickets for a specific event
- `PUT /tickets/{id}` - Update ticket type
- `DELETE /tickets/{id}` - Delete ticket type

## Setup
1. Configure your database in `src/main/resources/application.properties`.
2. Build and run the service:
   ```
   mvn clean install
   mvn spring-boot:run
   ```

## Dependencies
- Spring Boot
- Spring Data JPA
- MySQL

## Author
Ticket Service Team

