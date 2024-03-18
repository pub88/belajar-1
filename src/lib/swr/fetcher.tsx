// export default async function fetcher(url: string) { 
//     fetch(url).then((res) => res.json());
// }
export default async function fetcher(url: string) {
  const res = await fetch(url);
  return res.json();
}
// const fetcher = async (url: string) => {
//     const res = await fetch((url));
// };

// export default fetcher;