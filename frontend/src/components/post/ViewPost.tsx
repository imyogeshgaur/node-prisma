import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import NavBar from '../assets/NavBar';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ViewPost = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [post, setpost] = useState<any>("")
  const token = localStorage.getItem("jwt");

  useEffect(() => {
      if (token === null) {
          navigate("/");
      }

      fetch("http://localhost:4000/post/" + param.id,{
        headers:{
            authorization: token as string,
        }
      })
          .then(res => res.json())
          .then(post =>setpost(post))
          .catch(err => console.log(err))

  }, [token, navigate, param.id])

  const deletePost = async () => {
      try {
          await fetch(`http://localhost:4000/post/delete/${param.id}`, {
              mode: 'cors',
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
                  authorization:token as string
              },
          })
          const a = toast.success("Post Deleted Sucessfully !!!", {
              position: toast.POSITION.TOP_CENTER,
              closeOnClick: false,
              closeButton: false,
              style: {
                  color: "green",
                  backgroundColor: "rgb(183, 248, 183)"
              }
          })
          if (a == 1) {
              setTimeout(() => {
                  navigate("/profile")
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
                  backgroundColor: "rgb(255, 206, 206)"
              }
          })
          if (a == 1) {
              setTimeout(() => {
                  window.location.reload()
              }, 2000);
          }
      }
  }

  return (
      <>
          <NavBar />
          <ToastContainer autoClose={1000} />
          <div className="mt-3" style={{ display: "flex", justifyContent: "center" }}>
              <div className='card card-light col col-md-4 col-lg-4 col-sm-4 col-xs-12'>
                  <img src={post.postImage} className="card-img-top" alt="data" height="235px" />
                  <div className="card-body">
                      <p className="card-title">{post.hashtags}</p>
                      <p className="card-text">{post.caption}</p>
                      <button className="btn btn-danger me-3" onClick={deletePost}>Delete</button>
                      <Link className="btn btn-success me-3" to={`/updatePost/${param.id}`}>
                          Edit
                      </Link>
                      <Link to="/profile" className="btn btn-secondary">Back</Link>
                  </div>
              </div>
          </div>
      </>
  )
}

export default ViewPost