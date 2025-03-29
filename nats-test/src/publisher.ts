import { connect } from 'nats'

/*
 * Videos 297 and 298
 * Options to access Nats Pod's port 4222 outside the k8s cluster
 * - Ingress-nginx + ClusterIP service (heavyweight to test connection loss)
 * - NodePort service (still requires config file changes)
 * - Port-forwarding (easiest to test connection loss)
 *
 * kubectl get pods
 * kubectl port-forward nats-depl-ID 4222:4222 (video 298)
 *
 * Copilot: if nats k8s type is changed from Deployment to StatefulSet:
 * kubectl port-forward --namespace nats nats-0 4222:4222
 */
async function run() {
  const nc = await connect({ servers: 'localhost:4222' })

  nc.publish(
    'ticket.created',
    JSON.stringify({ id: '123', title: 'concert', price: 20 })
  )
  console.log('Event published')
}

console.clear()
run().catch(console.error)
