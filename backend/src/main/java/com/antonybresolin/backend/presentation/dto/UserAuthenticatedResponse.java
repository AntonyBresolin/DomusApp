package com.antonybresolin.backend.presentation.dto;

import com.antonybresolin.backend.domain.model.User;

public class UserAuthenticatedResponse {
    public User user;
    public boolean isAuthenticated;

    public UserAuthenticatedResponse(User user, boolean isAuthenticated) {
        user.clearSensitiveData();
        this.user = user;
        this.isAuthenticated = isAuthenticated;
    }

    @SuppressWarnings("unused")
    public UserAuthenticatedResponse() {
    }
}
