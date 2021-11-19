import React, {useState, useEffect} from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import axios from 'axios'


const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=vgbPUfSvEF3wGERlfIRo5AYKTN8KDuEk`
            )
            setBooks(res.data.results.books)
            console.log(res.data.results.books);
        }

        fetchBooks()
    }, [])

        return (
        <div>
            <h1 className="font-bold text-center text-4xl py-5 lg:text-6xl">Bestsellers 2021</h1> 
            <section className="grid grid-cols-1 gap-10 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((book) => {
                    const {author, rank, title, publisher, book_image, description, primary_isbn10, buy_links} = book

                    return (
                        <article key={rank} className="bg-gray-100 py-5 px-10 rounded-lg sm:px-5 lg:grid-cols-3">
                            <div>
                                <img src={book_image} alt={title}
                                className="block mx-auto w-1/2 text-center"  />
                            </div>
                            <div>
                                <h2 className="font-bold my-2 text-2x1 text-center">{title}</h2>
                                <p className="mb-4">{description}</p>
                                <span className="font-bold text-center">Author:{author}</span>
                            </div>

                             <ul  className="mb-4">
                                 <li>
                                 <span className="font-bold">Rank:{rank}</span></li>
                                 <li>
                                 <span className="font-bold">Publisher:{publisher}</span></li>
                                 <li>
                                 <span className="font-bold">ISBN:{primary_isbn10}</span></li> 
                            </ul>

                            <ul>
                                <h3 className="font-bold text-xl ">Purchase:</h3>
                                {buy_links.map((link) => {
                                    const {name,url} = link
                                    return (
                                        <div key={name}>
                                          <a href={url} className="flex items-center" target="_blank" rel="noopenner noreferrer">{name}  <BiLinkExternal className="ml-1"/></a>
                                        </div>
                                    )
                                })}
                            </ul>
                        </article>
                    )
                })}
            </section>
        </div>
    );
}
    

export default Books
