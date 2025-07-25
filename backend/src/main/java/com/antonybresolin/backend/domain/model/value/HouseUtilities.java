package com.antonybresolin.backend.domain.model.value;

import jakarta.persistence.Embeddable;

@Embeddable
public class HouseUtilities {
    private boolean hasWater;
    private boolean hasGas;
    private boolean hasElectricity;
    private boolean hasInternet;

    @SuppressWarnings("unused")
    public HouseUtilities() {
    }

    public HouseUtilities(boolean hasWater, boolean hasGas, boolean hasElectricity, boolean hasInternet) {
        this.hasWater = hasWater;
        this.hasGas = hasGas;
        this.hasElectricity = hasElectricity;
        this.hasInternet = hasInternet;
    }

    public boolean isHasWater() {
        return hasWater;
    }

    public void setHasWater(boolean hasWater) {
        this.hasWater = hasWater;
    }

    public boolean isHasGas() {
        return hasGas;
    }

    public void setHasGas(boolean hasGas) {
        this.hasGas = hasGas;
    }

    public boolean isHasElectricity() {
        return hasElectricity;
    }

    public void setHasElectricity(boolean hasElectricity) {
        this.hasElectricity = hasElectricity;
    }

    public boolean isHasInternet() {
        return hasInternet;
    }

    public void setHasInternet(boolean hasInternet) {
        this.hasInternet = hasInternet;
    }
}
