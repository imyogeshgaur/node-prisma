import { useNavigate } from "react-router";

const Authorization = (props: any) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  const loginAgain = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  const redirectionOfNotFound = () => {
    if (token === null) {
      navigate("/");
    } else {
      navigate("/profile");
    }
  };

  if (props.type === "Authorization") {
    return (
      <>
        <div className="card mx-auto mt-1">
          <div className="card-body">
            <h1 className="card-title mb-4 text-center">
              Unauthorized Access !!!
            </h1>
            <div
              style={{
                width: "100%",
                height: 0,
                paddingBottom: "56%",
                position: "relative",
              }}
            >
              <iframe
                src="https://giphy.com/embed/L7zmmuaEo50MCt1Y7o"
                width="100%"
                height="100%"
                style={{ position: "absolute" }}
                className="giphy-embed"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <button
            className="btn btn-danger mx-auto w-50 mb-3"
            onClick={loginAgain}
          >
            Login Again
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <section className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 ">
                <div className="col-sm-10 col-sm-offset-1  text-center">
                  <div className="four_zero_four_bg"></div>
                  <h1>Page Not Found !!!</h1>
                  <div className="contant_box_404">
                    <button
                      className="link_404"
                      onClick={redirectionOfNotFound}
                    >
                      Go To Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Authorization;
