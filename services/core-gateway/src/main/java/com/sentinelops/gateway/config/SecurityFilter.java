package com.sentinelops.gateway.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class SecurityFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(SecurityFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getURI().getPath();
        log.info("[Zero-Trust] Interceptando peticion entrante hacia: {}", path);

        // TODO: Fase 4 - Integracion real con Keycloak (Validacion JWT)
        // TODO: Fase 4 - Integracion real con OPA (Verificacion de politicas)
        
        log.info("[Zero-Trust] Validacion simulada superada. Enrutando peticion...");

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            log.info("[Zero-Trust] Finalizando respuesta desde: {}", path);
        }));
    }

    @Override
    public int getOrder() {
        return -1; // Prioridad maxima: ejecutar antes que cualquier ruta
    }
}
