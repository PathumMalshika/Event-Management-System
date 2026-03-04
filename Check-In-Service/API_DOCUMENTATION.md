# Check-In-Service API Documentation

## Overview
The Check-In-Service provides REST APIs for managing ticket check-ins at events. It handles validation, prevents duplicates, and maintains check-in records with timestamps.

## Base URL
```
http://localhost:8086/checkin
```

## Authentication
Currently, the service does not require authentication. Future versions may integrate JWT or OAuth2 security.

---

## Endpoints

### 1. Process Check-In (POST)

**Description**: Validate a ticket and mark it as checked in for an event.

**Endpoint**: `POST /checkin`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "ticketId": 1,
  "eventId": 101
}
```

**Success Response** (HTTP 200 OK):
```json
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45.123456",
  "status": "CHECKED_IN",
  "message": "Check-in successful"
}
```

**Error Responses**:

- **400 Bad Request** - Invalid input:
```json
{
  "checkInId": null,
  "ticketId": null,
  "eventId": null,
  "checkInTimestamp": null,
  "status": null,
  "message": "Ticket ID and Event ID are required"
}
```

- **400 Bad Request** - Duplicate check-in:
```json
{
  "checkInId": null,
  "ticketId": null,
  "eventId": null,
  "checkInTimestamp": null,
  "status": null,
  "message": "Ticket 1 is already checked in for Event 101"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:8086/checkin \
  -H "Content-Type: application/json" \
  -d '{"ticketId": 1, "eventId": 101}'
```

---

### 2. Get Check-In by Ticket ID (GET)

**Description**: Retrieve check-in details using only the ticket ID.

**Endpoint**: `GET /checkin/{ticketId}`

**Parameters**:
- `ticketId` (path, required): The ticket ID (positive integer)

**Success Response** (HTTP 200 OK):
```json
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45.123456",
  "status": "CHECKED_IN",
  "message": "Check-in details retrieved"
}
```

**Error Response** (HTTP 404 Not Found):
```json
{
  "checkInId": null,
  "ticketId": null,
  "eventId": null,
  "checkInTimestamp": null,
  "status": null,
  "message": "No check-in found for Ticket ID: 999"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:8086/checkin/1
```

---

### 3. Get Check-In by Ticket and Event (GET)

**Description**: Retrieve check-in details using both ticket ID and event ID.

**Endpoint**: `GET /checkin/{ticketId}/{eventId}`

**Parameters**:
- `ticketId` (path, required): The ticket ID (positive integer)
- `eventId` (path, required): The event ID (positive integer)

**Success Response** (HTTP 200 OK):
```json
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45.123456",
  "status": "CHECKED_IN",
  "message": "Check-in details retrieved"
}
```

**Error Response** (HTTP 404 Not Found):
```json
{
  "checkInId": null,
  "ticketId": null,
  "eventId": null,
  "checkInTimestamp": null,
  "status": null,
  "message": "No check-in found for Ticket ID: 1 and Event ID: 999"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:8086/checkin/1/101
```

---

### 4. Verify Check-In Status (GET)

**Description**: Check if a ticket is already checked in for an event without retrieving full details.

**Endpoint**: `GET /checkin/verify/{ticketId}/{eventId}`

**Parameters**:
- `ticketId` (path, required): The ticket ID (positive integer)
- `eventId` (path, required): The event ID (positive integer)

**Success Response** (HTTP 200 OK):
```json
{
  "ticketId": 1,
  "eventId": 101,
  "isCheckedIn": true,
  "message": "Ticket is already checked in"
}
```

**Success Response** (HTTP 200 OK) - Not checked in:
```json
{
  "ticketId": 1,
  "eventId": 102,
  "isCheckedIn": false,
  "message": "Ticket is not checked in"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:8086/checkin/verify/1/101
```

---

### 5. Health Check (GET)

**Description**: Check the service status.

**Endpoint**: `GET /checkin/health`

**Success Response** (HTTP 200 OK):
```json
{
  "status": "UP",
  "service": "Check-In-Service"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:8086/checkin/health
```

---

## Error Codes and Messages

| Error Code | HTTP Status | Description | Possible Causes |
|-----------|-------------|-------------|-----------------|
| INVALID_CHECKIN | 400 | Invalid check-in request | Missing/invalid ticketId or eventId, negative values |
| DUPLICATE_CHECKIN | 400 | Duplicate check-in attempt | Ticket already checked in for the event |
| NOT_FOUND | 404 | Check-in record not found | No check-in exists for the given criteria |

---

## Input Validation Rules

1. **Ticket ID**: Required, must be a positive integer (> 0)
2. **Event ID**: Required, must be a positive integer (> 0)
3. **Null/Empty Values**: Not allowed
4. **Duplicate Prevention**: A ticket can only be checked in once per event

---

## Response Codes

| Status Code | Meaning |
|------------|---------|
| 200 OK | Request successful |
| 400 Bad Request | Invalid input or duplicate check-in |
| 404 Not Found | Check-in record not found |
| 500 Internal Server Error | Server error |

---

## Data Models

### CheckInRequest
```java
{
  "ticketId": Long,
  "eventId": Long
}
```

### CheckInResponse
```java
{
  "checkInId": Long,
  "ticketId": Long,
  "eventId": Long,
  "checkInTimestamp": LocalDateTime,
  "status": String,
  "message": String
}
```

### CheckIn Entity
```java
{
  "checkInId": Long,           // Auto-generated primary key
  "ticketId": Long,             // Reference to ticket
  "eventId": Long,              // Reference to event
  "checkInTimestamp": LocalDateTime,  // Check-in time (UTC)
  "status": String             // "CHECKED_IN"
}
```

---

## Usage Examples

### Example 1: Successfully Check In a Ticket
```bash
# Request
curl -X POST http://localhost:8086/checkin \
  -H "Content-Type: application/json" \
  -d '{"ticketId": 1, "eventId": 101}'

# Response (200 OK)
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45.123456",
  "status": "CHECKED_IN",
  "message": "Check-in successful"
}
```

### Example 2: Attempt Duplicate Check-In
```bash
# First check-in (success)
curl -X POST http://localhost:8086/checkin \
  -H "Content-Type: application/json" \
  -d '{"ticketId": 2, "eventId": 101}'

# Second check-in attempt (should fail)
curl -X POST http://localhost:8086/checkin \
  -H "Content-Type: application/json" \
  -d '{"ticketId": 2, "eventId": 101}'

# Response (400 Bad Request)
{
  "checkInId": null,
  "ticketId": null,
  "eventId": null,
  "checkInTimestamp": null,
  "status": null,
  "message": "Ticket 2 is already checked in for Event 101"
}
```

### Example 3: Retrieve Check-In Details
```bash
# Request
curl -X GET http://localhost:8086/checkin/1/101

# Response (200 OK)
{
  "checkInId": 1,
  "ticketId": 1,
  "eventId": 101,
  "checkInTimestamp": "2026-03-04T12:30:45.123456",
  "status": "CHECKED_IN",
  "message": "Check-in details retrieved"
}
```

---

## Integration with Other Services

### Future: Ticket Service Integration
When integrating with Ticket_Service, verify:
- Ticket exists and is valid
- Ticket is not already used for check-in
- Ticket belongs to the specified event

### Future: Event Service Integration
When integrating with Event_Service, verify:
- Event exists
- Event is active/ongoing
- Check-in time is within event window

---

## Rate Limiting and Performance

- No rate limiting implemented currently
- Database indexed on (ticketId, eventId) for fast lookups
- H2 database suitable for development; upgrade to PostgreSQL/MySQL for production

---

## Security Considerations

1. Currently no authentication/authorization
2. All check-in data is readable
3. Future enhancements:
   - JWT/OAuth2 authentication
   - Role-based access control
   - API key validation
   - Input sanitization
   - CORS configuration

---

## Troubleshooting

### Service Not Running
- Check port 8086 is available
- Verify Spring Boot application started successfully
- Check logs for startup errors

### Database Connection Issues
- Verify H2 database file permissions
- Check `application.properties` configuration
- Restart the service

### Check-In Fails
- Verify ticketId and eventId are positive integers
- Ensure ticket hasn't been checked in previously
- Check request JSON format is valid

---

## Future Enhancements

1. **Bulk Check-In**: Support checking in multiple tickets at once
2. **Check-Out**: Implement check-out functionality
3. **Check-In History**: Retrieve check-in history for an event
4. **Statistics**: Generate check-in statistics and reports
5. **Webhooks**: Notify external systems on check-in
6. **Batch Operations**: Support batch check-in validation
7. **Search**: Advanced search and filtering capabilities

