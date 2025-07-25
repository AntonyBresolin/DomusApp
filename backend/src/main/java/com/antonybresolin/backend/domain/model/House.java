package com.antonybresolin.backend.domain.model;

import com.antonybresolin.backend.domain.model.value.Address;
import com.antonybresolin.backend.domain.model.value.HouseStatus;
import com.antonybresolin.backend.domain.model.value.HouseType;
import com.antonybresolin.backend.domain.model.value.PropertyFeatures;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.math.BigDecimal;
import java.time.Instant;
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
    @ManyToOne
    @JoinColumn(name = "user_user_id")
    private User user;
    @Enumerated(EnumType.STRING)
    private HouseType houseType;
    @Enumerated(EnumType.STRING)
    private HouseStatus status;
    private BigDecimal rentValue;
    private String name;
    private String description;

    @CreationTimestamp
    private Instant createAt;

    @UpdateTimestamp
    private Instant updateAt;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public House() {
    }

    public House(Address address, PropertyFeatures propertyFeatures, HouseType houseType, BigDecimal rentValue, String name, String description) {
        this.address = address;
        this.propertyFeatures = propertyFeatures;
        this.houseType = houseType;
        this.rentValue = rentValue;
        this.name = name;
        this.description = description;
        this.status = HouseStatus.DISPONIVEL;
    }

    public House(Address address, PropertyFeatures propertyFeatures, User user, HouseType houseType, HouseStatus status, BigDecimal rentValue, String name, String description) {
        this.address = address;
        this.propertyFeatures = propertyFeatures;
        this.user = user;
        this.houseType = houseType;
        this.status = status;
        this.rentValue = rentValue;
        this.name = name;
        this.description = description;
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

    public void setHouseId(UUID houseId) {
        this.houseId = houseId;
    }

    public HouseType getHouseType() {
        return houseType;
    }

    public void setHouseType(HouseType houseType) {
        this.houseType = houseType;
    }

    public BigDecimal getRentValue() {
        return rentValue;
    }

    public void setRentValue(BigDecimal rentValue) {
        this.rentValue = rentValue;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Instant createAt) {
        this.createAt = createAt;
    }

    public Instant getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Instant updateAt) {
        this.updateAt = updateAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
