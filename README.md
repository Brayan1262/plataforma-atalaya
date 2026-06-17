# 🛡️ SentinelOps (Plataforma Atalaya)

**SentinelOps** (anteriormente conocida como Plataforma Atalaya) es una plataforma de ciberseguridad y monitorización de infraestructura en tiempo real. Está diseñada con una arquitectura de microservicios robusta, orientada a eventos, y cuenta con un Centro de Operaciones de Seguridad (SOC) de última generación.

---

## 🚀 Características Principales

*   **⚡ Real-Time Telemetry:** Flujo continuo de eventos de seguridad (SSE - Server-Sent Events) desde el backend directamente hasta el navegador en milisegundos. Sin tiempos de espera, sin polling.
*   **🧠 Arquitectura Orientada a Eventos:** Ingestión de millones de logs mediante **Apache Kafka** (Strimzi) para desacoplamiento total.
*   **🐳 Cloud-Native & Kubernetes:** Totalmente contenerizada (Docker) y orquestada en **Kubernetes**, con **Istio Service Mesh** para gestionar el tráfico (mTLS, Gateways, Virtual Services).
*   **💎 UI/UX Premium (Glassmorphism):** Un frontend reactivo construido con **React + Vite**, con un diseño corporativo estilo "Dark Mode Cyberpunk", soporte para Modo Claro/Oscuro, y gestión de perfiles con almacenamiento persistente.
*   **☕ Microservicios en Java Spring Boot:** Código limpio, mantenible y escalable, dividiendo responsabilidades entre *Telemetry Service*, *Analyzer Service* y *Core Gateway*.

---

## 🏗️ Arquitectura del Sistema

La solución está construida sobre los siguientes pilares tecnológicos:

1.  **Frontend:** React.js, Vite, Context API, CSS Variables (Dark/Light Mode).
2.  **Core Gateway (BFF):** Spring Boot, Spring Cloud Gateway (Manejo de rutas hacia microservicios y soporte CORS).
3.  **Servicios de Backend:** Spring Boot, Spring WebFlux (Programación Reactiva para SSE).
4.  **Message Broker:** Apache Kafka (Desplegado en K8s a través de Strimzi Operator).
5.  **Infraestructura:** Docker, Kubernetes (Kind), Istio (Ingress Gateway y Virtual Services).

---

## 🛠️ Requisitos Previos

Para correr este proyecto en tu entorno local, necesitas tener instalado:

*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Con integración WSL 2 si estás en Windows)
*   [kubectl](https://kubernetes.io/docs/tasks/tools/)
*   [Kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker)
*   [istioctl](https://istio.io/latest/docs/setup/getting-started/) (CLI de Istio)
*   [Node.js](https://nodejs.org/es/) (Para arrancar el frontend)
*   GNU Make (Opcional, pero muy recomendado para usar el Makefile automatizado)

---

## ⚙️ ¿Cómo levantar la plataforma?

El proyecto cuenta con un `Makefile` que automatiza absolutamente todo el ciclo de vida de la infraestructura. 

### 1. Levantar Infraestructura y Backend (Kubernetes)

Abre una terminal (PowerShell o Git Bash) en la raíz del proyecto y ejecuta el siguiente comando maestro:

```bash
make deploy-all
```

*¿Qué hace este comando?*
1. Crea un cluster local de Kubernetes (`kind`).
2. Instala **Istio** y sus Custom Resource Definitions.
3. Instala el operador de **Kafka** (Strimzi) y crea el cluster de mensajería.
4. Compila todas las imágenes Docker de los microservicios de Spring Boot en Java.
5. Carga las imágenes al cluster y despliega los manifiestos YAML (Pods, Services, VirtualServices).

### 2. Levantar el Frontend (Dashboard)

En una nueva terminal, navega a la carpeta del frontend e inicia el servidor de Vite:

```bash
cd frontend
npm install
npm run dev
```

### 3. Acceso a la Plataforma

*   **Frontend (UI):** Entra a `http://localhost:5173`. Te recibirá una pantalla de Login. 
    *   *Credenciales de acceso:* User: `brayan` | Pass: `123456`
*   **Backend Gateway (API):** Todas las peticiones del frontend viajan a `http://localhost:80` (A través del Istio Ingress Gateway).

---

## 📂 Estructura del Proyecto

```text
plataforma-atalaya/
├── frontend/                  # React + Vite (Dashboard UI)
├── infra/
│   └── kubernetes/            # Manifiestos YAML para Istio, Kafka y Microservicios
├── services/
│   ├── analyzer-service/      # Spring Boot: Consume Kafka y expone SSE hacia el Frontend
│   ├── core-gateway/          # Spring Boot: API Gateway (Enruta peticiones)
│   └── telemetry-service/     # Spring Boot: Recibe telemetría y publica en Kafka
├── Makefile                   # Scripts de automatización
└── README.md                  # Este documento
```

---

## 👨‍💻 Autor

Diseñado y desarrollado por **Brayan Jair Chavez Oscor** (Administrador del Sistema / Ciberseguridad).
