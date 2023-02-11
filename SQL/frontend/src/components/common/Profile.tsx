import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../assets/NavBar";
import PostCard from "../assets/PostCard";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState<any>("");
  const [posts, setposts] = useState([]);
  const [fail, setfail] = useState("")
  const token = localStorage.getItem("jwt")

  useEffect(() => {

    if (token === null) {
      navigate("/");
    } else {
      fetch("http://localhost:4000/user/" + token,{
        headers:{
          "authorization":token as string
        }
      })
        .then((res) => res.json())
        .then((data) => setdata(data))
        .catch((err) => console.log(err));
    }

    fetch("http://localhost:4000/post/getPostForUser/" + data.userId,{
      headers:{
        "authorization":token as string
      }
    })
      .then((res) => res.json())
      .then((post) => {
        if(post.message){
          setfail(post.message)
        }else{
          setposts(post)
        }
      })
      .catch((err) => console.log(err));
  }, [token, navigate, data.email]);

  return (
    <>
      <NavBar
        name={``}
        secondOption={"View Profile"}
        secondOptionURL={`/profile/${data.userId}`}
      />
      <h1 className="text-center">
        {fail === "No Post Exist !!!" ? "No Post To Display" : " "}
      </h1>
      <div className="row mt-4">
        {posts.map((val: any) => {
          return (
            <>
              <PostCard id={val.postId} image={val.postImage} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
