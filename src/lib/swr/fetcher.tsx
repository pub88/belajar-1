export default async function fetcher(url: string) { 
    fetch(url).then((res) => res.json());
}