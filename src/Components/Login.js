import React, { useState } from "react";
import { Redirect} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../Store/actions/index"



const Login = (e) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state=> state.login.isAuthenticated)
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        let field = e.target.name;
        formData[field] = e.target.value;
        setFormData({ ...formData });
    }
    const loginAdmin = (e) => {
        e.preventDefault()
        dispatch(actionCreators.login(formData));
    }

    return (<div className="container-fluid">

          {isAuthenticated && <Redirect to="/dashboard" />}
        <div className="row justify-content-center">
            <div className="col-12 col-sm-6">
                <form className="admin-login" onSubmit={loginAdmin}>
                    <h1>Admin Login</h1>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            onChange={handleChange} />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            name="password"
                            onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>)
}

export default Login