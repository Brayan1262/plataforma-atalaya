# SentinelOps: Enterprise Security & Observability Platform

Plataforma de seguridad y observabilidad nativa de la nube (Cloud-Native) disenada bajo estandares Big Tech.

## Arquitectura

- **Fase 0:** Fundamentos (Terraform, Kind)
- **Fase 1:** Identidad y Gobernanza (Vault, OPA, Keycloak, Istio)
- **Fase 2:** Backbone de Datos (Kafka, Postgres, ClickHouse)
- **Fase 3:** Core Gateway (Java 21, Virtual Threads, Spring Cloud Gateway)
- **Fase 4:** Observabilidad (OpenTelemetry, Prometheus, Grafana, Loki, Tempo)
- **Fase 5:** Frontend Corporativo (React/Flutter)
- **Fase 6:** GitOps (ArgoCD, GitHub Actions)

## Inicio Rapido Local

Para levantar el entorno completo localmente:

1. Asegurate de tener `make`, `docker`, `kind`, `kubectl`, `terraform` y `helm` instalados.
2. Ejecuta:
   ```bash
   make cluster-up
   ```
