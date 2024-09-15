package com.example.vehicle_backend.service;

import com.example.vehicle_backend.entity.Report;
import com.example.vehicle_backend.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ReportService {

    private final Path rootLocation = Paths.get("reports");

    @Autowired
    private ReportRepository reportRepository;

    public Report store(MultipartFile file, String title) throws IOException {
        // Ensure directory exists
        Files.createDirectories(rootLocation);

        Path destinationFile = this.rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                .normalize().toAbsolutePath();

        file.transferTo(destinationFile);

        Report report = new Report();
        report.setName(file.getOriginalFilename());
        report.setTitle(title);
        return reportRepository.save(report);
    }

    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
}
