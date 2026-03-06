package com.eventmanagementsystem.ticket_service.repository;

import com.eventmanagementsystem.ticket_service.entity.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {
    List<TicketType> findByEventId(Long eventId);
    List<TicketType> findByEventName(String eventName);
    Optional<TicketType> findByTypeAndEventName(String type, String eventName);
}
