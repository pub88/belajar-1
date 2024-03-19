import styles from './DetailProduct.module.scss';
import { ProductType } from '@/types/Product.type';

export default function DetailProduct({product}: {product: ProductType}) {
    return (
        <>
            <h1 className={styles.title}>Detail Products</h1>
            <div className={styles.productDetail}>
                <div className={styles.productDetail__image}>
                    <img src={product.image} alt={product.name}/>
                </div>
                <p className={styles.productDetail__name}>
                    {product.name}
                </p>
                <p className={styles.productDetail__category}>
                    {product.category}
                </p>
                <p className={styles.productDetail__price}>
                    {product.price &&product.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    })}
                </p>
            </div>
        </>
    );
}