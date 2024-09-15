package com.example.vehicle_backend.controller;

import com.example.vehicle_backend.entity.Customer;
import com.example.vehicle_backend.service.AuthService;
import com.example.vehicle_backend.entity.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ResponseMessage> register(@RequestBody Customer customer) {
        try {
            Customer registeredUser = authService.registerUser(customer);
            if (registeredUser != null) {
                ResponseMessage responseMessage = new ResponseMessage("User registered successfully", registeredUser);
                return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
            } else {
                ResponseMessage responseMessage = new ResponseMessage("User already exists", null);
                return new ResponseEntity<>(responseMessage, HttpStatus.CONFLICT);
            }
        } catch (Exception e) {
            ResponseMessage responseMessage = new ResponseMessage("Registration failed: " + e.getMessage(), null);
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseMessage> login(@RequestBody Customer customer) {
        try {
            Customer loggedInUser = authService.login(customer);
            if (loggedInUser != null) {
                ResponseMessage responseMessage = new ResponseMessage("Login successful", loggedInUser);
                return new ResponseEntity<>(responseMessage, HttpStatus.OK);
            } else {
                ResponseMessage responseMessage = new ResponseMessage("Invalid credentials", null);
                return new ResponseEntity<>(responseMessage, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            ResponseMessage responseMessage = new ResponseMessage("Login failed: " + e.getMessage(), null);
            return new ResponseEntity<>(responseMessage, HttpStatus.BAD_REQUEST);
        }
    }
}
