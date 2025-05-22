import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { fetchPosts } from '../api/Api'
import { NavLink } from 'react-router-dom'

export const FetchRQ = () => {

  const [pageNumber, setPageNumber] = useState(0);

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["posts", pageNumber], //useState
    queryFn: () => fetchPosts(pageNumber), //useEffect
    placeholderData: keepPreviousData,
    // gcTime: 1000,
    // staleTime: 5000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  })

  if(isPending) return <p>Loading...</p>
  if(isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className='section-accordion'>
        {
          data?.map((curElm) => {
            const { id, title, body } = curElm;
            return (
              <li key={id}>
                <NavLink to={`/rq/${id}`}>
                  <p>{id}</p>
                  <p>{title}</p>
                  <p>{body}</p>
                </NavLink>
              </li>
            )
          })
        }
      </ul>
      <div className="pagination-section container">
        <button disabled={pageNumber === 0 ? true : false} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>
        <p className='text-white text-xl'>{pageNumber / 3}</p>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  )
}
