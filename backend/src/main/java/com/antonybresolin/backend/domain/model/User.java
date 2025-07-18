package com.antonybresolin.backend.domain.model;

import com.antonybresolin.backend.presentation.dto.LoginRequest;
import jakarta.persistence.*;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "tb_users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    public User() {
    }

    public User(String username, String password, Set<Role> roles) {
        setUsername(username);
        setPassword(password);
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

    public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
        if (loginRequest == null) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        return passwordEncoder.matches(loginRequest.password(), this.password);
    }
}
