import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { FaArrowLeft, FaUser, FaPhone, FaMapMarkerAlt, FaCreditCard, FaPaypal, FaGoogle, FaApple, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: 'SANJANAA',
        phone: '+91 9876543210',
        address: 'SIVAGAMI NAGAR, RANGANATHAPURAM, SULUR, COIMBATORE - 641402'
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });
    const [isEditingAddress, setIsEditingAddress] = useState(false);

    // Load cart and delivery details from localStorage on component mount
    useEffect(() => {
        loadCart();
        loadDeliveryDetails();
    }, []);

    // Function to load cart from localStorage
    const loadCart = () => {
        const savedCart = localStorage.getItem('booknestCart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    };

    // Function to load delivery details from localStorage
    const loadDeliveryDetails = () => {
        const savedDetails = localStorage.getItem('booknestDeliveryDetails');
        if (savedDetails) {
            const details = JSON.parse(savedDetails);
            setDeliveryDetails(details);
        }
    };

    // Save delivery details to localStorage
    const saveDeliveryDetails = () => {
        localStorage.setItem('booknestDeliveryDetails', JSON.stringify(deliveryDetails));
        setIsEditingAddress(false);
        alert('Delivery details updated successfully!');
    };

    // Calculate cart totals
    const calculateTotals = () => {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.rentalDuration), 0);
        
        // Delivery fee is Rs. 49 only if cart is not empty AND subtotal is less than Rs. 1000
        let deliveryFee = 0;
        if (cartItems.length > 0 && subtotal < 1000) {
            deliveryFee = 49;
        }
        
        const tax = subtotal * 0.12; // 12% tax
        const total = subtotal + deliveryFee + tax;
        
        return {
            subtotal: subtotal.toFixed(2),
            deliveryFee: deliveryFee.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2)
        };
    };

    const { subtotal, deliveryFee, tax, total } = calculateTotals();

    // Handle payment submission
    const handlePayment = (e) => {
        e.preventDefault();
        // Here you would integrate with your payment gateway
        alert('Payment processed successfully! Your order has been placed.');
        // Clear cart after successful payment
        localStorage.removeItem('booknestCart');
        // Redirect to order confirmation page
        window.location.href = '/';
    };

    return (
        <div className='checkout'>
            <section className="checkout-header">
                <div className="container">
                    <h1 className="display-4 fw-bold">Checkout</h1>
                    <p className="lead">Complete your purchase with secure payment</p>
                </div>
            </section>

            <div className="container mb-5">
                <div className="row">
                    {/* Left Column - Delivery & Payment */}
                    <div className="col-lg-8">
                        <Link to="/cart" className="btn btn-outline-primary mb-4">
                            <FaArrowLeft className="me-2" />Back to Cart
                        </Link>

                        {/* Delivery Information */}
                        <div className="checkout-section">
                            <h3 className="section-title">Delivery Information</h3>
                            
                            {isEditingAddress ? (
                                <div className="delivery-form">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Full Name *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={deliveryDetails.name}
                                                onChange={(e) => setDeliveryDetails({...deliveryDetails, name: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Phone Number *</label>
                                            <input 
                                                type="tel" 
                                                className="form-control" 
                                                value={deliveryDetails.phone}
                                                onChange={(e) => setDeliveryDetails({...deliveryDetails, phone: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Delivery Address *</label>
                                        <textarea 
                                            className="form-control" 
                                            rows="3"
                                            value={deliveryDetails.address}
                                            onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                                            required
                                        ></textarea>
                                    </div>
                                    <button className="btn btn-primary" onClick={saveDeliveryDetails}>
                                        Save Address
                                    </button>
                                </div>
                            ) : (
                                <div className="delivery-details">
                                    <p><FaUser className="me-2" /> {deliveryDetails.name}</p>
                                    <p><FaPhone className="me-2" /> {deliveryDetails.phone}</p>
                                    <p><FaMapMarkerAlt className="me-2" /> {deliveryDetails.address}</p>
                                    <button 
                                        className="btn btn-outline-primary"
                                        onClick={() => setIsEditingAddress(true)}
                                    >
                                        Change Address
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="checkout-section">
                            <h3 className="section-title">Payment Method</h3>
                            
                            <div className="payment-methods">
                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="paymentMethod" 
                                        id="cardPayment"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                    />
                                    <label className="form-check-label" htmlFor="cardPayment">
                                        <FaCreditCard className="me-2" /> Credit/Debit Card
                                    </label>
                                </div>

                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="paymentMethod" 
                                        id="paypalPayment"
                                        value="paypal"
                                        checked={paymentMethod === 'paypal'}
                                        onChange={() => setPaymentMethod('paypal')}
                                    />
                                    <label className="form-check-label" htmlFor="paypalPayment">
                                        <FaPaypal className="me-2" /> PayPal
                                    </label>
                                </div>

                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="paymentMethod" 
                                        id="googlePay"
                                        value="googlepay"
                                        checked={paymentMethod === 'googlepay'}
                                        onChange={() => setPaymentMethod('googlepay')}
                                    />
                                    <label className="form-check-label" htmlFor="googlePay">
                                        <FaGoogle className="me-2" /> Google Pay
                                    </label>
                                </div>

                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="paymentMethod" 
                                        id="applePay"
                                        value="applepay"
                                        checked={paymentMethod === 'applepay'}
                                        onChange={() => setPaymentMethod('applepay')}
                                    />
                                    <label className="form-check-label" htmlFor="applePay">
                                        <FaApple className="me-2" /> Apple Pay
                                    </label>
                                </div>
                            </div>

                            {/* Card Payment Form */}
                            {paymentMethod === 'card' && (
                                <div className="card-form mt-4">
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">Card Number</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="1234 5678 9012 3456"
                                                value={cardDetails.number}
                                                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Cardholder Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="John Doe"
                                                value={cardDetails.name}
                                                onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">Expiry Date</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="MM/YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label">CVV</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="123"
                                                value={cardDetails.cvv}
                                                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Other payment methods message */}
                            {paymentMethod !== 'card' && (
                                <div className="alert alert-info mt-3">
                                    You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : 
                                    paymentMethod === 'googlepay' ? 'Google Pay' : 'Apple Pay'} 
                                    to complete your payment.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="col-lg-4">
                        <div className="order-summary">
                            <h3 className="summary-title">Order Summary</h3>
                            
                            <div className="order-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="order-item">
                                        <div className="item-details">
                                            <h6>{item.title}</h6>
                                            <p>by {item.author}</p>
                                            <span>{item.rentalDuration} month rental × Rs.{item.price}</span>
                                        </div>
                                        <div className="item-price">
                                            Rs.{(item.price * item.rentalDuration).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="summary-details">
                                <div className="summary-item">
                                    <span>Subtotal</span>
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
                                
                                <div className="summary-total">
                                    <span>Total</span>
                                    <span>Rs.{total}</span>
                                </div>
                            </div>

                            <button 
                                className="btn btn-primary w-100 checkout-btn"
                                onClick={handlePayment}
                            >
                                <FaLock className="me-2" />
                                Pay Now
                            </button>

                            <div className="security-note">
                                <p className="text-center mt-3">
                                    <FaLock className="me-1" />
                                    Your payment is secure and encrypted
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;