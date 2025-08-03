package com.antonybresolin.backend.auth;

import com.antonybresolin.backend.application.AuthService;
import com.antonybresolin.backend.domain.model.Role;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.infrastructure.repositories.UserRepository;
import com.antonybresolin.backend.presentation.AuthController;
import com.antonybresolin.backend.presentation.dto.LoginRequest;
import com.antonybresolin.backend.presentation.dto.UserAuthenticatedResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@Transactional
public class AuthControllerTest {

    @Mock
    private JwtEncoder jwtEncoder;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Mock
    private HttpServletResponse response;

    private AuthController authController;
    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        AuthService authService = new AuthService(passwordEncoder, userRepository, jwtEncoder);
        authController = new AuthController(authService);

        mockUser = new User();
        mockUser.setUsername("testuser");
        mockUser.setPassword("encoded_password");

        Role role = new Role();
        role.setName("BASIC");
        mockUser.setRoles(Set.of(role));

        Jwt jwtMock = mock(Jwt.class);
        Mockito.when(jwtMock.getTokenValue()).thenReturn("test.jwt.token");
        when(jwtEncoder.encode(any(JwtEncoderParameters.class))).thenReturn(jwtMock);
    }

    @Test
    void login_ValidCredentials_ReturnsToken() {
        LoginRequest loginRequest = new LoginRequest("testuser", "password123");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(eq(loginRequest.password()), eq(mockUser.getPassword())))
                .thenReturn(true);

        ResponseEntity<UserAuthenticatedResponse> responseEntity = authController.login(loginRequest, response);

        assertNotNull(responseEntity);
        assertEquals(200, responseEntity.getStatusCode().value());
        assertTrue(Objects.requireNonNull(responseEntity.getBody()).isAuthenticated);
        assertNotNull(responseEntity.getBody().user);
        verify(response).addCookie(any(Cookie.class));
    }

    @Test
    void login_InvalidCredentials_ThrowsBadCredentialsException() {
        LoginRequest loginRequest = new LoginRequest("testuser", "wrongpassword");
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches(eq(loginRequest.password()), eq(mockUser.getPassword())))
                .thenReturn(false);

        assertThrows(BadCredentialsException.class, () -> {
            authController.login(loginRequest, response);
        });
    }

    @Test
    void login_UserNotFound_ThrowsBadCredentialsException() {
        LoginRequest loginRequest = new LoginRequest("nonexistentuser", "password123");
        when(userRepository.findByUsername("nonexistentuser")).thenReturn(Optional.empty());

        assertThrows(BadCredentialsException.class, () -> {
            authController.login(loginRequest, response);
        });
    }

    @Test
    void logout_ClearsUserCookie() {
        ResponseEntity<Map<String, String>> responseEntity = authController.logout(response);

        assertNotNull(responseEntity);
        assertEquals(200, responseEntity.getStatusCode().value());
        assertEquals("Logout Successful!", responseEntity.getBody().get("message"));

        verify(response).addCookie(argThat(cookie ->
                cookie.getName().equals("accessToken") &&
                        cookie.getValue() == null
        ));
    }
}
