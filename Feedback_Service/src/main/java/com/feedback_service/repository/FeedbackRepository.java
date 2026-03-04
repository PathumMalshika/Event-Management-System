package com.feedback_service.repository;

import com.feedback_service.model.feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<feedback, Long> {
}
