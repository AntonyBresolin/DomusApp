package com.antonybresolin.backend.domain.model;

import com.antonybresolin.backend.domain.model.value.Address;
import com.antonybresolin.backend.domain.model.value.ContractEssentialData;
import com.antonybresolin.backend.presentation.dto.LoginRequest;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "tb_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    @SuppressWarnings("unused")
    private UUID id;
    @Column(unique = true)
    private String username;
    private String password;
    private String name;
    private String cpf;
    @Embedded
    private Address address;
    @Embedded
    private ContractEssentialData contractEssentialData;

    @CreationTimestamp
    private Instant createAt;

    @UpdateTimestamp
    private Instant updateAt;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public User() {
    }

    public User(String username, String password, String name, String cpf, Set<Role> roles) {
        setUsername(username);
        setPassword(password);
        this.name = name;
        this.cpf = cpf;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String login) {
        if (login.length() < 3) throw new IllegalArgumentException("Invalid username.");
        this.username = login;
    }

    public void setPassword(String password) {
        if (password.length() < 3) throw new IllegalArgumentException("Invalid password.");
        this.password = password;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }


    public UUID getId() {
        return id;
    }

    public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
        if (loginRequest == null) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return passwordEncoder.matches(loginRequest.password(), this.password);
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ContractEssentialData getContractEssentialData() {
        return contractEssentialData;
    }

    public void setContractEssentialData(ContractEssentialData contractEssentialData) {
        this.contractEssentialData = contractEssentialData;
    }
}
