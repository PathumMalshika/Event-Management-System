package com.event.payment.service;

import com.event.payment.model.Payment;
import com.event.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public Payment create(Payment payment){
        payment.setPaymentDate(LocalDateTime.now());
        payment.setStatus("PENDING");
        return repository.save(payment);
    }

    public List<Payment> getAll(){
        return repository.findAll();
    }

    public Payment update(Long id, Payment payment){
        Payment existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        existing.setStatus(payment.getStatus());
        existing.setMethod(payment.getMethod());
        existing.setAmount(payment.getAmount());

        return repository.save(existing);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
}