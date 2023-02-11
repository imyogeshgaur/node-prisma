import { Link, useNavigate } from "react-router-dom";
import { MdAddBox } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const NavBar = (props: any) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };
  if (props.detail === "hidden") {
    return (
      <>
        <nav className={"navbar navbar-light navbar-expand-lg bg-danger"}>
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <p className="navbar-brand mx-auto">We Connect</p>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
  return (
    <>
      <nav className={"navbar navbar-light navbar-expand-lg bg-danger"}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-lg-0">
              <p className="navbar-brand mx-auto text-white">
                {props.name === undefined
                  ? ""
                  : `Welcome ${props.name} To We Connect`}
              </p>
            </ul>
          </div>
        </div>
        <Link to="/addPost" style={{ display: props.showPost }}>
          <MdAddBox color={"white"} size={37} className="me-4" />
        </Link>
        <div className="dropdown" style={{ display: props.showUser }}>
          <FaUser
            color={"white"}
            size={35}
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul
            className="dropdown-menu card-light"
            style={{ marginLeft: "-5rem", marginTop: "0.6rem" }}
          >
            <Link to={props.secondOptionURL} style={{ textDecoration: "none" }}>
              <li>
                <button className="dropdown-item ">{props.secondOption}</button>
              </li>
            </Link>
            <li>
              <button className="dropdown-item" onClick={logoutUser}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
