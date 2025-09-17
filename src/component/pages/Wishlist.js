import React, { useState, useEffect } from 'react';
import './Wishlist.css';
import { FaBookOpen, FaTrash, FaCartPlus, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage on component mount
    useEffect(() => {
        loadWishlist();
    }, []);

    // Function to load wishlist from localStorage
    const loadWishlist = () => {
        const savedWishlist = localStorage.getItem('booknestWishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    };

    const removeFromWishlist = (bookId) => {
        const savedWishlist = localStorage.getItem('booknestWishlist');
        if (savedWishlist) {
            let wishlist = JSON.parse(savedWishlist);
            const updatedWishlist = wishlist.filter(book => book.id !== bookId);
            localStorage.setItem('booknestWishlist', JSON.stringify(updatedWishlist));
            setWishlist(updatedWishlist);
            alert('Book removed from wishlist!');
        }
    };

    // Add to cart function and remove from wishlist
    const rentNow = (book) => {
        // Get current cart from localStorage
        const currentCart = JSON.parse(localStorage.getItem('booknestCart') || '[]');
        
        // Check if book is already in cart
        const existingItem = currentCart.find(item => item.id === book.id);
        
        if (!existingItem) {
            // Add rental duration property
            const bookWithRental = {
                ...book,
                rentalDuration: 1
            };
            
            // Add to cart
            const updatedCart = [...currentCart, bookWithRental];
            localStorage.setItem('booknestCart', JSON.stringify(updatedCart));
            
            // Remove from wishlist
            const savedWishlist = localStorage.getItem('booknestWishlist');
            if (savedWishlist) {
                let wishlist = JSON.parse(savedWishlist);
                const updatedWishlist = wishlist.filter(item => item.id !== book.id);
                localStorage.setItem('booknestWishlist', JSON.stringify(updatedWishlist));
                setWishlist(updatedWishlist);
            }
            
            alert(`${book.title} has been added to your cart`);
        } else {
            alert('This book is already in your cart!');
        }
    };

    // Clear entire wishlist
    const clearWishlist = () => {
        if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
            localStorage.removeItem('booknestWishlist');
            setWishlist([]);
            alert('Wishlist cleared!');
        }
    };

    return (
        <div className='wishlist'>
            
            <section className="wishlist-header">
                <div className="container">
                    <h1 className="display-4 fw-bold">My Wishlist</h1>
                    <p className="lead">Your personal collection of books to read next</p>
                </div>
            </section>

            <div className="container mb-5">
                {/* Sort and Filter Section */}
                <div className="sort-filter">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h4 className="mb-0">My Saved Books <span className="wishlist-count">{wishlist.length}</span></h4>
                        </div>
                        <div className="col-md-6 text-md-end">
                            {wishlist.length > 0 && (
                                <button className="btn btn-outline-danger" onClick={clearWishlist}>
                                    <FaTrash /> Clear All
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Wishlist Items */}
                {wishlist.length === 0 ? (
                    <div className="wishlist-empty">
                        <FaHeart className="empty-icon" />
                        <h3>Your wishlist is empty</h3>
                        <p>Start adding books you'd like to read later!</p>
                        <Link to={"/books"} className="btn btn-primary">
                            <FaBookOpen className="me-2" />Browse Books
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-items">
                        {wishlist.map(book => (
                            <div key={book.id} className="wishlist-item">
                                <div className="row">
                                    <div className="col-md-3 p-0">
                                        <div className="book-cover">
                                            <img src={book.img} alt={book.title} />
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="book-info">
                                            {book.bestseller && (
                                                <div className="bestseller-badge">NEW YORK TIMES BESTSELLER</div>
                                            )}
                                            <h3 className="book-title">{book.title}</h3>
                                            <p className="book-author">{book.author}</p>
                                            <span className="book-genre">{book.genre}</span>
                                            <div className="book-price">Rs.{book.price}/month</div>
                                            <div className="action-buttons">
                                                <button 
                                                    className="btn btn-primary"
                                                    onClick={() => rentNow(book)}
                                                >
                                                    <FaCartPlus /> Rent Now
                                                </button>

                                                <button 
                                                    className="btn btn-danger"
                                                    onClick={() => removeFromWishlist(book.id)}
                                                >
                                                    <FaTrash className="trash-icon" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Continue Browsing Button */}
                <div className="text-center mt-5">
                    <Link to={'/books'} className="btn btn-primary btn-lg">
                        <FaBookOpen />Continue Browsing
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;