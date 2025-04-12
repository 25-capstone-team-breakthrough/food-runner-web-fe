import "./FoodCarousel.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons, mockFoods } from "../../../../utils";

const FoodCarousel = () => {
    const totalItems = mockFoods.length;
    const itemWidth = 16;
    const transitionDuration = 300;
    const wrapperRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState(1);

    // 한 번에 보이는 개수를 동적으로 계산
    useEffect(() => {
        const updateVisibleItems = () => {
            if (wrapperRef.current) {
                const wrapperWidth = wrapperRef.current.offsetWidth;
                setVisibleItems(Math.max(1, Math.floor(wrapperWidth / (itemWidth * 16))));
            }
        };
        updateVisibleItems();
        window.addEventListener("resize", updateVisibleItems);
        return () => window.removeEventListener("resize", updateVisibleItems);
    }, []);

    // 앞뒤로 visibleItems 개수만큼 추가하여 무한 루프 구현
    const extendedList = [
        ...mockFoods.slice(-visibleItems),
        ...mockFoods,
        ...mockFoods.slice(0, visibleItems)
    ];

    const [index, setIndex] = useState(visibleItems);
    const [isTransitioning, setIsTransitioning] = useState(true);

    const handleNext = () => {
        setIsTransitioning(true);
        setIndex((prev) => prev + 1);
    };

    const handlePrev = () => {
        setIsTransitioning(true);
        setIndex((prev) => prev - 1);
    };

    useEffect(() => {
        if (index >= totalItems + visibleItems) {
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(visibleItems);
            }, transitionDuration);
        } else if (index < visibleItems) {
            setTimeout(() => {
                setIsTransitioning(false);
                setIndex(totalItems + visibleItems - 1);
            }, transitionDuration);
        }
    }, [index, totalItems, visibleItems]);

    return (
        <div className="food-carousel">
            <div className="food-carousel-title">
                <div className="text-wrapper">
                    내가 섭취한 <span>음식을 한번에!</span>
                </div>
            </div>
            <div className="food-carousel-list-wrapper" ref={wrapperRef}>
                <div
                    className="food-carousel-list"
                    style={{
                        transform: `translateX(-${index * itemWidth}rem)`,
                        transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : "none"
                    }}
                >
                    {extendedList.map((it, idx) => (
                        <img key={idx} src={it.img} alt={it.name} style={{ width: `${itemWidth}rem` }} />
                    ))}
                </div>
            </div>
            <div className="food-carousel-controls">
                <div className="food-carousel-slider">
                    <div 
                        className="food-carousel-slider-bar"
                        style={{ left: `${((index - visibleItems) / totalItems) * 75}%` }}
                    ></div>
                </div>
                <div className="food-carousel-indicator">
                    {((index - visibleItems + totalItems) % totalItems) + 1} / {totalItems}
                </div>
                <div className="carousel-btn-wrapper">
                    <FontAwesomeIcon
                        icon={icons.faChevronLeft}
                        onClick={handlePrev}
                        style={{ cursor: "pointer", fontSize: "0.75rem", margin: "0.5rem" }}
                    />
                    <FontAwesomeIcon
                        icon={icons.faChevronRight}
                        onClick={handleNext}
                        style={{ cursor: "pointer", fontSize: "0.75rem", margin: "0.5rem" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FoodCarousel;