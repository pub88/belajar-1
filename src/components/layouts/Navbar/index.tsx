import styles from "./Navbar.module.scss"
import { signOut, signIn, useSession } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
    const { data } = useSession();

    if (data?.user) {
        return (
            <div className={styles.navbar}>
                <Link className={styles.navbar__link} href="/">Home</Link>
                <Link className={styles.navbar__link} href="/product">Client-Side Render</Link>
                <Link className={styles.navbar__link} href="/product/server">Server-Side Render</Link>
                <Link className={styles.navbar__link} href="/product/static">Static-Site Generation</Link>
                <Link className={styles.navbar__link} href="/profile">Profile {data.user.email}</Link>
                <button onClick={()=>signOut()}>Sign out</button>
            </div>
        )
    } else {
        return (
            <div className={styles.navbar}>
                <Link className={styles.navbar__link} href="/">Home</Link>
                <button onClick={()=>signIn()}>Sign in</button>
            </div>
        )
    }
}