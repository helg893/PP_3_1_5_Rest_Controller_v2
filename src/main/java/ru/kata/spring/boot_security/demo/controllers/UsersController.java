package ru.kata.spring.boot_security.demo.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.util.UserValidator;


import java.security.Principal;
import java.util.NoSuchElementException;

@Controller
public class UsersController {
    private final UserService userService;
    private final RoleService roleService;
    private final UserValidator userValidator;

    @Autowired
    public UsersController(UserService userService, RoleService roleService, UserValidator userValidator) {
        this.userService = userService;
        this.roleService = roleService;
        this.userValidator = userValidator;
    }

    @GetMapping(value = "/user")
    public String user(Principal principal, Model model) {
        model.addAttribute("user", userService.findByUsername(principal.getName()).orElseThrow());
        return "user";
    }

    @GetMapping(value = "/admin")
    public String admin(Model model) {
        model.addAttribute("users", userService.findAll());
        return "admin/users";
    }

    @GetMapping(value = "/admin/newUser")
    public String newUser(@ModelAttribute("user") User user, Model model) {
        model.addAttribute("allRoles", roleService.findAll());
        return "admin/newUser";
    }

    @PostMapping(value = "/admin")
    public String create(@ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            return "admin/newUser";
        }
        userService.save(user);
        return "redirect:/admin";
    }

    private static final String ERROR_MSG_USER_ID_NOT_FOUND = "Пользователь c id=%s не найден";

    @GetMapping(value = "/admin/edit")
    public String edit(@RequestParam final long id, Model model) {
        try {
            model.addAttribute("user", userService.findById(id).orElseThrow());
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format(ERROR_MSG_USER_ID_NOT_FOUND, id));
        }
        model.addAttribute("allRoles", roleService.findAll());
        return "admin/editUser";
    }

    @PatchMapping(value = "/admin")
    public String update(@RequestParam final long id/*@RequestParam final String id*/,
                         @ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        String oldUsername = userService.findById(id).orElseThrow().getUsername();
        if (!oldUsername.equalsIgnoreCase(user.getUsername())) {
            userValidator.validate(user, bindingResult);
        }
        if (bindingResult.hasErrors()) {
            return "admin/editUser";
        }
        userService.update(id, user);
        return "redirect:/admin";
    }

    @DeleteMapping(value = "/admin")
    public String delete(@RequestParam final long id) {
        userService.deleteById(id);
        return "redirect:/admin";
    }

}
