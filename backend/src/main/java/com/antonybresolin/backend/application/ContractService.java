package com.antonybresolin.backend.application;

import com.antonybresolin.backend.domain.model.Contract;
import com.antonybresolin.backend.infrastructure.repositories.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {
    private final ContractRepository contractRepository;

    @Autowired
    public ContractService(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public ResponseEntity<Void> createContract(Contract contract) {
        contractRepository.save(contract);
        return  ResponseEntity.status(201).build();
    }

    public List<Contract> getContractsByUser(String username) {
        return contractRepository.getContractsByUser_Username(username);
    }
}
