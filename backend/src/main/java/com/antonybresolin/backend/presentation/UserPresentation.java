package com.antonybresolin.backend.presentation;

import com.antonybresolin.backend.application.UserService;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.presentation.dto.CreateUserDto;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
@SecurityRequirement(name = "bearerAuth")
public class UserPresentation {
    private final UserService userService;

    @Autowired
    public UserPresentation(UserService userService) {
        this.userService = userService;
    }

    @Transactional
    @PostMapping("/create")
    public ResponseEntity<Void> newUser(@RequestBody CreateUserDto dto) {
        if (validateLoginData(dto)) return ResponseEntity.badRequest().build();
        return userService.createUser(dto);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    private static boolean validateLoginData(CreateUserDto dto) {
        return dto.username().isEmpty() || dto.password().isEmpty();
    }

}
