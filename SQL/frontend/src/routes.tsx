import { lazy } from "react";

const Authentication = lazy(() => import("./components/auth/Authentication"))
const Authorization = lazy(()=>import("./components/auth/Authorization"))
const Profile = lazy(()=>import("./components/common/Profile"))
const UpdateProfile = lazy(()=>import("./components/common/UpdateProfile"))
const AddPost = lazy(()=>import("./components/post/AddPost"))
const ViewPost = lazy(()=>import("./components/post/ViewPost"))
const UpdatePost = lazy(()=>import("./components/post/UpdatePost"))

const Routes = [

    //!Authentication Routes
    { path: "/", element: <Authentication /> },
    { path: "*", element: <Authorization /> },
    { path:"/unauthorized", element:<Authorization type={"Authorization"}/>},

    //? Common Routes
    { path:"/profile", element:<Profile />},
    { path:"/profile/:id", element:<UpdateProfile/>},

    //*Post Routes
    { path:"/addPost", element:<AddPost />},
    { path:"/post/:id", element:<ViewPost />},
    { path:"/updatePost/:id", element:<UpdatePost />}
    
]

export default Routes;