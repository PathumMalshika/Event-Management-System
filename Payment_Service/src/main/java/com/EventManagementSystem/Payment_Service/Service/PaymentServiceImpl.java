package com.EventManagementSystem.Payment_Service.Service;

import com.EventManagementSystem.Payment_Service.Entity.Payment;
import com.EventManagementSystem.Payment_Service.Repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository repository;

    public PaymentServiceImpl(PaymentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Payment create(Payment payment) {
        // Basic defaults are handled by @PrePersist
        return repository.save(payment);
    }

    @Override
    public List<Payment> getAll() {
        return repository.findAll();
    }

    @Override
    public Payment getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found: " + id));
    }

    @Override
    public List<Payment> getByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    @Override
    public List<Payment> getByBookingId(Long bookingId) {
        return repository.findByBookingId(bookingId);
    }

    @Override
    public Payment update(Long id, Payment updated) {
        Payment existing = getById(id);

        // We treat createdAt as immutable
        existing.setBookingId(updated.getBookingId());
        existing.setUserId(updated.getUserId());
        existing.setAmount(updated.getAmount());
        existing.setMethod(updated.getMethod());

        if (updated.getStatus() != null && !updated.getStatus().isBlank()) {
            existing.setStatus(updated.getStatus());
        }

        return repository.save(existing);
    }

    @Override
    public Payment updateStatus(Long id, String status) {
        Payment existing = getById(id);
        existing.setStatus(status);
        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Payment not found: " + id);
        }
        repository.deleteById(id);
    }

    @Override
    public int deleteFailedPayments() {
        List<Payment> failed = repository.findByStatusIgnoreCase("FAILED");
        repository.deleteAll(failed);
        return failed.size();
    }
}

