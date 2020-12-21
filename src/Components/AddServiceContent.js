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

const AddServiceContent = () => {
    const history = useHistory();
    const { serID } = useParams();
    const { type } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, errors } = useForm();  
    const [loading, setLoading] = useState(false)
    const initialFormData = Object.freeze({
        heading: '',
        overview:'', 
        stats:'',
        stats_image:'',
        how_top_content:'',
        how_image:'',
        how_bottom_content:'',
        whyus_content:'',
        pointer_one_heading:'',
        pointer_one_content:'',
        pointer_two_heading:'',
        pointer_two_content:'',
        pointer_three_heading:'',
        pointer_three_content:'',
        pointer_four_heading:'',
        pointer_four_content:'',
        keybenifit_one_heading:'',
        keybenifit_one_content:'',
        keybenifit_two_heading:'',
        keybenifit_two_content:'',
        keybenifit_three_heading:'',
        keybenifit_three_content:'',
        created_at: new Date().toLocaleDateString(),
        url: serID,
        _id:''
    });
    
    let _URL = window.URL || window.webkitURL;
    const [statsImage, setStatsImage] = useState("");
    const uploadStatsImage = (e) => {
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
               setStatsImage(base64);
               updateFormData({...formData,stats_image: base64}) 
            }  
        }
    }

    const [howImage, setHowImage] = useState("");
    const uploadHowToImage = (e) => {
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
               setHowImage(base64);
               updateFormData({...formData,how_image: base64}) 
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
        console.log(slug);
        if(slug){
            axios.post(`${elements.API_COMMON_ENDPOINT}/getServiceContent`, {slug: slug},
            ).then(res => {
                if(res.data){
                    setServices(res.data)
                    updateFormData(res.data)
                }
            })
        }
        
    },[]);
    const onSubmit = (e) => {
        formData['url'] = serID;
        formData['_id'] = formData._id;
        console.log(formData);
        setLoading(true)
        axios.post(`${elements.API_ENDPOINT}/AddServiceContent`, formData, {
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
            <h1>{type} Service Content</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Heading</label>
                    <input type="text"  
                    className='form-control'
                    autoComplete="off" 
                    id="heading"
                    name="heading"
                    defaultValue={services && services.heading}
                    onChange={handleChange}
                    ref={register({
                        required: "Please enter heading"
                    })}
                    />
                    <span className="text-danger mt-2">
                        {errors.heading && errors.heading.message}
                    </span>
                </div>
                <div className="form-group">
                    <label>Overview</label>
                    <CKEditor
                        editor="Classic"
                        name="overview"
                        id="overview"
                        data={services && services.overview}
                        onChange={ event => {
                            const data = event.editor.getData();
                            updateFormData({...formData,overview:data})
                        } }
                        ref={ register({ required: "Please Enter top content"})}
                    />
                    
                    <span className="text-danger mt-2">
                        {errors.overview && errors.overview.message}
                    </span>
                </div>
                <div className="row">
                    <div className="form-group col-md-6">
                        <label>Stats and Charts</label>
                        
                        <CKEditor
                            type="Classic"
                            name="stats"
                            id="stats"
                            data={services && services.stats}
                            onChange={ event => {
                                const data = event.editor.getData();
                                updateFormData({...formData,stats:data})
                            } }
                            ref={ register({ required: "Please Enter stats"})}
                        />
                        <span className="text-danger mt-2">
                            {errors.stats && errors.stats.message}
                        </span>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Stats Image</label>
                        <input type="file" className="form-control" name="stats_image" onChange={uploadStatsImage} id="statimages" />
                        <div style={{ height: '263px', overflow: 'hidden', textAlign: 'center', marginTop: '50px' }}>
                            <img src={(statsImage)?statsImage: services && services.stats_image} style={{ width: '250px' }}></img>
                        </div>
                    </div>

                </div>  

                <div className="form-group">
                    <label>How it works Top Content</label>        
                    <CKEditor
                            type="Classic"
                            name="how_top_content"
                            id="how_top_content"
                            data={services && services.how_top_content}
                            onChange={ event => {
                                const data = event.editor.getData();
                                updateFormData({...formData,how_top_content:data})
                            } }
                            ref={ register({ required: "Please Enter stats"})}
                        />
                </div> 
                
                <div className="form-group">
                    <label>How it Works Images</label>
                    <input type="file" className="form-control" name="how_image" onChange={uploadHowToImage} id="blogimages" />
                    <div style={{ height: '263px', overflow: 'hidden' }}>
                            <img src={(howImage)?howImage: services && services.how_image} style={{ width: '100%' }}></img>
                    </div>
                </div>   
                
                <div className="form-group">
                    <label>How it works Bottom Content</label>        
                    <CKEditor
                            type="Classic"
                            name="how_bottom_content"
                            id="how_bottom_content"
                            data={services && services.how_bottom_content}
                            onChange={ event => {
                                const data = event.editor.getData();
                                updateFormData({...formData,how_bottom_content:data})
                            } }
                            ref={ register({ required: "Please Enter stats"})}
                        />
                </div>
                <div className="form-group">
                    <label>Why us Content</label>        
                    <CKEditor
                            type="Classic"
                            name="whyus_content"
                            id="whyus_content"
                            data={services && services.whyus_content}
                            onChange={ event => {
                                const data = event.editor.getData();
                                updateFormData({...formData,whyus_content:data})
                            } }
                            ref={ register({ required: "Please Enter stats"})}
                        />
                </div>
                <h3>Why Us Pointers.. </h3>
                <div className="row">
                <div className="form-group col-md-6">
                    <label>Why us Pointer 1</label>        
                    <input type="text" className="form-control" name="pointer_one_heading" defaultValue={services && services.pointer_one_heading} onChange={handleChange}/>
                    <textarea type="text" className="form-control" name="pointer_one_content" defaultValue={services && services.pointer_one_content} onChange={handleChange}>
                    </textarea>
                </div>
                            
                <div className="form-group col-md-6">
                    <label>Why us Pointer 2</label>        
                    <input type="text"  className="form-control" name="pointer_two_heading" defaultValue={services && services.pointer_two_heading} onChange={handleChange}/>
                    <textarea type="text" className="form-control" name="pointer_two_content" defaultValue={services && services.pointer_two_content} onChange={handleChange}>
                    </textarea>
                </div>

                <div className="form-group col-md-6">
                    <label>Why us Pointer 3</label>        
                    <input type="text"  className="form-control" name="pointer_three_heading" defaultValue={services && services.pointer_three_heading} onChange={handleChange}/>
                    <textarea type="text" className="form-control" name="pointer_three_content" defaultValue={services && services.pointer_three_content} onChange={handleChange}>
                    </textarea>
                </div>
                            
                <div className="form-group col-md-6">
                    <label>Why us Pointer 4</label>        
                    <input type="text"  className="form-control" name="pointer_four_heading" defaultValue={services && services.pointer_four_heading} onChange={handleChange}/>
                    <textarea type="text" className="form-control" name="pointer_four_content" defaultValue={services && services.pointer_four_content} onChange={handleChange}>
                    </textarea>
                </div>
                </div>
                

                <h3>Key benifits.. </h3>
                
                <div className="row" id="Benifit">
                    <div className="form-group col-md-6">
                        <label>Key Benifit 1</label>        
                        <input type="text" className="form-control" name="keybenifit_one_heading" defaultValue={services && services.keybenifit_one_heading} onChange={handleChange}/>
                        <textarea type="text" className="form-control" name="keybenifit_one_content" defaultValue={services && services.keybenifit_one_content} onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Key Benifit 2</label>        
                        <input type="text" className="form-control" name="keybenifit_two_heading" defaultValue={services && services.keybenifit_two_heading} onChange={handleChange}/>
                        <textarea type="text" className="form-control" name="keybenifit_two_content" defaultValue={services && services.keybenifit_two_content} onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Key Benifit 3</label>        
                        <input type="text" className="form-control" name="keybenifit_three_heading" defaultValue={services && services.keybenifit_three_heading} onChange={handleChange}/>
                        <textarea type="text" className="form-control" name="keybenifit_three_content" defaultValue={services && services.keybenifit_three_content}onChange={handleChange}>
                        </textarea>
                    </div>        
                </div>
                
                <div className="form-group">
                    <button className="btn btn-primary btn-sm">{type} Service Content</button>
                    <button className="btn btn-danger btn-sm" onClick={handleBack}> Back </button>
                </div>        
            </form> 
            {loading && <Loading />}  
        </div>
    )

}

export default PageLayout(AddServiceContent)