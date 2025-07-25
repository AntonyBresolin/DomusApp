package com.antonybresolin.backend.domain.model.value;

import jakarta.persistence.Embeddable;

@Embeddable
public class Address {
    private String city;
    private String state;
    private String zipCode;
    private String street;
    private String complement;

    public Address() {
    }

    public Address(String city, String state, String zipCode, String street) {
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.street = street;
        this.complement = "";
    }

    public Address(String city, String state, String zipCode, String street, String complement) {
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.street = street;
        this.complement = complement;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }
}
