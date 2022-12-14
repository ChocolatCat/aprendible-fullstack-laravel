import Link from 'next/link';

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
    const data = await res.json();
    return {
        props: {
            books: data
        }
    }
}

const BookList = ({books}) => {
    async function handleDelete(e, bookId){
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            //We pass the _method hidden attribute
            body: JSON.stringify({
                _method: 'DELETE'
            })
        });
        if(res.ok){
            window.location.href = '/books';
        }
    }
    return (
        <div>
            <h1>Books:</h1>
            <ul data-cy="book-list">
                {books.map(book => (
                    <li key={`book-${book.id}`}>
                        <Link data-cy={`link-to-visit-book-${book.id}`} href={`/books/${book.id}`}>{book.title}</Link>
                        {' - '}
                        <Link data-cy={`link-to-edit-book-${book.id}`} href={`/books/${book.id}/edit`}>Edit</Link>
                        {' - '}
                        <form onSubmit={(e) => handleDelete(e, book.id)}
                            style={{display: 'inline'}}
                        >
                            <button data-cy={`button-to-delete-book-${book.id}`}>Delete</button>
                        </form>
                    </li>
                ))}
            </ul>
            <Link href="/books/create">Add New Book</Link>
        </div>
    );
}

export default BookList;