import { Link } from 'react-router-dom'
const PostCard = (props:any) => {
    return (
        <>
            <div className="col col-md-4 col-lg-4 col-sm-4 col-xs-12" key={props.id}>
                <div className={"card card-light mt-4"} key={props.id}>
                    <Link to={`/post/${props.id}`} key={props.id}>
                        <img src={props.image} alt="data" className='card-img-top' height="235px" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PostCard