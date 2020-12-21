import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import dateFormat from 'dateformat';

const BlogCategory = () => {
    const token = useSelector(state => state.login.token)
    const [category, setCategory] = useState()

    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getBlogCategory`, '',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                setCategory(res.data)
            })
    }, [token])

    const handleDelete = (e) => {
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteCategory`, {_id: _id},
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

            <NavLink className='btn btn-sm btn-success'
            style={{ marginBottom:'15px' }} to='/create-category'>
                    Create Category
            </NavLink>
            <br />
            {category && <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((cat, i) => {
                        return (
                            <tr key={cat._id} id={cat._id}>
                                <td>{i + 1}</td>
                                <td>{cat.name}</td>
                                <td>{dateFormat(cat.created_at, 'dddd, mmm dS, yyyy')}</td>
                                <td>
                                <NavLink to={`/create-category/${cat._id}`}>
                                    <span className="fa fa-edit"></span>
                                 </NavLink>
                                 <span className="fa fa-trash text-danger ml-3"
                                    style={{ cursor: 'pointer' }} 
                                    onClick={handleDelete}
                                    id={cat._id}></span>
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

export default PageLayout(BlogCategory)