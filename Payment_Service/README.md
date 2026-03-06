# Payment Service

Spring Boot microservice providing CRUD endpoints for payments.

## Endpoints

Base path: `/payments`

- `POST /payments` create payment
- `GET /payments` list payments
- `GET /payments/{id}` get by id
- `GET /payments/user/{userId}` get payments by user
- `GET /payments/booking/{bookingId}` get payments by booking
- `PUT /payments/{id}` update payment
- `PATCH /payments/{id}/status` update status only (body: `{ "status": "SUCCESS" }`)
- `DELETE /payments/{id}` delete payment
- `DELETE /payments/failed` delete all FAILED payments

## Local config

- Port: `8088`
- DB: H2 in-memory `paymentdb`
- H2 console: `/h2-console`

