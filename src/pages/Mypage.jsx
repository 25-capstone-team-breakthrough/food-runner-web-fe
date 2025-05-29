import FooterBar from "../components/common/footer-bar/FooterBar";
import Navbar from "../components/common/navbar/Navbar";
import MypageContent from "../components/mypage/MypageContent";

const Mypage = () => {
    return (
        <div className="mypage">
            <Navbar />
            <MypageContent />
            <FooterBar />
        </div>
    );
};

export default Mypage;