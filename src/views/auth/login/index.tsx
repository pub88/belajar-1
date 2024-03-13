import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.scss"

export default function LoginViews() {
    const {push} = useRouter();

    const handlerLogin = () => {
        push("../");
    };
    
    return (
        <div className={styles.login}>
            <h1 className="text-3xl font-bold">Login Page</h1>
            <button onClick={()=>handlerLogin()}>Login</button>
            <p style={{color: "red", border: "1px solid red", borderRadius: "10px", padding: "10px", margin: "10px 0"}}>
                Belum punya akun? Registrasi <Link href={"/auth/register"}>disini</Link>
            </p>
        </div>
    )
}