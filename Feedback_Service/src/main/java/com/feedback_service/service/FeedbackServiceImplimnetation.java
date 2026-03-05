package com.feedback_service.service;

import com.feedback_service.model.Feedback;
import com.feedback_service.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImplimnetation implements Feedbackservice{


    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImplimnetation(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public Feedback saveFeedback(Feedback feedback) {
        System.out.println("User ID: " + feedback.getUserId());
        System.out.println("Event ID: " + feedback.getEventId());
        System.out.println("Comment: " + feedback.getComment());
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> GetAllFeedback() {
        return  feedbackRepository.findAll();
    }

    @Override
    public Feedback GetFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    @Override
    public Feedback UpdateFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public void DeleteFeedback(Long id) {

        feedbackRepository.deleteById(id);

    }

    @Override
    public List<Feedback> getFeedbackByUserId(Long userid) {
        return feedbackRepository.findByUserId(userid);
    }
}
