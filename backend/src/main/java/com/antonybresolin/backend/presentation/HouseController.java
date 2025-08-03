package com.antonybresolin.backend.presentation;

import com.antonybresolin.backend.application.HouseService;
import com.antonybresolin.backend.domain.model.House;
import com.antonybresolin.backend.domain.model.value.HouseType;
import com.antonybresolin.backend.presentation.dto.CreateHouseDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("api/v1/houses")
@SecurityRequirement(name = "bearerAuth")
public class HouseController {
    private final HouseService houseService;

    @Autowired
    public HouseController(HouseService houseService) {
        this.houseService = houseService;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<House> getHousesByOwner(JwtAuthenticationToken token) {
        String username = token.getName();
        return houseService.getHousesByOwner(username).orElse(Collections.emptyList());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('SCOPE_ADMIN', 'SCOPE_LOCATOR')")
    public ResponseEntity<String> createHouse(@RequestBody CreateHouseDTO houseDTO,
                                            JwtAuthenticationToken token){
        String username = token.getName();

        // TODO - Fazer validação em todos lugares se o userID do token é igual ao que ele está passando em house
        return houseService.createHouse(
                new House(
                        houseDTO.address(),
                        houseDTO.propertyFeatures(),
                        houseDTO.houseType() != null ? houseDTO.houseType() : HouseType.HOUSE,
                        houseDTO.rentValue(),
                        houseDTO.name(),
                        houseDTO.description()),
                username);
    }

}
