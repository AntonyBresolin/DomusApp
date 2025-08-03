package com.antonybresolin.backend.domain.model;

import com.antonybresolin.backend.domain.model.value.ContractSigning;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "tb_contracts")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "contract_id")
    private UUID id;
    private int durationInMonths;
    private BigDecimal fineForBrokenContract;
    private BigDecimal rentValue;
    private Date paymentDate;
    @Embedded
    private ContractSigning contractSigning;

    @ManyToOne
    @JoinColumn(name = "user_user_id")
    private User user;

    @CreationTimestamp
    private Instant createAt;

    @UpdateTimestamp
    private Instant updateAt;

    public Contract() {
    }

    public Contract(int durationInMonths, BigDecimal fineForBrokenContract, BigDecimal rentValue, Date paymentDate, ContractSigning contractSigning, User user) {
        this.durationInMonths = durationInMonths;
        this.fineForBrokenContract = fineForBrokenContract;
        this.rentValue = rentValue;
        this.paymentDate = paymentDate;
        this.contractSigning = contractSigning;
        this.user = user;
    }

    public int getDurationInMonths() {
        return durationInMonths;
    }

    public void setDurationInMonths(int durationInMonths) {
        this.durationInMonths = durationInMonths;
    }

    public BigDecimal getFineForBrokenContract() {
        return fineForBrokenContract;
    }

    public void setFineForBrokenContract(BigDecimal fineForBrokenContract) {
        this.fineForBrokenContract = fineForBrokenContract;
    }

    public BigDecimal getRentValue() {
        return rentValue;
    }

    public void setRentValue(BigDecimal rentValue) {
        this.rentValue = rentValue;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public ContractSigning getContractSigning() {
        return contractSigning;
    }

    public void setContractSigning(ContractSigning contractSigning) {
        this.contractSigning = contractSigning;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
