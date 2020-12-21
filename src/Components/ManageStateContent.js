import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ManageStateContent = () => {
    const token = useSelector(state => state.login.token)
    const [stateData, setStateData] = useState();
    const { stateCode } = useParams()

    const updateData= (e)=>{
        e.preventDefault()
        axios.post(`${elements.API_ENDPOINT}/updateStateData`,stateData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })
            .then(res => alert(res.data.messgae))
            .catch(err=>console.log(err))

    }
    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getStateData`, { slug: stateCode },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => setStateData(res.data))
    }, [token])


    return (
        <div>
            {stateData && <table className="table table-hover">
                <tbody>
                    <tr>
                        <th scope="col">Name</th><td>{stateData.name}</td>
                    </tr><tr>
                        <th scope="col">Code</th><td>{stateData.code}</td>
                    </tr><tr>
                        <th scope="col">Content</th><td>
                            <CKEditor
                                editor={ClassicEditor}
                                data={stateData.pageHtml}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    let updatedState = {...stateData, pageHtml:data}
                                    setStateData(updatedState)
                                }}
                            /></td>
                    </tr><tr>
                        <th scope="col">Css</th>
                        <td>
                            <textarea className="form-control"
                            defaultValue={stateData.pageCSS}
                             onChange={(event) => {
                                const data = event.target.value;
                                let updatedState = {...stateData, pageCSS:data}
                                setStateData(updatedState)

                            }}
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                    <td></td>
                        <td>
                            <button className="btn btn-primary btn-lg" onClick=
                            {updateData}>Update</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            }
        </div>
    )

}

export default PageLayout(ManageStateContent)