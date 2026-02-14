package com.EventManagementSystem.Event_Service.Service;

import com.EventManagementSystem.Event_Service.Entity.Event;

import java.util.List;

public interface EventService {
   public Event saveEvent(Event event);

   public List<Event> fetchEventList();

   public Event fetchEventById(Long eventId);

   public void deleteEventById(Long eventId);

   public Event updateEvent(Long eventId, Event event);
}
