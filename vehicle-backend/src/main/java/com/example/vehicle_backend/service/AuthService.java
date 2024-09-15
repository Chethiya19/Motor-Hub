package com.example.vehicle_backend.service;

import com.example.vehicle_backend.entity.Customer;
import com.example.vehicle_backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer registerUser(Customer customer) {
        if (checkUserExist(customer.getEmail())) {
            return null; // User already exists
        }
        return customerRepository.save(customer);
    }

    private boolean checkUserExist(String email) {
        return customerRepository.findById(email).isPresent();
    }

    public Customer login(Customer customer) {
        Customer existingUser = customerRepository.findById(customer.getEmail()).orElse(null);
        if (existingUser != null && existingUser.getPassword().equals(customer.getPassword())) {
            existingUser.setPassword(""); // Clear password before returning
            return existingUser;
        }
        return null;
    }
}
