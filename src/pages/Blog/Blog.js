
import "./Blog.css"
import Header from "../../components/Header/Header"
import eye from "../../images/eye.png"


function Blog() {
    return <div className="BlogWrapper"><Header />
        <h1 id="h">PLease give me a job as a React developer, so I can make you some awesome Apps</h1>
        <img className="eye" src={eye} alt="eye" />

    </div>
}

export default Blog