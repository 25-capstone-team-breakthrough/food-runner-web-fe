import { Outlet } from "react-router-dom";
import Navbar from "../components/common/NavBar";

const Exercise = () => {
    return (
        <div className="exercise">
            <Navbar />
            {/* 하위 페이지 렌더링 */}
            <Outlet />
        </div>
    );
};

export default Exercise;