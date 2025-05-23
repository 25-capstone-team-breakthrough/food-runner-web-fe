import { Outlet } from "react-router-dom";
import Navbar from "../components/common/NavBar";
import FooterBar from "../components/common/footer-bar/FooterBar";

const Nutrition = () => {
    return (
        <div className="nutrition">
            <Navbar />
            {/* 하위 페이지 렌더링 */}
            <Outlet />
            <FooterBar />
        </div>
    );
};

export default Nutrition;