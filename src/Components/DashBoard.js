import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout"
import axios from "axios";
import { elements } from "../Cons";
import Loading from "./Loading"
import { useSelector } from "react-redux";



const DashBoard = () => {
    const [loading, setLoading] = useState(false)
    const [dashboardData, setDashboardData] = useState(false)
    const token = useSelector(state => state.login.token)
    useEffect(() => {
        setLoading(true)
        axios.post(`${elements.API_ENDPOINT}/dashboard`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(res => {
                setDashboardData(res.data)
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])


    return (
        <React.Fragment>



            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-3">
                        <div className="summery">
                            <h2>Total Clients</h2>{dashboardData.users}
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="summery">
                            <h2>Total Warehouses</h2>
                            <p><strong>Active :</strong>{dashboardData.warehouses - dashboardData.inActiveWarehouses}</p>
                            <p><strong>Inactive :</strong>{dashboardData.inActiveWarehouses}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="summery">
                            <h2>Total Enquiry {dashboardData.enquiry}</h2>
                            <p><strong>Open :</strong>{dashboardData.openEnquiry}</p>
                            <p><strong>In progress :</strong>{dashboardData.enquiry - dashboardData.openEnquiry - dashboardData.closedEnquiry}</p>
                            <p><strong>Closed :</strong>{dashboardData.closedEnquiry}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="summery">
                            <h2>Total Leads {dashboardData.leads}</h2>
                            <p><strong>Open :</strong>{dashboardData.openLeads}</p>
                            <p><strong>In progress :</strong>{dashboardData.leads - dashboardData.openLeads - dashboardData.closedLeads}</p>
                            <p><strong>Closed :</strong>{dashboardData.closedLeads}</p>
                        </div>
                    </div>

                </div>
            </div>
            {loading && <Loading />}
        </React.Fragment>
    )
}


export default PageLayout(DashBoard);
