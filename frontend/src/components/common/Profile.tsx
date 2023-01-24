import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../assets/NavBar";
import PostCard from "../assets/PostCard";

const Profile = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState<any>("");
  const [posts, setposts] = useState([]);
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
        .then((data) => {setdata(data); console.log(data)})
        .catch((err) => console.log(err));
    }

    fetch("http://localhost:4000/post/getPostForUser/" + data.userId,{
      headers:{
        "authorization":token as string
      }
    })
      .then((res) => res.json())
      .then((post) => setposts(post))
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
        {posts.length === 0 ? "No Post To Display" : " "}
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
