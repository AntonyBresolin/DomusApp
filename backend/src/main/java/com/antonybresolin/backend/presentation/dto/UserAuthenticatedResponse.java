package com.antonybresolin.backend.presentation.dto;

import com.antonybresolin.backend.domain.model.User;

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
