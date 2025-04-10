import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchInvPosts } from '../../api/Api'
import { NavLink, useParams } from 'react-router-dom'

export const FetchIndv = () => {

    const [pageNumber, setPageNumber] = useState(0);

    const { id } = useParams()

    const { data, error, isError, isPending } = useQuery({
        queryKey: ["post", id], //useState
        queryFn: () => fetchInvPosts(id), //useEffect
      })

      console.log("data", data)
    
      if(isPending) return <p>Loading...</p>
      if(isError) return <p> Error: {error.message || "Something went wrong!"}</p>;
      
  return (
    <div className='section-accordion'>
        <ul>
            <li>
                <p>ID: {data.id}</p>
                <p>Title: {data.title}</p>
                <p>Description: {data.body}</p>
            </li>
        </ul>
        <NavLink to="/rq">
            <button>Go Back</button>
        </NavLink>
    </div>
  )
}
