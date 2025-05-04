import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import foodRunnerLogo from "../../assets/images/food-runner-logo.png";
import { useAuthDispatch, useAuthState } from "../../contexts/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMain, setActiveMain] = useState(null);
    const [submenuLeft, setSubmenuLeft] = useState(0);
    const menuRefs = useRef({});

    const { isLoggedIn } = useAuthState();
    const { logout } = useAuthDispatch();

    const menus = [
        { name: "HOME", path: "/home" },
        { name: "EXERCISE", path: "/exercise" },
        { name: "NUTRITION", path: "/nutrition" },
        { name: "MYPAGE", path: "/mypage" },
    ];

    const subMenus = {
        EXERCISE: [
            { name: "VIDEO", path: "/exercise/video" },
            { name: "HISTORY", path: "/exercise/history" },
            { name: "INBODY", path: "/exercise/inbody" },
        ],
        NUTRITION: [
            { name: "CREATE", path: "/nutrition/create" },
            { name: "DIET", path: "/nutrition/diet" },
            { name: "RECIPE", path: "/nutrition/recipe" },
            { name: "HISTORY", path: "/nutrition/history" },
        ],
    };

    const handleMainClick = (menu) => {
        navigate(menu.path);
        setActiveMain(null);
    };

    const handleMouseEnter = (menu) => {
        if (subMenus[menu.name]) {
            setActiveMain(menu.name);
            const rect = menuRefs.current[menu.name].getBoundingClientRect();
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
        if (path.startsWith("/exercise")) {
            return "EXERCISE";
        }
        if (path.startsWith("/nutrition")) {
            return "NUTRITION";
        }
        if (path.startsWith("/mypage")) {
            return "MYPAGE";
        }
        if (path.startsWith("/home")) {
            return "HOME";
        }
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
                            key={menu.name}
                            ref={(el) => (menuRefs.current[menu.name] = el)}
                            onMouseEnter={() => handleMouseEnter(menu)}
                            onClick={() => handleMainClick(menu)}
                            className={`navbar__menu ${currentMainMenu === menu.name ? "active" : ""}`}
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
                        style={{ transform: `translateX(${submenuLeft + 20}px)` }}
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