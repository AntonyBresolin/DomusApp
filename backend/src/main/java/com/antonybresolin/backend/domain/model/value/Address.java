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
}
