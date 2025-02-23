import { getCurrentUser } from "./auth/actions"
import PageWithAppBar from "./page-with-app-bar"

export default async function Home() {
  const currentUser = await getCurrentUser()

  return (
    <PageWithAppBar>
      <h1>
        {!currentUser
          ? 'Not signed in'
          : <>Current user: {currentUser?.email}</>}
      </h1>
    </PageWithAppBar>
  )
}
