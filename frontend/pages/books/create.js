import Link from "next/link";
import {useRouter} from 'next/router';
import { useState } from "react";

const BookCreate = () => {
    const [bookTitle, setBookTitle] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    async function handleSubmit(e){
        e.preventDefault();
        setSubmitting(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: bookTitle
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
            <h1>Add New Book</h1>
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
                    data-cy='button-submit-book'
                >
                    {submitting ? 'Adding...!' : 'Add!'}
                </button>
            </form>
            {errors.title && <span style={{color: 'red', display: 'block'}}>{errors.title}</span>}
            <Link href="/books">Go Back</Link>
        </div>
    );
}

export default BookCreate;