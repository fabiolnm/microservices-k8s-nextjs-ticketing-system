import { getCurrentUser } from "./auth/actions";
import { PageHeader } from "./header";

export default async function PageWithAppBar({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <>
      <PageHeader currentUser={currentUser} />
      {children}
    </>
  )
}