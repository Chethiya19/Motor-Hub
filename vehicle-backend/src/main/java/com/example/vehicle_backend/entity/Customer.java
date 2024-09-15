package com.example.vehicle_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Customer")
public class Customer {

    @Id
    @Column(unique = true, nullable = false)
    private String Email;

    private String Name;
    private String Password;
    private String Contact;
}
