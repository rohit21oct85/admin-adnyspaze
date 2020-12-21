import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import Loading from "../Components/Loading"
import { useForm } from "react-hook-form";

const Clients = () => {
    const clients = useSelector(state=>state.clients.data)
    const {loading} = useSelector(state=>state.clients)
    const [resultCount, setResultCount] = useState()
    const { register, handleSubmit, watch, errors ,setValue} = useForm();

    const dispatch = useDispatch();
    const {page} = useParams()

    useEffect(()=>{
        if(!clients){
            return
        }
        setResultCount( clients.resultCount)

    },[clients])

    useEffect(() => {
        dispatch(actionCreators.fetchClientList({page:page?page:1}))
     }, [dispatch, page])

     const Pagination = () => {
        let pages = (resultCount > 10) ? resultCount/10 + (resultCount%10?1:0) : null;

        let items = [],
            currentPage = page ? page : 1;
        for (let number = 1; number <= pages; number++) {

            items.push(
                <li key={number} className={`${currentPage === number ? "active page-item" : "page-item"}`}>
                    <NavLink className="page-link" to={`/clients/${number}`}>{number}</NavLink>
                </li>,
            );
        } return items;

    }
    const search = (data)=>{
        dispatch(actionCreators.findClient(data))
    }
    return (
        <React.Fragment>


            <form className="mb-5" onSubmit={handleSubmit(search)}>
                <div className="row">
                    <div className="col col-md-4">
                        <input type="text" name="email" className={errors.email ? "form-control is-invalid":"form-control"} placeholder="Search by email"
                        ref={register({required:true})} />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary" type="submit">Search</button>
                    </div>
                </div>
            </form>

            <table className="table table-hover">
                <thead>
                    <tr>

                        <th scope="col">Full Name</th>
                        <th scope="col">Mobile</th>


                        <th scope="col">EMail</th>
                        <th scope="col">Registration Date</th>
                        <th scope="col">Action</th>
                        <th scope="col">Warehouses</th>
                    </tr>
                </thead>
                <tbody>
                    {clients && clients.users.map((client, i) => {
                        return <tr key={i}>
                            <td><NavLink to={`/client/${client._id}`}>{client.name}</NavLink></td>
                            <td>{client.mobile}</td>
                            <td>{client.email}</td>
                            <td>{
                                new Date(parseInt((client._id).substring(0, 8), 16) * 1000).toLocaleString()
                            }</td>
                            <td><NavLink to={`/client/${client._id}`} className="btn btn-primary">View/Edit</NavLink></td>
                            <td><NavLink to={`/warehouses/1/${client._id}`} className="btn btn-primary"> Warehouses</NavLink></td>
                        </tr>
                    })}
                </tbody>
            </table>
            { resultCount && <nav aria-label="Page navigation">
                <ul className="pagination">
                    <Pagination />
                </ul></nav>}

                {loading && <Loading/>}
        </React.Fragment>
    )
}


export default PageLayout(Clients);
