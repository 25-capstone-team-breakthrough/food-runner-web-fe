import { faChevronDown, faChevronUp, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faBoxOpen, faChevronLeft, faChevronRight, faCircleCheck, faCirclePlus, faCircleXmark, faDumbbell, faMagnifyingGlass, faPills, faPlateUtensils, faPlus, faStar } from "@fortawesome/pro-light-svg-icons";
import { faPipe } from "@fortawesome/sharp-regular-svg-icons";

import sampleExercise1 from "./assets/images/sample-exercise-1.png";
import sampleExercise2 from "./assets/images/sample-exercise-2.png";
import sampleExercise3 from "./assets/images/sample-exercise-3.png";
import sampleExercise4 from "./assets/images/sample-exercise-4.png";
import sampleExercise5 from "./assets/images/sample-exercise-5.png";
import sampleExercise6 from "./assets/images/sample-exercise-6.png";

export const icons = {
    faChevronLeft,
    faChevronRight,
    faChevronUp,
    faChevronDown,
    faCircleXmark,
    faMagnifyingGlass,
    faPlus,
    faMinus,
    faArrowLeft,
    faCirclePlus,
    faCircleXmark,
    faPipe,
    faCircleCheck,
    faPlateUtensils,
    faDumbbell,
    faPills,
    faStar,
    faBoxOpen
};

export const mockLinkImgs1 = [
    {
        img: sampleExercise1,
        label: "숄더프레스"
    },
    {
        img: sampleExercise2,
        label: "벤치프레스"
    },
    {
        img: sampleExercise3,
        label: "벤치프레스"
    }
];

export const mockLinkImgs2 = [
    {
        img: sampleExercise4,
        label: "숄더프레스"
    },
    {
        img: sampleExercise5,
        label: "벤치프레스"
    },
    {
        img: sampleExercise6,
        label: "벤치프레스"
    }
];

export const mockRecommendVideos = [
        {
            img: sampleExercise1,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise2,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise3,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        }
];

export const mockAllVideos = [
        {
            img: sampleExercise1,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise2,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise3,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise4,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise5,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise6,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        }
];

export const getWeekDates = (baseDate) => {
    const start = new Date(baseDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
    });
};

export const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

export const nutrientNameMap = {
    calories: "열량",
    sodium: "나트륨",
    carbohydrate: "탄수화물",
    sugar: "당류",
    fat: "지방",
    transFat: "트랜스지방",
    saturatedFat: "포화지방",
    cholesterol: "콜레스테롤",
    protein: "단백질",
    dietaryFiber: "식이섬유",
    vitaminA: "비타민 A",
    vitaminB1: "비타민 B1",
    vitaminC: "비타민 C",
    vitaminD: "비타민 D",
    vitaminE: "비타민 E",
    calcium: "칼슘",
    iron: "철분",
    magnesium: "마그네슘",
    potassium: "칼륨",
    zinc: "아연",
    omega3: "오메가3",
    lactium: "락티움",
    larginine: "아르기닌"
};

export const nutrientUnitMap = {
    calories: "kcal",
    sodium: "mg",
    carbohydrate: "g",
    sugar: "g",
    fat: "g",
    transFat: "g",
    saturatedFat: "g",
    cholesterol: "mg",
    protein: "g",
    dietaryFiber: "g",
    vitaminA: "µg",
    vitaminB1: "mg",
    vitaminC: "mg",
    vitaminD: "µg",
    vitaminE: "mg",
    calcium: "mg",
    iron: "mg",
    magnesium: "mg",
    potassium: "mg",
    zinc: "mg",
    omega3: "mg",
    lactium: "mg",
    larginine: "mg"
};

