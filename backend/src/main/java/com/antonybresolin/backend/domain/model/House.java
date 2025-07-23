package com.antonybresolin.backend.domain.model;

import com.antonybresolin.backend.domain.model.value.Address;
import com.antonybresolin.backend.domain.model.value.HouseStatus;
import com.antonybresolin.backend.domain.model.value.PropertyFeatures;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "tb_houses")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "house_id")
    private UUID houseId;
    @Embedded
    private Address address;
    @Embedded
    private PropertyFeatures propertyFeatures;
    private HouseStatus status;
    @ManyToOne
    @JoinColumn(name = "user_user_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public House() {
    }

    public House(Address address, PropertyFeatures propertyFeatures, HouseStatus status) {
        this.address = address;
        this.propertyFeatures = propertyFeatures;
        this.status = status;
    }


    public House(Address address, PropertyFeatures propertyFeatures) {
        this.address = address;
        this.propertyFeatures = propertyFeatures;
        this.status = HouseStatus.DISPONIVEL;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public PropertyFeatures getPropertyFeatures() {
        return propertyFeatures;
    }

    public void setPropertyFeatures(PropertyFeatures propertyFeatures) {
        this.propertyFeatures = propertyFeatures;
    }

    public HouseStatus getStatus() {
        return status;
    }

    public void setStatus(HouseStatus status) {
        this.status = status;
    }

    public UUID getHouseId() {
        return houseId;
    }
}
