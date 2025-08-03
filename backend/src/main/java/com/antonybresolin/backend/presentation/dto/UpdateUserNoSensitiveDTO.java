package com.antonybresolin.backend.presentation.dto;

import com.antonybresolin.backend.domain.model.value.Address;
import com.antonybresolin.backend.domain.model.value.ContractEssentialData;

public record UpdateUserNoSensitiveDTO(String name, String cpf, Address address, ContractEssentialData contractEssentialData) {
}
