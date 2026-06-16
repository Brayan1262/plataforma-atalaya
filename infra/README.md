# Infraestructura: Decisiones Tecnicas (Trade-offs)

## Por que Kind (Kubernetes IN Docker)
Elegimos `Kind` sobre `Minikube` porque permite crear facilmente topologias multi-nodo locales a traves de simples archivos YAML. Esto nos permite simular nodos `control-plane` y `worker` separados, lo cual es vital para probar tolerations, node affinity y alta disponibilidad de forma local, requisitos indispensables en un entorno Enterprise.

## Por que Terraform + Helm
`Terraform` orquesta el aprovisionamiento de la nube y los namespaces base. `Helm` se usara para empaquetar aplicaciones. Aunque en la Fase 6 migraremos a `ArgoCD` (GitOps) para la sincronizacion continua, Terraform es ideal para la "Fase 0" e inicializar el cluster con sus dependencias base (como el propio ArgoCD o Ingress Controllers).
