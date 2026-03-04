# Check-In-Service

A microservice for managing check-ins in the Event Management System. This service is responsible for validating tickets, preventing duplicate check-ins, and recording check-in timestamps.

## Features

- **Ticket Validation**: Validates tickets using ticketId and eventId
- **Duplicate Prevention**: Prevents duplicate check-ins for the same ticket at the same event
- **Status Management**: Marks ticket status as CHECKED_IN
- **Timestamp Recording**: Stores check-in timestamp in UTC
- **RESTful API**: Provides REST endpoints for check-in operations
- **Error Handling**: Comprehensive exception handling with meaningful error messages

## API Endpoints

### 1. Check-In a Ticket
**Endpoint**: `POST /checkin`

**Request Body**:
```json
{
  "ticketId": 1,
  "eventId": 101
}
```

**Response** (HTTP 200 OK):
```json
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45",
  "status": "CHECKED_IN",
  "message": "Check-in successful"
}
```

**Error Responses**:
- **400 Bad Request**: Invalid input (missing or invalid ticketId/eventId)
- **400 Bad Request**: Duplicate check-in attempt

### 2. Get Check-In Details by Ticket ID
**Endpoint**: `GET /checkin/{ticketId}`

**Response** (HTTP 200 OK):
```json
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45",
  "status": "CHECKED_IN",
  "message": "Check-in details retrieved"
}
```

**Error Responses**:
- **404 Not Found**: No check-in record found for the ticket

### 3. Get Check-In Details by Ticket and Event
**Endpoint**: `GET /checkin/{ticketId}/{eventId}`

**Response** (HTTP 200 OK):
```json
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45",
  "status": "CHECKED_IN",
  "message": "Check-in details retrieved"
}
```

**Error Responses**:
- **404 Not Found**: No check-in record found

### 4. Verify Check-In Status
**Endpoint**: `GET /checkin/verify/{ticketId}/{eventId}`

**Response** (HTTP 200 OK):
```json
{
  "ticketId": 1,
  "eventId": 101,
  "isCheckedIn": true,
  "message": "Ticket is already checked in"
}
```

### 5. Health Check
**Endpoint**: `GET /checkin/health`

**Response** (HTTP 200 OK):
```json
{
  "status": "UP",
  "service": "Check-In-Service"
}
```

## Project Structure

```
Check-In-Service/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/eventmanagementsystem/checkin_service/checkin_service/
│   │   │       ├── CheckInServiceApplication.java        (Main Spring Boot app)
│   │   │       ├── Controller/
│   │   │       │   └── CheckInController.java            (REST endpoints)
│   │   │       ├── Service/
│   │   │       │   ├── CheckInService.java               (Service interface)
│   │   │       │   └── CheckInServiceImpl.java            (Service implementation)
│   │   │       ├── Entity/
│   │   │       │   └── CheckIn.java                      (JPA entity)
│   │   │       ├── Repository/
│   │   │       │   └── CheckInRepository.java            (Data access layer)
│   │   │       ├── DTO/
│   │   │       │   ├── CheckInRequest.java               (Request DTO)
│   │   │       │   └── CheckInResponse.java              (Response DTO)
│   │   │       └── Exception/
│   │   │           ├── CheckInException.java             (Base exception)
│   │   │           ├── DuplicateCheckInException.java    (Duplicate check-in)
│   │   │           └── InvalidCheckInException.java      (Invalid input)
│   │   └── resources/
│   │       └── application.properties                    (Configuration)
│   └── test/
│       └── java/
│           └── com/eventmanagementsystem/checkin_service/checkin_service/
│               └── CheckInServiceApplicationTests.java
├── pom.xml                                               (Maven configuration)
├── mvnw                                                  (Maven wrapper)
└── mvnw.cmd                                              (Maven wrapper for Windows)
```

## Technology Stack

- **Java**: 21
- **Spring Boot**: 4.0.2
- **Spring Data JPA**: For database operations
- **H2 Database**: In-memory database for development
- **Maven**: Build automation tool

## Building the Service

### Prerequisites
- Java 21 or higher
- Maven 3.6+ or use the provided Maven wrapper

### Build Commands

```bash
# Clean and build
mvn clean install

# Build without running tests
mvn clean install -DskipTests

# Run tests
mvn test

# Run the application
mvn spring-boot:run
```

## Configuration

The service uses `application.properties` for configuration:

```properties
# Server port
server.port=8086

# Database configuration
spring.datasource.url=jdbc:h2:mem:checkindb
spring.datasource.username=sa
spring.datasource.password=pwd

# JPA/Hibernate configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console (for development)
spring.h2.console.enabled=true
```

## Database Schema

The Check-In service uses H2 in-memory database with the following table:

```sql
CREATE TABLE check_in (
    check_in_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticket_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    check_in_timestamp TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    UNIQUE KEY unique_ticket_event (ticket_id, event_id)
);
```

## Exception Handling

The service provides custom exceptions for better error handling:

1. **CheckInException**: Base exception for all check-in related errors
2. **DuplicateCheckInException**: Thrown when attempting to check in an already checked-in ticket
3. **InvalidCheckInException**: Thrown when validation fails (invalid IDs, missing data, etc.)

## Validation Rules

1. **Required Fields**: ticketId and eventId are mandatory
2. **Positive Numbers**: Both ticketId and eventId must be positive integers
3. **Unique Check-In**: A ticket can only be checked in once per event
4. **Timestamp**: Check-in timestamp is automatically set to current UTC time

## Future Enhancements

- Integration with Ticket_Service for ticket validation
- Integration with Event_Service for event validation
- Check-in statistics and analytics
- Bulk check-in operations
- Check-out functionality
- Webhook notifications on check-in
- API rate limiting and security

## Notes

- The service follows the existing architecture pattern of other services in the Event Management System
- It uses the same package naming convention and project structure
- The service maintains consistency with current Spring Boot version (4.0.2)
- No modifications were made to existing services

