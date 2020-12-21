import React, {useState, useEffect} from 'react';
import PageLayout from "../HOC/PageLayout";
import { useSelector } from "react-redux"
import { useParams, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { elements } from "../Cons";
import { useForm } from "react-hook-form";
import Loading from "./Loading";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddIndustryContent = () => {
    const history = useHistory();
    const { indURL } = useParams();
    const { type } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, errors } = useForm();  
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        history.push('/manage-industry');
    }
    let _URL = window.URL || window.webkitURL;
    const [bannerImage, setBannerImage] = useState("");
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
               setBannerImage(base64);
               setFormData({...formData,banner_image: base64}) 
            }  
        }
    }
    
    const [formData, setFormData] = useState("");
    const onSubmit = (e)=>{
        formData['slug'] = indURL;
        formData['indID'] = formData._id;
        console.log(formData);
        setLoading(true);
        axios.post(`${elements.API_ENDPOINT}/AddIndustryContent`,formData,
            {headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }})
            .then(res => {
                alert("Content added");
                history.push('/manage-industry');
                setLoading(false);
            })
            .catch(err=>console.log(err));
    }
    const [industry, setIndustry] = useState()
    useEffect(() => {
        const slug = indURL;
        if(slug){
            axios.post(`${elements.API_COMMON_ENDPOINT}/getIndustryContent`, {slug: slug}).then(res => {
                if(res.data){
                    setIndustry(res.data)
                    setFormData(res.data)
                }
            })
        }
    },[]);
    function handleDelete(e){
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteIndustryContent`, {_id: _id},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                alert(res.data.message);
                window.location.reload();
            })
    }
    return (
        <div>
            <h1>{type} Industry Content 
            {industry && 
            <button className="btn btn-sm btn-success pull-right"
            style={{ cursor: 'pointer' }} 
            onClick={handleDelete}
            id={industry._id}
            >
                <span className="fa fa-trash"></span> Delete Content 
            </button>}
            
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Banner Top</label>
                    <input type="file" className="form-control"
                    onChange={uploadImage}/>
                    <div style={{ height: '263px', overflow: 'hidden', textAlign: 'center', marginTop: '20px' }}>
                        <img src={(bannerImage)?bannerImage: industry && industry.banner_image} style={{ width: '100%' }} />
                    </div>

                    
                </div>
                <div className="form-group">
                    <label>Heading Top</label>
                    <input type="text" className="form-control" 
                    defaultValue={industry && industry.heading_top}
                    placeholder="Heading Name" 
                    onChange={ (e) => { 
                        setFormData({...formData,heading_top: e.target.value})
                    }}/>
                </div>
                <div className="form-group">
                    <label>Industry Overview</label>
                    <CKEditor
                    editor={ClassicEditor}
                    data={industry && industry.top_content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        let updatedContent = {...formData, top_content:data}
                        setFormData(updatedContent)
                    }}
                    />
                </div>
                <div className="form-group">
                    <label>Heading Middle</label>
                    <input type="text" className="form-control" 
                    defaultValue={industry && industry.heading_middle}
                    placeholder="Heading Middle" 
                    onChange={ (e) => { 
                        setFormData({...formData,heading_middle: e.target.value})
                    }}/>
                </div>
                
                <div className="form-group">
                    <label>Industry Middle Content</label>
                    <CKEditor
                    editor={ClassicEditor}
                    data={industry && industry.middle_content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        let updatedContent = {...formData, middle_content:data}
                        setFormData(updatedContent)
                    }}
                    />
                </div>
                
                <div className="form-group">
                    <label>Heading Bottom</label>
                    <input type="text" className="form-control" 
                    defaultValue={industry && industry.heading_bottom}
                    placeholder="Heading Bottom" 
                    onChange={ (e) => { 
                        setFormData({...formData,heading_bottom: e.target.value})
                    }}/>
                </div>
                
                <div className="form-group">
                    <label>Industry Bottom Content</label>
                    <CKEditor
                    editor={ClassicEditor}
                    data={industry && industry.bottom_content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        let updatedContent = {...formData, bottom_content:data}
                        setFormData(updatedContent)
                    }}
                    />
                </div>


                <div className="form-group">
                    <button className="btn btn-info btn-sm">{type} Industry Content</button>
                    <button className="btn btn-danger btn-sm ml-2" onClick={handleBack}> Back </button>
                </div>
            </form>
            {loading && <Loading />}  
        </div>
    )
}

export default PageLayout(AddIndustryContent)