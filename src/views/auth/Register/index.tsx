import Link from 'next/link';
import styles from './register.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterView() {
    const [isLoading, setIsLoading] = useState(false);
    const {push} = useRouter();
    const [error, setError] = useState(""); 

    // const state = {
    //     inputName: "",
    //     inputFullname: "",
    //     inputPasswrd: "",
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const data = { 
            email: e.target.eventemail.value,
            fullname: e.target.fullname.value,
            password: e.target.password.value
        }

        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: state,
            body: data,
            // body: JSON.stringify(data),
        };
        
        const result = await fetch("/api/register", settings);
        
        if (result.status !== 200) {
            e.target.reset();
            console.log(result);
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            console.log(result);
            console.error('Error creating new user:', error);
        }
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
                            name="eventemail"
                            id="email"
                            placeholder='Email'
                            className={styles.register__form__item__input}
                            // value={state.inputName}
                            // onChange={(e) => this.setIsLoading({ inputName: e.target.value })}
                        />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname" className={styles.register__form__item__label}>Fullname</label>
                        <input
                            type="fullname"
                            name="efullname"
                            id="fullname"
                            placeholder='Fullname'
                            className={styles.register__form__item__input}
                            // value={state.inputFullname}
                            // onChange={(e) => this.setIsLoading({ inputFullname: e.target.value })}
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
                            // value={state.inputPassword}
                            // onChange={(e) => this.setIsLoading({ inputPassword: e.target.value })}
                        />
                    </div>
                    <button type='submit' className={styles.register__form__item__button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
            </div>
            <p className={styles.register__link}>
                Sudah punya akun? <Link href={'/auth/login'}>Login di sini</Link>
            </p>
        </div>
    )
}