import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchPosts } from '../api/Api'

export const FetchRQ = () => {

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["posts"], //useState
    queryFn: fetchPosts, //useEffect
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
                <p>{title}</p>
                <p>{body}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
