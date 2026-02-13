package com.EventManagementSystem.Event_Service.Controller;

import com.EventManagementSystem.Event_Service.Entity.Event;
import com.EventManagementSystem.Event_Service.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/events")
    public Event saveEvent(@RequestBody Event event){

        return eventService.saveEvent(event);

    }

    @GetMapping("/events")
    public List<Event> fetchEventList(){

        return eventService.fetchEventList();
    }

    @GetMapping("/events/{id}")
    public Event fetchEventById(@PathVariable("id") Long eventId){

        return eventService.fetchEventById(eventId);
    }

    @DeleteMapping("/events/{id}")
    public String deleteEventById(@PathVariable("id") Long eventId){

        eventService.deleteEventById(eventId);
        return "Event Deleted Successfully";
    }
}
