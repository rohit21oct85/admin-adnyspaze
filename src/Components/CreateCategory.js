import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import { useSelector } from "react-redux"
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { elements } from "../Cons";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import slugify from 'react-slugify';

const CreateCategory = () => {
    const history = useHistory();
    const { catID } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, watch, errors ,setValue} = useForm();  
    const [loading, setLoading] = useState(false)
    const initialFormData = Object.freeze({
        name: '',
        slug: '',
        created_at: new Date().toLocaleDateString(),
        catID: catID,
    });
    const [formData, updateFormData] = React.useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
    };
    const [category, setCategory] = useState()
    useEffect(() => {
        const slug = catID;
        axios.post(`${elements.API_COMMON_ENDPOINT}/getCategory`, {slug: slug},
            ).then(res => {
                setCategory(res.data)
                updateFormData(res.data)
            })
    },[]);
    const onSubmit = (e) => {
        formData['slug'] = slugify(formData.name);
        formData['catID'] = formData._id;
        
        setLoading(true)
        axios.post(`${elements.API_ENDPOINT}/AddCategory`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(res => {
                alert(res.data.message)
                 history.push('/blog-category');
                setLoading(false)
            })
            .catch(err => {
                alert(err.message)
                setLoading(false)
            })
    }
    const handleBack = () => {
        history.push('/blog-category');
    }
    return (
        <div>
            <h1>{(catID)?'Update':'Create'} Category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Category Name</label>
                    <input type="text"  
                    className='form-control' 
                    id="name"
                    name="name"
                    defaultValue={category && category.name}
                    onChange={handleChange}
                    ref={register({
                        required: "Please enter Category Name"
                    })}
                    />
                    <span className="text-danger mt-2">
                        {errors.name && errors.name.message}
                    </span>
                </div>
                
                <div className="form-group">
                    <button className="btn btn-primary btn-sm">{(catID)?'Update':'Create New'} Category</button>
                    <button className="btn btn-danger btn-sm" onClick={handleBack}> Back </button>
                </div>        
            </form> 
            {loading && <Loading />}  
        </div>
    )

}

export default PageLayout(CreateCategory)