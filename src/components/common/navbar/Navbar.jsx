import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import foodRunnerLogo from "../../../assets/images/food-runner-logo.png";
import { useAuthDispatch, useAuthState } from "../../../contexts/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMain, setActiveMain] = useState(null);
    const [submenuLeft, setSubmenuLeft] = useState(0);
    const menuRefs = useRef({});

    const { isLoggedIn } = useAuthState();
    const { logout } = useAuthDispatch();

    const menus = [
        { id: "HOME", name: "홈", path: "/home" },
        { id: "EXERCISE", name: "운동", path: "/exercise" },
        { id: "NUTRITION", name: "영양", path: "/nutrition" },
        { id: "MYPAGE", name: "마이페이지", path: "/mypage" },
    ];

    const subMenus = {
        EXERCISE: [
            { name: "운동 영상", path: "/exercise/video" },
            { name: "운동 내역", path: "/exercise/history" },
            { name: "인바디", path: "/exercise/inbody" },
        ],
        NUTRITION: [
            { name: "영양 관리", path: "/nutrition/create" },
            { name: "추천 식단", path: "/nutrition/diet" },
            { name: "레시피", path: "/nutrition/recipe" },
            { name: "섭취 내역", path: "/nutrition/history" },
        ],
    };

    const handleMainClick = (menu) => {
        navigate(menu.path);
        setActiveMain(null);
    };

    const handleMouseEnter = (menu) => {
        if (subMenus[menu.id]) {
            setActiveMain(menu.id);
            const rect = menuRefs.current[menu.id].getBoundingClientRect();
            setSubmenuLeft(rect.left);
        } else {
            setActiveMain(null);
        }
    };

    const handleMouseLeave = () => {
        setActiveMain(null);
    };

    const getCurrentMainMenu = () => {
        const path = location.pathname;
        if (path.startsWith("/exercise")) return "EXERCISE";
        if (path.startsWith("/nutrition")) return "NUTRITION";
        if (path.startsWith("/mypage")) return "MYPAGE";
        if (path.startsWith("/home")) return "HOME";
        return null;
    };

    const currentMainMenu = getCurrentMainMenu();

    return (
        <div className="navbar" onMouseLeave={handleMouseLeave}>
            <div className="navbar__left">
                <div className="navbar__logo-section" onClick={() => navigate("/home")}>
                    <img src={foodRunnerLogo} alt="Logo" />
                    <div className="navbar__logo-text">Food Runner</div>
                </div>
                <div className="navbar__menu-section">
                    {menus.map((menu) => (
                        <a
                            key={menu.id}
                            ref={(el) => (menuRefs.current[menu.id] = el)}
                            onMouseEnter={() => handleMouseEnter(menu)}
                            onClick={() => handleMainClick(menu)}
                            className={`navbar__menu ${currentMainMenu === menu.id ? "active" : ""}`}
                        >
                            {menu.name}
                        </a>
                    ))}
                </div>
            </div>

            <div className="navbar__right">
                {isLoggedIn ? (
                    <a onClick={() => { logout(); navigate("/home"); }}>로그아웃</a>
                ) : (
                    <a onClick={() => navigate("/login")}>로그인</a>
                )}
            </div>

            {activeMain && subMenus[activeMain] && (
                <div className="navbar__submenu">
                    <div
                        className="navbar__submenu-wrapper"
                        style={{ transform: `translateX(${submenuLeft - 10}px)` }}
                    >
                        {subMenus[activeMain].map((sub) => (
                            <a
                                key={sub.name}
                                onClick={() => {
                                    navigate(sub.path);
                                    setActiveMain(null);
                                }}
                                className={`navbar__submenu-item ${location.pathname === sub.path ? "active" : ""}`}
                            >
                                {sub.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;