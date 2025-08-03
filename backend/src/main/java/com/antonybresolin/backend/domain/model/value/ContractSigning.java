package com.antonybresolin.backend.domain.model.value;

import jakarta.persistence.Embeddable;

@Embeddable
public class ContractSigning {
    private String city;
    private String UF;

    public ContractSigning() {
    }

    public ContractSigning(String city, String UF) {
        this.city = city;
        this.UF = UF;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getUF() {
        return UF;
    }

    public void setUF(String UF) {
        this.UF = UF;
    }
}
