package com.antonybresolin.backend.domain.model.value;

public enum CivilStatus {
    SOLTEIRO("solteiro"),
    CASADO("casado"),
    VIUVO("viúvo"),
    DIVORCIADO("divorciado"),
    SEPARADO("separado");

    private final String description;

    public String getDescription() {
        return description;
    }

    CivilStatus(String description) {
        this.description = description;
    }
}
