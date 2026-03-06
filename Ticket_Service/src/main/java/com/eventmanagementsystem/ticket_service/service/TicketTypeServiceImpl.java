package com.eventmanagementsystem.ticket_service.service;

import com.eventmanagementsystem.ticket_service.entity.TicketType;
import com.eventmanagementsystem.ticket_service.repository.TicketTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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
        if (ticketType.getType() == null || ticketType.getType().trim().isEmpty()) {
            throw new IllegalArgumentException("Ticket type name cannot be empty");
        }
        if (ticketType.getEventName() == null || ticketType.getEventName().trim().isEmpty()) {
            throw new IllegalArgumentException("Event name is required");
        }
        if (ticketType.getPrice() == null || ticketType.getPrice() < 0) {
            throw new IllegalArgumentException("Price must be a non-negative value");
        }
        if (ticketType.getQuantity() == null || ticketType.getQuantity() < 0) {
            throw new IllegalArgumentException("Quantity must be a non-negative value");
        }

        Optional<TicketType> existing = ticketTypeRepository.findByTypeAndEventName(
                ticketType.getType(), ticketType.getEventName());
        if (existing.isPresent()) {
            throw new IllegalArgumentException("Ticket type '" + ticketType.getType() +
                    "' already exists for event '" + ticketType.getEventName() + "'");
        }

        if (ticketType.getSold() == null) ticketType.setSold(0);
        if (ticketType.getStatus() == null) ticketType.setStatus("active");

        return ticketTypeRepository.save(ticketType);
    }

    @Override
    public List<TicketType> getAllTicketTypes() {
        return ticketTypeRepository.findAll();
    }

    @Override
    public Optional<TicketType> getTicketTypeById(Long id) {
        return ticketTypeRepository.findById(id);
    }

    @Override
    public List<TicketType> getTicketTypesByEventId(Long eventId) {
        return ticketTypeRepository.findByEventId(eventId);
    }

    @Override
    public TicketType updateTicketType(Long id, TicketType ticketType) {
        TicketType existing = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket type not found with id: " + id));

        if (ticketType.getEventName() != null && !ticketType.getEventName().trim().isEmpty()) {
            existing.setEventName(ticketType.getEventName());
        }
        if (ticketType.getType() != null && !ticketType.getType().trim().isEmpty()) {
            existing.setType(ticketType.getType());
        }
        if (ticketType.getDescription() != null) {
            existing.setDescription(ticketType.getDescription());
        }
        if (ticketType.getPrice() != null && ticketType.getPrice() >= 0) {
            existing.setPrice(ticketType.getPrice());
        }
        if (ticketType.getQuantity() != null && ticketType.getQuantity() >= 0) {
            existing.setQuantity(ticketType.getQuantity());
        }
        if (ticketType.getSold() != null) {
            existing.setSold(ticketType.getSold());
        }
        if (ticketType.getStatus() != null) {
            existing.setStatus(ticketType.getStatus());
        }

        return ticketTypeRepository.save(existing);
    }

    @Override
    public TicketType updatePrice(Long id, Double price) {
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
        if (!ticketTypeRepository.existsById(id)) {
            throw new RuntimeException("Ticket type not found with id: " + id);
        }
        ticketTypeRepository.deleteById(id);
    }
}
