package com.example.vehicle_backend.service;

import com.example.vehicle_backend.dto.VehicleDTO;
import com.example.vehicle_backend.entity.Vehicle;
import com.example.vehicle_backend.repository.VehicleRepository;
import com.example.vehicle_backend.utill.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ModelMapper modelMapper;

    private final Path rootLocation = Paths.get("images");

    public String saveVehicle(VehicleDTO vehicleDTO, MultipartFile file) {
        try {
            // Handle file upload
            if (file != null && !file.isEmpty()) {
                Files.createDirectories(rootLocation);
                Path destinationFile = this.rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                        .normalize().toAbsolutePath();
                file.transferTo(destinationFile);
                vehicleDTO.setImage(file.getOriginalFilename());
            }

            // Map DTO to entity
            Vehicle vehicle = modelMapper.map(vehicleDTO, Vehicle.class);
            // Set postedDate
            vehicle.setPostedDate(LocalDateTime.now());

            vehicleRepository.save(vehicle);
            return VarList.RSP_SUCCESS;
        } catch (IOException e) {
            e.printStackTrace();
            return VarList.RSP_ERROR;
        }
    }

    public String updateVehicle(VehicleDTO vehicleDTO, MultipartFile file) {
        if (vehicleRepository.existsById(vehicleDTO.getVehicleID())) {
            Vehicle existingVehicle = vehicleRepository.findById(vehicleDTO.getVehicleID()).orElse(null);

            if (existingVehicle != null) {
                // Update fields
                existingVehicle.setMake(vehicleDTO.getMake());
                existingVehicle.setModel(vehicleDTO.getModel());
                existingVehicle.setYear(vehicleDTO.getYear());
                existingVehicle.setPrice(vehicleDTO.getPrice());
                existingVehicle.setMileage(vehicleDTO.getMileage());
                existingVehicle.setColor(vehicleDTO.getColor());
                existingVehicle.setTransmission(vehicleDTO.getTransmission());
                existingVehicle.setFuelType(vehicleDTO.getFuelType());

                // Handle file upload
                if (file != null && !file.isEmpty()) {
                    try {
                        Files.createDirectories(rootLocation);
                        Path destinationFile = this.rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                                .normalize().toAbsolutePath();
                        file.transferTo(destinationFile);
                        existingVehicle.setImage(file.getOriginalFilename());
                    } catch (IOException e) {
                        e.printStackTrace();
                        return VarList.RSP_ERROR;
                    }
                } else {
                    existingVehicle.setImage(vehicleDTO.getImage());
                }

                vehicleRepository.save(existingVehicle);
                return VarList.RSP_SUCCESS;
            }
        }
        return VarList.RSP_NO_DATA_FOUND;
    }

    public List<VehicleDTO> getAllVehicles() {
        List<Vehicle> vehicleList = vehicleRepository.findAll();
        return modelMapper.map(vehicleList, new TypeToken<ArrayList<VehicleDTO>>(){}.getType());
    }

    public VehicleDTO searchVehicle(int vehicleID) {
        if (vehicleRepository.existsById(vehicleID)) {
            Vehicle vehicle = vehicleRepository.findById(vehicleID).orElse(null);
            return modelMapper.map(vehicle, VehicleDTO.class);
        } else {
            return null;
        }
    }

    public String deleteVehicle(int vehicleID) {
        if (vehicleRepository.existsById(vehicleID)) {
            vehicleRepository.deleteById(vehicleID);
            return VarList.RSP_SUCCESS;
        } else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
