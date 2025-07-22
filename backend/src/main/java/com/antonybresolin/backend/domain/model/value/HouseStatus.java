package com.antonybresolin.backend.domain.model.value;

public enum HouseStatus {
    DISPONIVEL("Disponivel"),
    ALUGADO("Alugado"),
    MANUTENCAO("Manutencao");

    private final String description;

    HouseStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
