import React, { useEffect } from "react";
import PageLayout from "../HOC/PageLayout";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import Loading from "./Loading"
import axios from "axios";
import { elements } from "../Cons";


const ContactEnquiry = () => {
    const { resultCount, enquries, loading } = useSelector(state => state.enquiry)
    const dispatch = useDispatch();
    const { page } = useParams();
    const token = useSelector(state => state.login.token)

    useEffect(() => {

        dispatch(actionCreators.fetchEnquiryList({
            page: page ? page : 1
        }))

    }, [dispatch, page])

    const Pagination = () => {
        let pages = (resultCount > 10) ? resultCount / 10 + (resultCount % 10 ? 1 : 0) : null;
        console.log(pages, resultCount)

        let items = [],
            currentPage = page ? page : 1;
        for (let number = 1; number <= pages; number++) {

            items.push(
                <li key={number} className={`${currentPage === number ? "active page-item" : "page-item"}`}>
                    <NavLink className="page-link" to={`/contact-enquiry/${number}`}>{number}</NavLink>
                </li>,
            );
        }
        return items;

    }
    const changeStatus = (e, id) => {
        axios.post(`${elements.API_ENDPOINT}/changeEnquiryStatus`,
            { _id: id, status: e.target.value },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }
        ).then(res=>{
            console.log(res.data)
        })
    }
    if(loading){
        return <Loading />
    }
    return (
        <React.Fragment>
            <table className="table table-hover">
                <thead>
                    <tr>

                        <th scope="col">Full Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">EMail</th>
                        <th scope="col">company</th>
                        <th scope="col">mobile</th>
                        <th scope="col">message</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {enquries && enquries.length && enquries.map((enquiry, i) => {
                        return <tr key={i}>
                            <td>{enquiry.fullname}</td>
                            <td>{
                                new Date(parseInt((enquiry._id).substring(0, 8), 16) * 1000).toLocaleString()
                            }</td>
                            <td>{enquiry.email}</td>
                            <td>{enquiry.company}</td>
                            <td>{enquiry.mobile}</td>
                            <td>{enquiry.message}</td>
                            <td>
                                <select defaultValue={enquiry.status}
                                    onChange={(e) => changeStatus(e, enquiry._id)}>
                                    <option value="" >Select</option>
                                    <option value="Open">Open</option>
                                    <option value="Progress">In Progress</option>
                                    <option value="Closed">Closed</option>
                                </select>

                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <Pagination />
                </ul></nav>


        </React.Fragment>
    )
}


export default PageLayout(ContactEnquiry);
