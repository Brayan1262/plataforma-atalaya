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
