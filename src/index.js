import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import Login from './Components/Login';
import PrivateRoute from './HOC/PrivateRoute';
import DashBoard from './Components/DashBoard';
import Clients from './Components/Clients';
import Warehouses from './Components/Warehouses';
import Leads from './Components/Leads';
import ContactEnquiry from './Components/ContactEnquiry';
import UpdateWarehouse from "./Components/UpdateWarehouse"
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from "redux-logger"

import axios from "axios";

import loginReducer from "./Store/reducers/login";
import warehouseReducer from "./Store/reducers/warehouse";
import clientReducer from "./Store/reducers/client";
import enquiryReducer from "./Store/reducers/enquiry";
import leadReducer from "./Store/reducers/lead"
import ManageStates from './Components/ManageStates';
import ManageStateContent from './Components/ManageStateContent';
import ClientInfo from './Components/ClientInfo';

import ManageBlogs from './Components/ManageBlogs';
import CreateBlog from './Components/CreateBlog';
import EditBlog from './Components/EditBlog';
import BlogCategory from './Components/BlogCategory';
import CreateCategory from './Components/CreateCategory';
import ManageSeoKeywords from './Components/ManageSeoKeywords';
import CreateSeoKeywords from './Components/CreateSeoKeywords';

import ManageServices from './Components/ManageServices';
import CreateServices from './Components/CreateServices';
import AddServiceContent from './Components/AddServiceContent';
import ManageIndustry from './Components/ManageIndustry';
import CreateIndustry from './Components/CreateIndustry';
import AddIndustryContent from './Components/AddIndustryContent';
import ManageClient from './Components/ManageClient';
import AddClient from './Components/AddClient';
import ManageTestimonial from './Components/ManageTestimonial';
import AddTestimonial from './Components/AddTestimonial';
import ManageLocation from './Components/ManageLocation';
import AddLocationContent from './Components/AddLocationContent';

const rootReducer = combineReducers({
    login: loginReducer,
    warehousesData:warehouseReducer,
    clients:clientReducer,
    enquiry:enquiryReducer,
    leads:leadReducer
});

function createAxiosAuthMiddleware() {
    return ({ getState }) => next => (action) => {

        let token = getState().login.userData ? getState().login.userData.token : localStorage.getItem('token');

        axios.defaults.headers.common = {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        return next(action);
    };
}
const axiosAuth = createAxiosAuthMiddleware();
var store = createStore(rootReducer, applyMiddleware(thunk, axiosAuth, logger));


ReactDOM.render(
    <Provider store={store}>
    <Router basename={'/'}>
        <App>
            <Route exact path="/"  component={Login}/>
            <PrivateRoute  exact path="/dashboard"  component={DashBoard}/>
            <PrivateRoute  exact path="/clients"  component={Clients}/>
            <PrivateRoute  exact path="/clients/:page"  component={Clients}/>
            <PrivateRoute  exact path="/warehouses"  component={Warehouses}/>
            <PrivateRoute  exact path="/warehouses/:page"  component={Warehouses}/>
            <PrivateRoute  exact path="/warehouses/:page/:clientID"  component={Warehouses}/>
            <PrivateRoute  exact path="/warehouse/:wareHouseID"  component={UpdateWarehouse}/>
            <PrivateRoute  exact path="/add-warehouse"  component={UpdateWarehouse}/>
            <PrivateRoute  exact path="/leads"  component={Leads}/>
            <PrivateRoute  exact path="/contact-enquiry"  component={ContactEnquiry}/>
            <PrivateRoute  exact path="/contact-enquiry/:page"  component={ContactEnquiry}/>
            <PrivateRoute  exact path="/states"  component={ManageStates}/>
            <PrivateRoute  exact path="/manage-state/:stateCode"  component={ManageStateContent}/>
            <PrivateRoute  exact path="/client/:clientID"  component={ClientInfo}/>
            <PrivateRoute  exact path="/blogs"  component={ManageBlogs}/>
            <PrivateRoute  exact path="/create-blog/"  component={CreateBlog}/>
            <PrivateRoute  exact path="/create-blog/:blogID"  component={CreateBlog}/>
            <PrivateRoute  exact path="/seo-keywords"  component={ManageSeoKeywords}/>
            <PrivateRoute  exact path="/create-seo-keywords/"  component={CreateSeoKeywords}/>
            <PrivateRoute  exact path="/create-seo-keywords/:keyword_url"  component={CreateSeoKeywords}/>
            
            <PrivateRoute  exact path="/blog-category"  component={BlogCategory}/>
            <PrivateRoute  exact path="/create-category/"  component={CreateCategory}/>
            <PrivateRoute  exact path="/create-category/:catID"  component={CreateCategory}/>

            <PrivateRoute  exact path="/manage-services"  component={ManageServices}/>
            <PrivateRoute  exact path="/create-services/"  component={CreateServices}/>
            <PrivateRoute  exact path="/create-services/:serID"  component={CreateServices}/>
            <PrivateRoute  exact path="/service-content/:type/:serID"  component={AddServiceContent}/>

            <PrivateRoute  exact path="/manage-industry"  component={ManageIndustry}/>
            <PrivateRoute  exact path="/create-industry"  component={CreateIndustry}/>
            <PrivateRoute  exact path="/create-industry/:indID"  component={CreateIndustry}/>
            <PrivateRoute  exact path="/industry-content/:type/:indURL"  component={AddIndustryContent}/>
            <PrivateRoute  exact path="/manage-client"  component={ManageClient}/>
            <PrivateRoute  exact path="/add-client"  component={AddClient}/>
            <PrivateRoute  exact path="/add-client/:clientID"  component={AddClient}/>
            <PrivateRoute  exact path="/manage-testimonial"  component={ManageTestimonial}/>
            <PrivateRoute  exact path="/add-testimonial"  component={AddTestimonial}/>
            <PrivateRoute  exact path="/add-testimonial/:testimonialID"  component={AddTestimonial}/>
            <PrivateRoute  exact path="/manage-location"  component={ManageLocation}/>
            <PrivateRoute  exact path="/add-location-content/:location"  component={AddLocationContent}/>
        </App>
    </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
