package com.antonybresolin.backend.presentation.dto;

import com.antonybresolin.backend.domain.model.value.Address;
import com.antonybresolin.backend.domain.model.value.PropertyFeatures;

public record CreateHouseDTO(
        Address address,
        PropertyFeatures propertyFeatures
) {
}
