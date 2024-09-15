package com.example.vehicle_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //auto generate ID - Primary Key in JAVA
    private int UserID;
    private String Name;
    @Column(unique = true, nullable = false)
    private String Email;
    private String Password;
    private String Contact;
}
