package com.EventManagementSystem.Authentication_Service.Security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;


public class JwtUtil {

    private static final String SECRET = "mysecretkey";

    public static String generateToken(String username, String role) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, SECRET.getBytes())
                .compact();
    }
}
