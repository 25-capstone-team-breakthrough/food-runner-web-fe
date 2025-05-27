import { Outlet } from "react-router-dom";
import Navbar from "../components/common/navbar/Navbar";
import FooterBar from "../components/common/footer-bar/FooterBar";

const Exercise = () => {
    return (
        <div className="exercise">
            <Navbar />
            {/* 하위 페이지 렌더링 */}
            <Outlet />
            <FooterBar />
        </div>
    );
};

export default Exercise;