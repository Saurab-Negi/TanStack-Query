import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchPosts } from '../api/Api'
import { NavLink } from 'react-router-dom'

export const FetchRQ = () => {

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["posts"], //useState
    queryFn: fetchPosts, //useEffect
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
    </div>
  )
}
