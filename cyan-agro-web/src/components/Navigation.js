import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component {
    render() {
        return(
            <Navbar bg='dark' expand='lg'>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav>
                        <NavLink to='/' className='d-inline p-2 bg-dark text-white'>Home</NavLink>
                        <NavLink to='/mill' className='d-inline p-2 bg-dark text-white'>Mill</NavLink>
                        <NavLink to='/harvest' className='d-inline p-2 bg-dark text-white'>Harvest</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
