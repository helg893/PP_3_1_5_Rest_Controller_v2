package ru.kata.spring.boot_security.demo.dto;

import lombok.Data;
import ru.kata.spring.boot_security.demo.models.Role;

import java.util.Collection;

@Data
public class UserDTO {
    private long id;
    private String username;
    private String name;
    private String surname;
    private String email;
    private int age;
    private Collection<Role> roles;
}
