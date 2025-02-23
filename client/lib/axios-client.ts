import axios from "axios"
import { headers } from 'next/headers'

export default async function axiosClient() {
  const headersList = await headers()

  const params = {
    baseURL: 'http://ingress-nginx-controller.ingress-nginx',
    headers: {
      'Host': headersList.get('host'),
      'Cookie': headersList.get('cookie'),
    }
  }
  return axios.create(params)
}