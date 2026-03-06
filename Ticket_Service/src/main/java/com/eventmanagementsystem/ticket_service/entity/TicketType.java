package com.eventmanagementsystem.ticket_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ticket_types")
public class TicketType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventName;

    private Long eventId;

    @Column(nullable = false)
    private String type;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Integer sold = 0;

    @Column(nullable = false)
    private String status = "active";

    public TicketType() {}

    public TicketType(String eventName, Long eventId, String type, String description,
                      Double price, Integer quantity, Integer sold, String status) {
        this.eventName = eventName;
        this.eventId = eventId;
        this.type = type;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.sold = sold != null ? sold : 0;
        this.status = status != null ? status : "active";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEventName() { return eventName; }
    public void setEventName(String eventName) { this.eventName = eventName; }

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Integer getSold() { return sold; }
    public void setSold(Integer sold) { this.sold = sold; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @Override
    public String toString() {
        return "TicketType{" +
                "id=" + id +
                ", eventName='" + eventName + '\'' +
                ", type='" + type + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", sold=" + sold +
                ", status='" + status + '\'' +
                '}';
    }
}
