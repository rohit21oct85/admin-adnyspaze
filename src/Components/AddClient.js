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

const AddClient = () => {
    const history = useHistory();
    const { clientID } = useParams();
    const { type } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, errors } = useForm();  
    const [loading, setLoading] = useState(false);

    const handleBack = () => {
        history.push('/manage-client');
    }
    let _URL = window.URL || window.webkitURL;

    const [clientImage, setClientImage] = useState("");
    const uploadImage = (e) => {
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
               setClientImage(base64);
               setFormData({...formData,client_image: base64}) 
            }  
        }
    }
    
    const [formData, setFormData] = useState("");
    const onSubmit = (e)=>{
        formData['clientID'] = formData._id;
        setLoading(true);
        axios.post(`${elements.API_ENDPOINT}/AddClient`,formData,
            {headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }})
            .then(res => {
                alert(res.data.message);
                history.push('/manage-client');
                setLoading(false);
            })
            .catch(err=>console.log(err));
    }
    const [client, setClient] = useState()
    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getClient`, {clientID: clientID}).then(res => {
            if(res.data){
                setClient(res.data)
                setFormData(res.data)
            }
        })
    },[]);
    function handleDelete(e){
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteClient`, {_id: _id},
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
            <h1>{type} Client
            {client && 
            <button className="btn btn-sm btn-success pull-right"
            style={{ cursor: 'pointer' }} 
            onClick={handleDelete}
            id={client._id}
            >
                <span className="fa fa-trash"></span> Delete Content 
            </button>}
            
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Client Image</label>
                    <input type="file" className="form-control"
                    onChange={uploadImage}/>
                    <div style={{ height: '100px', overflow: 'hidden', marginTop: '20px' }}>
                        <img src={(clientImage)?clientImage: client && client.client_image} style={{ width: '100px' }} />
                    </div>

                    
                </div>
                <div className="form-group">
                    <button className="btn btn-info btn-sm">{type} Client</button>
                    <button className="btn btn-danger btn-sm ml-2" onClick={handleBack}> Back </button>
                </div>
            </form>
            {loading && <Loading />}  
        </div>
    )
}

export default PageLayout(AddClient)