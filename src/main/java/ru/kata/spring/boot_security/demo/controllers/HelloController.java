package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Controller
public class HelloController {
    private final UserService userService;

    public HelloController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping({"/", "/index"})
    public String index(Principal principal, ModelMap modelMap) {
        List<String> messages = new ArrayList<>();
        messages.add("Hello!");
        messages.add("I`m Spring MVC application");
        messages.add("KATA PreProject 3.1.3 Spring Security");
        modelMap.addAttribute("messages", messages);

        if (principal != null) {
            modelMap.addAttribute("user" , userService.findByUsername(principal.getName()).orElseThrow());
        }
        return "index";
    }

}
