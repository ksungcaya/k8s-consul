# Running Consul with Kubernetes
## Overview
Simple Vault management setup using Consul as the backend storage of key-vaule pair configuration.


## Prerequisites
* [virtualbox](https://www.virtualbox.org/wiki/Downloads)
* [kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl)
* [helm](https://helm.sh/docs/intro/install/) (need Version 2)
* [minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)


## Running the Cluster
1. Start minkube `minikube start --vm-driver=virtualbox`
2. From the repository directory, run `kubectl apply -f k8s/`.
3. Follow instructions: https://learn.hashicorp.com/vault/getting-started-k8s/minikube. Note that all instance of `webapp` have been changed to `app`.
4. When creating a Kubernetes authentication role, named `app`, that connects the Kubernetes service account name and `app` policy, run the following to match the `serviceAccountName: k8s-simple` that was set in the `deployment.yml` file.

    ```bash
    vault write auth/kubernetes/role/app \
        bound_service_account_names=k8s-simple \
        bound_service_account_namespaces=default \
        policies=app \
        ttl=24h
    ```
5. Access consul ui: `minikube service hashicorp-consul-ui`.
6. Verify if you can get the config by accessing `192.168.99.100:31515/:key`. The sample application assumes that the `config` is in the vault path `secret/data/app/config` where the values are in `json`. 


## Further Readings
* https://www.vaultproject.io/docs/platform/k8s/helm/run/
* https://learn.hashicorp.com/vault/developer/sm-static-secrets
* https://learn.hashicorp.com/vault/identity-access-management/iam-policies
* https://www.vaultproject.io/docs/secrets/consul/ (Option if we are going to access KV's directly from Consul)
