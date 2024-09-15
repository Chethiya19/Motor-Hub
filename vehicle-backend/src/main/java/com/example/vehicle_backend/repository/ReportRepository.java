package com.example.vehicle_backend.repository;

import com.example.vehicle_backend.entity.Image;
import com.example.vehicle_backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

}