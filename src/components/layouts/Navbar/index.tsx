import styles from "./Navbar.module.scss"
import Link from "next/link"

export default function Navbar() {
 return (
  <div className={styles.navbar}>
   <Link className={styles.navbar__link} href="/">Home</Link>
   <Link className={styles.navbar__link} href="/product">Client-Side Render</Link>
   <Link className={styles.navbar__link} href="/product/server">Server-Side Render</Link>
   <Link className={styles.navbar__link} href="/product/static">Static-Site Generation</Link>
  </div>
 )
}