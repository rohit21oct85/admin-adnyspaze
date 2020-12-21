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

const CreateBlog = () => {

    const history = useHistory();
    const { blogID } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, errors} = useForm();  
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState([]);
    
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
    }, [token]);
    
    let _URL = window.URL || window.webkitURL;
    const [blogImage, setBlogImage] = useState("");
    const uploadImage = (e) => {
        e.preventDefault();
        var file, img, base64,blob, reader;
        if ((file = e.target.files[0])) {
            img = new Image();
            blob = new Blob([file],{ type: file.type })
            img.src = _URL.createObjectURL(blob);
            reader = new FileReader(); 
            reader.readAsDataURL(blob); 
            reader.onload = function () { 
               base64 = reader.result;
               setBlogImage(base64);
               setFormData({...formData,images: base64}) 
            }  
        }
    }

    const [formData, setFormData] = useState("");
    const [blog, setBlog] = useState();
    useEffect(() => {
        const slug = blogID;
        if(slug){
            axios.post(`${elements.API_COMMON_ENDPOINT}/getBlog`, {slug: slug})
            .then(res => {
                if(res.data){
                    setBlog(res.data);
                    setFormData(res.data)
                }
            })
        }
    },[]);
    const onSubmit = (e) => {
        formData['slug'] = slugify(formData.title);
        formData['blogID'] = formData._id;
        formData['created_at'] = new Date().toLocaleDateString();
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
            <h1>{(blog && blog._id) ? 'Update':'Create'} Blog </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Blog Title</label>
                    <input type="text"  
                    className='form-control' 
                    id="title"
                    name="title"
                    defaultValue={blog && blog.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
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
                    editor={ClassicEditor}
                    data={blog && blog.description}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        let updatedContent = {...formData, description:data}
                        setFormData(updatedContent)
                    }}
                    ref={ register({ required: "Please Enter Description"})}
                    />
                    <span className="text-danger mt-2">
                        {errors.description && errors.description.message}
                    </span>
                </div>

                <div className="form-group">
                    <label>Blog Category</label>
                    <div className="form-group col-md-12" style={{ paddingLeft: '0px' }}>
                    <select className="form-control"
                    onClick={(e) => setFormData({...formData, category: e.target.value})}
                    >
                    {category && category.map(  (value, index) => {
                        return (
                        <option 
                            value={value.slug} 
                            key={index}
                            selected={(blog && blog.category === value.slug)?'selected':''}
                            >{value.name}</option>
                        );
                    })} 
                    </select>
                    </div>
                    <span className="text-danger mt-2">
                        {errors.category && errors.category.message}
                    </span>
                </div>      
                <div className="form-group">
                    <label>Blog Images</label>
                    <input type="file" className="form-control"
                    onChange={uploadImage}/>
                    <div style={{ height: '263px', overflow: 'hidden', textAlign: 'center', marginTop: '20px' }}>
                        <img src={(blogImage)?blogImage: blog && blog.image} style={{ width: '100%' }} />
                    </div>
                </div>   
                
                <div className="form-group">
                    <button className="btn btn-primary btn-sm">{(blog && blog._id) ? 'Update':'Create'} Blog</button>
                    <button className="btn btn-danger btn-sm" onClick={handleBack}> Back </button>
                </div>        
            </form> 
            {loading && <Loading />}  
        </div>
    )

}

export default PageLayout(CreateBlog)