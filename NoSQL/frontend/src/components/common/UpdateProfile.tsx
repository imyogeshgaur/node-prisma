import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../assets/NavBar";
import { FaUserEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const param = useParams();
  const [firstName, setfirstName] = useState("");
  const [middleName, setmiddleName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [image, setimage] = useState("");
  const [file, setfile] = useState<any>("");
  const [user, setuser] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const template1 = useRef(null);
  const template2 = useRef(null);

  useEffect(() => {
    if (token === undefined) {
      navigate("/");
    }
    fetch("http://localhost:4000/user/" + param.id, {
      headers: {
        authorization:token as string
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setfirstName(data.firstName !== null ? data.firstName : "");
        setmiddleName(
          data.middleName !== null ? data.middleName : ""
        );
        setlastName(data.lastName !== null ? data.lastName : "");
        setphone(data.phone !== null ? data.phone : "");
        if (data.userImage !== null || "http://localhost:4000/static/user/undefined") {
          setimage(data.userImage);
          const val:any = template1.current;
          val.classList.add("hide");
        } else {
          const val:any = template2.current;
          val.classList.add("hide");
        }
      });
  }, [token, navigate, param.id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("userImage", file);
      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      await fetch("http://localhost:4000/user/update/" + param.id, {
        mode: "cors",
        method: "PUT",
        headers:{
          authorization:token as string
        },
        body: formData,
      });
      const a = toast.success("Details Updated !!!", {
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
          navigate(`/viewDetail/${param.id}`);
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
              <FaUserEdit color={"white"} size={85} className="mx-auto" />
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
          <h5 className="card-title text-center">User Profile</h5>
          <div className="row mt-4">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Middle Name"
                value={middleName}
                onChange={(e) => {
                  setmiddleName(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => {
                setphone(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className="btn btn-danger mb-3 w-50 mx-auto"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default UpdateProfile;
