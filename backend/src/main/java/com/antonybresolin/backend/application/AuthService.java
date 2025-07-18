package com.antonybresolin.backend.application;

import com.antonybresolin.backend.domain.model.Role;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.infrastructure.repositories.UserRepository;
import com.antonybresolin.backend.presentation.dto.LoginRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtEncoder jwtEncoder;

    @Autowired
    public AuthService(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository, JwtEncoder jwtEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtEncoder = jwtEncoder;
    }

    public Map<String, String> isValidUser(LoginRequest loginRequest, HttpServletResponse response) {
        var user = userRepository.findByUsername(loginRequest.username());
        if(user.isEmpty() || !user.get().isLoginCorrect(loginRequest, passwordEncoder)) {
            throw new BadCredentialsException("Invalid username or password");
        }

        var scopes = extractScopesFromUser(user);
        var claims = setJwtDataConfig(user, Instant.now(), scopes);
        var jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();

        cookieConfig(response, jwtValue);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("accessToken", jwtValue);

        return responseBody;
    }

    public Map<String, String> logout(HttpServletResponse response) {
        cookieConfig(response, null);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Logout Successful!");
        return responseBody;
    }

    private JwtClaimsSet setJwtDataConfig(Optional<User> user, Instant now, String scopes) {
        return JwtClaimsSet.builder()
                .issuer("backend")
                .subject(user.get().getUsername())
                .issuedAt(now)
                .expiresAt(now.plusSeconds(3600L))
                .claim("scope", scopes)
                .build();
    }

    private void cookieConfig(HttpServletResponse response, String jwtValue) {
        Cookie cookie = new Cookie("accessToken", jwtValue);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge((int) 3600L);
        response.addCookie(cookie);
    }

    private static String extractScopesFromUser(Optional<User> user) {
        return user.get().getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.joining(" "));
    }
}
