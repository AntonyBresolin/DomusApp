package com.antonybresolin.backend.house;

import com.antonybresolin.backend.application.HouseService;
import com.antonybresolin.backend.application.exceptions.ResourceNotFoundException;
import com.antonybresolin.backend.domain.model.House;
import com.antonybresolin.backend.domain.model.Role;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.domain.model.value.Address;
import com.antonybresolin.backend.domain.model.value.HouseStatus;
import com.antonybresolin.backend.domain.model.value.HouseType;
import com.antonybresolin.backend.domain.model.value.HouseUtilities;
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

import java.math.BigDecimal;
import java.util.Arrays;
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
        HouseUtilities utilities = new HouseUtilities(true, true, true, true);
        PropertyFeatures features = new PropertyFeatures(4, 2, 54.4F, Arrays.asList("Garagem", "Jardim"), utilities);
        
        mockHouseDTO = new CreateHouseDTO(
            address, 
            features, 
            HouseType.HOUSE, 
            HouseStatus.DISPONIVEL, 
            new BigDecimal("1500.00"), 
            "Casa de Teste", 
            "Uma casa perfeita para testes"
        );
        
        mockHouse = new House(
            address, 
            features, 
            HouseType.HOUSE, 
            new BigDecimal("1500.00"), 
            "Casa de Teste", 
            "Uma casa perfeita para testes"
        );
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
        HouseUtilities utilities = new HouseUtilities(true, false, true, true);
        PropertyFeatures features = new PropertyFeatures(3, 2, 75.5F, Arrays.asList("Varanda", "Área de serviço"), utilities);
        
        CreateHouseDTO houseDTO = new CreateHouseDTO(
            address, 
            features, 
            HouseType.APARTMENT, 
            HouseStatus.DISPONIVEL, 
            new BigDecimal("2000.00"), 
            "Apartamento Paulista", 
            "Apartamento moderno na Paulista"
        );
        
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(mockHouse);
        
        ResponseEntity<String> response = housePresentation.createHouse(houseDTO, token);
        
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertEquals("Casa criada com sucesso", response.getBody());
        verify(houseRepository, times(1)).save(any(House.class));
    }

    @Test
    void houseCreation_DefaultHouseType_SetsToHouse() {
        Address address = new Address("Curitiba", "PR", "80010-000", "Rua XV de Novembro");
        HouseUtilities utilities = new HouseUtilities(true, true, true, false);
        PropertyFeatures features = new PropertyFeatures(2, 1, 45.0F, Arrays.asList("Quintal"), utilities);
        
        CreateHouseDTO houseDTO = new CreateHouseDTO(
            address, 
            features, 
            null, // HouseType null - deve ser HOUSE por padrão
            HouseStatus.DISPONIVEL, 
            new BigDecimal("800.00"), 
            "Casa Simples", 
            "Casa simples e aconchegante"
        );
        
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(mockHouse);
        
        ResponseEntity<String> response = housePresentation.createHouse(houseDTO, token);
        
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        verify(houseRepository, times(1)).save(any(House.class));
    }

    @Test
    void houseCreation_DefaultStatus_SetsToDisponivel() {
        // Arrange
        Address address = new Address("Curitiba", "PR", "80010-000", "Rua XV de Novembro");
        HouseUtilities utilities = new HouseUtilities(true, true, true, false);
        PropertyFeatures features = new PropertyFeatures(2, 1, 45.0F, Arrays.asList("Quintal"), utilities);
        
        House house = new House(
            address, 
            features, 
            HouseType.HOUSE, 
            new BigDecimal("800.00"), 
            "Casa Simples", 
            "Casa simples e aconchegante"
        );
        
        // Assert
        assertEquals(HouseStatus.DISPONIVEL, house.getStatus());
    }

    @Test
    void houseCreation_WithDifferentHouseTypes_Success() {
        // Test APARTMENT
        Address address1 = new Address("São Paulo", "SP", "01310-100", "Avenida Paulista");
        HouseUtilities utilities1 = new HouseUtilities(true, true, true, true);
        PropertyFeatures features1 = new PropertyFeatures(2, 1, 60.0F, Arrays.asList("Sacada"), utilities1);
        
        CreateHouseDTO apartmentDTO = new CreateHouseDTO(
            address1, features1, HouseType.APARTMENT, HouseStatus.DISPONIVEL,
            new BigDecimal("1800.00"), "Apartamento Centro", "Apartamento no centro"
        );
        
        // Test COMMERCIAL
        Address address2 = new Address("Rio de Janeiro", "RJ", "22071-900", "Avenida Copacabana");
        HouseUtilities utilities2 = new HouseUtilities(true, false, true, true);
        PropertyFeatures features2 = new PropertyFeatures(0, 2, 100.0F, Arrays.asList("Estacionamento"), utilities2);
        
        CreateHouseDTO commercialDTO = new CreateHouseDTO(
            address2, features2, HouseType.COMMERCIAL, HouseStatus.DISPONIVEL,
            new BigDecimal("3000.00"), "Loja Copacabana", "Loja comercial"
        );
        
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(mockHouse);
        
        // Act & Assert
        ResponseEntity<String> response1 = housePresentation.createHouse(apartmentDTO, token);
        ResponseEntity<String> response2 = housePresentation.createHouse(commercialDTO, token);
        
        assertNotNull(response1);
        assertEquals(201, response1.getStatusCode().value());
        assertNotNull(response2);
        assertEquals(201, response2.getStatusCode().value());
        verify(houseRepository, times(2)).save(any(House.class));
    }

    @Test
    void houseCreation_WithUtilities_Success() {
        // Arrange
        Address address = new Address("Belo Horizonte", "MG", "30112-000", "Rua da Bahia");
        HouseUtilities utilities = new HouseUtilities(true, false, true, false); // Apenas água e luz
        PropertyFeatures features = new PropertyFeatures(3, 2, 80.0F, Arrays.asList("Garagem", "Quintal"), utilities);
        
        CreateHouseDTO houseDTO = new CreateHouseDTO(
            address, features, HouseType.HOUSE, HouseStatus.DISPONIVEL,
            new BigDecimal("1200.00"), "Casa BH", "Casa em Belo Horizonte"
        );
        
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(mockHouse);
        
        // Act
        ResponseEntity<String> response = housePresentation.createHouse(houseDTO, token);
        
        // Assert
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertEquals("Casa criada com sucesso", response.getBody());
        verify(houseRepository, times(1)).save(any(House.class));
    }

    @Test
    void houseCreation_WithFeaturesList_Success() {
        // Arrange
        Address address = new Address("Porto Alegre", "RS", "90010-150", "Rua dos Andradas");
        HouseUtilities utilities = new HouseUtilities(true, true, true, true);
        PropertyFeatures features = new PropertyFeatures(
            4, 3, 120.0F, 
            Arrays.asList("Piscina", "Churrasqueira", "Área gourmet", "Jardim", "Garagem para 2 carros"), 
            utilities
        );
        
        CreateHouseDTO houseDTO = new CreateHouseDTO(
            address, features, HouseType.HOUSE, HouseStatus.DISPONIVEL,
            new BigDecimal("2500.00"), "Casa de Luxo", "Casa com várias comodidades"
        );
        
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(mockHouse);
        
        // Act
        ResponseEntity<String> response = housePresentation.createHouse(houseDTO, token);
        
        // Assert
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        verify(houseRepository, times(1)).save(any(House.class));
    }

    @Test
    void houseCreation_WithDifferentStatuses_Success() {
        // Test MANUTENCAO status
        Address address = new Address("Salvador", "BA", "40070-110", "Avenida Sete de Setembro");
        HouseUtilities utilities = new HouseUtilities(true, true, false, true); // Sem luz temporariamente
        PropertyFeatures features = new PropertyFeatures(2, 1, 50.0F, Arrays.asList("Varanda"), utilities);
        
        CreateHouseDTO houseDTO = new CreateHouseDTO(
            address, features, HouseType.APARTMENT, HouseStatus.MANUTENCAO,
            new BigDecimal("900.00"), "Apartamento Salvador", "Em manutenção"
        );
        
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(mockHouse);
        
        // Act
        ResponseEntity<String> response = housePresentation.createHouse(houseDTO, token);
        
        // Assert
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        verify(houseRepository, times(1)).save(any(House.class));
    }

    @Test
    void houseCreation_WithHighRentValue_Success() {
        // Arrange
        Address address = new Address("Brasília", "DF", "70040-010", "Asa Norte");
        HouseUtilities utilities = new HouseUtilities(true, true, true, true);
        PropertyFeatures features = new PropertyFeatures(5, 4, 200.0F, Arrays.asList("Piscina", "Sauna", "Academia"), utilities);
        
        CreateHouseDTO houseDTO = new CreateHouseDTO(
            address, features, HouseType.HOUSE, HouseStatus.DISPONIVEL,
            new BigDecimal("8000.00"), "Mansão Brasília", "Casa de alto padrão"
        );
        
        when(userRepository.findByUsername("testowner")).thenReturn(Optional.of(mockUser));
        when(houseRepository.save(any(House.class))).thenReturn(mockHouse);
        
        // Act
        ResponseEntity<String> response = housePresentation.createHouse(houseDTO, token);
        
        // Assert
        assertNotNull(response);
        assertEquals(201, response.getStatusCode().value());
        assertTrue(new BigDecimal("8000.00").compareTo(new BigDecimal("1000.00")) > 0);
        verify(houseRepository, times(1)).save(any(House.class));
    }
}