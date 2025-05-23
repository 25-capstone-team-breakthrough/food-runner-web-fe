import { FadeLoader } from "react-spinners";
import "./Loading.css";

const Loading = ({ size = "full", color = "#ccc" }) => {
    return (
        <div className={`loading loading--${size}`}>
            <FadeLoader
                height={12}
                width={3}
                margin={-3}
                radius={1}
                color={color}
                loading={true}
            />
        </div>
    );
};

export default Loading;