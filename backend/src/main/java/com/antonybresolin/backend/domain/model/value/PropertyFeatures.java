package com.antonybresolin.backend.domain.model.value;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

import java.util.List;

@Embeddable
public class PropertyFeatures {
    private int qtdRoom;
    private int qtdBathroom;
    private float buildingArea;

    @ElementCollection
    private List<String> features;

    @Embedded
    private HouseUtilities utilities;

    public PropertyFeatures() {
    }


    public PropertyFeatures(int qtdRoom, int qtdBathroom, float buildingArea, List<String> features, HouseUtilities utilities) {
        this.qtdRoom = qtdRoom;
        this.qtdBathroom = qtdBathroom;
        this.buildingArea = buildingArea;
        this.features = features;
        this.utilities = utilities;
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

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public HouseUtilities getUtilities() {
        return utilities;
    }

    public void setUtilities(HouseUtilities utilities) {
        this.utilities = utilities;
    }
}
