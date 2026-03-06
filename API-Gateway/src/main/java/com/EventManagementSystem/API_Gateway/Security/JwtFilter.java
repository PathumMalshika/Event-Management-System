package com.EventManagementSystem.API_Gateway.Security;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtFilter implements GlobalFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();

        if(path.contains("/auth")){
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst("Authorization");

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing token");
        }

        String token = authHeader.substring(7);

        if(!JwtUtil.validateToken(token)){
            throw new RuntimeException("Invalid token");
        }

        String role = JwtUtil.getRole(token);

        if(path.contains("/events/create") && !role.equals("ADMIN")){
            throw new RuntimeException("Access Denied");
        }

        return chain.filter(exchange);
    }
}