.PHONY: init cluster-up cluster-down deploy-infra clean

CLUSTER_NAME := sentinelops-local

init:
	@echo "Inicializando SentinelOps..."
	@terraform -chdir=infra/terraform init

cluster-up:
	@echo "Levantando cluster local de Kubernetes (Kind)..."
	@kind create cluster --name $(CLUSTER_NAME) --config infra/kubernetes/kind-cluster.yaml
	@kubectl cluster-info

cluster-down:
	@echo "Destruyendo cluster local..."
	@kind delete cluster --name $(CLUSTER_NAME)

deploy-infra:
	@echo "Desplegando infraestructura base (Terraform local)..."
	@terraform -chdir=infra/terraform apply -auto-approve

clean: cluster-down
	@rm -rf infra/terraform/.terraform
	@rm -f infra/terraform/.terraform.lock.hcl

build-apps:
	@echo "Construyendo imagenes Docker (esto tomara unos minutos)..."
	@docker build -t sentinelops/core-gateway:latest ./services/core-gateway
	@docker build -t sentinelops/telemetry-service:latest ./services/telemetry-service
	@docker build -t sentinelops/analyzer-service:latest ./services/analyzer-service

load-apps: build-apps
	@echo "Inyectando imagenes al cluster Kind..."
	@kind load docker-image sentinelops/core-gateway:latest --name $(CLUSTER_NAME)
	@kind load docker-image sentinelops/telemetry-service:latest --name $(CLUSTER_NAME)
	@kind load docker-image sentinelops/analyzer-service:latest --name $(CLUSTER_NAME)

deploy-apps: load-apps
	@echo "Desplegando microservicios en Kubernetes..."
	@kubectl apply -f infra/kubernetes/apps/apps.yaml
