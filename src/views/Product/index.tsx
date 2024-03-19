import styles from './Product.module.scss';
import {ProductType} from "@/types/Product.type";
import Link from 'next/link';
// import Image from 'next/image';

export default function ProductView({products}:{products: ProductType[] }) {
    return (
        <div className={styles.product}>
            <h1 className={styles.product__title}>Product</h1>
            <div className={styles.product__content}>
                {products.length > 0 ? (
                    <>
                        {products.map((product: ProductType) => (
                            <div key={product.id} className={styles.product__content__item}>
                                <div className={styles.product__content__item__image}>
                                    <img src={product.image} alt={product.name}/>
                                </div>
                                <p className={styles.product__content__item__name}>
                                    {product.name}
                                </p>
                                <p className={styles.product__content__item__category}>
                                    {product.category}
                                </p>
                                <p className={styles.product__content__item__price}>
                                    {product.price.toLocaleString("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    })}
                                </p>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className={styles.product__content__skeleton}>
                        <div className={styles.product__content__skeleton__image}/>
                        <div className={styles.product__content__skeleton__name}/>
                        <div className={styles.product__content__skeleton__category}/>
                        <div className={styles.product__content__skeleton__price}/>
                    </div>
                )}
            </div>
        </div>
    );
}