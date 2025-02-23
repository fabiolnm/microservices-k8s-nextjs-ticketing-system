## Microservices with Node JS and React
Build, deploy, and scale an E-Commerce app using Microservices built with Node, React, Docker and Kubernetes

Criado por Stephen Grider

https://www.udemy.com/course/microservices-with-node-js-and-react/

### Getting started
- Ensure Kubernetes is enabled in Docker
- Ensure ingress-nginx is installed
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
```

- Init secret and start skaffold
```
# Verify skaffold is using the correct context
kubectl config current-context

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_secret_key

# Restart skaffold
skaffold dev
```

### Troubleshooting

> Your connection is not private
> Attackers might be trying to steal your information from ticketing.dev (for example, passwords, messages, or credit cards). Learn more about this warning


Type: click in any part of the browser and type `thisisunsafe`.

#### Some useful commands
```
# Clean up Docker resources
docker system prune -af

kubectl rollout restart deployment auth-depl
```