package com.EventManagementSystem.Event_Service.Repository;

import com.EventManagementSystem.Event_Service.Entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
