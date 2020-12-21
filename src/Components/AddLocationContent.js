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

const AddLocationContent = () => {
    const history = useHistory();
    const { location } = useParams();
    const { type } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, errors } = useForm();  
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        history.push('/manage-location');
    }
    let _URL = window.URL || window.webkitURL;

    const [sliderImageOne, setSliderImageOne] = useState("");
    const uploadSliderImageOne = (e) => {
        e.preventDefault();
        var file, img, base64,blob, reader;
        if ((file = e.target.files[0])) {
            img = new Image();
            blob = new Blob([file],{ type: file.type });
            img.src = _URL.createObjectURL(blob);
            reader = new FileReader(); 
            reader.readAsDataURL(blob); 
            reader.onload = function (){ 
               base64 = reader.result;
               setSliderImageOne(base64);
               setFormData({...formData,slider_image_1: base64}) 
            }  
        }
    }

    const [sliderImageTwo, setSliderImageTwo] = useState("");
    const uploadSliderImageTwo = (e) => {
        e.preventDefault();
        var file, img, base64,blob, reader;
        if ((file = e.target.files[0])) {
            img = new Image();
            blob = new Blob([file],{ type: file.type });
            img.src = _URL.createObjectURL(blob);
            reader = new FileReader(); 
            reader.readAsDataURL(blob); 
            reader.onload = function (){ 
               base64 = reader.result;
               setSliderImageTwo(base64);
               setFormData({...formData,slider_image_2: base64}) 
            }  
        }
    }
    
    const [sliderImageThree, setSliderImageThree] = useState("");
    const uploadSliderImageThree = (e) => {
        e.preventDefault();
        var file, img, base64,blob, reader;
        if ((file = e.target.files[0])) {
            img = new Image();
            blob = new Blob([file],{ type: file.type });
            img.src = _URL.createObjectURL(blob);
            reader = new FileReader(); 
            reader.readAsDataURL(blob); 
            reader.onload = function (){ 
               base64 = reader.result;
               setSliderImageThree(base64);
               setFormData({...formData,slider_image_3: base64}) 
            }  
        }
    }
    
    
    const [sliderImageFour, setSliderImageFour] = useState("");
    const uploadSliderImageFour = (e) => {
        e.preventDefault();
        var file, img, base64,blob, reader;
        if ((file = e.target.files[0])) {
            img = new Image();
            blob = new Blob([file],{ type: file.type });
            img.src = _URL.createObjectURL(blob);
            reader = new FileReader(); 
            reader.readAsDataURL(blob); 
            reader.onload = function (){ 
               base64 = reader.result;
               setSliderImageFour(base64);
               setFormData({...formData,slider_image_4: base64}) 
            }  
        }
    }

    
    const [formData, setFormData] = useState("");
    const onSubmit = (e)=>{
        formData['locationID'] = formData._id;
        formData['location'] = location;
        setLoading(true);
        axios.post(`${elements.API_ENDPOINT}/AddLocationContent`,formData,
            {headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }})
            .then(res => {
                alert(res.data.message);
                history.push('/manage-location');
                setLoading(false);
            })
            .catch(err=>console.log(err));
    }
    const [locationContent, setLocationContent] = useState()
    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getLocationContent`, {location: location}).then(res => {
            if(res.data){
                setLocationContent(res.data)
                setFormData(res.data)
            }
        })
    },[]);
    function handleDelete(e){
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteTestimonial`, {_id: _id},
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
            <h1>{(formData._id)?'Update':'Create'} Location Content
            {locationContent && 
            <button className="btn btn-sm btn-success pull-right"
            style={{ cursor: 'pointer' }} 
            onClick={handleDelete}
            id={locationContent._id}
            >
                <span className="fa fa-trash"></span> Delete Content 
            </button>}
            
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                <div className="form-group col-md-6">
                    <label>Warehouse Slider Image 1</label>
                    <input type="file" className="form-control"
                    onChange={uploadSliderImageOne}/>
                    <div style={{ height: '150px', overflow: 'hidden', marginTop: '20px' }}>
                        <img src={(sliderImageOne)?sliderImageOne: locationContent && locationContent.slider_image_1} style={{ width: '300px' }} />
                    </div>
                </div>
                
                <div className="form-group col-md-6">
                    <label>Warehouse Slider Image 2</label>
                    <input type="file" className="form-control"
                    onChange={uploadSliderImageTwo}/>
                    <div style={{ height: '150px', overflow: 'hidden', marginTop: '20px' }}>
                        <img src={(sliderImageTwo)?sliderImageTwo: locationContent && locationContent.slider_image_2} style={{ width: '300px' }} />
                    </div>
                </div>
                
                <div className="form-group col-md-6">
                    <label>Warehouse Slider Image 3</label>
                    <input type="file" className="form-control"
                    onChange={uploadSliderImageThree}/>
                    <div style={{ height: '150px', overflow: 'hidden', marginTop: '20px' }}>
                        <img src={(sliderImageThree)?sliderImageThree: locationContent && locationContent.slider_image_3} style={{ width: '300px' }} />
                    </div>
                </div>

                
                <div className="form-group col-md-6">
                    <label>Warehouse Slider Image 4</label>
                    <input type="file" className="form-control"
                    onChange={uploadSliderImageFour}/>
                    <div style={{ height: '150px', overflow: 'hidden', marginTop: '20px' }}>
                        <img src={(sliderImageFour)?sliderImageFour: locationContent && locationContent.slider_image_4} style={{ width: '300px' }} />
                    </div>
                </div>
                
                <div className="form-group col-md-6">
                    <label>Warehouse Top Content</label>
                    <CKEditor
                    editor={ClassicEditor}
                    data={locationContent && locationContent.top_content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        let updatedContent = {...formData, top_content:data}
                        setFormData(updatedContent)
                    }}
                    />
                </div>

                    
                <div className="form-group col-md-6">
                    <label>Warehouse Bottom Content</label>
                    <CKEditor
                    editor={ClassicEditor}
                    data={locationContent && locationContent.bottom_content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        let updatedContent = {...formData, bottom_content:data}
                        setFormData(updatedContent)
                    }}
                    />
                </div>


                </div>
                <div className="form-group">
                    <button className="btn btn-info btn-sm">{(formData._id)?'Update':'Create'} Location Content</button>
                    <button className="btn btn-danger btn-sm ml-2" onClick={handleBack}> Back </button>
                </div>
            </form>
            {loading && <Loading />}  
        </div>
    )
}

export default PageLayout(AddLocationContent)