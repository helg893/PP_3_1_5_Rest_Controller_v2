package ru.kata.spring.boot_security.demo.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.dto.UserDTO;
import ru.kata.spring.boot_security.demo.exception_handling.NoSuchUserException;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UsersRestController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    public UsersRestController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/users")
    public List<UserDTO> showAllUsers() {
        return userService.findAll().stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }

    @GetMapping("/users/{id}")
    public UserDTO getUser(@PathVariable long id) {
        return modelMapper.map(userService.findById(id).orElseThrow(() -> new NoSuchUserException(
                String.format("There is no user with id=%s exists", id))), UserDTO.class);
    }

    @PostMapping("/users")
    public UserDTO addNewUser(@RequestBody User user) {
        userService.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    @PutMapping("/users")
    public UserDTO updateUser(@RequestBody User user) {
        userService.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable long id) {
        userService.findById(id).orElseThrow(() -> new NoSuchUserException(
                String.format("There is no user with id=%s exists", id)
        ));
        userService.deleteById(id);
        return String.format("User with id=%s was successfully removed", id);
    }
}
