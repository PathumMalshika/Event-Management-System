package com.feedback_service.controller;

import com.feedback_service.model.Feedback;
import com.feedback_service.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {



    @PostMapping("/create")
    public Feedback  addFeedback(@RequestBody Feedback feedback) {

        return feedback;

    }
}