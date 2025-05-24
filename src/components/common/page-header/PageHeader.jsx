import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../utils";
import "./PageHeader.css";

const PageHeader = ({ text, image }) => {
    return (
        <div className="page-header">
            <div className="page-title">
                <FontAwesomeIcon icon={icons.faPipe} />
                <span>{text}</span>
                <FontAwesomeIcon icon={icons.faPipe} />
            </div>

            {image && (
                <div className="page-header__image-wrapper">
                    <img src={image} alt={"IMAGE"} />
                </div>
            )}
        </div>
    );
};

export default PageHeader;