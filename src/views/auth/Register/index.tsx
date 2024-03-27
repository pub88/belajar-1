import Link from 'next/link';
import styles from './register.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterView() {
    const [isLoading, setIsLoading] = useState(false);
    const {push} = useRouter();
    const [error, setError] = useState(""); 

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);
        // const form = event.currentTarget;
        // if (!form) {
        //     return;
        // }

        // setIsLoading(true);

        // const data = { 
        //     email: form.email.value,
        //     fullname: form.fullname.value,
        //     password: form.password.value
        // }

        const data = { 
            email: event.target.email.value,
            fullname: event.target.fullname.value,
            password: event.target.password.value
        }
        
        const result = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : null,
        });
        
        if (result.status === 200) {
            event.target.reset();
            console.log(result);
            setIsLoading(false);
            push("/auth/login");
    }

    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register Page</h1>
            {error && <p className={styles.register__error}>{error}</p>}
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email" className={styles.register__form__item__label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email'
                            className={styles.register__form__item__input}
                        />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname" className={styles.register__form__item__label}>Fullname</label>
                        <input
                            type="fullname"
                            name="fullname"
                            id="fullname"
                            placeholder='Fullname'
                            className={styles.register__form__item__input}
                        />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password" className={styles.register__form__item__label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            className={styles.register__form__item__input}
                        />
                    </div>
                    <button type='submit' className={styles.register__form__item__button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
            </div>
            <p className={styles.register__link}>
                Sudah punya akun? <Link href={'/auth/register'}>Login di sini</Link>
            </p>
        </div>
    )
}