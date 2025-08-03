package com.antonybresolin.backend.application;

import com.antonybresolin.backend.domain.model.Role;
import com.antonybresolin.backend.domain.model.User;
import com.antonybresolin.backend.infrastructure.repositories.RoleRepository;
import com.antonybresolin.backend.infrastructure.repositories.UserRepository;
import com.antonybresolin.backend.presentation.dto.CreateUserDto;
import com.antonybresolin.backend.presentation.dto.UpdateUserNoSensitiveDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
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

    public ResponseEntity<Void> createUser(CreateUserDto dto) {
        var userFromDB = userRepository.findByUsername(dto.username());

        userFromDB.ifPresentOrElse(
                user -> {
                    throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
                },
                () -> {
                    User user = new User(dto.username(), passwordEncoder.encode(dto.password()), dto.name(), dto.cpf(), getUserRoles(dto));
                    userRepository.save(user);
                }
        );

        return ResponseEntity.status(201).build();
    }

    public ResponseEntity<Void> updateUser(UpdateUserNoSensitiveDTO updateUserNoSensitiveDTO, String username) {
        Optional<User> currentUser = userRepository.findByUsername(username);

        currentUser.ifPresentOrElse(
                user -> {
                    if (updateUserNoSensitiveDTO.contractEssentialData() != null) { user.setContractEssentialData(updateUserNoSensitiveDTO.contractEssentialData()); }
                    if (updateUserNoSensitiveDTO.address() != null) { user.setAddress(updateUserNoSensitiveDTO.address()); }
                    if (updateUserNoSensitiveDTO.name() != null) { user.setName(updateUserNoSensitiveDTO.name()); }
                    if (updateUserNoSensitiveDTO.cpf() != null) { user.setCpf(updateUserNoSensitiveDTO.cpf()); }

                    userRepository.save(user);
                },
                () -> {
                    throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
                }
        );
        return ResponseEntity.ok().build();
    }

    private Set<Role> getUserRoles(CreateUserDto dto) {
        Set<Role> roles = new HashSet<>();
        if (dto.isLocator()) {
            roles.add(roleRepository.findByName(Role.Values.LOCATOR.name()));
        } else {
            roles.add(roleRepository.findByName(Role.Values.TENANT.name()));
        }
        var basicRole = roleRepository.findByName(Role.Values.BASIC.name());
        roles.add(basicRole);
        return roles;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
