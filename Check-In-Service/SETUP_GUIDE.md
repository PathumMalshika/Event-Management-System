# Check-In-Service Setup Guide

## Prerequisites

- **Java**: Version 21 or higher
- **Maven**: Version 3.6.0 or higher (or use Maven wrapper)
- **Git**: For version control
- **IDE**: IntelliJ IDEA, Eclipse, VS Code (optional)

## Project Structure

```
Check-In-Service/
├── .mvn/                                    # Maven wrapper configuration
├── src/
│   ├── main/
│   │   ├── java/com/eventmanagementsystem/checkin_service/
│   │   │   └── checkin_service/
│   │   │       ├── CheckInServiceApplication.java
│   │   │       ├── Controller/
│   │   │       │   └── CheckInController.java
│   │   │       ├── Service/
│   │   │       │   ├── CheckInService.java
│   │   │       │   └── CheckInServiceImpl.java
│   │   │       ├── Entity/
│   │   │       │   └── CheckIn.java
│   │   │       ├── Repository/
│   │   │       │   └── CheckInRepository.java
│   │   │       ├── DTO/
│   │   │       │   ├── CheckInRequest.java
│   │   │       │   └── CheckInResponse.java
│   │   │       └── Exception/
│   │   │           ├── CheckInException.java
│   │   │           ├── DuplicateCheckInException.java
│   │   │           └── InvalidCheckInException.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/com/eventmanagementsystem/checkin_service/
│           └── checkin_service/
│               └── CheckInServiceApplicationTests.java
├── pom.xml                                  # Maven configuration
├── mvnw                                     # Maven wrapper (Linux/Mac)
├── mvnw.cmd                                 # Maven wrapper (Windows)
├── README.md                                # Project overview
├── API_DOCUMENTATION.md                     # API documentation
├── SETUP_GUIDE.md                           # This file
└── .gitignore                               # Git ignore rules

```

## Setup Instructions

### 1. Clone and Navigate to Project

```bash
# Clone the repository (if not already done)
git clone https://github.com/PathumMalshika/Event-Management-System.git
cd Event-Management-System

# Checkout Check-In-Service branch
git checkout Check-In-Service
cd Check-In-Service
```

### 2. Build the Project

#### Using Maven Wrapper (Recommended)

**Windows**:
```bash
mvnw.cmd clean install
```

**Linux/Mac**:
```bash
./mvnw clean install
```

#### Using Maven (if installed)

```bash
mvn clean install
```

### 3. Run the Service

#### Using Maven

**Windows**:
```bash
mvnw.cmd spring-boot:run
```

**Linux/Mac**:
```bash
./mvnw spring-boot:run
```

#### Using Maven
```bash
mvn spring-boot:run
```

#### Using IDE

- Open the project in your IDE
- Navigate to `CheckInServiceApplication.java`
- Right-click and select "Run"

### 4. Verify Service is Running

Once started, you should see output similar to:
```
2026-03-04 12:00:00.000  INFO 12345 --- [main] c.e.checkin_service.CheckInServiceApplication : Started CheckInServiceApplication in 5.123 seconds
```

Test the service with:
```bash
curl http://localhost:8086/checkin/health
```

Expected response:
```json
{
  "status": "UP",
  "service": "Check-In-Service"
}
```

## Configuration

### Application Properties

File: `src/main/resources/application.properties`

```properties
# Service name
spring.application.name=Check-In-Service

# Server port
server.port=8086

# H2 Database configuration
spring.datasource.url=jdbc:h2:mem:checkindb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=pwd

# JPA/Hibernate configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Console (for development)
spring.h2.console.enabled=true
```

### H2 Database Console

Access H2 web console during development:
- URL: `http://localhost:8086/h2-console`
- JDBC URL: `jdbc:h2:mem:checkindb`
- Username: `sa`
- Password: `pwd`

## Database

### Schema

The service automatically creates the following table on startup:

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

### Sample SQL Queries

```sql
-- Get all check-ins
SELECT * FROM check_in;

-- Get check-in for specific ticket and event
SELECT * FROM check_in WHERE ticket_id = 1 AND event_id = 101;

-- Count check-ins for an event
SELECT event_id, COUNT(*) as check_in_count FROM check_in GROUP BY event_id;

-- Get recent check-ins
SELECT * FROM check_in ORDER BY check_in_timestamp DESC LIMIT 10;
```

## Testing

### Run Tests

**Windows**:
```bash
mvnw.cmd test
```

**Linux/Mac**:
```bash
./mvnw test
```

### Manual Testing with curl

```bash
# Health check
curl http://localhost:8086/checkin/health

# Check-in a ticket
curl -X POST http://localhost:8086/checkin \
  -H "Content-Type: application/json" \
  -d '{"ticketId": 1, "eventId": 101}'

# Get check-in details
curl http://localhost:8086/checkin/1/101

# Verify check-in status
curl http://localhost:8086/checkin/verify/1/101
```

### Testing with Postman

1. Import the following collection or create manually:
   - **POST** `http://localhost:8086/checkin`
   - **GET** `http://localhost:8086/checkin/1`
   - **GET** `http://localhost:8086/checkin/1/101`
   - **GET** `http://localhost:8086/checkin/verify/1/101`
   - **GET** `http://localhost:8086/checkin/health`

## Troubleshooting

### Issue: Port 8086 Already in Use

**Solution**: Change port in `application.properties`
```properties
server.port=8087
```

### Issue: Maven Build Failures

**Solution**: Clean and rebuild
```bash
mvn clean install -DskipTests
```

### Issue: Java Version Mismatch

**Error**: `java.lang.UnsupportedClassVersionError`

**Solution**: Ensure Java 21 is installed
```bash
java -version
```

### Issue: H2 Database Connection Error

**Solution**: Verify credentials in `application.properties`
- URL: `jdbc:h2:mem:checkindb`
- Username: `sa`
- Password: `pwd`

### Issue: Service Fails to Start

**Solution**: Check application logs
```bash
# Run with debug output
mvn spring-boot:run -X
```

## IDE Setup

### IntelliJ IDEA

1. Open project: `File → Open → Check-In-Service`
2. Select Java SDK 21: `File → Project Structure → Project SDK → 21`
3. Enable annotation processing: `Settings → Build, Execution, Deployment → Compiler → Annotation Processors → Enable annotation processing`
4. Mark directories:
   - `src/main/java` → Sources Root
   - `src/main/resources` → Resources Root
   - `src/test/java` → Test Sources Root

### Eclipse

1. Import project: `File → Import → Existing Maven Projects`
2. Select project folder
3. Configure Java Build Path: `Project → Properties → Java Build Path → Source`
4. Set JDK 21: `Project → Properties → Java Compiler`

### VS Code

1. Install extensions:
   - Extension Pack for Java
   - Maven for Java
   - Spring Boot Dashboard

2. Open project folder
3. Select JDK 21 when prompted

## Common Development Tasks

### Adding a New Endpoint

1. Create method in `CheckInController.java`
2. Use `@GetMapping`, `@PostMapping`, etc.
3. Delegate to `CheckInService`
4. Return `ResponseEntity` with appropriate HTTP status

### Adding a Custom Exception

1. Create new class extending `CheckInException`
2. Override constructor with custom error code
3. Use in service methods with `throw new CustomException(...)`

### Adding Database Query

1. Create method in `CheckInRepository` interface
2. Spring Data JPA generates implementation automatically
3. Call from `CheckInServiceImpl`

### Writing Unit Tests

Create test class in `src/test/java`:
```java
@SpringBootTest
public class CheckInServiceTest {
    @Autowired
    private CheckInService checkInService;
    
    @Test
    public void testProcessCheckIn() {
        // Test implementation
    }
}
```

## Deployment

### Build for Production

```bash
mvn clean package -DskipTests
```

This creates `target/Check-In-Service-0.0.1-SNAPSHOT.jar`

### Run Production Build

```bash
java -jar target/Check-In-Service-0.0.1-SNAPSHOT.jar
```

### Docker Deployment (Future)

Create `Dockerfile`:
```dockerfile
FROM openjdk:21-slim
COPY target/Check-In-Service-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
```

Build and run:
```bash
docker build -t check-in-service .
docker run -p 8086:8086 check-in-service
```

## Performance Optimization

### Database Indexing

The repository includes unique constraint on (ticketId, eventId) for fast lookups.

### Caching (Future Enhancement)

Consider adding Spring Cache:
```java
@Cacheable(value = "checkIns", key = "#ticketId")
public CheckIn getCheckInByTicketId(Long ticketId) { ... }
```

## Security Enhancements (Future)

1. Add Spring Security
2. Implement JWT authentication
3. Add role-based access control
4. Implement input validation and sanitization
5. Add CORS configuration

## Git Workflow

### Commit Changes

```bash
git add .
git commit -m "Add new feature or fix"
```

### Push to Remote

```bash
git push origin Check-In-Service
```

### Create Pull Request

1. Push to branch
2. Go to GitHub
3. Click "Compare & pull request"
4. Add description and create PR

## Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [H2 Database](http://www.h2database.com/)
- [Maven Documentation](https://maven.apache.org/)

## Support

For issues or questions:
1. Check existing issues in GitHub
2. Create detailed issue with:
   - Error message/stack trace
   - Steps to reproduce
   - Environment details
   - Expected vs actual behavior

