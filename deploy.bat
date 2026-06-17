@echo off
echo ==========================================
echo CONSTRUYENDO IMAGENES DOCKER (FASE 5)
echo Esto puede tardar varios minutos (Maven descargando internet...)
echo ==========================================

echo [1/3] Construyendo Core Gateway...
docker build -t sentinelops/core-gateway:latest ./services/core-gateway

echo [2/3] Construyendo Telemetry Service...
docker build -t sentinelops/telemetry-service:latest ./services/telemetry-service

echo [3/3] Construyendo Analyzer Service...
docker build -t sentinelops/analyzer-service:latest ./services/analyzer-service

echo ==========================================
echo INYECTANDO IMAGENES A KUBERNETES LOCAL
echo ==========================================
kind load docker-image sentinelops/core-gateway:latest --name sentinelops-local
kind load docker-image sentinelops/telemetry-service:latest --name sentinelops-local
kind load docker-image sentinelops/analyzer-service:latest --name sentinelops-local

echo ==========================================
echo DESPLEGANDO MANIFIESTOS (ISTIO INGRESS + APPS)
echo ==========================================
kubectl apply -f infra/kubernetes/apps/apps.yaml

echo ==========================================
echo ¡DESPLIEGUE FINALIZADO!
echo Ejecuta: kubectl get pods -n sentinelops-core
echo ==========================================
pause
