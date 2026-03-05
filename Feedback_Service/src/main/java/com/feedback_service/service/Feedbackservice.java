package com.feedback_service.service;

import com.feedback_service.model.Feedback;
import org.springframework.stereotype.Repository;


import java.util.List;



public interface Feedbackservice {


    public Feedback saveFeedback(Feedback feedback);

    public List<Feedback> GetAllFeedback();

    public Feedback GetFeedbackById(Long id);

    public Feedback UpdateFeedback(Feedback feedback);

    public void DeleteFeedback(Long id);

    public List<Feedback> getFeedbackByUserId(Long userid);












}
