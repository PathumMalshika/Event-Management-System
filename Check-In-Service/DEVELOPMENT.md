# Check-In-Service Development Guide

## Architecture Overview

### Layered Architecture

The Check-In-Service follows a layered architecture pattern consistent with other services in the Event Management System:

```
┌─────────────────────────────────────────┐
│         REST API Layer                  │
│      (CheckInController)                │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│      Service Layer                      │
│  (CheckInService/CheckInServiceImpl)     │
│  - Business Logic                       │
│  - Validation                           │
│  - Transaction Management               │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│     Repository Layer (Data Access)      │
│      (CheckInRepository - Spring Data)  │
│  - Database Operations                  │
│  - Query Abstraction                    │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│        Database Layer                   │
│    (H2/PostgreSQL/MySQL)                │
└─────────────────────────────────────────┘
```

### Component Interaction Flow

```
Client Request
      │
      ▼
CheckInController (REST endpoint)
      │ Request validation
      ▼
CheckInService (Business logic)
      │ Domain logic & validation
      ▼
CheckInRepository (Data access)
      │ Database queries
      ▼
Database (Persistence)
      │
      ▼
Response (HTTP + JSON)
```

## Detailed Component Documentation

### 1. Entity Layer

#### CheckIn.java
Represents a check-in record in the database.

**Key Attributes**:
- `checkInId`: Auto-generated primary key
- `ticketId`: Reference to ticket being checked in
- `eventId`: Reference to event
- `checkInTimestamp`: UTC timestamp of check-in
- `status`: Check-in status (currently always "CHECKED_IN")

**Key Features**:
- Uses JPA annotations for ORM mapping
- `@Table` defines database table name
- `@UniqueConstraint` ensures unique (ticketId, eventId) combination
- Includes default constructor for JPA
- Includes constructor with parameters for object creation

**Database Mapping**:
```sql
CREATE TABLE check_in (
    check_in_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticket_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    check_in_timestamp TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL,
    CONSTRAINT unique_ticket_event UNIQUE (ticket_id, event_id)
);
```

### 2. Repository Layer

#### CheckInRepository.java
Spring Data JPA repository for database operations.

**Custom Methods**:
```java
// Find by ticketId and eventId combination
Optional<CheckIn> findByTicketIdAndEventId(Long ticketId, Long eventId);

// Check existence without fetching
boolean existsByTicketIdAndEventId(Long ticketId, Long eventId);

// Find by ticketId only
Optional<CheckIn> findByTicketId(Long ticketId);
```

**Benefits**:
- Automatic implementation by Spring Data JPA
- Query method derivation from method names
- No need to write SQL
- Type-safe queries
- Automatic pagination and sorting support

### 3. Service Layer

#### CheckInService Interface
Defines business logic contract.

**Core Responsibilities**:
- Ticket validation
- Duplicate check-in prevention
- Check-in status retrieval
- Business rule enforcement

#### CheckInServiceImpl
Implementation of business logic.

**Key Methods**:

**processCheckIn(CheckInRequest)**
- Validates request (non-null, positive IDs)
- Checks for duplicate check-in
- Creates CheckIn entity with current timestamp
- Saves to database
- Returns created entity

**Validation Flow**:
```
1. Check request is not null
2. Verify ticketId exists and > 0
3. Verify eventId exists and > 0
4. Check if already checked in (prevents duplicates)
5. If all validations pass → Create check-in record
6. If any validation fails → Throw appropriate exception
```

**getCheckInByTicketId(Long ticketId)**
- Validates ticketId
- Retrieves check-in record
- Throws InvalidCheckInException if not found

**getCheckInByTicketAndEvent(Long ticketId, Long eventId)**
- Validates both IDs
- Retrieves check-in with composite key
- Throws InvalidCheckInException if not found

**isAlreadyCheckedIn(Long ticketId, Long eventId)**
- Quick lookup without fetching full entity
- Returns boolean
- Used for duplicate prevention

### 4. Controller Layer

#### CheckInController
REST endpoint definitions.

**Endpoints Breakdown**:

**POST /checkin**
```
Request → JSON → Deserialize → CheckInRequest
  ↓
Validate → Service.processCheckIn()
  ↓
Create CheckIn → Serialize → JSON
  ↓
Response ← HTTP 200 or 400
```

**GET /checkin/{ticketId}**
```
Path Parameter → ticketId
  ↓
Validate → Service.getCheckInByTicketId()
  ↓
Retrieve CheckIn → Serialize → JSON
  ↓
Response ← HTTP 200 or 404
```

**GET /checkin/{ticketId}/{eventId}**
```
Path Parameters → ticketId, eventId
  ↓
Validate → Service.getCheckInByTicketAndEvent()
  ↓
Retrieve CheckIn → Serialize → JSON
  ↓
Response ← HTTP 200 or 404
```

**GET /checkin/verify/{ticketId}/{eventId}**
```
Path Parameters → ticketId, eventId
  ↓
Check → Service.isAlreadyCheckedIn()
  ↓
Build Status Object → Serialize → JSON
  ↓
Response ← HTTP 200
```

### 5. DTO Layer

#### CheckInRequest
Represents incoming request data.
- `ticketId`: Required, must be positive
- `eventId`: Required, must be positive

#### CheckInResponse
Represents outgoing response data.
- Contains full check-in information
- Includes success/error message
- Used for all response scenarios

### 6. Exception Layer

#### CheckInException (Base)
Base exception for all check-in errors.
- Extends RuntimeException for unchecked exception
- Includes optional errorCode for categorization

#### DuplicateCheckInException
Thrown when attempting duplicate check-in.
- Error code: `DUPLICATE_CHECKIN`
- HTTP Status: 400 Bad Request

#### InvalidCheckInException
Thrown for validation failures.
- Error code: `INVALID_CHECKIN`
- HTTP Status: 400 Bad Request

**Exception Hierarchy**:
```
RuntimeException
    └── CheckInException
            ├── DuplicateCheckInException
            └── InvalidCheckInException
```

## Validation Strategy

### Request Validation

1. **Null Check**
```java
Objects.isNull(checkInRequest) → InvalidCheckInException
```

2. **Positive Integer Check**
```java
ticketId <= 0 || eventId <= 0 → InvalidCheckInException
```

3. **Duplicate Check**
```java
existsByTicketIdAndEventId(ticketId, eventId) → DuplicateCheckInException
```

### Response Codes

| Scenario | HTTP Status | Exception |
|----------|------------|-----------|
| Successful check-in | 200 OK | None |
| Invalid input | 400 Bad Request | InvalidCheckInException |
| Duplicate check-in | 400 Bad Request | DuplicateCheckInException |
| Not found | 404 Not Found | InvalidCheckInException |
| Server error | 500 Internal Server Error | Uncaught exception |

## Database Design

### Table Structure

```sql
CREATE TABLE check_in (
    check_in_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    ticket_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    check_in_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'CHECKED_IN',
    CONSTRAINT unique_ticket_event UNIQUE (ticket_id, event_id)
);
```

### Indexing Strategy

**Primary Key Index**:
- On `check_in_id` (automatic)
- Fast single record lookup

**Unique Constraint Index**:
- On `(ticket_id, event_id)`
- Enforces uniqueness
- Provides fast composite lookups
- Automatically indexed for performance

**Potential Future Indexes**:
- On `ticketId` alone (for ticket-based queries)
- On `eventId` alone (for event analytics)
- On `checkInTimestamp` (for time-range queries)

### Query Optimization

**Current Queries**:
1. Find by composite key: O(1) with unique index
2. Check existence: O(1) with unique index
3. Find by ticketId: O(n) or O(log n) depending on index

## Data Flow Examples

### Example 1: Successful Check-In

```
POST /checkin
{
  "ticketId": 1,
  "eventId": 101
}
    ↓
CheckInController.checkIn()
    ↓
Validate request → CheckInServiceImpl.processCheckIn()
    ↓
Validate ticketId (1 > 0) ✓
Validate eventId (101 > 0) ✓
Check duplicate: existsByTicketIdAndEventId(1, 101) → false ✓
    ↓
Create CheckIn entity:
  - ticketId: 1
  - eventId: 101
  - checkInTimestamp: 2026-03-04T12:30:45.123456
  - status: "CHECKED_IN"
    ↓
Save to database → CheckInRepository.save()
    ↓
Return CheckIn entity
    ↓
Serialize to CheckInResponse
    ↓
HTTP 200 OK
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45.123456",
  "status": "CHECKED_IN",
  "message": "Check-in successful"
}
```

### Example 2: Duplicate Check-In Attempt

```
POST /checkin
{
  "ticketId": 1,
  "eventId": 101
}  (Second attempt for same ticket/event)
    ↓
CheckInController.checkIn()
    ↓
CheckInServiceImpl.processCheckIn()
    ↓
Validate ticketId (1 > 0) ✓
Validate eventId (101 > 0) ✓
Check duplicate: existsByTicketIdAndEventId(1, 101) → true ✗
    ↓
Throw DuplicateCheckInException:
  "Ticket 1 is already checked in for Event 101"
    ↓
Exception caught in Controller
    ↓
HTTP 400 Bad Request
{
  "checkInId": null,
  "ticketId": null,
  "eventId": null,
  "checkInTimestamp": null,
  "status": null,
  "message": "Ticket 1 is already checked in for Event 101"
}
```

## Performance Considerations

### Current Performance

- **Time Complexity**:
  - Check-in creation: O(1) database operation
  - Duplicate check: O(1) with index
  - Retrieve by ID: O(1) with index

- **Space Complexity**:
  - Each check-in record: ~100 bytes
  - With 1 million check-ins: ~100 MB

### Scalability

**Current Limitations**:
- H2 in-memory database not suitable for production
- Single-threaded request processing
- No caching layer

**Production Improvements**:
1. Switch to PostgreSQL or MySQL
2. Add connection pooling (HikariCP)
3. Implement Redis caching
4. Add database replication
5. Implement microservice redundancy

### Load Testing Targets

- **Read Operations**: 1000+ requests/second
- **Write Operations**: 100+ requests/second
- **Database**: 10,000+ concurrent connections

## Testing Strategy

### Unit Tests

Test individual components:
```java
@Test
public void testProcessCheckInSuccess() {
    CheckInRequest request = new CheckInRequest(1L, 101L);
    CheckIn result = checkInService.processCheckIn(request);
    assertEquals(1L, result.getTicketId());
    assertEquals("CHECKED_IN", result.getStatus());
}

@Test
public void testDuplicateCheckInThrows() {
    CheckInRequest request = new CheckInRequest(1L, 101L);
    checkInService.processCheckIn(request);
    assertThrows(DuplicateCheckInException.class, 
        () -> checkInService.processCheckIn(request));
}
```

### Integration Tests

Test component interactions:
```java
@SpringBootTest
@Test
public void testCheckInEndToEnd() {
    // Test full flow from controller to database
    CheckInRequest request = new CheckInRequest(1L, 101L);
    ResponseEntity<CheckInResponse> response = 
        restTemplate.postForEntity("/checkin", request, CheckInResponse.class);
    assertEquals(HttpStatus.OK, response.getStatusCode());
}
```

### Test Coverage Target

- Aim for 80%+ code coverage
- Focus on critical paths
- Test all exception scenarios
- Test all API endpoints

## Future Enhancement Roadmap

### Phase 1: Core Features (Current)
- ✓ Basic check-in functionality
- ✓ Duplicate prevention
- ✓ Error handling
- ✓ REST API

### Phase 2: Advanced Features
- [ ] Integration with Ticket_Service
- [ ] Integration with Event_Service
- [ ] Bulk check-in operations
- [ ] Check-in statistics
- [ ] Webhook notifications

### Phase 3: Enterprise Features
- [ ] JWT/OAuth2 security
- [ ] Rate limiting
- [ ] API versioning
- [ ] Advanced logging/monitoring
- [ ] Distributed caching
- [ ] Event sourcing

### Phase 4: Operations
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline
- [ ] Health checks and metrics
- [ ] Log aggregation (ELK stack)
- [ ] APM integration (New Relic, DataDog)

## Code Standards

### Naming Conventions
- Classes: PascalCase (CheckInController)
- Methods: camelCase (processCheckIn)
- Constants: UPPER_SNAKE_CASE
- Variables: camelCase
- Package names: lowercase with dots

### Code Style
- Use meaningful names
- Keep methods focused and short (< 20 lines)
- Extract complex logic to separate methods
- Add JavaDoc for public methods
- Use appropriate access modifiers

### Error Handling
- Always provide meaningful error messages
- Use custom exceptions for domain errors
- Log errors appropriately
- Return proper HTTP status codes

## Debugging Tips

### Enable Debug Logging

Add to `application.properties`:
```properties
logging.level.com.eventmanagementsystem=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate=DEBUG
```

### H2 Console

Access during debugging:
```
http://localhost:8086/h2-console
JDBC URL: jdbc:h2:mem:checkindb
Username: sa
Password: pwd
```

### IDE Debugging

Set breakpoints in IDE:
1. Click on line number
2. Run application in debug mode
3. Use IDE debugger controls

### Remote Debugging

For production issues:
```bash
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 \
  -jar Check-In-Service-0.0.1-SNAPSHOT.jar
```

## Documentation Standards

- Keep comments focused on "why", not "what"
- Update documentation when changing code
- Use JavaDoc for public APIs
- Include usage examples in README
- Maintain API documentation

