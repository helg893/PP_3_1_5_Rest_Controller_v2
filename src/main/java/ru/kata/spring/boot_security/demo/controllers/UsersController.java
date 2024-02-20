package ru.kata.spring.boot_security.demo.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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
        model.addAttribute("loggedInUser", userService.findByUsername(principal.getName()).orElseThrow());
        return "user";
    }

    @GetMapping(value = "/admin")
    public String admin(Principal principal, Model model) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("loggedInUser", userService.findByUsername(principal.getName()).orElseThrow());
        model.addAttribute("userToUpdate", new User());
        model.addAttribute("allRoles", roleService.findAll());
        return "admin/users";
    }

    @GetMapping(value = "/admin/newUser")
    public String newUser(Principal principal, @ModelAttribute("user") User user, Model model) {
        model.addAttribute("loggedInUser", userService.findByUsername(principal.getName()).orElseThrow());
        model.addAttribute("allRoles", roleService.findAll());
        return "admin/newUser";
    }

    @PostMapping(value = "/admin")
    public String create(Principal principal, @ModelAttribute("user") @Valid User user, BindingResult bindingResult, Model model) {
        userValidator.validate(user, bindingResult);
        if (bindingResult.hasErrors()) {
            model.addAttribute("loggedInUser", userService.findByUsername(principal.getName()).orElseThrow());
            model.addAttribute("allRoles", roleService.findAll());
            return "admin/newUser";
        }
        userService.save(user);
        return "redirect:/admin";
    }

    @PatchMapping(value = "/admin")
    public String update(@RequestParam final long id,
                         @ModelAttribute("user") @Valid User user, BindingResult bindingResult) {
        String oldUsername = userService.findById(id).orElseThrow().getUsername();
        if (!oldUsername.equalsIgnoreCase(user.getUsername())) {
            userValidator.validate(user, bindingResult);
        }
        if (bindingResult.hasErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    String.format("INCORRECT FIELDS VALUES: %s",
                            String.join(";", bindingResult.getFieldErrors().stream().map(FieldError::toString).toList())));
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
