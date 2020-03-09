# Running Consul with Kubernetes
## Overview
## Prerequisites
* [kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl)
* [helm](https://helm.sh/docs/intro/install/)
* [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)

## Running the Cluster
1. From the repository directory, run `kubectl apply -f k8s/`.
2. Follow instructions: https://learn.hashicorp.com/consul/kubernetes/minikube .
3. Access consul ui: `minikube service hashicorp-consul-ui`.
4. Verify if you can get the config by accessing `192.168.99.100:31515/:key`.
