package com.antonybresolin.backend.infrastructure.repositories;

import com.antonybresolin.backend.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
