package com.antonybresolin.backend.user;

import com.antonybresolin.backend.application.UserService;
import com.antonybresolin.backend.domain.model.Role;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.infrastructure.repositories.RoleRepository;
import com.antonybresolin.backend.infrastructure.repositories.UserRepository;
import com.antonybresolin.backend.presentation.UserPresentation;
import com.antonybresolin.backend.presentation.dto.CreateUserDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Transactional
public class UserPresentationTest {

    @Mock
    private JwtEncoder jwtEncoder;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    private UserPresentation userPresentation;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        UserService userService = new UserService(userRepository, roleRepository, passwordEncoder);
        userPresentation = new UserPresentation(userService);

        Role basicRole = new Role();
        basicRole.setName("BASIC");
        
        when(roleRepository.findByName("BASIC")).thenReturn(basicRole);
        when(passwordEncoder.encode(any(String.class))).thenReturn("encoded_password");

        Jwt jwtMock = mock(Jwt.class);
        Mockito.when(jwtMock.getTokenValue()).thenReturn("test.jwt.token");
        when(jwtEncoder.encode(any(JwtEncoderParameters.class))).thenReturn(jwtMock);
    }

    @Test
    void createUser() {
        CreateUserDto dto = new CreateUserDto("antony", "123", "111.111.111-01", "antony henrique bresolin", true);
        
        when(userRepository.findByUsername("antony")).thenReturn(Optional.empty());
        
        ResponseEntity<Void> responseEntity = userPresentation.newUser(dto);
        
        assertNotNull(responseEntity);
        assertEquals(201, responseEntity.getStatusCode().value());
        
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void createUser_UserAlreadyExists_ThrowsException() {
        CreateUserDto dto = new CreateUserDto("antony", "123", "111.111.111-01", "antony henrique bresolin", true);
        
        User existingUser = new User();
        existingUser.setUsername("antony");
        when(userRepository.findByUsername("antony")).thenReturn(Optional.of(existingUser));
        
        assertThrows(ResponseStatusException.class, () -> {
            userPresentation.newUser(dto);
        });
        
        verify(userRepository, never()).save(any(User.class));
    }
}
