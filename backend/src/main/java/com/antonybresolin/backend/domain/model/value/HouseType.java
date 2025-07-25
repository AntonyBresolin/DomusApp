package com.antonybresolin.backend.domain.model.value;

public enum HouseType {
    HOUSE("House"),
    APARTMENT("Apartment"),
    COMMERCIAL("Commercial");

    private final String description;

    HouseType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
