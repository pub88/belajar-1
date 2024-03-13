import { useRouter } from "next/router";

export default function ShopPage() {
    const {query} = useRouter();

    return (
        <div>
            <h1>Detail Shop</h1>
            <p>
                Shop : {`${query.slug && query.slug[0] + " - " + query.slug[1]}`}
            </p>
        </div>
    );
}