import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import { useSelector } from "react-redux"
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { elements } from "../Cons";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
import slugify from 'react-slugify';

const CreateServices = () => {
    const history = useHistory();
    const { serID } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, errors } = useForm();  
    const [loading, setLoading] = useState(false)
    const initialFormData = Object.freeze({
        name: '',
        slug: '',
        images:'',
        created_at: new Date().toLocaleDateString(),
        serID: serID,
    });
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
    const [formData, updateFormData] = React.useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
    };
    const [services, setServices] = useState()
    useEffect(() => {
        const slug = serID;
        
        axios.post(`${elements.API_COMMON_ENDPOINT}/getService`, {slug: slug},
            ).then(res => {
                if(res.data){
                    setServices(res.data)
                    updateFormData(res.data)
                }
            })
    },[services]);
    const onSubmit = (e) => {
        formData['slug'] = slugify(formData.name);
        formData['serID'] = formData._id;
        console.log(formData);
        setLoading(true)
        axios.post(`${elements.API_ENDPOINT}/AddServices`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(res => {
                alert(res.data.message)
                 history.push('/manage-services');
                setLoading(false)
            })
            .catch(err => {
                alert(err.message)
                setLoading(false)
            })
    }
    const handleBack = () => {
        history.push('/manage-services');
    }
    return (
        <div>
            <h1>{(serID)?'Update':'Create'} Services</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Services Name</label>
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
                    <label>Services Images</label>
                    <input type="file" className="form-control" name="images" onChange={uploadMultipleFiles} id="blogimages" />
                </div>   
                <div className="form-group multi-preview">
                    {fileArray && fileArray.map( (url, index) => {
                        return (
                            <img src={url}  key={index} style={{ width: '150px'  }} />
                        )
                    })}
                    <img src={services && services.image} style={{ width: '150px'  }} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-sm">{(serID)?'Update':'Create New'} Services</button>
                    <button className="btn btn-danger btn-sm" onClick={handleBack}> Back </button>
                </div>        
            </form> 
            {loading && <Loading />}  
        </div>
    )

}

export default PageLayout(CreateServices)