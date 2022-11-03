import Link from "next/link";
import {useRouter} from 'next/router';
import { useState } from "react";

export async function getServerSideProps({params}){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`);
    const data = await res.json();

    return {
        props:{
            book:data
        }
    }
}

const BookEdit = ({book}) => {
    const [bookTitle, setBookTitle] = useState(book.title);
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    async function handleSubmit(e){
        e.preventDefault();
        setSubmitting(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            //We pass the _method hidden attribute
            body: JSON.stringify({
                title: bookTitle,
                _method: 'PATCH'
            })
        });
        if(res.ok){
            setErrors([]);
            setBookTitle('');
            return router.push('/books');
        }else{
            const data = await res.json();
            setErrors(data.errors);
            setSubmitting(false);
        }
    };
    return (
        <div>
            <h1>Edit Book {book.title}</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={(e)=>{
                        setBookTitle(e.target.value);
                    }} 
                    type="text"
                    value={bookTitle}
                    disabled={submitting}
                    data-cy='input-book-title' />
                <button disabled={submitting}
                data-cy='button-submit-book'>
                    {submitting ? 'Editing...!' : 'Edit!'}
                </button>
            </form>
            {errors.title && <span style={{color: 'red', display: 'block'}}>{errors.title}</span>}
            <Link href="/books">Go Back</Link>
        </div>
    );
}

export default BookEdit;