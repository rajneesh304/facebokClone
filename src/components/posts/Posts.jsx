import "./posts.scss"
import Post from '../post/Post';
import {
  useQuery
} from '@tanstack/react-query'
import { makeRequest } from "../../axios.js";

const Posts = () => {

  const getPosts = async () => {
    return await makeRequest.get("/posts").then((res) => {
      return res.data
    })
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <div className='posts'>
      {
        error ? "Something went wrong..." : (isLoading ? "loading" : data.map((post) =>
          (<Post post={post} key={post.id}></Post>)
        ))
      }
    </div>
  )
}

export default Posts
