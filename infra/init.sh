kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

# Verify skaffold is using the correct context
kubectl config current-context

# Optional
#
# Run once, to create a secret for JWT_KEY for the very first time
# kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_secret_key

# Port-forwarding to test the NATS server
# kubectl get pods
# kubectl port-forward nats-depl-ID 4222:4222 (video 298)
