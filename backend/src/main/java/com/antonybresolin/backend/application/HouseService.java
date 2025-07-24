package com.antonybresolin.backend.application;

import com.antonybresolin.backend.application.exceptions.ResourceNotFoundException;
import com.antonybresolin.backend.domain.model.House;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.infrastructure.repositories.HouseRepository;
import com.antonybresolin.backend.infrastructure.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HouseService {
    private final HouseRepository houseRepository;
    private final UserRepository userRepository;

    @Autowired
    public HouseService(HouseRepository houseRepository, UserRepository userRepository) {
        this.houseRepository = houseRepository;
        this.userRepository = userRepository;
    }

    public Optional<List<House>> getHousesByOwner(String username) {
        getUserOrReturn(username);
        
        return Optional.ofNullable(houseRepository.findHouseByUser_Username(username).orElseThrow(
                () -> new ResourceNotFoundException("Nenhuma casa encontrada")
        ));
    }

    public ResponseEntity<String> createHouse(House house, String username) {
        User user = getUserOrReturn(username);

        house.setUser(user);
        houseRepository.save(house);
        return ResponseEntity.status(201).body("Casa criada com sucesso");
    }

    private User getUserOrReturn(String username) {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new IllegalArgumentException("Usuário não encontrado")
        );
    }
}
