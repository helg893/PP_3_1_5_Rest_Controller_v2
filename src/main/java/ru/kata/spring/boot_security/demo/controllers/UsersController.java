package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.services.UserService;
import java.security.Principal;

@Controller
public class UsersController {
    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String getUsers(Principal principal, Model model) {
        model.addAttribute("loggedInUser", userService.findByUsername(principal.getName()).orElseThrow());
        return "admin/users";
    }

    @GetMapping(value = "/user")
    public String showUser(Principal principal, Model model) {
        model.addAttribute("loggedInUser", userService.findByUsername(principal.getName()).orElseThrow());
        return "user";
    }
}
