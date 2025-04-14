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

import sampleRecipe1 from "./assets/images/sample-recipe-1.png";
import sampleRecipe2 from "./assets/images/sample-recipe-2.png";
import sampleRecipe3 from "./assets/images/sample-recipe-3.png";


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
        date: "2025-04-14",
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
        date: "2025-04-15",
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

const baseRecipes = [
    {
        id: 1,
        name: "아보카도 닭가슴살 샐러드",
        image: sampleRecipe1,
        calories: 400,
        ingredients: [
            "닭가슴살 100g",
            "고구마 1개",
            "브로콜리 1줌",
            "마늘 2쪽",
            "간장 1작은술",
            "올리브오일 1큰술",
            "소금",
            "후추 약간"
        ],
        instructions: [
            "닭가슴살을 삶거나 에어프라이어로 구운 뒤 먹기 좋게 썬다.",
            "고구마는 찌거나 굽고, 브로콜리는 데친다.",
            "마늘은 슬라이스하여 볶아준다.",
            "모든 재료를 그릇에 담고 간장, 올리브오일, 소금, 후추를 넣어 섞는다."
        ],
        nutrients: {
            calories: "350~450 kcal",
            protein: "35~40g",
            fat: "20~25g",
            carbs: "10~15g",
            fiber: "6~8g",
            salt: "2~4g",
            sodium: "300~500mg",
        },
    },
    {
        id: 2,
        name: "연어 샐러드",
        image: sampleRecipe2,
        calories: 380,
        ingredients: [
            "연어 100g",
            "샐러드 채소 1줌",
            "삶은 계란 1개",
            "방울토마토 4~5개",
            "옥수수 약간",
            "발사믹 드레싱"
        ],
        instructions: [
            "연어를 구워 식혀준다.",
            "샐러드 채소와 방울토마토를 씻어 준비한다.",
            "삶은 계란은 반으로 자른다.",
            "모든 재료를 담고 드레싱을 뿌려 완성한다."
        ],
        nutrients: {
            calories: "330~430 kcal",
            protein: "30~35g",
            fat: "18~22g",
            carbs: "12~18g",
            fiber: "5~7g",
            salt: "1.5~3g",
            sodium: "250~400mg",
        },
    },
    {
        id: 3,
        name: "연어 아보카도 샌드위치",
        image: sampleRecipe3,
        calories: 450,
        ingredients: [
            "통밀빵 2장",
            "아보카도 1/2개",
            "훈제 연어 50g",
            "크림치즈 1큰술",
            "양상추 약간",
            "방울토마토 2개"
        ],
        instructions: [
            "빵에 크림치즈를 바른다.",
            "아보카도는 슬라이스하고, 토마토는 얇게 썬다.",
            "빵 위에 양상추, 연어, 아보카도, 토마토 순으로 올린다.",
            "다른 빵으로 덮고 반으로 자른다."
        ],
        nutrients: {
            calories: "400~500 kcal",
            protein: "25~30g",
            fat: "22~27g",
            carbs: "30~35g",
            fiber: "4~6g",
            salt: "2~3g",
            sodium: "280~450mg",
        }
    }
];

const dummyRecipes = Array.from({ length: 200 }, (_, i) => ({
    id: i + 4,
    name: `레시피 ${i + 4}`,
    image: [sampleRecipe1, sampleRecipe2, sampleRecipe3][i % 3],
    calories: 300 + (i * 10)
}));

export const mockRecipes = [...baseRecipes, ...dummyRecipes];

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