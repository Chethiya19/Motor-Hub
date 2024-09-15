package com.example.vehicle_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "posted_date", columnDefinition = "TIMESTAMP") // Specifies the column type as TIMESTAMP
    private LocalDateTime postedDate;
}
