import axiosClient from "@/lib/axios-client"

export default async function Home() {
  const client = await axiosClient()
  const { data: { currentUser } } = await client.get('/api/users/currentuser')
  return (
    <h1>
      {!currentUser
        ? 'Not signed in'
        : <>Current user: {currentUser?.email}</>}
    </h1>
  )
}
