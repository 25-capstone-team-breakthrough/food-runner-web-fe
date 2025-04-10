import { Outlet } from "react-router-dom";
import Navbar from "../components/common/NavBar";

const Nutrition = () => {
    return (
        <div className="nutrition">
            <Navbar />
            {/* 하위 페이지 렌더링 */}
            <Outlet />
        </div>
    );
};

export default Nutrition;