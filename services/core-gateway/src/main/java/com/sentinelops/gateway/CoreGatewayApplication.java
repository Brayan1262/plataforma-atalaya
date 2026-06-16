package com.sentinelops.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@SpringBootApplication
@RestController
public class CoreGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoreGatewayApplication.class, args);
    }

    @GetMapping("/fallback")
    public Mono<String> fallback() {
        return Mono.just("SentinelOps Guardian: Servicio temporalmente no disponible (Circuit Breaker Abierto). Por favor, intente más tarde.");
    }
}
