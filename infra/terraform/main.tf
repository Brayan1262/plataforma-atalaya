terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.25.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.12.0"
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

# Namespace principal para la plataforma
resource "kubernetes_namespace" "sentinelops_core" {
  metadata {
    name = "sentinelops-core"
    labels = {
      "istio-injection" = "enabled" # Preparado para Fase 1
    }
  }
}

# Aqui agregaremos los Helm releases en el futuro (Vault, Keycloak, etc.)
