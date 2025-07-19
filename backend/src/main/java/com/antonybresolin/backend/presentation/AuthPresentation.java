package com.antonybresolin.backend.presentation;

import com.antonybresolin.backend.application.AuthService;
import com.antonybresolin.backend.presentation.dto.LoginRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/v1/auth")
public class AuthPresentation {
    private final AuthService authService;

    public AuthPresentation(AuthService authService) {
        this.authService = authService;
    }

    @Transactional
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        validCredentials(loginRequest);
        Map<String, String> responseBody = authService.isValidUser(loginRequest, response);
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        Map<String, String> responseBody = authService.logout(response);
        return ResponseEntity.ok(responseBody);
    }

    public void validCredentials(LoginRequest loginRequest) {
        if (loginRequest.username().isEmpty() || loginRequest.password().isEmpty()) {
            throw new BadCredentialsException("Need inform credentials.");
        }
    }
}
