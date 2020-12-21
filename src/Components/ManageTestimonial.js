import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ManageTestimonial = () => {
    const token = useSelector(state => state.login.token)
    const [testimonial, setTestimonial] = useState()

    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getTestimonialList`, '')
        .then(res => setTestimonial(res.data)).catch(err => console.log(err))
    }, [token]);
    function handleDelete(e){
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteTestimonial`, {_id: _id},
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
                <NavLink className="btn btn-sm btn-success" to={`/add-testimonial`}>
                    Add Testimonial
                </NavLink>
                </div>
            </div>
            <div className="row">

            {testimonial && testimonial.map((message, i) => {
                return (
                <div className="col-md-6 mt-2" style={{ position: 'relative', height: '220px' }} key={message._id}>
                    <div style={{ position: 'absolute', top: '5px', right: '20px', zIndex: '5' }}>
                        <NavLink className="btn btn-sm btn-success" to={`/add-testimonial/${message._id}`}>
                                <span className="fa fa-edit"></span>
                        </NavLink>
                        <button className="btn btn-danger btn-sm">
                            <span className="fa fa-trash"
                            style={{ cursor: 'pointer' }} 
                            onClick={handleDelete}
                            id={message._id}
                            ></span></button>
                    </div>
                    <div className="card">
                    <div className="row">
                        <div className="col-lg-4 pr-0" style={{ height: '200px', overflow : 'hidden' }}>
                            <img src={message.client_image} className="image-responsive" style={{ width: '100%' }}/>
                        </div>
                        <div className="col-lg-8 pt-2 pr-5">
                            <h6>{message.client_name} - <span className="pull-right"> <span className="fa fa-star"></span></span>{message.client_rating} </h6>
                            <p>{message.client_company}</p>
                            <p style={{ textAlign: 'justify'  }}>{message.client_message.substring( 0, 190)}...</p>
                        </div>
                    </div>
                    </div>
                    
                </div>
                    )
            })}
                
            </div>
            </div>
        )

}

export default PageLayout(ManageTestimonial)