import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import {NavLink, useHistory, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as actionCreator from "../Store/actions/index"



const TopNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state=>state.login.isAuthenticated);

    useEffect(()=>{

        if(new Date(localStorage.getItem("expiryTime")) <= new Date()){
            logout()
        }


    },[])
    const logout= ()=>{
        dispatch(actionCreator.logout());
        history.push("/")
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            {!auth && <Redirect to="/" />}
            <NavLink to="/dashboard" className="navbar-brand">Any Spaze</NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-link" to="/clients">Clients</NavLink>
                    <NavLink className="nav-link" to="/warehouses">Warehouses</NavLink>
                    <NavLink className="nav-link" to="/contact-enquiry">Enquiry</NavLink>
                    <NavLink className="nav-link" to="/leads">Leads</NavLink>
                    <NavLink className="nav-link" to="/states">States</NavLink>
                </Nav>
                <NavDropdown title="Blog, SEO & Services" id="basic-nav-dropdown">
                    <NavLink className="nav-link" to="/blog-category">Blog Category</NavLink>
                    <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
                    <NavLink className="nav-link" to="/seo-keywords">Seo Keywords</NavLink>
                    <NavLink className="nav-link" to="/manage-services">Manage Services</NavLink>
                </NavDropdown>
                <NavDropdown title="Manage Industry & Location" id="basic-nav-dropdown">
                    <NavLink className="nav-link" to="/manage-industry">Manage Industry</NavLink>
                    <NavLink className="nav-link" to="/manage-client">Manage Client</NavLink>
                    <NavLink className="nav-link" to="/manage-testimonial">Manage Testimonial</NavLink>
                    <NavLink className="nav-link" to="/manage-location">Manage Location</NavLink>
                </NavDropdown>
                <Nav>
                    <button onClick={logout} className="btn nav-link">Logout</button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}


export default TopNav;
