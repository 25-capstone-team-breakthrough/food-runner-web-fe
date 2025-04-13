import  { faChevronDown, faChevronLeft, faChevronRight, faCirclePlus, faCircleXmark, faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";

import sampleFood1 from "./assets/images/sample-food-1.png";
import sampleFood2 from "./assets/images/sample-food-2.png";
import sampleFood3 from "./assets/images/sample-food-3.png";
import sampleFood4 from "./assets/images/sample-food-4.png";

import sampleExercise1 from "./assets/images/sample-exercise-1.png";
import sampleExercise2 from "./assets/images/sample-exercise-2.png";
import sampleExercise3 from "./assets/images/sample-exercise-3.png";
import sampleExercise4 from "./assets/images/sample-exercise-4.png";
import sampleExercise5 from "./assets/images/sample-exercise-5.png";
import sampleExercise6 from "./assets/images/sample-exercise-6.png";

import ingredientCard1 from "./assets/images/ingredient-card-1.png";
import ingredientCard2 from "./assets/images/ingredient-card-2.png";
import ingredientCard3 from "./assets/images/ingredient-card-3.png";
import ingredientCard4 from "./assets/images/ingredient-card-4.png";
import ingredientCard5 from "./assets/images/ingredient-card-5.png";
import ingredientCard6 from "./assets/images/ingredient-card-6.png";

import sampleDiet1 from "./assets/images/sample-diet-1.png";
import sampleDiet2 from "./assets/images/sample-diet-2.png";

export const icons = {
    faChevronLeft,
    faChevronRight,
    faChevronDown,
    faCirclePlus,
    faTimes,
    faCircleXmark,
    faMagnifyingGlass
};

export const mockFoods = [
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

export const mockExerciseData = [
    {
        name: "A 스쿼트",
        part: "다리",
        kind: "근력",
        sets: [{
            set: 1,
            weight: 15,
            num: 10
        }, {
            set: 2,
            weight: 15,
            num: 10
        }, {
            set: 3,
            weight: 20,
            num: 10
        }],
        calorie: 200
    },
    {
        name: "B 스쿼트",
        part: "다리",
        kind: "근력",
        sets: [{
            set: 1,
            weight: 15,
            num: 10
        }, {
            set: 2,
            weight: 15,
            num: 10
        }, {
            set: 3,
            weight: 20,
            num: 10
        }],
        calorie: 200
    },
    {
        name: "C 스쿼트",
        part: "다리",
        kind: "근력",
        sets: [{
            set: 1,
            weight: 15,
            num: 10
        }, {
            set: 2,
            weight: 15,
            num: 10
        }, {
            set: 3,
            weight: 20,
            num: 10
        }],
        calorie: 200
    },
    {
        name: "D 스쿼트",
        part: "다리",
        kind: "근력",
        sets: [{
            set: 1,
            weight: 15,
            num: 10
        }, {
            set: 2,
            weight: 15,
            num: 10
        }, {
            set: 3,
            weight: 20,
            num: 10
        }],
        calorie: 200
    },
    {
        name: "E 스쿼트",
        part: "다리",
        kind: "근력",
        sets: [{
            set: 1,
            weight: 15,
            num: 10
        }, {
            set: 2,
            weight: 15,
            num: 10
        }, {
            set: 3,
            weight: 20,
            num: 10
        }],
        calorie: 200
    },
    {
        name: "F 스쿼트",
        part: "다리",
        kind: "근력",
        sets: [{
            set: 1,
            weight: 15,
            num: 10
        }, {
            set: 2,
            weight: 15,
            num: 10
        }, {
            set: 3,
            weight: 20,
            num: 10
        }],
        calorie: 200
    },
    {
        name: "G 스쿼트",
        part: "다리",
        kind: "근력",
        sets: [{
            set: 1,
            weight: 15,
            num: 10
        }, {
            set: 2,
            weight: 15,
            num: 10
        }, {
            set: 3,
            weight: 20,
            num: 10
        }],
        calorie: 200
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

// 식재료 목 데이터
export const mockIngredients = [
    { name: "가지", calories: 24, nutrients: "식이섬유 | 안토시아닌", image: ingredientCard1 },
    { name: "갈치", calories: 143, nutrients: "오메가3 | 비타민D", image: ingredientCard6 },
    { name: "가래떡", calories: 238, nutrients: "탄수화물 | 단백질", image: ingredientCard5 },
    { name: "감자", calories: 66, nutrients: "칼륨 | 비타민C", image: ingredientCard4 },
    { name: "가자미", calories: 93, nutrients: "단백질 | 비타민B12", image: ingredientCard3 },
    { name: "강낭콩", calories: 41, nutrients: "단백질 | 식이섬유", image: ingredientCard2 },
];

// 식단 추천 목 데이터
export const mockMeals = [
    {
        type: "아침",
        checked: false,
        foods: [
            {
                name: "현미밥",
                image: sampleDiet1,
                calories: 140,
                nutrients: "탄수화물 28g | 단백질 2.4g | 지방 0.2g"
            },
            {
                name: "계란",
                image: sampleDiet2,
                calories: 80,
                nutrients: "단백질 6g | 지방 5g"
            },
            {
                name: "김치",
                image: sampleDiet2,
                calories: 15,
                nutrients: "식이섬유 | 비타민 C"
            }
        ]
    },
    {
        type: "점심",
        checked: false,
        foods: [
            {
                name: "잡곡밥",
                image: sampleDiet1,
                calories: 150,
                nutrients: "탄수화물 30g | 단백질 3g"
            },
            {
                name: "닭가슴살",
                image: sampleDiet2,
                calories: 165,
                nutrients: "단백질 31g | 지방 3.6g"
            },
            {
                name: "샐러드",
                image: sampleDiet2,
                calories: 45,
                nutrients: "식이섬유 | 비타민 A"
            }
        ]
    },
    {
        type: "저녁",
        checked: false,
        foods: [
            {
                name: "고구마",
                image: sampleDiet1,
                calories: 120,
                nutrients: "탄수화물 27g | 식이섬유"
            },
            {
                name: "연어",
                image: sampleDiet2,
                calories: 208,
                nutrients: "단백질 20g | 오메가3"
            },
            {
                name: "시금치",
                image: sampleDiet2,
                calories: 25,
                nutrients: "철분 | 비타민 K"
            }
        ]
    }
];

// 식단 히스토리 목 데이터
export const mockDietData = [
    {
        date: "2025-04-11",
        calorie: 1950,
        meals: {
            아침: [
                { name: "현미밥", image: sampleDiet1, calories: 150, nutrients: "탄수화물 | 식이섬유", type: "식사" },
                { name: "계란후라이", image: sampleDiet2, calories: 90, nutrients: "단백질 | 지방", type: "식사" },
                { name: "종합비타민", image: sampleDiet2, calories: 0, nutrients: "비타민A | C", type: "영양제" }
            ],
            점심: [
                { name: "잡곡밥", image: sampleDiet1, calories: 180, nutrients: "탄수화물 | 단백질", type: "식사" },
                { name: "닭가슴살", image: sampleDiet2, calories: 165, nutrients: "단백질 | 저지방", type: "식사" },
                { name: "비타민D", image: sampleDiet2, calories: 0, nutrients: "칼슘 흡수 도움", type: "영양제" }
            ],
            저녁: [
                { name: "고구마", image: sampleDiet1, calories: 120, nutrients: "탄수화물 | 베타카로틴", type: "식사" },
                { name: "연어", image: sampleDiet2, calories: 200, nutrients: "오메가3 | 단백질", type: "식사" },
                { name: "유산균", image: sampleDiet2, calories: 0, nutrients: "장 건강", type: "영양제" }
            ]
        }
    },
    {
        date: "2025-04-12",
        calorie: 2120,
        meals: {
            아침: [
                { name: "토스트", image: sampleDiet1, calories: 170, nutrients: "탄수화물 | 지방", type: "식사" },
                { name: "우유", image: sampleDiet2, calories: 100, nutrients: "칼슘 | 단백질", type: "식사" }
            ],
            점심: [
                { name: "비빔밥", image: sampleDiet1, calories: 350, nutrients: "탄수화물 | 단백질 | 야채", type: "식사" },
                { name: "비타민C", image: sampleDiet2, calories: 0, nutrients: "항산화", type: "영양제" }
            ],
            저녁: [
                { name: "현미밥", image: sampleDiet1, calories: 150, nutrients: "복합 탄수화물", type: "식사" },
                { name: "닭볶음탕", image: sampleDiet2, calories: 280, nutrients: "단백질 | 지방", type: "식사" }
            ]
        }
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