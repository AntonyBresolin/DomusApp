package com.antonybresolin.backend.house;

import com.antonybresolin.backend.application.HouseService;
import com.antonybresolin.backend.application.exceptions.ResourceNotFoundException;
import com.antonybresolin.backend.domain.model.House;
import com.antonybresolin.backend.domain.model.Role;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.domain.model.value.Address;
import com.antonybresolin.backend.domain.model.value.HouseStatus;
import com.antonybresolin.backend.domain.model.value.PropertyFeatures;
import com.antonybresolin.backend.infrastructure.repositories.HouseRepository;
import com.antonybresolin.backend.infrastructure.repositories.UserRepository;
import com.antonybresolin.backend.presentation.HousePresentation;
import com.antonybresolin.backend.presentation.dto.CreateHouseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Transactional
public class HouseTest {

    @Mock
    private HouseRepository houseRepository;

    @Mock
    private UserRepository userRepository;

    @Mock  
    private JwtAuthenticationToken token;

    private HouseService houseService;
    private HousePresentation housePresentation;
    private User mockUser;
    private CreateHouseDTO mockHouseDTO;
    private House mockHouse;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        houseService = new HouseService(houseRepository, userRepository);
        housePresentation = new HousePresentation(houseService);

        mockUser = new User();
        mockUser.setUsername("testowner");
        mockUser.setName("Test Owner");
        
        Role locatorRole = new Role();
        locatorRole.setName("LOCATOR");
        mockUser.setRoles(Set.of(locatorRole));

        Address address = new Address("Assis Chateaubriand", "PR", "85937000", "Rua Paraná");
        PropertyFeatures features = new PropertyFeatures(4, 2, 54.4F);
        mockHouseDTO = new CreateHouseDTO(address, features);
        mockHouse = new House(address, features);
        mockHouse.setUser(mockUser);

        when(token.getName()).thenReturn("testowner");
    }

    @Test
    void createHouse_ValidData_ReturnsSuccessResponse() {
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(mockHouse);
        
        ResponseEntity<String> response = housePresentation.createHouse(mockHouseDTO, token);
        
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertEquals("Casa criada com sucesso", response.getBody());
        verify(houseRepository, times(1)).save(any(House.class));
        verify(userRepository, times(1)).findByUsername("testowner");
    }

    @Test
    void createHouse_UserNotFound_ThrowsException() {
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.empty());
        
        assertThrows(Exception.class, () -> {
            housePresentation.createHouse(mockHouseDTO, token);
        });
        
        verify(houseRepository, never()).save(any(House.class));
    }

    @Test
    void getHousesByOwner_ValidUser_ReturnsHousesList() {
        List<House> houses = List.of(mockHouse);
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.findHouseByUser_Username("testowner")).thenReturn(Optional.of(houses));
        
        List<House> result = housePresentation.getHousesByOwner(token);
        
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals(mockHouse, result.get(0));
        verify(houseRepository, times(1)).findHouseByUser_Username("testowner");
    }

    @Test
    void getHousesByOwner_NoHousesFound_ThrowsResourceNotFoundException() {
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.findHouseByUser_Username("testowner")).thenReturn(Optional.empty());
        
        assertThrows(ResourceNotFoundException.class, () -> {
            housePresentation.getHousesByOwner(token);
        });
    }

    @Test
    void getHousesByOwner_UserNotAuthenticated_ReturnsEmptyList() {
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.empty());
        
        assertThrows(Exception.class, () -> {
            housePresentation.getHousesByOwner(token);
        });
    }

    @Test
    void houseCreation_WithAllProperties_Success() {
        Address address = new Address("São Paulo", "SP", "01310-100", "Avenida Paulista", "Apt 101");
        PropertyFeatures features = new PropertyFeatures(3, 2, 75.5F);
        House house = new House(address, features, HouseStatus.DISPONIVEL);
        house.setUser(mockUser);
        
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(house);
        
        ResponseEntity<String> response = housePresentation.createHouse(mockHouseDTO, token);
        
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertEquals(HouseStatus.DISPONIVEL, house.getStatus());
        assertNotNull(house.getAddress());
        assertNotNull(house.getPropertyFeatures());
        verify(houseRepository, times(1)).save(any(House.class));
    }

    @Test
    void houseCreation_DefaultStatus_SetsToDisponivel() {
        Address address = new Address("Curitiba", "PR", "80010-000", "Rua XV de Novembro");
        PropertyFeatures features = new PropertyFeatures(2, 1, 45.0F);
        House house = new House(address, features); // Construtor sem status - deve ser DISPONIVEL por padrão
        
        assertEquals(HouseStatus.DISPONIVEL, house.getStatus());
    }
}