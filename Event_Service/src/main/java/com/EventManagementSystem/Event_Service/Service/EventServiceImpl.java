package com.EventManagementSystem.Event_Service.Service;

import com.EventManagementSystem.Event_Service.Entity.Event;
import com.EventManagementSystem.Event_Service.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService{

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> fetchEventList() {
        return eventRepository.findAll();
    }

    @Override
    public Event fetchEventById(Long eventId) {
        return eventRepository.findById(eventId).get();
    }

    @Override
    public void deleteEventById(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}
