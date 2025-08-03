package com.antonybresolin.backend.presentation;

import com.antonybresolin.backend.application.ContractService;
import com.antonybresolin.backend.domain.model.Contract;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contract")
public class ContractController {
    private final ContractService contractService;

    @Autowired
    public ContractController(ContractService contractService) { this.contractService = contractService; }

    @PostMapping
    public ResponseEntity<Void> createContract(Contract contract) {
        if (!isValidContractFields(contract)) { return ResponseEntity.badRequest().build(); }
        return contractService.createContract(contract);
    }

    @GetMapping
    public List<Contract> getContracts(JwtAuthenticationToken token) {
        return contractService.getContractsByUser(token.getName());
    }



    // TODO - Criar funcionalidade de geração de contrato

    private boolean isValidContractFields(Contract contract) {
        if (contract == null) {
            return false;
        }
        
        if (contract.getDurationInMonths() <= 0) {
            return false;
        }
        
        if (contract.getFineForBrokenContract() == null ||
            contract.getFineForBrokenContract().compareTo(java.math.BigDecimal.ZERO) < 0) {
            return false;
        }
        
        if (contract.getRentValue() == null ||
            contract.getRentValue().compareTo(java.math.BigDecimal.ZERO) <= 0) {
            return false;
        }
        
        if (contract.getPaymentDate() == null) {
            return false;
        }
        
        if (contract.getContractSigning() == null) {
            return false;
        }
        
        if (contract.getContractSigning().getCity() == null ||
            contract.getContractSigning().getCity().trim().isEmpty()) {
            return false;
        }

        if (contract.getContractSigning().getUF() == null ||
            contract.getContractSigning().getUF().trim().isEmpty()) {
            return false;
        }

        return true;
    }

}
