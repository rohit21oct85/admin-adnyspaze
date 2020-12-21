import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import dateFormat from 'dateformat';

const ManageSeoKeywords = () => {
    const token = useSelector(state => state.login.token)
    const [seoKeywords, setSeoKeywords] = useState()
    const buttonicon = {
        cursor: 'pointer'
    }

    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getSeoKeywordList`, '',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                setSeoKeywords(res.data)
            })
    }, [token])

    function handleDelete(e){
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteKeywords`, {_id: _id},
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
                to='/create-seo-keywords'
                style={{ marginBottom: '15px'  }}
            >
                                        Create Seo Keywords
                                 </NavLink>
            <br />
            {seoKeywords && <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">URL</th>
                        <th scope="col">Meta Title</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {seoKeywords.map((keywords, i) => {
                        return (
                            <tr key={keywords._id} id={keywords._id}>
                                <td>{i+1}</td>
                                <td>{keywords.url}</td>
                                <td>{keywords.meta_title}</td>
                                <td>{dateFormat(keywords.created_at, 'dddd, mmm dS, yyyy')}</td>
                                <td>
                                <NavLink to={`/create-seo-keywords/${keywords._id}`}>
                                        <span className="fa fa-edit"></span>
                                </NavLink>
                                <span className="fa fa-trash text-danger ml-3"
                                style={buttonicon} 
                                onClick={handleDelete}
                                id={keywords._id}></span>
                                </td>
                            </tr>
                            )
                    })}

                </tbody>
            </table>

            }
        </div>
    )

}

export default PageLayout(ManageSeoKeywords)