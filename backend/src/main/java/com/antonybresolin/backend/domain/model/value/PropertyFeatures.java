package com.antonybresolin.backend.domain.model.value;

import jakarta.persistence.Embeddable;

@Embeddable
public class PropertyFeatures {
    private int qtdRoom;
    private int qtdBathroom;
    private float buildingArea;

    public PropertyFeatures() {
    }

    public PropertyFeatures(int qtdRoom, int qtdBathroom, float buildingArea) {
        this.qtdRoom = qtdRoom;
        this.qtdBathroom = qtdBathroom;
        this.buildingArea = buildingArea;
    }
}
