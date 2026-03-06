package com.EventManagementSystem.Payment_Service.Controller;

import com.EventManagementSystem.Payment_Service.Entity.Payment;
import com.EventManagementSystem.Payment_Service.Service.PaymentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PaymentControllerSmokeTest {

    @Autowired
    PaymentService paymentService;

    @Test
    void contextLoads() {
        assertNotNull(paymentService);
    }

    @Test
    void createReadDelete() {
        Payment p = new Payment();
        p.setBookingId(1L);
        p.setUserId(2L);
        p.setAmount(new BigDecimal("99.99"));
        p.setMethod("CARD");
        p.setStatus("PENDING");

        // Create
        Payment created = paymentService.create(p);
        assertNotNull(created.getId());
        assertEquals("PENDING", created.getStatus());

        // Read
        Payment fetched = paymentService.getById(created.getId());
        assertEquals(0, new BigDecimal("99.99").compareTo(fetched.getAmount()));
        assertEquals("CARD", fetched.getMethod());

        // Update status
        Payment updated = paymentService.updateStatus(created.getId(), "SUCCESS");
        assertEquals("SUCCESS", updated.getStatus());

        // Delete
        paymentService.delete(created.getId());

        // Confirm gone
        assertThrows(RuntimeException.class, () -> paymentService.getById(created.getId()));
    }
}
