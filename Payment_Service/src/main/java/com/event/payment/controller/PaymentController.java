package com.event.payment.controller;

import com.event.payment.model.Payment;
import com.event.payment.service.PaymentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin
public class PaymentController {

    private final PaymentService service;

    public PaymentController(PaymentService service) {
        this.service = service;
    }

    @PostMapping
    public Payment create(@RequestBody Payment payment){
        return service.create(payment);
    }

    @GetMapping
    public List<Payment> getAll(){
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Payment update(@PathVariable Long id,
                          @RequestBody Payment payment){
        return service.update(id, payment);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Payment deleted successfully";
    }
}