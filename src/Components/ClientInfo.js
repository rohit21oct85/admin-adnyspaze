import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import {useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios"
import { elements } from "../Cons";
import { useForm } from "react-hook-form";
import Loading from "../Components/Loading"

const ClientInfo = () => {
    const { register, handleSubmit,  errors } = useForm();
    const [loading, setLoading]= useState(false)


    const Token = useSelector(state => state.login.token)
    const [client, setClient] = useState()
    const { clientID } = useParams();


    const onSubmit = data => {
        setLoading(true)
        axios.post(`${elements.API_ENDPOINT}/updateClientInfo`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Token
            }
        })
            .then(res => {
                alert(res.data.message)
                setLoading(false)

            })
            .catch(err => {console.log(err)
                setLoading(false)
            })

    }

    useEffect(() => {
        setLoading(true)
        axios.post(`${elements.API_ENDPOINT}/getClientInfo`, { "clientID": clientID }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Token
            }
        })
            .then(res => {
                console.log(res.data)
                setClient(res.data)
                setLoading(false)

            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }, [])


    return (
        <React.Fragment>
            {client &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="table table-hover">

                        <tbody>

                            <tr>
                                <td>Name</td>
                                <td>
                                    <input type="text" className="form-control"
                                        defaultValue={client.name}
                                        name="name"
                                        ref={register()} />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input type="text" className="form-control"
                                        defaultValue={client.email}
                                        name="email"
                                        ref={register()} />
                                </td>
                            </tr>
                            <tr>
                                <td>Mobile</td>
                                <td>
                                    <input type="text" className="form-control"
                                        defaultValue={client.mobile}
                                        name="mobile"
                                        ref={register()} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    company Name
                                </td>
                                <td>
                                    <input type="text" className="form-control"
                                        defaultValue={client.companyName}
                                        name="companyName"
                                        ref={register()} />
                                </td>
                            </tr>

                            <tr><td>Billing Address</td><td>
                                <div>
                                    <input type="text" className="form-control"
                                        defaultValue={client.billingAddress ? client.billingAddress.addressline1 : ""}
                                        name={"billingAddress.addressline1"}
                                        ref={register()} />

                                </div>
                                <div>

                                    <input type="text" className="form-control"
                                        defaultValue={client.billingAddress ? client.billingAddress.addressline2 : ""}
                                        name={"billingAddress.addressline2"}
                                        ref={register()} />
                                </div>
                                <div><input type="text" className="form-control"
                                    defaultValue={client.billingAddress ? client.billingAddress.addressline3 : ""}
                                    name={"billingAddress.addressline3"}
                                    ref={register()} />
                                </div>
                                <div>
                                    <input type="text" className="form-control"
                                        defaultValue={client.billingAddress ? client.billingAddress.city : ""}
                                        name={"billingAddress.city"}
                                        ref={register()} />
                                </div>
                                <div>

                                    <input type="text" readOnly className="form-control"
                                        defaultValue={client.billingAddress ? client.billingAddress.state : ""}
                                        name={"billingAddress.state"}
                                        ref={register()} />
                                </div>
                            </td></tr>


                            <tr><td>Status</td>
                                <td>
                                    <select className="form-control" ref={register()}
                                        name="status"
                                        defaultValue={client.status}>
                                        <option value="enabled">Enabled</option>
                                        <option value="disabled">Disabled</option>
                                    </select>
                                </td></tr>
                        </tbody>
                    </table>
                    <input type="hidden" className="form-control"
                        defaultValue={client._id}
                        name={"clientID"}
                        ref={register()} />
                    <input type="submit" value="update" className="btn btn-primary" />
                </form>
            }

            {loading && <Loading/>}
        </React.Fragment>
    )
}


export default PageLayout(ClientInfo);
