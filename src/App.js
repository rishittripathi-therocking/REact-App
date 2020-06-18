import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/menuComponent.js';
import './App.css';

function App() {
  return (
    <div>
        <Navbar dark color="primary">
            <div className="container">
                <NavbarBrand href="/">Ristorante Confusion</NavbarBrand>
            </div>
        </Navbar> 
        <Menu />      
    </div>
  );
}

export default App;
