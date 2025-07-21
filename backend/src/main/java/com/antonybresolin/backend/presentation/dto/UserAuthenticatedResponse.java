package com.antonybresolin.backend.presentation.dto;

public class UserAuthenticatedResponse {
    public UserResponse user;
    public boolean isAuthenticated;

    public UserAuthenticatedResponse(UserResponse user, boolean isAuthenticated) {
        this.user = user;
        this.isAuthenticated = isAuthenticated;
    }

    @SuppressWarnings("unused")
    public UserAuthenticatedResponse() {
    }
}
