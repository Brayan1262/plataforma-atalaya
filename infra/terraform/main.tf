terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.25.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.16.0"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

# ==========================================
# FASE 0: FUNDAMENTOS
# ==========================================
resource "kubernetes_namespace" "sentinelops_core" {
  metadata {
    name = "sentinelops-core"
    labels = {
      "istio-injection" = "enabled"
    }
  }
}

# ==========================================
# FASE 1: IDENTIDAD Y GOBERNANZA
# ==========================================

# Namespaces para herramientas core
resource "kubernetes_namespace" "istio_system" {
  metadata { name = "istio-system" }
}
resource "kubernetes_namespace" "vault" {
  metadata { name = "vault" }
}
resource "kubernetes_namespace" "keycloak" {
  metadata { name = "keycloak" }
}
resource "kubernetes_namespace" "gatekeeper_system" {
  metadata { name = "gatekeeper-system" }
}

# 1. Istio (Service Mesh)
resource "helm_release" "istio_base" {
  name       = "istio-base"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "base"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.20.0"
}

resource "helm_release" "istiod" {
  name       = "istiod"
  repository = "https://istio-release.storage.googleapis.com/charts"
  chart      = "istiod"
  namespace  = kubernetes_namespace.istio_system.metadata[0].name
  version    = "1.20.0"
  depends_on = [helm_release.istio_base]
}

# 2. HashiCorp Vault
resource "helm_release" "vault" {
  name       = "vault"
  repository = "https://helm.releases.hashicorp.com"
  chart      = "vault"
  namespace  = kubernetes_namespace.vault.metadata[0].name
  values     = [file("${path.module}/values/vault-values.yaml")]
}

# 3. Keycloak (IAM)
resource "helm_release" "keycloak" {
  name       = "keycloak"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "keycloak"
  version    = "19.3.2"
  namespace  = kubernetes_namespace.keycloak.metadata[0].name
  values     = [file("${path.module}/values/keycloak-values.yaml")]
  wait       = false
}

# 4. OPA Gatekeeper
resource "helm_release" "gatekeeper" {
  name       = "gatekeeper"
  repository = "https://open-policy-agent.github.io/gatekeeper/charts"
  chart      = "gatekeeper"
  namespace  = kubernetes_namespace.gatekeeper_system.metadata[0].name
}

# ==========================================
# FASE 2: EL BACKBONE (DATA & EVENTS)
# ==========================================
resource "kubernetes_namespace" "data_layer" {
  metadata { 
    name = "data-layer" 
    labels = {
      "istio-injection" = "enabled" # El backbone también tendrá mTLS
    }
  }
}

# 1. Apache Kafka (Strimzi Operator)
resource "helm_release" "strimzi_operator" {
  name       = "strimzi-kafka-operator"
  repository = "https://strimzi.io/charts/"
  chart      = "strimzi-kafka-operator"
  version    = "0.38.0"
  namespace  = kubernetes_namespace.data_layer.metadata[0].name
  wait       = false
}

# 2. PostgreSQL (Bitnami)
resource "helm_release" "postgresql" {
  name       = "postgresql"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "postgresql"
  version    = "13.2.24"
  namespace  = kubernetes_namespace.data_layer.metadata[0].name
  values     = [file("${path.module}/values/postgres-values.yaml")]
  wait       = false
}

# 3. ClickHouse (Bitnami)
resource "helm_release" "clickhouse" {
  name       = "clickhouse"
  repository = "https://charts.bitnami.com/bitnami"
  chart      = "clickhouse"
  version    = "4.1.8"
  namespace  = kubernetes_namespace.data_layer.metadata[0].name
  values     = [file("${path.module}/values/clickhouse-values.yaml")]
  wait       = false
}
