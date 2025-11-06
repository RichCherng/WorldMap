package com.worldmap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping({"/", "/home", "/about", "/contact"})
    public String index() {
        return "forward:/index.html";
    }
}