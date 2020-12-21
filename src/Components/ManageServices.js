import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import dateFormat from 'dateformat';

const ManageServices = () => {
    const token = useSelector(state => state.login.token)
    const [services, setServices] = useState()

    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getServiceList`, '',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                setServices(res.data)
            })
    }, [token])

    function handleDelete(e){
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteService`, {_id: _id},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                alert(res.data.message)
                document.getElementById(_id).style.display = "none";
            })
    }
    
    return (
        <div>

            <NavLink 
                className='btn btn-sm btn-success'
                to='/create-services'
                style={{ marginBottom: '15px'  }}
            >
                Create Service
            </NavLink>
            <br />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Img</th>
                        <th scope="col">Name</th>
                        <th scope="col">Add Content</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {services && services.map((service, i) => {
                        return (
                            <tr key={service._id} id={service._id}>
                                <td>{i+1}</td>
                                <td>
                                    <img src={service.image} style={{ width:'100px' }}/>
                                </td>
                                <td>{service.name}</td>
                                <td>
                                <NavLink to={`/service-content/Create/${service.slug}`}>
                                    Add Content
                                </NavLink>
                                </td>
                                <td>{dateFormat(service.created_at, 'dddd, mmm dS, yyyy')}</td>
                                
                                <td>
                                
                                

                                <NavLink className="ml-3" to={`/create-services/${service._id}`}>
                                        <span className="fa fa-edit"></span>
                                </NavLink>

                                <span className="fa fa-trash text-danger ml-3"
                                style={{ cursor: 'pointer' }} 
                                onClick={handleDelete}
                                id={service._id}></span>
                                </td>
                            </tr>
                            )
                    })}

                </tbody>
            </table>
        </div>
    )

}

export default PageLayout(ManageServices)