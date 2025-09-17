import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Books.css'; 
import b1 from '../../images/biography/anne frank.jpg';
import b2 from '../../images/business/5 KILLER Habits.jpg';
import b3 from '../../images/fiction/A court of silver flames - fic.jpg';
import b4 from '../../images/history/After 1177 B.C..jpg';
import b5 from '../../images/humor/a man called ove.jpg';
import b6 from '../../images/biography/apj abdul kalam.jpg';
import b7 from '../../images/business/DEEP WORK.jpg';
import b8 from '../../images/fiction/before coffee gets cold.jpg';
import b9 from '../../images/history/Bhagavad Gita.jpg';
import b10 from '../../images/humor/born a crime.jpg';
import b11 from '../../images/biography/becoming.jpg';
import b12 from '../../images/business/Do It Today.jpg';
import b13 from '../../images/fiction/dark matter.jpg';
import b14 from '../../images/history/Crazy History Facts Book.jpg';
import b15 from '../../images/humor/hyperbole and a half.jpg';
import b16 from '../../images/biography/benjamin franklin.jpg';
import b17 from '../../images/business/Human Edge in the AI Age.jpg';
import b18 from '../../images/fiction/of Blood and Fire - fic.jpg';
import b19 from '../../images/history/early indians.jpg';
import b20 from '../../images/humor/italian brainrot.jpg';
import b21 from '../../images/biography/Bhagat Singh.jpg';
import b22 from '../../images/business/Ikigai & Kaizen.jpg';
import b23 from '../../images/fiction/silver elite.jpg';
import b24 from "../../images/history/India's Glorious Scientific Tradition.jpg";
import b25 from '../../images/humor/lallan sweets.jpg';
import b26 from '../../images/biography/gandhi.jpg';
import b27 from '../../images/business/Never Split the Difference.jpg';
import b28 from '../../images/fiction/the great dune trilogy.jpg';
import b29 from "../../images/history/Julius Caesar.jpg";
import b30 from '../../images/humor/life lightly roasted.jpg';
import b31 from '../../images/biography/morrie.jpg';
import b32 from '../../images/business/The 5 AM Club.jpg';
import b33 from "../../images/fiction/The Hitchhiker's Guide to the Galaxy.jpg";
import b34 from '../../images/history/meditations.jpg';
import b35 from '../../images/humor/the liars guide.jpg';
import b36 from '../../images/business/The Psychology of Money.jpg';

const Books = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage on component mount
    useEffect(() => {
        const savedWishlist = localStorage.getItem('booknestWishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('booknestWishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Function to add a book to wishlist
    const addToWishlist = (book) => {
        // Get current wishlist from localStorage
        const savedWishlist = localStorage.getItem('booknestWishlist');
        let wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
        
        // Check if book is already in wishlist
        const isBookInWishlist = wishlist.some(item => item.id === book.id);
        
        if (!isBookInWishlist) {
            // Add the book to wishlist
            wishlist.push(book);
            
            // Save updated wishlist to localStorage
            localStorage.setItem('booknestWishlist', JSON.stringify(wishlist));
            
            // Show success message
            alert(`${book.title} has been added to your wishlist!`);
        } else {
            alert(`${book.title} is already in your wishlist!`);
        }
    };

    const books = [
        {
            id: 1,
            img: b1,
            title: "The Diary of a Young Girl",
            author: "Anne Frank",
            genre: "Biography",
            price: 150,
        },
        {
            id: 2,
            img: b2,
            title: "5 KILLER Habits",
            author: "Sree Krishna Seelam",
            genre: "Business",
            price: 120,
        },
        {
            id: 3,
            img: b3,
            title: "A court of silver flames",
            author: "Sarah J Maas",
            genre: "Fiction",
            price: 180,
        },
        {
            id: 4,
            img: b4,
            title: "After 1177 B.C.",
            author: "Eric H Cline",
            genre: "History",
            price: 140,
        },
        {
            id: 5,
            img: b5,
            title: "A Man called Ove",
            author: "Fredrick Backman",
            genre: "Humour",
            price: 130,
        },
        {
            id: 6,
            img: b6,
            title: "Wings of Fire",
            author: "Arun Tiwari",
            genre: "Biography",
            price: 110,
        },
        {
            id: 7,
            img: b7,
            title: "Deep Work",
            author: "Seth Godin",
            genre: "Business",
            price: 100,
        },
        {
            id: 8,
            img: b8,
            title: "Before the coffee gets cold",
            author: "Toshikazu Kawaguchi",
            genre: "Fiction",
            price: 125,
        },
        {
            id: 9,
            img: b9,
            title: "Bhagavad Gita",
            author: "Hari Chetan",
            genre: "History",
            price: 115,
        },
        {
            id: 10,
            img: b10,
            title: "Born a Crime",
            author: "Trevor Noah",
            genre: "Humour",
            price: 135,
        },
        {
            id: 11,
            img: b11,
            title: "Becoming",
            author: "Michelle Obama",
            genre: "Biography",
            price: 200,
        },
        {
            id: 12,
            img: b12,
            title: "Do It Today",
            author: "Darius Foroux",
            genre: "Business",
            price: 145,
        },
        {
            id: 13,
            img: b13,
            title: "Dark Matter",
            author: "Blake Crouch",
            genre: "Fiction",
            price: 95,
        },
        {
            id: 14,
            img: b14,
            title: "Crazy History Facts Book",
            author: "Skriuwer",
            genre: "History",
            price: 160,
        },
        {
            id: 15,
            img: b15,
            title: "Hyperbole and a Half",
            author: "Allie Brosh",
            genre: "Humour",
            price: 175,
        },
        {
            id: 16,
            img: b16,
            title: "The Autobiography of Benjamin Franklin",
            author: "Benjamin Franklin",
            genre: "Biography",
            price: 150,
        },
        {
            id: 17,
            img: b17,
            title: "Human Edge in the AI Age",
            author: "Nitin Seth",
            genre: "Business",
            price: 140,
        },
        {
            id: 18,
            img: b18,
            title: "Of Blood and Fire",
            author: "Ryan Cahill",
            genre: "Fiction",
            price: 190,
        },
        {
            id: 19,
            img: b19,
            title: "Early Indians",
            author: "Tony Joseph",
            genre: "History",
            price: 155,
        },
        {
            id: 20,
            img: b20,
            title: "Italian Brainrot",
            author: "Francesco Memetti",
            genre: "Humour",
            price: 165,
        },
        {
            id: 21,
            img: b21,
            title: "Why I am an Atheist and other works",
            author: "Bhagat Singh",
            genre: "Biography",
            price: 125,
        },
        {
            id: 22,
            img: b22,
            title: "Ikigai & Kaizen",
            author: "Anthony Raymond",
            genre: "Business",
            price: 145,
        },
        {
            id: 23,
            img: b23,
            title: "Silver Elite",
            author: "Dani Francis",
            genre: "Fiction",
            price: 135,
        },
        {
            id: 24,
            img: b24,
            title: "India's Glorious Scientific Tradition",
            author: "Suresh Soni",
            genre: "History",
            price: 150,
        },
        {
            id: 25,
            img: b25,
            title: "Lallan Sweets",
            author: "Srishti Chaudhary",
            genre: "Humour",
            price: 155,
        },
        {
            id: 26,
            img: b26,
            title: "An Autobiography - Mahatma Gandhi",
            author: "Mahatma Gandhi",
            genre: "Biography",
            price: 140,
        },
        {
            id: 27,
            img: b27,
            title: "Never Split the Difference",
            author: "Chris Voss",
            genre: "Business",
            price: 130,
        },
        {
            id: 28,
            img: b28,
            title: "The Great Dune Trilogy",
            author: "Frank Herbert",
            genre: "Fiction",
            price: 160,
        },
        {
            id: 29,
            img: b29,
            title: "Julius Caesar",
            author: "William Shakespeare",
            genre: "History",
            price: 145,
        },
        {
            id: 30,
            img: b30,
            title: "Life Lightly Roasted",
            author: "G.S Shridhar",
            genre: "Humour",
            price: 120,
        },
        {
            id: 31,
            img: b31,
            title: "Tuesday's with Morrie",
            author: "Mitch Albom",
            genre: "Biography",
            price: 150,
        },
        {
            id: 32,
            img: b32,
            title: "The 5 AM Club",
            author: "Robin Sharma",
            genre: "Business",
            price: 130,
        },
        {
            id: 33,
            img: b33,
            title: "The Hitchhiker's Guide to the Galaxy",
            author: "Douglas Adams",
            genre: "Fiction",
            price: 160,
        },
        {
            id: 34,
            img: b34,
            title: "Meditations",
            author: "Marcus Aurelius",
            genre: "History",
            price: 145,
        },
        {
            id: 35,
            img: b35,
            title: "The Liar's Guide",
            author: "Sanjay Shukla S J",
            genre: "Humour",
            price: 120,
        },
        {
            id: 36,
            img: b36,
            title: "The Psychology of Money",
            author: "Morgan Housel",
            genre: "Business",
            price: 180,
        }
    ];

    const filteredBooks = books.filter(book => {
        // Search term filter
        const matchesSearch = 
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.genre.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Genre filter
        const matchesGenre = genreFilter === '' || book.genre === genreFilter;
        
        // Price filter
        let matchesPrice = true;
        if (priceFilter === '0-100') {
            matchesPrice = book.price < 100;
        } else if (priceFilter === '100-200') {
            matchesPrice = book.price >= 100 && book.price <= 200;
        } else if (priceFilter === '200-300') {
            matchesPrice = book.price >= 200 && book.price <= 300;
        } else if (priceFilter === '300') {
            matchesPrice = book.price > 300;
        }
        
        return matchesSearch && matchesGenre && matchesPrice;
    });

    return (
        <div className='books'>
            <section className="browse-books">
                <div className="container">
                    <h2 className="section-title">Browse Our Collection</h2>
                    
                    <div className="search-filter">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search by title, author or genre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select 
                            className="filter-dropdown" 
                            id="genre-filter"
                            value={genreFilter}
                            onChange={(e) => setGenreFilter(e.target.value)}
                        >
                            <option value="">All Genres</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Humour">Humour</option>
                            <option value="Biography">Biography</option>
                            <option value="History">History</option>
                            <option value="Business">Business</option>
                        </select>
                        <select 
                            className="filter-dropdown" 
                            id="price-filter"
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                        >
                            <option value="">All Prices</option>
                            <option value="0-100">Under ₹100</option>
                            <option value="100-200">₹100 - ₹200</option>
                            <option value="200-300">₹200 - ₹300</option>
                            <option value="300">Above ₹300</option>
                        </select>
                    </div>

                    <div className="books-grid" id="books-container">
                        {filteredBooks.length > 0 ? (
                            filteredBooks.map((item) => (
                                <div key={item.id} className="book-card">
                                    <div className="book-badge">Bestseller</div>
                                    <div className="book-cover">
                                        <img src={item.img} alt={item.title}/>
                                    </div>
                                    <div className="book-info">
                                        <h3>{item.title}</h3>
                                        <p className="author">{item.author}</p>
                                        <span className="genre">{item.genre}</span>
                                        <div className="rental-info">
                                            <div className="rental-price">Rs.{item.price}/month</div>
                                            <button className="btn" onClick={()=> addToWishlist(item)}>Like</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                <p>No books found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Books;