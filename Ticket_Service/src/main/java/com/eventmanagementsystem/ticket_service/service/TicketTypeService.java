package com.eventmanagementsystem.ticket_service.service;

import com.eventmanagementsystem.ticket_service.entity.TicketType;

import java.util.List;
import java.util.Optional;

public interface TicketTypeService {
    TicketType createTicketType(TicketType ticketType);

    List<TicketType> getAllTicketTypes();
    Optional<TicketType> getTicketTypeById(Long id);
    List<TicketType> getTicketTypesByEventId(Long eventId);

    TicketType updateTicketType(Long id, TicketType ticketType);
    TicketType updatePrice(Long id, Double price);
    TicketType updateQuantity(Long id, Integer quantity);

    void deleteTicketType(Long id);
}
