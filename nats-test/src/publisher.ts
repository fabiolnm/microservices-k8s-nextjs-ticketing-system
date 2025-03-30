import { connect } from 'nats'
import { connectionOptions } from './connection-options'
import { TicketCreatedPublisher } from './events/ticket-created-publisher'
import { TicketUpdatedPublisher } from './events/ticket-updated-publisher'

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
async function createStream() {
  const nc = await connect({ ...connectionOptions, name: 'ticket-publisher' })

  // https://github.com/nats-io/nats.js/blob/main/jetstream/README.md#jetstreammanager-jsm
  const stream = 'ticket'
  const jsm = await nc.jetstreamManager()
  jsm.streams.add({ name: stream, subjects: [`${stream}.*`] })
  // await jsm.streams.delete(stream)

  // list all consumers for a stream:
  // const consumers = await jsm.consumers.list(stream).next()
  // console.log({ consumers })

  return nc.jetstream()
}

console.clear()
createStream().then(async (client) => {
  // Publish ticket created event
  await new TicketCreatedPublisher(client).publish({
    id: '123',
    title: 'concert',
    price: 20,
  })

  // Publish ticket updated event
  await new TicketUpdatedPublisher(client).publish({
    id: '123',
    title: 'concert updated',
    price: 30,
  })
}).catch(console.error)
