import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../assets/NavBar";

const UpdatePost = () => {
  const param = useParams();
  const [caption, setcaption] = useState("");
  const [hashtags, sethashtags] = useState("");
  const [file, setfile] = useState<any>("");
  const [image, setimage] = useState("");
  const token = localStorage.getItem("jwt");
  const template1 = useRef(null);
  const template2 = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    //Find Logged In User Details
    if (token === undefined) {
      navigate("/");
    }

    //Find Post By Creator
    fetch("http://localhost:4000/post/" + param.id, {
      headers: {
        authorization: token as string,
      },
    })
      .then((res) => res.json())
      .then((post) => {
        setcaption(post.caption !== null ? post.caption : "");
        sethashtags(post.hashtags !== null ? post.hashtags : "");
        if (
          post.postImage !== null ||
          "http://localhost:4000/static/post/undefined"
        ) {
          setimage(post.postImage);
          const val: any = template1.current;
          val.classList.add("hide");
        } else {
          const val: any = template2.current;
          val.classList.add("hide");
        }
      })
      .catch((err) => console.log(err));
  }, [token, navigate, param.id]);

  const editPost = async () => {
    try {
      const formData = new FormData();
      formData.append("hashtags", hashtags);
      formData.append("caption", caption);
      formData.append("postImage", file);
      const response = await fetch(
        `http://localhost:4000/post/update/${param.id}`,
        {
          mode: "cors",
          method: "PUT",
          headers: {
            authorization: token as string,
          },
          body: formData,
        }
      );
      const data = await response.json();
        const a = toast.success(data.message, {
          position: toast.POSITION.TOP_CENTER,
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "green",
            backgroundColor: "rgb(183, 248, 183)"
          },
        });
        if (a == 1) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
    } catch (error) {
      console.log(error);
      const a = toast.error("Network Error !!!", {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "red",
          backgroundColor: "rgb(255, 206, 206)",
        },
      });
      if (a == 1) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };
  return (
    <>
      <NavBar secondOption={"View Post"} secondOptionURL={"/profile"} />
      <ToastContainer autoClose={1000} />
      <div className="card mx-auto mt-4 card-light" style={{ width: "48rem" }}>
        <div className="card-body">
          <div className="wrapper mt-3" ref={template1}>
            <div className="file-upload">
              <input
                type="file"
                id="userInput"
                onChange={(e) => {
                  if (!e.target.files) return;
                  setfile(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="wrapper mt-3" ref={template2}>
            <div className="file-upload">
              <img src={image} alt="" width="300" />
              <input
                type="file"
                id="userInput"
                onChange={(e) => {
                  if (!e.target.files) return;
                  setfile(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <h5 className="card-title text-center">Update Post</h5>
          <div className="row mt-2">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={caption}
                onChange={(e) => setcaption(e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={hashtags}
                onChange={(e) => sethashtags(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button onClick={editPost} className="btn btn-danger mb-3 w-50 mx-auto">
          Submit
        </button>
      </div>
    </>
  );
};

export default UpdatePost;
