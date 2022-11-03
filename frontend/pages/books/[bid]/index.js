import Link from "next/link";

//context.params.bid
export async function getStaticProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${context.params.bid}`);
    const data = await res.json();
    return {
        props: {
            book: data
        }
    }
}

export async function getStaticPaths(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
    const data = await res.json();

    return {
        paths: data.map(book => {
            return {params: {bid: book.id.toString()}}
        }),
        fallback: false
    }
}

const BookDetail = ({ book }) => {
    return (
        <>
            <h1>{book.title}</h1>
            <button><Link href={`/books/${book.id}/edit`}>EDIT</Link></button>
            <Link href="/books">Go Back</Link>
        </>
    );
}

export default BookDetail;