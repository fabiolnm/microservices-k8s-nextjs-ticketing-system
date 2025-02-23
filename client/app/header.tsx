import Link from "next/link"
import styles from './styles.module.sass'

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PageHeader({ currentUser }: Readonly<{ currentUser: any }>) {
  return (
    <nav className={styles.navbar}>
      <Link href="/">Home</Link>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {!currentUser && (
          <>
            <Link href="/auth/signin">Signin</Link>
            <Link href="/auth/signup">Signup</Link>
          </>
        )}
        {currentUser && <a href="/api/users/signout">Signout</a>}
      </div>
    </nav>
  )
}