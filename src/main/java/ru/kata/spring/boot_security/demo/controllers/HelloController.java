package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class HelloController {
    @GetMapping("/")
    public String index(ModelMap modelMap) {
        List<String> messages = new ArrayList<>();
        messages.add("Hello!");
        messages.add("I`m Spring MVC application");
        messages.add("KATA PP 3.1.3 Spring Security");
        modelMap.addAttribute("messages", messages);
        return "index";
    }

}
