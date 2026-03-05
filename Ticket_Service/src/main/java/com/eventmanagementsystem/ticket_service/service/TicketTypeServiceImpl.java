package com.eventmanagementsystem.ticket_service.service;

import com.eventmanagementsystem.ticket_service.entity.TicketType;
import com.eventmanagementsystem.ticket_service.repository.TicketTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketTypeServiceImpl implements TicketTypeService {
    private final TicketTypeRepository ticketTypeRepository;

    @Autowired
    public TicketTypeServiceImpl(TicketTypeRepository ticketTypeRepository) {
        this.ticketTypeRepository = ticketTypeRepository;
    }

    @Override
    public TicketType createTicketType(TicketType ticketType) {
        if (ticketType.getName() == null || ticketType.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Ticket type name cannot be empty");
        }
        if (ticketType.getPrice() == null || ticketType.getPrice() < 0) {
            throw new IllegalArgumentException("Price must be a non-negative value");
        }
        if (ticketType.getQuantity() == null || ticketType.getQuantity() < 0) {
            throw new IllegalArgumentException("Quantity must be a non-negative value");
        }
        if (ticketType.getEventId() == null) {
            throw new IllegalArgumentException("Event ID is required");
        }

        // Check for duplicate ticket type name within the same event
        Optional<TicketType> existing = ticketTypeRepository.findByNameAndEventId(
                ticketType.getName(), ticketType.getEventId());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Ticket type '" + ticketType.getName() +
                    "' already exists for this event");
        }

        return ticketTypeRepository.save(ticketType);
    }

    @Override
    public List<TicketType> getAllTicketTypes() {
        return ticketTypeRepository.findAll();
    }

    @Override
    public Optional<TicketType> getTicketTypeById(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID must be a positive value");
        }
        return ticketTypeRepository.findById(id);
    }

    @Override
    public List<TicketType> getTicketTypesByEventId(Long eventId) {
        if (eventId == null || eventId <= 0) {
            throw new IllegalArgumentException("Event ID must be a positive value");
        }
        return ticketTypeRepository.findByEventId(eventId);
    }

    @Override
    public TicketType updateTicketType(Long id, TicketType ticketType) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID must be a positive value");
        }

        TicketType existingTicketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket type not found with id: " + id));

        if (ticketType.getName() != null && !ticketType.getName().trim().isEmpty()) {
            existingTicketType.setName(ticketType.getName());
        }
        if (ticketType.getDescription() != null) {
            existingTicketType.setDescription(ticketType.getDescription());
        }
        if (ticketType.getPrice() != null && ticketType.getPrice() >= 0) {
            existingTicketType.setPrice(ticketType.getPrice());
        }
        if (ticketType.getQuantity() != null && ticketType.getQuantity() >= 0) {
            existingTicketType.setQuantity(ticketType.getQuantity());
        }

        return ticketTypeRepository.save(existingTicketType);
    }

    @Override
    public TicketType updatePrice(Long id, Double price) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID must be a positive value");
        }
        if (price == null || price < 0) {
            throw new IllegalArgumentException("Price must be a non-negative value");
        }

        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket type not found with id: " + id));

        ticketType.setPrice(price);
        return ticketTypeRepository.save(ticketType);
    }

    @Override
    public TicketType updateQuantity(Long id, Integer quantity) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID must be a positive value");
        }
        if (quantity == null || quantity < 0) {
            throw new IllegalArgumentException("Quantity must be a non-negative value");
        }

        TicketType ticketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket type not found with id: " + id));

        ticketType.setQuantity(quantity);
        return ticketTypeRepository.save(ticketType);
    }

    @Override
    public void deleteTicketType(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("ID must be a positive value");
        }

        if (!ticketTypeRepository.existsById(id)) {
            throw new RuntimeException("Ticket type not found with id: " + id);
        }

        ticketTypeRepository.deleteById(id);
    }
}

