import "./Navbar.css";
import foodRunnerLogo from "../../assets/images/food-runner-logo.png";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="logo-section">
                    <img src={foodRunnerLogo} alt={"Logo"} />
                    <div className="text-wrapper">Food Runner</div>
                </div>
                <div className="menu-section">
                    <a>HOME</a>
                    <a>EXERCISE</a>
                    <a>NUTRITION</a>
                    <a>MYPAGE</a>
                </div>
            </div>
            <div className="navbar-right">
                <a>로그인</a>
            </div>
        </div>
    );
};

export default Navbar;