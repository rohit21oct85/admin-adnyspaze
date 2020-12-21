import React, { useEffect } from "react";
import PageLayout from "../HOC/PageLayout";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreator from "../Store/actions";
import Loading from "../Components/Loading"




const Warehouses = () => {

    const { page, clientID } = useParams();
    const dispatch = useDispatch();

    const {resultCount, warehouses, loading} = useSelector(state => state.warehousesData)


    useEffect(() => {
        dispatch(actionCreator.fecthWarehouse({ pagenum: page ? page : 1, "clientID": clientID }))
    }, [page, dispatch])

    const changeWarehouseStatus = (e) => {
        e.preventDefault();
        e.persist();
        dispatch(actionCreator.toggleWareHouseStatus(
            {
                warehouseId: e.target.dataset.warehouseid,
                currentStatus: e.target.dataset.status
            }
        ))
    }
    const Pagination = () => {
        let pages =  (resultCount > 10) ? resultCount/10 + (resultCount%10?1:0) : null;

        let items = [],
            currentPage = page ? page : 1;
        for (let number = 1; number <= pages; number++) {

            items.push(
                <li key={number} className={`${currentPage === number ? "active page-item" : "page-item"}`}>
                    <NavLink className="page-link" to={`/warehouses/${number}`}>{number}</NavLink>
                </li>,
            );
        } return items;

    }


    return (
        <React.Fragment>


            <div className="row justify-content-between">
                <div className="col col-md-8">
                    <form className="row mb-5">
                        <div className="col col-md-4">
                            <input type="text" className="form-control" placeholder="Search by warehouse ID" />
                        </div>
                        <div className="col col-md-4">
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-4 text-right"> <NavLink to="/add-warehouse" className="btn btn-success">Add New Warehouse</NavLink></div>
            </div>


            <table className="table table-hover">
                <thead>
                    <tr>

                        <th scope="col">Name</th>
                        <th scope="col">Date added</th>
                        <th scope="col">City</th>
                        <th scope="col">Racked Storage</th>
                        <th scope="col">Floor Storage</th>
                        <th scope="col">Status</th>
                        <th scope="col" colSpan="2" className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouses && warehouses.length && warehouses.map((warehouse, i) => {
                        return <tr key={i}>
                            <td><NavLink to={`/warehouse/${warehouse._id}`}>{warehouse.warehouseName}</NavLink>
                            </td>
                            <td>{
                                new Date(parseInt((warehouse._id).substring(0, 8), 16) * 1000).toLocaleString()
                            }</td>
                            <td>{warehouse.city}</td>
                            <td>{warehouse.racking ? "Yes" : "No"}</td>
                            <td>{warehouse.avilableFLoor ? "Yes" : "No"}</td>
                            <td>{warehouse.status === "1" ? "Active" : warehouse.status === "2" ? "Inactive" : "Archived"}</td>
                            <td><NavLink to={`/warehouse/${warehouse._id}`} className="btn btn-primary">View/Edit</NavLink></td>
                            <td>
                                {warehouse.status === "1" &&
                                    <button data-status={warehouse.status} data-warehouseid={warehouse._id} onClick={changeWarehouseStatus} className="btn btn-danger">Deactivate</button>
                                }
                                {warehouse.status === "2" &&
                                    <button data-status={warehouse.status} data-warehouseid={warehouse._id} onClick={changeWarehouseStatus} className="btn btn-success">Activate</button>}

                                {warehouse.status === "3" && "Archived by User"}

                            </td>
                        </tr>
                    })}
                </tbody>
            </table>

            {resultCount && <nav aria-label="Page navigation">
                <ul className="pagination">
                    <Pagination />
                </ul></nav>}

                {loading && <Loading/>}

        </React.Fragment>
    )
}


export default PageLayout(Warehouses);
