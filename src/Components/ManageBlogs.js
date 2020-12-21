import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import axios from "axios";
import { elements } from "../Cons";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import dateFormat from 'dateformat';

const ManageBlogs = () => {
    const token = useSelector(state => state.login.token)
    const [blogs, setblogs] = useState()
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [nextPage, setNextPage] = useState();
    const [prevPage, setPrevPage] = useState();

    useEffect(() => {
        axios.get(`${elements.API_COMMON_ENDPOINT}/getBlogsList/?page=${page}&limit=${limit}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                const nextData = res.data.next;
                const prevData = res.data.prev;
                setNextPage(nextData);
                setPrevPage(prevData);
                const blogData = res.data.data; 
                setblogs(blogData)
            })
    }, [token, page, limit])
    const handleNextBlog = (e) => {
        setPage(nextPage.page);
        setLimit(nextPage.limit);
    }
    
    const handlePrevBlog = (e) => {
        setPage(prevPage.page);
        setLimit(prevPage.limit);
    }
    const handleDelete = (e) => {
        const _id = e.target.id;
        axios.post(`${elements.API_ENDPOINT}/deleteBlog`, {_id: _id},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            }).then(res => {
                alert(res.data.message)
                document.getElementById(_id).style.display = "none";
            })
    }
    
    return (
        <div>

            <NavLink 
                className='btn btn-sm btn-success' 
                style={{ marginBottom: '15px' }}
                to='/create-blog'>
                                        Create Blog
                                 </NavLink>
            <br />
            {blogs && <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Img</th>
                        <th scope="col">Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map((blog, i) => {
                        return (
                            <tr key={blog._id} id={blog._id}>
                                <td>{i + 1}</td>
                                <td>
                                    <img src={blog.image} alt={blog.blog_alt_tag} style={{ width: '150px' }}/></td>
                                <td>{blog.title}</td>
                                <td>{blog.category}</td>
                                <td>{dateFormat(blog.created_at, 'dddd, mmm dS, yyyy')}</td>
                                <td>
                                <NavLink to={`/create-blog/${blog._id}`}>
                                        <span className="fa fa-edit"></span>
                                 </NavLink>
                                 
                                
                                <span className="fa fa-trash text-danger ml-3"
                                style={{ cursor: 'pointer' }} 
                                onClick={handleDelete}
                                id={blog._id}></span>
                                
                                </td>
                            </tr>
                            )
                    })}

                </tbody>

            </table>

            }
<div className="row">
                <div className="pagination" style={{ textAlign: 'center', margin: '0 auto'}}>
                <ul style={{ listStyle: 'none' }}>
                {prevPage && 
                <li>
                    <a href="javascript:void(0)" onClick={handlePrevBlog} className="prev-page arrows">
                        <img src="/blog-icons/left-arrow.png" style={{ width: '50%'}}/>
                    </a>
                </li>
                }
                {nextPage && 
                <li>
                    <a href="javascript:void(0)"  onClick={handleNextBlog}  className="next-page arrows">
                        <img src="/blog-icons/right-arrow.png" style={{ width: '50%'}}/>
                    </a>
                </li>
                }
                </ul>
        </div>
              </div>

        </div>
    )

}

export default PageLayout(ManageBlogs)