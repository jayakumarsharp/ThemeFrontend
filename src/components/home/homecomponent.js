import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div className="home-page">
            
            <main>
                <section className="hero">
                    <div className="hero-content">
                        <h1>Welcome to FinTech</h1>
                        <p>Empowering you to manage your finances with ease.</p>
                        <Link to="/signup" className="btn btn-primary">Get Started</Link>
                    </div>
                </section>
                <section className="features">
                    <h2>Key Features</h2>
                    <ul>
                        <li>Account monitoring</li>
                        <li>Financial goal tracking</li>
                    </ul>
                </section>
                <section className="testimonial">
                    <h2>Agenda</h2>
                    <p>"FinTech will be helping to achieve my financial goals faster than ever imagined."</p>

                </section>
            </main>
            <footer>

            </footer>
        </div>
    );
}
export default HomePage;