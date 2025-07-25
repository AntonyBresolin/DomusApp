package com.antonybresolin.backend.presentation.dto;

import com.antonybresolin.backend.domain.model.value.Address;
import com.antonybresolin.backend.domain.model.value.HouseStatus;
import com.antonybresolin.backend.domain.model.value.HouseType;
import com.antonybresolin.backend.domain.model.value.PropertyFeatures;

import java.math.BigDecimal;

public record CreateHouseDTO(
        Address address,
        PropertyFeatures propertyFeatures,
        HouseType houseType,
        HouseStatus status,
        BigDecimal rentValue,
        String name,
        String description
) {
}
