import React, { useState, useEffect } from 'react';
import './Cart.css';
import { FaTrash, FaHeart, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const navigate = useNavigate();

    // Load cart from localStorage on component mount
    useEffect(() => {
        loadCart();
    }, []);

    // Function to load cart from localStorage
    const loadCart = () => {
        const savedCart = localStorage.getItem('booknestCart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    };

    // Update rental duration
    const updateRentalDuration = (bookId, duration) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === bookId) {
                return { ...item, rentalDuration: parseInt(duration) };
            }
            return item;
        });
        
        localStorage.setItem('booknestCart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    // Remove item from cart
    const removeFromCart = (bookId) => {
        const updatedCart = cartItems.filter(item => item.id !== bookId);
        localStorage.setItem('booknestCart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        alert('Book removed from cart!');
    };

    // Move item to wishlist
    const moveToWishlist = (book) => {
        // Get current wishlist from localStorage
        const currentWishlist = JSON.parse(localStorage.getItem('booknestWishlist') || '[]');
        
        // Check if book is already in wishlist
        const existingItem = currentWishlist.find(item => item.id === book.id);
        
        if (!existingItem) {
            // Add to wishlist (remove rentalDuration property)
            const { rentalDuration, ...wishlistItem } = book;
            const updatedWishlist = [...currentWishlist, wishlistItem];
            localStorage.setItem('booknestWishlist', JSON.stringify(updatedWishlist));
            
            // Remove from cart
            removeFromCart(book.id);
            
            alert(`${book.title} has been moved to your wishlist!`);
        } else {
            // Just remove from cart
            removeFromCart(book.id);
            alert('This book is already in your wishlist! Removed from cart.');
        }
    };

    // Apply promo code
    const applyPromoCode = () => {
        if (promoCode === 'WELCOME10') {
            setDiscount(0.1); // 10% discount
            alert('Promo code applied! 10% discount added.');
        } else if (promoCode === 'FREESHIP') {
            // This will be handled in the calculation
            alert('Promo code applied! Free shipping on orders above Rs. 500.');
        } else {
            alert('Invalid promo code. Please try again.');
        }
    };

    // Calculate cart totals
    const calculateTotals = () => {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.rentalDuration), 0);
        
        // Delivery fee is Rs. 49 only if cart is not empty AND subtotal is less than Rs. 1000
        let deliveryFee = 0;
        if (cartItems.length > 0 && subtotal < 1000) {
            deliveryFee = 49;
            
            // Check for FREESHIP promo code for orders above Rs. 500
            if (promoCode === 'FREESHIP' && subtotal > 500) {
                deliveryFee = 0;
            }
        }
        
        const tax = subtotal * 0.12; // 12% tax
        
        // Apply discount if promo code is valid
        const discountAmount = subtotal * discount;
        const total = subtotal + deliveryFee + tax - discountAmount;
        
        return {
            subtotal: subtotal.toFixed(2),
            deliveryFee: deliveryFee.toFixed(2),
            tax: tax.toFixed(2),
            discount: discountAmount.toFixed(2),
            total: total.toFixed(2)
        };
    };

    // Handle checkout navigation
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Please add books to proceed to checkout.');
            return;
        }
        
        // Navigate to checkout page
        navigate('/checkout');
    };

    const { subtotal, deliveryFee, tax, discount: discountAmount, total } = calculateTotals();

    return (
        <div className='cart'>
            <section className="cart-header">
                <div className="container">
                    <h1 className="display-4 fw-bold">My Cart</h1>
                    <p className="lead">Review your selected books and proceed to checkout</p>
                </div>
            </section>

            <div className="container mb-5">
                <div className="row">
                    {/* Cart Items */}
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4>My Cart Items <span className="cart-count">{cartItems.length}</span></h4>
                            <Link to="/books" className="btn btn-outline-primary">
                                <FaArrowLeft className="me-2" />Continue Shopping
                            </Link>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="cart-empty">
                                <FaShoppingCart className="empty-icon" />
                                <h3>Your cart is empty</h3>
                                <p>You haven't added any books to your cart yet.</p>
                                <Link to="/books" className="btn btn-primary mt-3">
                                    Browse Books
                                </Link>
                            </div>
                        ) : (
                            <div className="cart-items">
                                {cartItems.map(book => (
                                    <div key={book.id} className="cart-item">
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
                                                    
                                                    <div className="quantity-control">
                                                        <span>Rental Duration:</span>
                                                        <select 
                                                            className="form-select ms-2" 
                                                            value={book.rentalDuration}
                                                            onChange={(e) => updateRentalDuration(book.id, e.target.value)}
                                                        >
                                                            <option value="1">1 month</option>
                                                            <option value="2">2 months</option>
                                                            <option value="3">3 months</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div className="action-buttons">
                                                        <button 
                                                            className="btn btn-danger"
                                                            onClick={() => removeFromCart(book.id)}
                                                        >
                                                            <FaTrash /> Remove
                                                        </button>
                                                        <button 
                                                            className="btn btn-outline-primary"
                                                            onClick={() => moveToWishlist(book)}
                                                        >
                                                            <FaHeart /> Move to Wishlist
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="cart-summary">
                            <h3 className="summary-title">Order Summary</h3>
                            
                            <div className="summary-item">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>Rs.{subtotal}</span>
                            </div>
                            
                            <div className="summary-item">
                                <span>Delivery Fee</span>
                                <span>Rs.{deliveryFee}</span>
                            </div>
                            
                            <div className="summary-item">
                                <span>Tax</span>
                                <span>Rs.{tax}</span>
                            </div>
                            
                            {discountAmount > 0 && (
                                <div className="summary-item text-success">
                                    <span>Discount</span>
                                    <span>-Rs.{discountAmount}</span>
                                </div>
                            )}
                            
                            <div className="promo-code">
                                <label className="form-label">Promo Code</label>
                                <div className="promo-input">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Enter code" 
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <button 
                                        className="btn btn-outline-primary"
                                        onClick={applyPromoCode}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                            
                            <div className="summary-total">
                                <span>Total</span>
                                <span>Rs.{total}</span>
                            </div>
                            
                            <button 
                                className="btn btn-outline-primary w-100 checkout-btn"
                                onClick={handleCheckout}
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;