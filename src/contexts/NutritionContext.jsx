import React, { useState, useContext } from "react";
import axios from "axios";
import { useLoadingManager } from "../hooks/useLoadingManager";

export const NutritionStateContext = React.createContext();
export const NutritionDispatchContext = React.createContext();

export const NutritionProvider = ({ children }) => {
    const [mealList, setMealList] = useState([]);
    const [supplementList, setSupplementList] = useState([]);
    const [ingredientList, setIngredientList] = useState([]);

    const [favoriteMeals, setFavoriteMeals] = useState([]);
    const [favoriteSupplements, setFavoriteSupplements] = useState([]);
    const [preferredIngredients, setPreferredIngredients] = useState([]);
    const [recommendedIngredients, setRecommendedIngredients] = useState([]);

    const [mealLogs, setMealLogs] = useState({ imageMealLogs: [], searchMealLogs: [] });
    const [supplementLogs, setSupplementLogs] = useState([]);

    const [nutritionLogs, setNutritionLogs] = useState([]);
    const [recommendedNutrients, setRecommendedNutrients] = useState([]);

    const [recipeList, setRecipeList] = useState([]);

    const [recommendedMeals, setRecommendedMeals] = useState([]);

    const { loading, startLoading, endLoading, } = useLoadingManager([
        "meals", "supplements", "ingredients",
        "favoriteMeals", "favoriteSupplements",
        "preferredIngredients", "recommendedIngredients",
        "mealLogs", "supplementLogs", "nutritionLogs",
        "recommendedNutrients", "recipes", "recommendedMeals"
    ]);

    // 음식 전체 불러오기
    const fetchMeals = async (token) => {
        startLoading("meals");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/food/data/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMealList(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("식사 데이터 로드 실패:", e);
            setMealList([]);
        } finally {
            endLoading("meals");
        }
    };

    // 영양제 전체 불러오기
    const fetchSupplements = async (token) => {
        startLoading("supplements");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/sup/data/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            setSupplementList(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("영양제 데이터 로드 실패:", e);
            setSupplementList([]);
        } finally {
            endLoading("supplements");
        }
    };

    // 식재료 전체 불러오기
    const fetchIngredients = async (token) => {
        startLoading("ingredients");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/ingredient/data/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIngredientList(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("식재료 데이터 로드 실패:", e);
            setIngredientList([]);
        } finally {
            endLoading("ingredients");
        }
    };

    // 즐겨찾기 - 식사 불러오기
    const fetchFavoriteMeals = async (token) => {
        startLoading("favoriteMeals");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/food/pref/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavoriteMeals(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("즐겨찾기 식사 로드 실패:", e);
            setFavoriteMeals([]);
        } finally {
            endLoading("favoriteMeals");
        }
    };

    // 즐겨찾기 - 영양제 불러오기
    const fetchFavoriteSupplements = async (token) => {
        startLoading("favoriteSupplements");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/sup/pref/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavoriteSupplements(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("즐겨찾기 영양제 로드 실패:", e);
            setFavoriteSupplements([]);
        } finally {
            endLoading("favoriteSupplements");
        }
    };

    // 즐겨찾기 등록/삭제 - 식사
    const toggleFavoriteMeal = async (token, id) => {
        try {
            const existing = favoriteMeals.find(f => f?.food?.foodId === id);
            if (existing) {
                // 이미 등록되어 있는 경우 삭제
                await axios.post(
                    `http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/food/pref/delete?pref_id=${existing.id}`,
                    null,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } else {
                // 없으면 등록
                await axios.post(
                    `http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/food/pref/save?food_id=${id}`,
                    null,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }

            await fetchFavoriteMeals(token); // 갱신
        } catch (e) {
            console.error("식사 즐겨찾기 토글 실패:", e);
        }
    };

    // 즐겨찾기 등록/삭제 - 영양제
    const toggleFavoriteSupplement = async (token, id) => {
        try {
            const existing = favoriteSupplements.find(f => f?.supplementData?.supplementId === id);
            if (existing) {
                await axios.post(
                    `http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/sup/pref/delete?pref_id=${existing.presupplementId}`,
                    null,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            } else {
                await axios.post(
                    `http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/sup/pref/save?sup_id=${id}`,
                    null,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
            }

            await fetchFavoriteSupplements(token);
        } catch (e) {
            console.error("영양제 즐겨찾기 토글 실패:", e);
        }
    };

    // 섭취 등록 - 식사
    const registerMeals = async (token, meals, date) => {
        for (const meal of meals) {
        try {
            await axios.post(
            "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/meal/log/save",
            {
                type: "search",
                foodId: meal.id,
                mealImage: "",
                dateTime: date,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
        } catch (e) {
            console.error("식사 저장 실패:", e);
        }
        }
    };

    // 섭취 등록 - 영양제
    const registerSupplements = async (token, supplements, date) => {
        for (const sup of supplements) {
        try {
            await axios.post(
            "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/sup/log/save",
            {
                id: sup.id,
                dateTime: date,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
        } catch (e) {
            console.error("영양제 저장 실패:", e);
        }
        }
    };

    // 선호 식재료 불러오기
    const fetchPreferredIngredients = async (token) => {
        startLoading("preferredIngredients");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/ingredient/pref/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPreferredIngredients(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("선호 식재료 로드 실패:", e);
            setPreferredIngredients([]);
        } finally {
            endLoading("preferredIngredients");
        }
    };
    
    // 선호 식재료 저장
    const savePreferredIngredient = async (token, id) => {
        try {
            console.log(`token: ${token}, id: ${id}`);
        await axios.post(`http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/ingredient/pref/save?id=${id}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
        await fetchPreferredIngredients(token);
        } catch (e) {
            console.error("선호 식재료 등록 실패:", e);
        }
    };

    // 선호 식재료 삭제
    const deletePreferredIngredient = async (token, prefId) => {
        console.log("[삭제 요청] prefId:", prefId);
        try {
        const res = await axios.post(`http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/ingredient/pref/delete?pref_id=${prefId}`, null, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("[삭제 응답]", res.data);
        await fetchPreferredIngredients(token);
        console.log("[갱신 완료]");
        } catch (e) {
            console.error("선호 식재료 삭제 실패:", e);
        }
    };

    // 추천 식재료
    const fetchRecommendedIngredients = async (token) => {
        startLoading("recommendedIngredients");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/ingredient/rec/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = res.data || [];
            setRecommendedIngredients(data.map((r) => r.ingredientData));
        } catch (e) {
            console.error("추천 식재료 로드 실패:", e);
            setRecommendedIngredients([]);
        } finally {
            endLoading("recommendedIngredients");
        }
    };

    // 식사 기록 조회
    const fetchMealLogs = async (token) => {
        startLoading("mealLogs");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/meal/log/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            setMealLogs(res.data);
        } catch (e) {
            console.error("식사 기록 조회 실패:", e);
            setMealLogs({ imageMealLogs: [], searchMealLogs: [] });
        } finally {
            endLoading("mealLogs");
        }
    };

    // 식사 기록 삭제
    const deleteMealLog = async (token, logId) => {
        try {
            await axios.post(
                `http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/meal/log/delete?log_id=${logId}`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("식사 기록 삭제 성공:", logId);
            await fetchMealLogs(token); // 삭제 후 갱신
        } catch (e) {
            console.error("식사 기록 삭제 실패:", e);
        }
    };

    // 영양제 기록 조회
    const fetchSupplementLogs = async (token) => {
        startLoading("supplementLogs");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/sup/log/load", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(res.data);
            setSupplementLogs(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("영양제 기록 조회 실패:", e);
            setSupplementLogs([]);
        } finally {
            endLoading("supplementLogs");
        }
    };

    // 영양제 기록 삭제
    const deleteSupplementLog = async (token, logId) => {
        try {
            await axios.post(`http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/sup/log/delete?log_id=${logId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchSupplementLogs(token);
        } catch (e) {
            console.error("영양제 기록 삭제 실패:", e);
        }
    };

    // 섭취한 영양소 로그
    const fetchNutritionLogs = async (token) => {
        startLoading("nutritionLogs");
        try {
            const res = await axios.get(
                "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/nutrition/log/load",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("섭취 영양소");
            console.log(res.data);
            setNutritionLogs(res.data || []);
        } catch (e) {
            console.error("영양소 기록 조회 실패:", e);
            setNutritionLogs([]);
        } finally {
            endLoading("nutritionLogs");
        }
    };

    // 추천 영양소 정보
    const fetchRecommendedNutrients = async (token) => {
        startLoading("recommendedNutrients");
        try {
            const res = await axios.get(
                "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/nutrition/rec/load",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("추천 영양소");
            console.log(res.data);
            setRecommendedNutrients(res.data || []);
        } catch (e) {
            console.error("추천 영양소 정보 조회 실패:", e);
            setRecommendedNutrients([]);
        } finally {
            endLoading("recommendedNutrients");
        }
    };
    
    // 레시피 불러오기
    const fetchRecipes = async () => {
        startLoading("recipes");
        try {
            const res = await axios.get("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/recipe/data/load");
            setRecipeList(Array.isArray(res.data) ? res.data : []);
        } catch (e) {
            console.error("레시피 데이터 로드 실패:", e);
            setRecipeList([]);
        } finally {
            endLoading("recipes");
        }
    };

    // 추천 식단 불러오기
    const fetchRecommendedMeals = async (token) => {
        startLoading("recommendedMeals");
        try {
            let res = await axios.get(
                "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/recipe/rec/load",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("추천 식단 load")
            let data = res.data;    

            // 추천 식단이 없을 경우 생성
            if (!Array.isArray(data) || data.length === 0) {
                console.log("추천 식단 set");
                await axios.post(
                    "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/recipe/rec/set",
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
    
                // 다시 fetch
                res = await axios.get(
                    "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/recipe/rec/load",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
    
                data = res.data;
            }
        
            const weeklyData = Array.from({ length: 7 }, () => ({
                meals: [
                    { type: "아침", foods: [], checked: false },
                    { type: "점심", foods: [], checked: false },
                    { type: "저녁", foods: [], checked: false },
                ],
            }));
    
            const dayMap = { mon: 0, tue: 1, wed: 2, thu: 3, fri: 4, sat: 5, sun: 6 };
            const mealMap = { breakfast: 0, lunch: 1, dinner: 2 };
    
            data.forEach((item) => {
                const i = dayMap[item.date];
                const j = mealMap[item.dietType];
                if (i !== undefined && j !== undefined) {
                    weeklyData[i].meals[j].foods.push(item.recipeData);
                }
            });
    
            setRecommendedMeals(weeklyData);
        } catch (e) {
            console.error("추천 식단 로드 실패:", e);
            setRecommendedMeals([]);
        } finally {
            endLoading("recommendedMeals");
        }
    };    

    // 추천 식단 재생성
    const regenerateRecommendedMeals = async (token) => {
        startLoading("recommendedMeals");
        try {
            await axios.post(
                "http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/diet/recipe/rec/set",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            await fetchRecommendedMeals(token);
        } catch (e) {
            console.error("추천 식단 재생성 실패:", e);
        } finally {
            endLoading("recommendedMeals");
        }
    };    

    return (
        <NutritionStateContext.Provider
            value={{
                mealList,
                supplementList,
                ingredientList,
                favoriteMeals,
                favoriteSupplements,
                preferredIngredients,
                recommendedIngredients,
                mealLogs,
                supplementLogs,
                nutritionLogs,
                recommendedNutrients,
                recipeList,
                recommendedMeals,
                loading
            }}
        >
            <NutritionDispatchContext.Provider
                value={{
                    fetchMeals,
                    fetchSupplements,
                    fetchIngredients,
                    fetchFavoriteMeals,
                    fetchFavoriteSupplements,
                    toggleFavoriteMeal,
                    toggleFavoriteSupplement,
                    registerMeals,
                    registerSupplements,
                    fetchPreferredIngredients,
                    savePreferredIngredient,
                    deletePreferredIngredient,
                    fetchRecommendedIngredients,
                    fetchMealLogs,
                    deleteMealLog,
                    fetchSupplementLogs,
                    deleteSupplementLog,
                    fetchNutritionLogs,
                    fetchRecommendedNutrients,
                    fetchRecipes,
                    fetchRecommendedMeals,
                    regenerateRecommendedMeals
                }}
            >
                {children}
            </NutritionDispatchContext.Provider>
        </NutritionStateContext.Provider>
    );
};

export const useNutritionState = () => useContext(NutritionStateContext);
export const useNutritionDispatch = () => useContext(NutritionDispatchContext);