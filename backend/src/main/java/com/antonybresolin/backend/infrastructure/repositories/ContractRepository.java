package com.antonybresolin.backend.infrastructure.repositories;

import com.antonybresolin.backend.domain.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ContractRepository extends JpaRepository<Contract, UUID> {
    List<Contract> getContractsByUser_Username(String userUsername);
}
