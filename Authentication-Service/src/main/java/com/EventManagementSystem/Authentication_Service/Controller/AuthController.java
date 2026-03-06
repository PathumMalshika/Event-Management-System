package com.EventManagementSystem.Authentication_Service.Controller;

import com.EventManagementSystem.Authentication_Service.Security.JwtUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestParam String username,
                                     @RequestParam String password) {

        String role;

        if(username.equals("admin") && password.equals("123")){
            role = "ADMIN";
        } else if(username.equals("user") && password.equals("123")){
            role = "USER";
        } else {
            throw new RuntimeException("Invalid credentials");
        }

        String token = JwtUtil.generateToken(username, role);

        Map<String,String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }
}
