package com.antonybresolin.backend.application;

import com.antonybresolin.backend.application.exceptions.ResourceNotFoundException;
import com.antonybresolin.backend.domain.model.House;
import com.antonybresolin.backend.infrastructure.repositories.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Optional;

@Service
public class HouseService {
    private final HouseRepository houseRepository;

    @Autowired
    public HouseService(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }

    @GetMapping
    public Optional<List<House>> getHousesByOwner(String username) {
        return Optional.ofNullable(houseRepository.findHouseByUser_Username(username).orElseThrow(
                () -> new ResourceNotFoundException("Nenhuma casa não encontrada")
        ));
    }
}
