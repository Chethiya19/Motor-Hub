package com.example.vehicle_backend.service;

import com.example.vehicle_backend.entity.Image;
import com.example.vehicle_backend.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ImageService {

    private final Path rootLocation = Paths.get("images");

    @Autowired
    private ImageRepository imageRepository;

    public Image store(MultipartFile file, String description) throws IOException {
        // Ensure directory exists
        Files.createDirectories(rootLocation);

        Path destinationFile = this.rootLocation.resolve(Paths.get(file.getOriginalFilename()))
                .normalize().toAbsolutePath();

        file.transferTo(destinationFile);

        Image image = new Image();
        image.setName(file.getOriginalFilename());
        image.setDescription(description);
        return imageRepository.save(image);
    }

    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }
}
