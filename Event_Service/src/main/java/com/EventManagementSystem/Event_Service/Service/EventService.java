package com.EventManagementSystem.Event_Service.Service;

import com.EventManagementSystem.Event_Service.Entity.Event;
import com.EventManagementSystem.Event_Service.ErrorHandling.EventNotFoundException;

import java.util.List;

public interface EventService {
   public Event saveEvent(Event event);

   public List<Event> fetchEventList();

   public Event fetchEventById(Long eventId) throws EventNotFoundException;

   public void deleteEventById(Long eventId);

   public Event updateEvent(Long eventId, Event event);
}
