import React, { useState } from 'react'
import "./comments.scss"
import { useContext } from 'react';
import { AuthContext } from "../../context/authContext"
import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { makeRequest } from '../../axios.js';
import moment from 'moment';

const Comments = ({ postId }) => {

  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);
  const getComments = async () => {
    return await makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data
    })
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  })


  const queryClient = useQueryClient()

  const newComment = (post) => {
    return makeRequest.post("/comments", post);
  }

  const mutation = useMutation({
    mutationFn: newComment,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['comments'] })
    },
  })

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutate({ desc, post_id: postId })
      setDesc("")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='comments'>
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder='write a comment'
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading ? "Loading..." : data.map(comment => (
        <div className="comment">
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className='date'>{moment(comment.creation_date).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}

export default Comments
