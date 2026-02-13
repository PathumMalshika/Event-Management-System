package com.EventManagementSystem.Event_Service.Controller;

import com.EventManagementSystem.Event_Service.Entity.Event;
import com.EventManagementSystem.Event_Service.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping("/events")
    public Event saveEvent(@RequestBody Event event){

        return eventService.saveEvent(event);

    }
}
