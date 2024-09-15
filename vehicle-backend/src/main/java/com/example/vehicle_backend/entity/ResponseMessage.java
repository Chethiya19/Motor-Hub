package com.example.vehicle_backend.entity;

import com.example.vehicle_backend.entity.Customer;

public class ResponseMessage {
    private String message;
    private Customer customer;

    public ResponseMessage(String message, Customer customer) {
        this.message = message;
        this.customer = customer;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Customer getcustomer() {
        return customer;
    }

    public void setUser(Customer customer) {
        this.customer = customer;
    }
}
