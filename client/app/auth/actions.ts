'use server'

import axiosClient from "@/lib/axios-client"

export async function getCurrentUser() {
  const client = await axiosClient()
  const { data: { currentUser } } = await client.get('/api/users/currentuser')

  return currentUser
}