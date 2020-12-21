import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import { useSelector } from "react-redux"
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { elements } from "../Cons";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
import CKEditor from 'ckeditor4-react';
import slugify from 'react-slugify';

const EditBlog = () => {

    const history = useHistory();
    const { blogID } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, errors} = useForm();  
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
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
    const [blog, setBlog] = useState()
    useEffect(() => {
        const slug = blogID;
        if(slug){
            axios.post(`${elements.API_COMMON_ENDPOINT}/getBlog`, {slug: slug})
            .then(res => {
                if(res.data){
                    setBlog(res.data)
                    updateFormData(res.data)
                }
            })
        }
    },[]);

    const [fileArray, setfileArray] = useState();
    const uploadMultipleFiles = (e) => {
        e.preventDefault();
        let filesArray = []; 
        let images = e.target.files;
        for(var i = 0; i <= images.length; i++){
            if (images[i]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    filesArray.push(e.target.result);
                    updateFormData({...formData,images : e.target.result})
                    setfileArray(filesArray);
                }
                reader.readAsDataURL(e.target.files[i]); // convert to base64 string
            }
        }
    }
    const initialFormData = Object.freeze({
        title: '',
        slug: '',
        description:'',
        category:'',
        images:'',
        created_at: new Date().toLocaleDateString(),
        blogID: blogID,
    });
    const [formData, updateFormData] = React.useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
    };
    const onSubmit = (e) => {
        formData['slug'] = slugify(formData.title);
        formData['category'] = selectedCategory;
        formData['blogID'] = formData._id;
        
        setLoading(true)
        const headers = {headers: {'Content-Type': 'application/json','Authorization': "Bearer " + token}};
        axios.post(`${elements.API_ENDPOINT}/addBlog`, formData, headers)
            .then(res => {
                alert(res.data.message)
                history.push('/blogs');
                setLoading(false)
            })
             .catch(err => {
                alert(err.message)
                setLoading(false)
            })
    }

    const handleBack = () => {
        history.push('/blogs');
    }

    return (
        <div>
            <h1>{(blogID)?'Update Blog':'Create Blog'}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Blog Title</label>
                    <input type="text"  
                    className='form-control' 
                    defaultValue={blog && blog.title}
                    id="title"
                    name="title"
                    onChange={handleChange}
                    ref={register({
                        required: "Please enter Blog title"
                    })}
                    />
                    <span className="text-danger mt-2">
                        {errors.title && errors.title.message}
                    </span>
                </div>
                
                <div className="form-group">
                    <label>Blog Description</label>
                    <CKEditor
                        type="Classic"
                        data={formData && formData.description}
                        name="description"
                        id="description"
                        onChange={ event => {
                            const data = event.editor.getData();
                            updateFormData({...formData,description:data})
                        } }
                        ref={ register({ required: "Please Enter Description"})}
                    />
                    
                    <span className="text-danger mt-2">
                        {errors.description && errors.description.message}
                    </span>
                </div>

                <div className="form-group">
                    <label>Blog Category</label>
                    <div className="form-group col-md-12" style={{ paddingLeft: '0px' }}>
                    {category && category.map(  (value, index) => {
                        return (
                        <span style={{ marginRight: '10px' }} key={index}>
                        <button 
                            type="button"
                            className="btn btn-sm btn-success"
                            value={value.slug} 
                            key={index}
                            onClick={() => setSelectedCategory(value.slug)}
                        >{value.name}</button>
                        </span>
                        );
                    })} 
                    </div>
                    
                    <span className="text-danger mt-2">
                        {errors.category && errors.category.message}
                    </span>
                </div>      
                <div className="form-group">
                    <label>Blog Images</label>
                    <input type="file" className="form-control" name="images" onChange={uploadMultipleFiles} id="blogimages" />
                </div>   
                <div className="form-group multi-preview">
                    {fileArray && fileArray.map( (url, index) => {
                        return (
                            <img src={url}  key={index} style={{ width: '150px'  }} />
                        )
                    })}
                    <img src={blog && blog.image} style={{ width: '150px'  }} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-sm">{(blogID)?'Update Blog':'Create New Blog'}</button>
                    <button className="btn btn-danger btn-sm" onClick={handleBack}> Back </button>
                </div>        
            </form> 
            {loading && <Loading />}  
        </div>
    )

}

export default PageLayout(EditBlog)