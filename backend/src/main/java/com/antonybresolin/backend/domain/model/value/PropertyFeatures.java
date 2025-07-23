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

    public int getQtdRoom() {
        return qtdRoom;
    }

    public void setQtdRoom(int qtdRoom) {
        this.qtdRoom = qtdRoom;
    }

    public int getQtdBathroom() {
        return qtdBathroom;
    }

    public void setQtdBathroom(int qtdBathroom) {
        this.qtdBathroom = qtdBathroom;
    }

    public float getBuildingArea() {
        return buildingArea;
    }

    public void setBuildingArea(float buildingArea) {
        this.buildingArea = buildingArea;
    }
}
