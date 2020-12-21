import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ManageLocation = () => {
    const token = useSelector(state => state.login.token)
    const [states, setStates] = useState()

    useEffect(() => {
        axios.post(`${elements.API_COMMON_ENDPOINT}/getStateList`, '',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => setStates(res.data))
    }, [token])


    return (
        <div>
            {states && <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">State</th>
                        <th scope="col">Code</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {states.map((state, i) => {
                        return (
                            <tr key={state.code}>
                                <td>{i + 1}</td>
                                <td>{state.name}</td>
                                <td>{state.code}</td>
                                <td>
                                    <NavLink to={`/add-location-content/${state.slug}`}>
                                        Manage Content
                                 </NavLink>
                                </td>
                            </tr>
                            )
                    })}

                </tbody>
            </table>

            }
        </div>
    )

}

export default PageLayout(ManageLocation)