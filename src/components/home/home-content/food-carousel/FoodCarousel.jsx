import "./FoodCarousel.css";
import sampleFood1 from "../../../../assets/images/sample-food-1.png";
import sampleFood2 from "../../../../assets/images/sample-food-2.png";
import sampleFood3 from "../../../../assets/images/sample-food-3.png";
import sampleFood4 from "../../../../assets/images/sample-food-4.png";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../utils";

const FoodCarousel = () => {
    const sampleFood = [
        { name: "food1", img: sampleFood1 },
        { name: "food2", img: sampleFood2 },
        { name: "food3", img: sampleFood3 },
        { name: "food4", img: sampleFood4 },
        { name: "food5", img: sampleFood1 },
        { name: "food6", img: sampleFood2 },
        { name: "food7", img: sampleFood3 },
        { name: "food8", img: sampleFood4 },
        { name: "food9", img: sampleFood1 }
    ];

    const totalItems = sampleFood.length;
    const itemWidth = 16; // rem 단위
    const transitionDuration = 300; // ms
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
        ...sampleFood.slice(-visibleItems),
        ...sampleFood,
        ...sampleFood.slice(0, visibleItems)
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