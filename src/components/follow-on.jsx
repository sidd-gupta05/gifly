import { FaInstagramSquare, FaLinkedin,FaGithub} from "react-icons/fa";

const FollowOn = () => {
    return(
        <div className="faded-text pt-2">
            <span>Follw Me on:</span>
            <div className="flex gap-4 pt-3">
                <a href="https://github.com/sidd-gupta05">
                <FaGithub size={20}/>
                </a>
                <a href="https://www.linkedin.com/in/siddharth-gupta-08a56528b/">
                <FaLinkedin size={20} />
                </a>
                <a href="https://www.instagram.com/sidd_gupta_45/">
                <FaInstagramSquare size={20}/>
                </a>
            </div>
        </div>
    )
}

export default FollowOn