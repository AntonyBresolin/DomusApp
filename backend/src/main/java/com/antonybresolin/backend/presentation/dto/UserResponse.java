package com.antonybresolin.backend.presentation.dto;

import java.util.Set;

public class UserResponse {
    private final String username;
    private final Set<String> roles;
    private final String name;

    public UserResponse(String username, Set<String> roles, String name) {
        this.username = username;
        this.roles = roles;
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public String getName() {
        return name;
    }
}