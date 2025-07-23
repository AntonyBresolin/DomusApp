package com.antonybresolin.backend.infrastructure.repositories;

import com.antonybresolin.backend.domain.model.House;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HouseRepository extends JpaRepository<House, UUID> {
    Optional<List<House>> findHouseByUser_Username(String userUsername);
}
