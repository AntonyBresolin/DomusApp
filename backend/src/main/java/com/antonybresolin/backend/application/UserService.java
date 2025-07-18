package com.antonybresolin.backend.application;

import com.antonybresolin.backend.domain.model.Role;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.infrastructure.repositories.RoleRepository;
import com.antonybresolin.backend.infrastructure.repositories.UserRepository;
import com.antonybresolin.backend.presentation.dto.CreateUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ResponseEntity<Void> createUser(CreateUserDto dto){
        var basicRole = roleRepository.findByName(Role.Values.BASIC.name());
        var userFromDB = userRepository.findByUsername(dto.username());

        userFromDB.ifPresentOrElse(
                user -> {
                    throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
                },
                () -> {
                    User user = new User(dto.username(), passwordEncoder.encode(dto.password()), Set.of(basicRole));

                    userRepository.save(user);
                }
        );

        return ResponseEntity.status(201).build();
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
