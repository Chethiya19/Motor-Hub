package com.example.vehicle_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
    private int UserID;
    private String Name;
    private String Email;
    private String Password;
    private String Contact;

}