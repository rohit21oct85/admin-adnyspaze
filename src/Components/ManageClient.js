import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ManageClient = () => {
    const token = useSelector(state => state.login.token)
    const [client, setClient] = useState()

    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getClientList`, '')
        .then(res => setClient(res.data)).catch(err => console.log(err))
    }, [token]);
    
    function handleDelete(e){
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteClient`, {_id: _id},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                alert(res.data.message)
                window.location.reload();
            })
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                <NavLink className="btn btn-sm btn-success" to={`/add-client`}>
                    Add Client
                </NavLink>
                </div>
            </div>
            <div className="row">
            {client && client.map((image, i) => {
                return (
                <div className="col-md-3 mt-2" style={{ position: 'relative' }} key={image._id}>
                    <img src={image.client_image} style={{ width:'100%' }}/>
                    <div style={{ position: 'absolute', top: '0', right: '0' }}>
                    <NavLink className="btn btn-sm btn-success" to={`/add-client/${image._id}`}>
                            <span className="fa fa-edit"></span>
                    </NavLink>
                    
                    
                    <button className="btn btn-danger btn-sm">
                        <span className="fa fa-trash"
                        style={{ cursor: 'pointer' }} 
                        onClick={handleDelete}
                        id={image._id}
                        ></span></button>
                    </div>
                </div>
                    )
            })}
                
            </div>
            </div>
        )

}

export default PageLayout(ManageClient)