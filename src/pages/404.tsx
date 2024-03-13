import styles from "@/styles/404.module.scss";
import Image from "next/image";

export default function Custom404() {
    return (
        <div className={styles.error}>
            <Image src="/404.png" width={500} height={500} alt="404" />
            <h1>nyasar brodi</h1>
        </div>
    )
};