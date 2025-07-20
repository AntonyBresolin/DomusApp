package com.antonybresolin.backend.presentation;

import com.antonybresolin.backend.application.AuthService;
import com.antonybresolin.backend.presentation.dto.LoginRequest;
import com.antonybresolin.backend.presentation.dto.UserAuthenticatedResponse;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/auth")
public class AuthPresentation {
    private final AuthService authService;

    public AuthPresentation(AuthService authService) {
        this.authService = authService;
    }

    @Transactional
    @PostMapping("/login")
    public ResponseEntity<UserAuthenticatedResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        validCredentials(loginRequest);
        UserAuthenticatedResponse responseBody = authService.isValidUser(loginRequest, response);
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletResponse response) {
        Map<String, String> responseBody = authService.logout(response);
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getAuthStatus(JwtAuthenticationToken token) {
        if (token != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", true);
            response.put("username", token.getName());

            Collection<String> roles = token.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());
            response.put("roles", roles);

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("authenticated", false));
    }

    public void validCredentials(LoginRequest loginRequest) {
        if (loginRequest.username().isEmpty() || loginRequest.password().isEmpty()) {
            throw new BadCredentialsException("Need inform credentials.");
        }
    }
}
