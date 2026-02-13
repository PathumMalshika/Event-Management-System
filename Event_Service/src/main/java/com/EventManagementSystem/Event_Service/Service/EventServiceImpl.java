package com.EventManagementSystem.Event_Service.Service;

import com.EventManagementSystem.Event_Service.Entity.Event;
import com.EventManagementSystem.Event_Service.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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

    @Override
    public Event updateEvent(Long eventId, Event event) {
        Event eveDB = eventRepository.findById(eventId).get();

                if(Objects.nonNull(event.getTitle()) &&
                !"".equalsIgnoreCase(event.getTitle())) {
                    eveDB.setTitle(event.getTitle());
                }

                if(Objects.nonNull(event.getTitle()) &&
                        !"".equalsIgnoreCase(event.getTitle())) {
                    eveDB.setTitle(event.getTitle());
                }

                        if(Objects.nonNull(event.getDescription()) &&
                                !"".equalsIgnoreCase(event.getDescription())) {
                            eveDB.setDescription(event.getDescription());
                        }

                            if(Objects.nonNull(event.getLocation()) &&
                                    !"".equalsIgnoreCase(event.getLocation())) {
                                eveDB.setLocation(event.getLocation());
                            }

                                if(Objects.nonNull(event.getStartDate()) &&
                                        !"".equalsIgnoreCase(String.valueOf(event.getStartDate()))) {
                                    eveDB.setStartDate(event.getStartDate());
                                }

                                    if(Objects.nonNull(event.getEndDate()) &&
                                            !"".equalsIgnoreCase(String.valueOf(event.getEndDate()))) {
                                        eveDB.setEndDate(event.getEndDate());
                                    }

                                        if(Objects.nonNull(event.getCapacity()) &&
                                                !"".equalsIgnoreCase(String.valueOf(event.getCapacity()))) {
                                            eveDB.setCapacity(event.getCapacity());
                                        }

                                            if(Objects.nonNull(event.getPrice()) &&
                                                    !"".equalsIgnoreCase(String.valueOf(event.getPrice()))) {
                                                eveDB.setPrice(event.getPrice());
                                            }

                                                return eventRepository.save(eveDB);
    }
}
