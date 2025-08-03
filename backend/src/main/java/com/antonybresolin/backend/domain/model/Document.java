package com.antonybresolin.backend.domain.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tb_documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "document_id")
    private UUID id;
    @ManyToOne
    @JoinColumn(name = "contract_contract_id")
    private Contract contract;
    @Lob
    @Column(nullable = false)
    private byte[] fileData;
    @Column(nullable = false)
    private String fileName;
    @Column(nullable = false)
    private boolean isAuthenticated;

    @CreationTimestamp
    private Instant createAt;

    public Document() {
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) {
        this.fileData = fileData;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public boolean isAuthenticated() {
        return isAuthenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        isAuthenticated = authenticated;
    }
}
