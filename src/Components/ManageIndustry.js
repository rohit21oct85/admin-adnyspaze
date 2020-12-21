import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import dateFormat from 'dateformat';

const ManageIndustry = () => {
    const token = useSelector(state => state.login.token)
    const [industry, setIndustry] = useState()

    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getIndustryList`, '',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                setIndustry(res.data)
            })
    }, [token])

    function handleDelete(e){
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteIndustry`, {_id: _id},
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
                to='/create-industry'
                style={{ marginBottom: '15px'  }}
            >
                Create Industry
            </NavLink>
            <br />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Add Content</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {industry && industry.map((industry, i) => {
                        return (
                            <tr key={industry._id} id={industry._id}>
                                <td>{i+1}</td>
                                <td>{industry.name}</td>
                                <td>
                                <NavLink to={`/industry-content/Create/${industry.slug}`}>
                                    Add Content
                                </NavLink>
                                </td>
                                <td>{dateFormat(industry.created_at, 'dddd, mmm dS, yyyy')}</td>
                                
                                <td>
                                
                                

                                <NavLink className="ml-3" to={`/create-industry/${industry._id}`}>
                                        <span className="fa fa-edit"></span>
                                </NavLink>

                                <span className="fa fa-trash text-danger ml-3"
                                style={{ cursor: 'pointer' }} 
                                onClick={handleDelete}
                                id={industry._id}></span>
                                </td>
                            </tr>
                            )
                    })}

                </tbody>
            </table>
        </div>
    )

}

export default PageLayout(ManageIndustry)