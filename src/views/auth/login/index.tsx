import Link from 'next/link';
import styles from './login.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '@/lib/firebase/service';
// import getConfig from 'next/config'

// Define a type for the response object
type SignInResponse = {
    id: string;
    error?: string;
} | null;

export default function LoginView() {
    const [isLoading, setIsLoading] = useState(false);
    const { push, query } = useRouter();
    const [error, setError] = useState(""); 

    const callbackUrl: any = query.callbackUrl || '/';

// Define a type for the response object
type SignInResponse = {
    id: string;
    error?: string;
  };
  
//   export default async function handler(
//       req: NextApiRequest,
//       res: NextApiResponse<Data>
//   ) {
//       if(req.method === 'POST') {
//           // Ensure that signIn returns a SignInResponse object
//           const res: SignInResponse = await signIn("credentials", {
//               redirect: false,
//               email: event.target.email.value,
//               password: event.target.password.value,
//               callbackUrl
//           });

//           if(!res?.error) {
//               setIsLoading(false);
//               push(callbackUrl);
//               console.log("berhasil");
//           } else {
//               setIsLoading(false);
//               setError(res.error);
//               console.log("gagal di if");
//           }
//       } else {
//           // setIsLoading(false);
//           res.status(405).json({ status: false, message: 'Method Not Allowed' });
//       }
//   }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        // pake Server-Side Rendering karena error, ada komponen FS dan FS itu gak bisa dijalankan di Client
        try {
            const res : SignInResponse = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl
            });
            
            if(!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
                console.log("berhasil");
            } else {
                setIsLoading(false);
                setError(res.error);
                console.log("gagal di if");
            }
        } catch(error:any) {
            setIsLoading(false);
            setError("Email or Password incorrect");
        }
    }

    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login Page</h1>
            {error && <p className={styles.login__error}>{error}</p>}
            <div className={styles.login__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.login__form__item}>
                        <label htmlFor="email" className={styles.login__form__item__label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email'
                            className={styles.login__form__item__input}
                        />
                    </div>
                    <div className={styles.login__form__item}>
                        <label htmlFor="password" className={styles.login__form__item__label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            className={styles.login__form__item__input}
                        />
                    </div>
                    <button type='submit' className={styles.login__form__item__button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "login"}
                    </button>
                </form>
            </div>
            <p className={styles.login__link}>
                Belum punya akun? <Link href={'/auth/register'}>Daftar di sini</Link>
            </p>
        </div>
    )
}