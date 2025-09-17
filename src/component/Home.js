import React from 'react'
import './Home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
      {/* <!-- Hero Section --> */}
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Discover Your Next Adventure</h1>
                <p>Rent books at a fraction of the price and return them when you're done. No clutter, just endless reading.</p>
                <Link to='/books' class="btn">Browse Collection</Link>
            </div>
        </div>
    </section>

    {/* <!-- Features Section --> */}
    <section class="features">
        <div class="container">
            <h2 class="section-title">Why Choose BookNest?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <h3>Affordable</h3>
                    <p>Save up to 70% compared to buying new books. Read more for less.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <h3>Fast Delivery</h3>
                    <p>Get your books delivered to your doorstep within 2-3 business days.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-exchange-alt"></i>
                    </div>
                    <h3>Easy Returns</h3>
                    <p>Return books with our prepaid shipping labels when you're finished.</p>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Book Showcase --> */}
    <section class="book-showcase">
        <div class="container">
            <h2 class="section-title">Popular Rentals</h2>
            <div class="book-grid">
                <div class="book-card">
                    <div class="book-cover">
                        <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Book Cover" />
                    </div>
                    <div class="book-info">
                        <h3>The Silent Patient</h3>
                        <p>Alex Michaelides</p>
                        <p class="rental-price">Rs.348.97/month</p>
                        <a href="#" class="btn">Like</a>
                    </div>
                </div>
                <div class="book-card">
                    <div class="book-cover">
                        <img src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Book Cover" />
                    </div>
                    <div class="book-info">
                        <h3>Where the Crawdads Sing</h3>
                        <p>Delia Owens</p>
                        <p class="rental-price">Rs.392.70/month</p>
                        <a href="#" class="btn">Like</a>
                    </div>
                </div>
                <div class="book-card">
                    <div class="book-cover">
                        <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Book Cover" />
                    </div>
                    <div class="book-info">
                        <h3>The Midnight Library</h3>
                        <p>Matt Haig</p>
                        <p class="rental-price">Rs.400.00/month</p>
                        <a href="#" class="btn">Like</a>
                    </div>
                </div>
                <div class="book-card">
                    <div class="book-cover">
                        <img src="https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Book Cover" />
                    </div>
                    <div class="book-info">
                        <h3>Atomic Habits</h3>
                        <p>James Clear</p>
                        <p class="rental-price">Rs.450.59/month</p>
                        <a href="#" class="btn">Like</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Testimonials --> */}
    <section class="testimonials">
        <div class="container">
            <h2 class="section-title">What Our Readers Say</h2>
            <div class="testimonial-grid">
                <div class="testimonial-card">
                    <div class="testimonial-text">
                        <p>"BookNest has changed my reading habits completely. I can explore different genres without committing to buying expensive books. The service is fantastic!"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sarah J." />
                        </div>
                        <div class="author-info">
                            <h4>Sarah J.</h4>
                            <p>Avid Reader</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-text">
                        <p>"As a college student, BookNest helps me save money on textbooks and novels for my literature classes. Highly recommended for students!"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Michael T." />
                        </div>
                        <div class="author-info">
                            <h4>Michael T.</h4>
                            <p>College Student</p>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-text">
                        <p>"I love how easy it is to return books when I'm done. No more cluttered shelves at home, just great books delivered to my door when I want them."</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Priya K." />
                        </div>
                        <div class="author-info">
                            <h4>Priya K.</h4>
                            <p>Book Club Member</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- Newsletter --> */}
    <section class="newsletter">
        <div class="container">
            <h2>Join Our Reading Community</h2>
            <p>Subscribe to our newsletter for exclusive offers, new arrivals, and reading recommendations.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Enter your email address" />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    </section>
    </div>
  )
}

export default Home
