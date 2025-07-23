package com.antonybresolin.backend.presentation;

import com.antonybresolin.backend.application.HouseService;
import com.antonybresolin.backend.domain.model.House;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class HousePresentation {
    private final HouseService houseService;

    @Autowired
    public HousePresentation(HouseService houseService) {
        this.houseService = houseService;
    }

    @GetMapping
    public List<House> getHousesByOwner(JwtAuthenticationToken token){
        String username = token.getName();
        return houseService.getHousesByOwner(username).orElse(Collections.emptyList());
    }

}
