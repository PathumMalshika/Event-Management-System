package com.eventmanagementsystem.ticket_service.controller;

import com.eventmanagementsystem.ticket_service.entity.TicketType;
import com.eventmanagementsystem.ticket_service.service.TicketTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ticket-types")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TicketTypeController {
    private final TicketTypeService ticketTypeService;

    @Autowired
    public TicketTypeController(TicketTypeService ticketTypeService) {
        this.ticketTypeService = ticketTypeService;
    }

    /**
     * Create a new ticket type (VIP, Regular, etc.)
     * POST /ticket-types
     */
    @PostMapping
    public ResponseEntity<TicketType> createTicketType(@RequestBody TicketType ticketType) {
        try {
            TicketType createdTicketType = ticketTypeService.createTicketType(ticketType);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTicketType);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get all ticket types
     * GET /ticket-types
     */
    @GetMapping
    public ResponseEntity<List<TicketType>> getAllTicketTypes() {
        List<TicketType> ticketTypes = ticketTypeService.getAllTicketTypes();
        return ResponseEntity.ok(ticketTypes);
    }

    /**
     * Get a specific ticket type by ID
     * GET /ticket-types/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<TicketType> getTicketTypeById(@PathVariable Long id) {
        try {
            return ticketTypeService.getTicketTypeById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get all ticket types for a specific event
     * GET /ticket-types/event/{eventId}
     */
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<TicketType>> getTicketTypesByEventId(@PathVariable Long eventId) {
        try {
            List<TicketType> ticketTypes = ticketTypeService.getTicketTypesByEventId(eventId);
            return ResponseEntity.ok(ticketTypes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Update a complete ticket type (all fields)
     * PUT /ticket-types/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<TicketType> updateTicketType(@PathVariable Long id,
                                                       @RequestBody TicketType ticketType) {
        try {
            TicketType updatedTicketType = ticketTypeService.updateTicketType(id, ticketType);
            return ResponseEntity.ok(updatedTicketType);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update only the price of a ticket type
     * PATCH /ticket-types/{id}/price
     * Request Body: { "price": 25.99 }
     */
    @PatchMapping("/{id}/price")
    public ResponseEntity<TicketType> updatePrice(@PathVariable Long id,
                                                   @RequestBody Map<String, Double> request) {
        try {
            Double price = request.get("price");
            if (price == null) {
                return ResponseEntity.badRequest().build();
            }
            TicketType updatedTicketType = ticketTypeService.updatePrice(id, price);
            return ResponseEntity.ok(updatedTicketType);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update only the quantity of a ticket type
     * PATCH /ticket-types/{id}/quantity
     * Request Body: { "quantity": 100 }
     */
    @PatchMapping("/{id}/quantity")
    public ResponseEntity<TicketType> updateQuantity(@PathVariable Long id,
                                                      @RequestBody Map<String, Integer> request) {
        try {
            Integer quantity = request.get("quantity");
            if (quantity == null) {
                return ResponseEntity.badRequest().build();
            }
            TicketType updatedTicketType = ticketTypeService.updateQuantity(id, quantity);
            return ResponseEntity.ok(updatedTicketType);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete a ticket type
     * DELETE /ticket-types/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTicketType(@PathVariable Long id) {
        try {
            ticketTypeService.deleteTicketType(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Ticket type deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

