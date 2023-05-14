import "./share.scss"
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient()

  const newPost = (post) => {
    return makeRequest.post("/posts", post);
  }

  const mutation = useMutation({
    mutationFn: newPost,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      const res = await makeRequest.post("/upload", formData);
      console.log("resData:" + res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let imgUrl = "";
      if (file) imgUrl = await upload();
      await mutation.mutate({ desc, img: imgUrl })
    } catch (err) {
      console.log(err);
    } finally {
      setFile(null);
      setDesc("");
    }
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={e => setDesc(e.target.value)} value={desc} />
          </div>
          <div className="right">
            {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share