---
# E-Commerce Web Application 🛒

This is an E-Commerce web application built using the MERN stack.

## Technology Stack

- **Frontend**: React.js (⚛️)
- **Backend**: Node.js (🟩)
- **Database**: MongoDB (🍃)
- **Containerization**: Docker (🐳)
- **Orchestration**: Kubernetes  (minikube)

## Features

- **MERN Stack**: A powerful combination of MongoDB, Express.js, React.js, and Node.js.
- **Containerization**: Docker is used to containerize the web application for easy deployment and scalability.
<<<<<<< HEAD
- **Orchestration: Kubernetes minikube cluster is used for orchestrating the containerized web application.
- **CI/CD: 
=======
- **Orchestration**: Kubernetes minikube cluster is used for orchestrating the containerized web application.
- **CI/CD**: Circle-ci is used for automating the CI/CD pipeline.
>>>>>>> origin/main

## Getting Started

### Prerequisites

Make sure you have Docker installed on your machine.
Make sure you have Minikube installed on your machine.
<<<<<<< HEAD
=======
Make sure you have helm installed on your machine.
Make sure you have Circle-ci, configured, the local runner host VM setup in the Circle-ci UI.
>>>>>>> origin/main

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/huzaifa678/E-Commerce-Project.git
    cd E-Commerce-Project
    ```

2. **Build Docker image**:
    ```sh
    docker-compose build
    ```

3. **Run Docker containers**:
    ```sh
    docker-compose up
    ```

4. **Start the Minukube cluster**
    ```sh
    minikube start
    ```

5. **Start the Backend**
   ```sh
   kubectl port-forward 4001:4001
   ```
    
5. **Access the application**:
    ```sh
    minikube service frontend
    ```
    Open your browser and navigate to `http://localhost:3000`
---
