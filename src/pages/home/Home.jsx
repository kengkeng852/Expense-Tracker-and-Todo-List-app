import "./home.css";
import React from 'react';

const Home = () => {
    return (
        <div>
            <section className="home" id="home">
                <div className="content">
                    <h3>Kengy Website.matcha</h3>
                    <a href="/todo">Todo App</a> <br/>
                    <a href="/expense">Expense Tracker</a> 
                </div>
            </section>
        </div>
    );
}

export default Home;