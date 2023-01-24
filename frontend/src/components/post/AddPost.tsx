import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../assets/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsImageFill } from "react-icons/bs";

const AddPost = () => {
  const [data, setdata] = useState<any>("");
  const [caption, setcaption] = useState<string>("");
  const [hashtags, sethashtags] = useState<string>("");
  const [file, setfile] = useState<any>("");
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }  else {
      fetch("http://localhost:4000/user/" + token,{
        headers:{
          "authorization":token as string
        }
      })
        .then((res) => res.json())
        .then((data) => {setdata(data); console.log(data)})
        .catch((err) => console.log(err));
    }
  });

  const uploadPost = async () => {
    try {
      const formData = new FormData();
      formData.append("postImage", file);
      formData.append("caption", caption);
      formData.append("hashtags", hashtags);
      await fetch("http://localhost:4000/post/create", {
        method: "POST",
        mode: "cors",
        headers: {
          authorization: token as string,
        },
        body: formData,
      });
      const a = toast.success("Post Uploaded !!!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "green",
          backgroundColor: "rgb(183, 248, 183)",
        },
      });
      if (a == 1) {
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar
        secondOption={"View Profile"}
        secondOptionURL={`/profile/${data.userId}`}
        showPost={"none"}
      />
      <ToastContainer autoClose={1000} />
      <div
        className={"card mx-auto mt-4 card-light"}
        style={{ width: "38rem" }}
      >
        <div className={"imageUpload-light"}>
          <input
            type="file"
            name=""
            id="postImgInput"
            onChange={(e) => {
              if (!e.target.files) return;
              setfile(e.target.files[0]);
            }}
          />
          <BsImageFill
            style={{ marginLeft: "17rem", marginTop: "3rem" }}
            size={78}
          />
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className={"form-label"}>
              Post Caption
            </label>
            <textarea
              className="form-control"
              placeholder="Add Caption..."
              rows={3}
              value={caption}
              onChange={(e) => setcaption(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className={"form-label"}>
              Post Hastags
            </label>
            <textarea
              className="form-control"
              placeholder="Add Hash tags"
              rows={3}
              value={hashtags}
              onChange={(e) => sethashtags(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button
          className="btn btn-danger w-50 mx-auto mb-3"
          onClick={uploadPost}
        >
          Add Post
        </button>
      </div>
    </>
  );
};

export default AddPost;
