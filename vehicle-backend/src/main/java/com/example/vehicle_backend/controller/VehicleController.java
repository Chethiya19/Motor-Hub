package com.example.vehicle_backend.controller;

import com.example.vehicle_backend.dto.VehicleDTO;
import com.example.vehicle_backend.dto.ResponseDTO;
import com.example.vehicle_backend.service.VehicleService;
import com.example.vehicle_backend.utill.VarList;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("api/v1/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private ResponseDTO responseDTO;

    @PostMapping("/saveVehicle")
    public ResponseEntity<ResponseDTO> saveVehicle(
            @RequestParam("file") MultipartFile file,
            @RequestParam("vehicleDTO") String vehicleDTOJson) {
        try {
            VehicleDTO vehicleDTO = new ObjectMapper().readValue(vehicleDTOJson, VehicleDTO.class);
            String res = vehicleService.saveVehicle(vehicleDTO, file);

            if (VarList.RSP_SUCCESS.equals(res)) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Vehicle saved successfully.");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
            } else if (VarList.RSP_DUPLICATED.equals(res)) {
                responseDTO.setCode(VarList.RSP_DUPLICATED);
                responseDTO.setMessage("Vehicle already registered.");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Error saving vehicle.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateVehicle")
    public ResponseEntity<ResponseDTO> updateVehicle(
            @RequestParam("vehicleDTO") String vehicleDTOJson,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            VehicleDTO vehicleDTO = new ObjectMapper().readValue(vehicleDTOJson, VehicleDTO.class);
            String result = vehicleService.updateVehicle(vehicleDTO, file);

            if (VarList.RSP_SUCCESS.equals(result)) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Vehicle updated successfully.");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else if (VarList.RSP_NO_DATA_FOUND.equals(result)) {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No vehicle found with the provided ID.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            } else {
                responseDTO.setCode(VarList.RSP_FAIL);
                responseDTO.setMessage("Failed to update vehicle.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllVehicles")
    public ResponseEntity<ResponseDTO> getAllVehicles() {
        try {
            List<VehicleDTO> vehicleDTOList = vehicleService.getAllVehicles();
            responseDTO.setCode(VarList.RSP_SUCCESS);
            responseDTO.setMessage("Vehicles retrieved successfully.");
            responseDTO.setContent(vehicleDTOList);
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/searchVehicle/{vehicleID}")
    public ResponseEntity<ResponseDTO> searchVehicle(@PathVariable int vehicleID) {
        try {
            VehicleDTO vehicleDTO = vehicleService.searchVehicle(vehicleID);

            if (vehicleDTO != null) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Vehicle found.");
                responseDTO.setContent(vehicleDTO);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No vehicle found with this ID.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteVehicle/{vehicleID}")
    public ResponseEntity<ResponseDTO> deleteVehicle(@PathVariable int vehicleID) {
        try {
            String result = vehicleService.deleteVehicle(vehicleID);

            if (VarList.RSP_SUCCESS.equals(result)) {
                responseDTO.setCode(VarList.RSP_SUCCESS);
                responseDTO.setMessage("Vehicle deleted successfully.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.OK);
            } else {
                responseDTO.setCode(VarList.RSP_NO_DATA_FOUND);
                responseDTO.setMessage("No vehicle found with this ID.");
                responseDTO.setContent(null);
                return new ResponseEntity<>(responseDTO, HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            responseDTO.setCode(VarList.RSP_ERROR);
            responseDTO.setMessage("Error: " + ex.getMessage());
            responseDTO.setContent(null);
            return new ResponseEntity<>(responseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
