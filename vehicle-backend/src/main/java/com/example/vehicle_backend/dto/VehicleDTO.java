package com.example.vehicle_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VehicleDTO {
    private int VehicleID;
    private String make;
    private String model;
    private int year;
    private double price;
    private int mileage;
    private String color;
    private String transmission;
    private String fuelType;
    private String image;
    private String postedDate;
}