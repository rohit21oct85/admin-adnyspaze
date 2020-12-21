import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import { useSelector } from "react-redux"
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { elements } from "../Cons";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
import slugify from 'react-slugify';

const CreateIndustry = () => {
    const history = useHistory();
    const { indID } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, errors } = useForm();  
    const [loading, setLoading] = useState(false)
    const initialFormData = Object.freeze({
        name: '',
        slug: '',
        created_at: new Date().toLocaleDateString(),
        indID: indID,
    });
    
    const [formData, updateFormData] = React.useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
    };
    const [services, setServices] = useState()
    useEffect(() => {
        const slug = indID;
        
        axios.post(`${elements.API_COMMON_ENDPOINT}/getIndustry`, {slug: slug},
            ).then(res => {
                if(res.data){
                    setServices(res.data)
                    updateFormData(res.data)
                }
            })
    },[]);
    const onSubmit = (e) => {
        formData['slug'] = slugify(formData.name);
        formData['indID'] = formData._id;
        setLoading(true)
        axios.post(`${elements.API_ENDPOINT}/AddIndustry`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(res => {
                alert(res.data.message)
                 history.push('/manage-industry');
                setLoading(false)
            })
            .catch(err => {
                alert(err.message)
                setLoading(false)
            })
    }
    const handleBack = () => {
        history.push('/manage-industry');
    }
    return (
        <div>
            <h1>{(indID)?'Update':'Create'} Industry</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Industry Name</label>
                    <input type="text"  
                    className='form-control'
                    autoComplete="off" 
                    id="name"
                    name="name"
                    defaultValue={services && services.name}
                    onChange={handleChange}
                    ref={register({
                        required: "Please enter Services Name"
                    })}
                    />
                    <span className="text-danger mt-2">
                        {errors.name && errors.name.message}
                    </span>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-sm">{(indID)?'Update':'Create New'} Industry</button>
                    <button className="btn btn-danger btn-sm" onClick={handleBack}> Back </button>
                </div>        
            </form> 
            {loading && <Loading />}  
        </div>
    )

}

export default PageLayout(CreateIndustry)