import FooterBar from "../components/common/footer-bar/FooterBar";
import Navbar from "../components/common/navbar/Navbar";
import HomeContent from "../components/home/home-content/HomeContent"

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <HomeContent />
            <FooterBar />
        </div>
    );
};

export default Home;