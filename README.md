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

#### MongoDB Memory Server
```
pnpm install -g mongodb-memory-server
Packages: +44
++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 45, reused 41, downloaded 4, added 44, done
 WARN  mongodb-memory-server has no binaries

~/Library/pnpm/global/5:
+ mongodb-memory-server 10.1.4

╭ Warning ──────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                               │
│   Ignored build scripts: mongodb-memory-server.                                               │
│   Run "pnpm approve-builds -g" to pick which dependencies should be allowed to run scripts.   │
│                                                                                               │
╰───────────────────────────────────────────────────────────────────────────────────────────────╯

Done in 1.4s

% pnpm approve-builds -g
✔ Choose which packages to build (Press <space> to select, <a> to toggle all, <i> to invert selection) · mongodb-memory-server
✔ The next packages will now be built: mongodb-memory-server.
Do you approve? (y/N) · true
.pnpm/mongodb-memory-server@10.1.4/node_modules/mongodb-memory-server: Running postinstall script, done in 97ms
```

#### Note
I this error happens
> console.warn Starting the MongoMemoryServer Instance failed, enable debug log for more information. Error: Error: spawn Unknown system error -88 at ChildProcess.spawn (node:internal/child_process:421:11) at spawn (node:child_process:760:9) at MongoInstance._launchMongod

Try to install it globally:
```
pnpm install mongodb-memory-server-global
pnpm approve-builds
```