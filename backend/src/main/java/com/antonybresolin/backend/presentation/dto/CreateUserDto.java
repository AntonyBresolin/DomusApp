package com.antonybresolin.backend.presentation.dto;

public record CreateUserDto(String username, String password, String cpf, String name, boolean isLocator) {
}
