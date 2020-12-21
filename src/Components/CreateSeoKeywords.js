import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import { useSelector } from "react-redux"
import { useParams, Redirect, Router, useHistory  } from "react-router-dom";
import axios from "axios";
import { elements } from "../Cons";
import { useForm } from "react-hook-form";
import Loading from "./Loading";

const CreateSeoKeywords = () => {
    const history = useHistory();
    const { keyword_url } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, watch, errors ,setValue} = useForm();  
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState();

    useEffect(() => {
        if(keyword_url){
            const id = keyword_url;
            // console.log(id)
            axios.post(`${elements.API_COMMON_ENDPOINT}/getSingleKeywords`, {id: id},
            ).then(res => {
                setKeyword(res.data)
                updateFormData(res.data)
            })
        }
    },[]);
    
    const initialFormData = Object.freeze({
        url: '',
        meta_title: '',
        meta_description: '',
        keywords: '',
        alt_tag: '',
        canonical_tag: '',
        meta_twitter: '',
        meta_twitter_card: '',
        meta_twitter_site: '',
        meta_twitter_title: '',
        meta_twitter_description: '',
        og_url: '',
        og_site_name: '',
        robots: '',
        _id: keyword_url
    });
    const [formData, updateFormData] = React.useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim()
        });
    };
    
    const formSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${elements.API_ENDPOINT}/AddSeoTags`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
        .then(res => {
            alert(res.data.message)
            history.push('/seo-keywords')
            setLoading(false)
        })
        .catch(err => {
            alert(err.message)
            setLoading(false)
        });
    };  
    
    const handleBack = () => {
        history.push('/seo-keywords')
    }

return (
<div>
    <h1>{(keyword_url)?'Update Keyword':'Create Keyword' }</h1>
    <form method="post">
        <div className="form-group">
<label>Web Url </label>
            <input type="text"  
            className='form-control' 
            id="url"
            name="url"
            defaultValue={keyword && keyword.url}
            onChange={handleChange}
            ref={register({
                required: "Please enter website url"
            })}
            />
            <span className="text-danger mt-2">
                {errors.url && errors.url.message}
            </span>
        </div>
        
        <div className="form-group">
            <label>Meta Title</label>
            <input type="text"  
            className='form-control' 
            id="meta_title"
            name="meta_title"
            defaultValue={keyword && keyword.meta_title}
            onChange={handleChange}
            ref={register({
                required: "Please enter Meta Title"
            })}
            />
            <span className="text-danger mt-2">
                {errors.meta_title && errors.meta_title.message}
            </span>
        </div>
        
        
        <div className="form-group">
            <label>Meta Description</label>
            <input type="text"  
            className='form-control' 
            id="meta_description"
            name="meta_description"
            defaultValue={keyword && keyword.meta_description}
            onChange={handleChange}
            ref={register({
                required: "Please enter Meta Description"
            })}
            />
            <span className="text-danger mt-2">
                {errors.meta_description && errors.meta_description.message}
            </span>
        </div>
        
        <div className="form-group">
            <label>Meta Keywords</label>
            <input type="text"  
            className='form-control' 
            id="keywords"
            name="keywords"
            defaultValue={keyword && keyword.keywords}
            onChange={handleChange}
            ref={register({
                required: "Please enter Meta Description"
            })}
            />
            <span className="text-danger mt-2">
                {errors.keywords && errors.keywords.message}
            </span>
        </div>
        
        <div className="form-group">
            <label>Alt Tags</label>
            <input type="text"  
            className='form-control' 
            id="alt_tag"
            name="alt_tag"
            defaultValue={keyword && keyword.alt_tag}
            onChange={handleChange}
            ref={register({
                required: "Please enter Meta Description"
            })}
            />
            <span className="text-danger mt-2">
                {errors.alt_tag && errors.alt_tag.message}
            </span>
        </div>
        
        <div className="form-group">
            <label>Canonical Tag</label>
            <input type="text"  
            className='form-control' 
            id="canonical_tag"
            name="canonical_tag"
            defaultValue={keyword && keyword.canonical_tag}
            onChange={handleChange}
            ref={register({
                required: "Please enter Meta Description"
            })}
            />
            <span className="text-danger mt-2">
                {errors.canonical_tag && errors.canonical_tag.message}
            </span>
        </div>
        
        <div className="form-group">
            <label>Meta Twitter</label>
            <input type="text"  
            className='form-control' 
            id="meta_twitter"
            name="meta_twitter"
            defaultValue={keyword && keyword.meta_twitter}
            onChange={handleChange}
            />
            
        </div>
        
        <div className="form-group">
            <label>Meta Twitter Card</label>
            <input type="text"  
            className='form-control' 
            id="meta_twitter_card"
            name="meta_twitter_card"
            defaultValue={keyword && keyword.meta_twitter_card}
            onChange={handleChange}
            />
            
        </div>
        
        
        <div className="form-group">
            <label>Meta Twitter Site</label>
            <input type="text"  
            className='form-control' 
            id="meta_twitter_site"
            name="meta_twitter_site"
            defaultValue={keyword && keyword.meta_twitter_site}
            onChange={handleChange}
            />
            
        </div>
        
        <div className="form-group">
            <label>Meta Twitter Title</label>
            <input type="text"  
            className='form-control' 
            id="meta_twitter_title"
            name="meta_twitter_title"
            defaultValue={keyword && keyword.meta_twitter_title}
            onChange={handleChange}
            />
            
        </div>
        
        <div className="form-group">
            <label>Meta Twitter Description</label>
            <input type="text"  
            className='form-control' 
            id="meta_twitter_description"
            name="meta_twitter_description"
            defaultValue={keyword && keyword.meta_twitter_description}
            onChange={handleChange}
            />
            
        </div>
        
        <div className="form-group">
            <label>OG URL</label>
            <input type="text"  
            className='form-control' 
            id="og_url"
            name="og_url"
            defaultValue={keyword && keyword.og_url}
            onChange={handleChange}
            />
            
        </div>
        
        <div className="form-group">
            <label>OG Site Name</label>
            <input type="text"  
            className='form-control' 
            id="og_site_name"
            name="og_site_name"
            defaultValue={keyword && keyword.og_site_name}
            onChange={handleChange}
            />
            
        </div>
        
        <div className="form-group">
            <label>Robots</label>
            <input type="text"  
            className='form-control' 
            id="robots"
            name="robots"
            defaultValue={keyword && keyword.robots}
            onChange={handleChange}
            />
            
        </div>
        
        
        <div className="form-group">
        <button type="button" onClick={formSubmit} className="btn btn-primary btn-sm">{(keyword_url)?'Update Keyword':'Create Keyword' }</button>
            <button type="button" className="btn btn-danger btn-sm" onClick={handleBack}> Back </button>
        </div>        
    </form> 
    {loading && <Loading />}  
</div>
)

}

export default PageLayout(CreateSeoKeywords)