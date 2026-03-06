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

    @PostMapping
    public ResponseEntity<?> createTicketType(@RequestBody TicketType ticketType) {
        try {
            TicketType created = ticketTypeService.createTicketType(ticketType);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<TicketType>> getAllTicketTypes() {
        return ResponseEntity.ok(ticketTypeService.getAllTicketTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTicketTypeById(@PathVariable Long id) {
        return ticketTypeService.getTicketTypeById(id)
                .map(t -> ResponseEntity.ok((Object) t))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<TicketType>> getTicketTypesByEventId(@PathVariable Long eventId) {
        return ResponseEntity.ok(ticketTypeService.getTicketTypesByEventId(eventId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTicketType(@PathVariable Long id,
                                              @RequestBody TicketType ticketType) {
        try {
            TicketType updated = ticketTypeService.updateTicketType(id, ticketType);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/price")
    public ResponseEntity<?> updatePrice(@PathVariable Long id,
                                         @RequestBody Map<String, Double> request) {
        try {
            Double price = request.get("price");
            if (price == null) return ResponseEntity.badRequest().build();
            return ResponseEntity.ok(ticketTypeService.updatePrice(id, price));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/quantity")
    public ResponseEntity<?> updateQuantity(@PathVariable Long id,
                                            @RequestBody Map<String, Integer> request) {
        try {
            Integer quantity = request.get("quantity");
            if (quantity == null) return ResponseEntity.badRequest().build();
            return ResponseEntity.ok(ticketTypeService.updateQuantity(id, quantity));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

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
