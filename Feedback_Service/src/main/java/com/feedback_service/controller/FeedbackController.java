package com.feedback_service.controller;

import com.feedback_service.model.Feedback;

import com.feedback_service.repository.FeedbackRepository;
import com.feedback_service.service.Feedbackservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private  Feedbackservice feedbackService;




    @PostMapping("/create")
    public Feedback addFeedback(@RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
    }

    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackService.GetAllFeedback();
    }

    @GetMapping("/{id}")
    public Feedback getFeedbackById(@PathVariable Long id) {
        return feedbackService.GetFeedbackById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackService.DeleteFeedback(id);
    }

    @GetMapping("/user/{userId}")
    public List<Feedback> getFeedbackByUser(@PathVariable Long userId) {
        return feedbackService.getFeedbackByUserId(userId);
    }

    @PutMapping("/update")
    public Feedback updateFeedback(@RequestBody Feedback feedback) {

        return feedbackService.UpdateFeedback(feedback);
    }
}