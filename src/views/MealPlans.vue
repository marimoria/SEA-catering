<template>
    <main class="meal_plan">
        <div class="background"></div>
        <navBar />
        <div class="meal_plan_panel">
            <img v-if="viewport.w >= 1024" src="/images/fork.svg" alt="" class="fork" />
            <div class="meal_plan_panel--meal_plan_hero">
                <div id="banner_diet" class="meal_plan_hero--banner"></div>
                <img
                    data-speedx="0.03"
                    data-speedy="0.03"
                    src="/images/veggies_hero.webp"
                    alt=""
                    class="parallax meal_plan_hero--image"
                />
            </div>
            <div class="meal_plan_panel--meal_plan_info">
                <p class="meal_plan_info--title">
                    <span class="highlight_basil">Diet</span> Meal Plan
                </p>
                <p id="desc_olive" class="meal_plan_info--desc">
                    Nourish your body with low-calorie, high-nutrient meals to support weight
                    management. Each dish is balanced for portion control without sacrificing
                    flavor.
                </p>
                <router-link to="/subscription">
                    <p id="price_diet" class="button meal_plan_info--price">
                        <span class="bigger_size highlight_basil">Rp30.000,00</span> /meal
                    </p>
                </router-link>
                <mealTypeNav
                    class="meal_nav"
                    :tabs="['Breakfast', 'Lunch', 'Dinner']"
                    :button-color="'#4f9447'"
                    :active-color="'#8ebe3f'"
                >
                    <template #Breakfast>
                        <div class="meals_recipe_wrap">
                            <div id="recipe_diet" class="meals_recipe_wrap--recipe">
                                <img src="/images/fruits_hero.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Oat Berry Bowl</p>
                                <p class="recipe--desc">
                                    Rolled oats soaked in almond milk, topped with mixed berries and
                                    chia seeds for a light, fiber-rich start.
                                </p>
                            </div>
                            <div id="recipe_diet" class="meals_recipe_wrap--recipe">
                                <img src="/images/egg_wrap.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Egg White Wrap</p>
                                <p class="recipe--desc">
                                    Fluffy egg whites wrapped with sautéed spinach, tomato, and a
                                    sprinkle of low-fat cheese in a whole-wheat tortilla.
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #Lunch>
                        <div class="meals_recipe_wrap">
                            <div id="recipe_diet" class="meals_recipe_wrap--recipe">
                                <img src="/images/pad_thai.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Pad Thai</p>
                                <p class="recipe--desc">
                                    Stir-fried rice noodles with juicy shrimp, bean sprouts,
                                    scrambled egg, and crushed peanuts in a sweet-savory tamarind
                                    sauce
                                </p>
                            </div>
                            <div id="recipe_diet" class="meals_recipe_wrap--recipe">
                                <img src="/images/quinoa_salad.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Quinoa Salad</p>
                                <p class="recipe--desc">
                                    Lean grilled chicken tossed with quinoa, cucumber, mint, and
                                    lemon vinaigrette for a refreshing protein-packed lunch.
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #Dinner>
                        <div class="meals_recipe_wrap">
                            <div id="recipe_diet" class="meals_recipe_wrap--recipe">
                                <img
                                    src="/images/grilled_salmon.webp"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Grilled Salmon</p>
                                <p class="recipe--desc">
                                    Herb-seasoned salmon fillet served with roasted bell peppers,
                                    broccoli, and a squeeze of lemon.
                                </p>
                            </div>
                            <div id="recipe_diet" class="meals_recipe_wrap--recipe">
                                <img
                                    src="/images/stuffed_peppers.webp"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Baked Peppers</p>
                                <p class="recipe--desc">
                                    Baked bell peppers filled with cauliflower rice, mushrooms, and
                                    black beans, very customizable!
                                </p>
                            </div>
                        </div>
                    </template>
                </mealTypeNav>

                <p
                    @click="visibleDiet = true"
                    id="details_diet"
                    class="button meal_plan_info--details"
                >
                    See more <span class="highlight_basil">details</span>
                </p>

                <mealPlanPopup
                    :visible="visibleDiet"
                    @close="visibleDiet = false"
                    :name="nameDiet"
                    :desc="descDiet"
                    :benefits="benefitsDiet"
                    :nutrition="nutritionDiet"
                    :darkColor="'#2e5a32'"
                    :medColor="'#4f9447'"
                    :lightColor="'#8ebe3f'"
                />
            </div>
        </div>

        <div class="meal_plan_panel">
            <img v-if="viewport.w >= 1024" src="/images/spoon.svg" alt="" class="spoon" />
            <div class="meal_plan_panel--meal_plan_hero">
                <div class="meal_plan_hero--banner"></div>
                <img
                    data-speedx="0.03"
                    data-speedy="0.03"
                    src="/images/protein_hero.webp"
                    alt=""
                    class="parallax meal_plan_hero--image"
                />
            </div>
            <div class="meal_plan_panel--meal_plan_info">
                <p class="meal_plan_info--title">
                    <span class="highlight_paprika">Protein</span> Meal Plan
                </p>
                <p id="desc_red" class="meal_plan_info--desc">
                    Power up with protein-packed meals made for strength, recovery, and fullness.
                    Perfect for active lifestyles to keep you energized all day.
                </p>
                <router-link to="/subscription">
                    <p class="button meal_plan_info--price">
                        <span class="bigger_size highlight_paprika">Rp40.000,00</span> /meal
                    </p>
                </router-link>
                <mealTypeNav
                    class="meal_nav"
                    :tabs="['Breakfast', 'Lunch', 'Dinner']"
                    :button-color="'#d54f22'"
                    :active-color="'#ec7b55'"
                >
                    <template #Breakfast>
                        <div class="meals_recipe_wrap">
                            <div class="meals_recipe_wrap--recipe">
                                <img src="/images/toast_egg.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Avo & Egg</p>
                                <p class="recipe--desc">
                                    Whole-grain toast topped with creamy avocado and soft-poached
                                    egg. Light, energizing, and rich in healthy fats.
                                </p>
                            </div>
                            <div class="meals_recipe_wrap--recipe">
                                <img src="/images/kebab.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Kebab</p>
                                <p class="recipe--desc">
                                    Succulent lamb skewers paired with crisp greens and a dollop of
                                    tartar sauce. A flavorful protein start.
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #Lunch>
                        <div class="meals_recipe_wrap">
                            <div class="meals_recipe_wrap--recipe">
                                <img src="/images/burger.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Cheese Burger</p>
                                <p class="recipe--desc">
                                    Grilled beef patty layered with cheese, tomato, lettuce, and
                                    pickles, served with golden homemade fries.
                                </p>
                            </div>
                            <div class="meals_recipe_wrap--recipe">
                                <img
                                    src="/images/chicken_platter.webp"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Chick Platter</p>
                                <p class="recipe--desc">
                                    Grilled chicken and scallops served with buttery squash, crisp
                                    peas, and seasoned potato wedges.
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #Dinner>
                        <div class="meals_recipe_wrap">
                            <div class="meals_recipe_wrap--recipe">
                                <img
                                    src="/images/roasted_chicken.webp"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Roast Chick</p>
                                <p class="recipe--desc">
                                    Oven-roasted whole chicken served with stir-fried kale and lemon
                                    wedges. Hearty, satisfying, and protein-rich.
                                </p>
                            </div>
                            <div class="meals_recipe_wrap--recipe">
                                <img src="/images/grill_steak.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Grilled Steak</p>
                                <p class="recipe--desc">
                                    Butter-basted steak with arugula, cherry tomatoes, and grilled
                                    veggies. A savory end to a strong day.
                                </p>
                            </div>
                        </div>
                    </template>
                </mealTypeNav>
                <p @click="visibleProtein = true" class="button meal_plan_info--details">
                    See more <span class="highlight_paprika">details</span>
                </p>

                <mealPlanPopup
                    :visible="visibleProtein"
                    @close="visibleProtein = false"
                    :name="nameProtein"
                    :desc="descProtein"
                    :benefits="benefitsProtein"
                    :nutrition="nutritionProtein"
                    :darkColor="'#680a0a'"
                    :medColor="'#d54f22'"
                    :lightColor="'#f28c28'"
                />
            </div>
        </div>

        <div class="meal_plan_panel">
            <img v-if="viewport.w >= 1024" src="/images/knife.svg" alt="" class="knife" />
            <div class="meal_plan_panel--meal_plan_hero">
                <div id="banner_royal" class="meal_plan_hero--banner"></div>
                <img
                    data-speedx="0.03"
                    data-speedy="0.03"
                    src="/images/fancy_food.webp"
                    alt=""
                    class="parallax meal_plan_hero--image"
                />
            </div>
            <div class="meal_plan_panel--meal_plan_info">
                <p class="meal_plan_info--title">
                    <span class="highlight_purple">Royal</span> Meal Plan
                </p>
                <p id="desc_purple" class="meal_plan_info--desc">
                    An elite culinary experience crafted with the world’s most exquisite
                    ingredients. From black truffle to A5 Wagyu, each meal is designed for
                    indulgence, balance, and unforgettable taste
                </p>
                <router-link to="/subscription">
                    <p id="price_royal" class="button meal_plan_info--price">
                        <span class="bigger_size highlight_purple">Rp60.000,00</span> /meal
                    </p>
                </router-link>
                <mealTypeNav
                    class="meal_nav"
                    :tabs="['Breakfast', 'Lunch', 'Dinner']"
                    :button-color="'#847ddd'"
                    :active-color="'#a5a0e8'"
                >
                    <template #Breakfast>
                        <div class="meals_recipe_wrap">
                            <div id="recipe_royal" class="meals_recipe_wrap--recipe">
                                <img
                                    src="/images/caviar_tartine.webp"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Caviar Tartine</p>
                                <p class="recipe--desc">
                                    Buttery brioche toast topped with soft-boiled eggs, crème
                                    fraîche, and black sturgeon caviar.
                                </p>
                            </div>
                            <div id="recipe_royal" class="meals_recipe_wrap--recipe">
                                <img
                                    src="/images/truffle_omelette.webp"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Truffle Omelette</p>
                                <p class="recipe--desc">
                                    Fluffy French-style omelette folded with wild mushrooms,
                                    parmesan, and shaved black truffle.
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #Lunch>
                        <div class="meals_recipe_wrap">
                            <div id="recipe_royal" class="meals_recipe_wrap--recipe">
                                <img src="/images/wagyu.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">A5 Wagyu</p>
                                <p class="recipe--desc">
                                    Seared Japanese A5 Wagyu over gold-flaked rice, served with
                                    miso-marinated egg and yuzu pickles.
                                </p>
                            </div>
                            <div id="recipe_royal" class="meals_recipe_wrap--recipe">
                                <img src="/images/foie_gras.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Foie Gras Salad</p>
                                <p class="recipe--desc">
                                    Pan-seared foie gras on a bed of arugula, figs, candied pecans,
                                    and raspberry vinaigrette.
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #Dinner>
                        <div class="meals_recipe_wrap">
                            <div id="recipe_royal" class="meals_recipe_wrap--recipe">
                                <img
                                    src="/images/shrimp_sphagetti.webp"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Shrimp Spaghetti</p>
                                <p class="recipe--desc">
                                    Al dente spaghetti tossed in a light truffle cream sauce, topped
                                    with garlic butter shrimp and fresh herbs.
                                </p>
                            </div>
                            <div id="recipe_royal" class="meals_recipe_wrap--recipe">
                                <img src="/images/duck.webp" alt="" class="recipe--image" />
                                <p class="recipe--name">Duck à l’Orange</p>
                                <p class="recipe--desc">
                                    Crispy-skinned duck breast glazed in orange liqueur reduction,
                                    paired with truffle mash and broccolini.
                                </p>
                            </div>
                        </div>
                    </template>
                </mealTypeNav>
                <p
                    @click="visibleRoyal = true"
                    id="details_royal"
                    class="button meal_plan_info--details"
                >
                    See more <span class="highlight_purple">details</span>
                </p>
                <mealPlanPopup
                    :visible="visibleRoyal"
                    @close="visibleRoyal = false"
                    :name="nameRoyal"
                    :desc="descRoyal"
                    :benefits="benefitsRoyal"
                    :nutrition="nutritionRoyal"
                    :darkColor="'#490a7d'"
                    :medColor="'#7935c7'"
                    :lightColor="'#ae73f1'"
                />
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
    @use "../assets/styles/mealPlan.scss";
</style>

<script setup>
    import navBar from "../components/Navbar.vue";
    import mealTypeNav from "../components/MealTypeNavbar.vue";
    import mealPlanPopup from "../components/MealPlanPopup.vue";

    import { useParallax } from "../components/composables/useParallax";
    import { onMounted, ref } from "vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    // diet plan popup props
    const visibleDiet = ref(false);
    const nameDiet = "Diet Meal Plan";
    const descDiet =
        "Our Diet Meal Plan is crafted to help you achieve your health goals without compromising on taste. Packed with essential nutrients and rich in fiber, these meals are designed to support weight management, boost metabolism, and keep you full longer. Ideal for those looking to stay light, energized, and nourished throughout the day.";
    const benefitsDiet = [
        "Keeps you full longer with fiber-rich ingredients",
        "Helps regulate digestion and metabolism",
        "Low in calories, high in essential nutrients"
    ];
    const nutritionDiet = {
        Calories: "300 kcal",
        Protein: "18 g",
        Carbs: "32 g",
        Fats: "9 g",
        Fiber: "7 g",
        Sugars: "5 g",
        Sodium: "320 mg"
    };

    // protein plan popup props
    const visibleProtein = ref(false);
    const nameProtein = "Protein Meal Plan";
    const descProtein =
        "Our Protein Meal Plan is tailored for muscle maintenance, post-workout recovery, and sustained energy levels. Each meal is high in quality protein sources like lean meats, legumes, and eggs, balanced with smart carbs and healthy fats to support an active lifestyle.";
    const benefitsProtein = [
        "Supports muscle growth and recovery",
        "Keeps you full and energized throughout the day",
        "Ideal for fitness and active routines"
    ];
    const nutritionProtein = {
        Calories: "450 kcal",
        Protein: "35 g",
        Carbs: "25 g",
        Fats: "15 g",
        Fiber: "6 g",
        Sugars: "4 g",
        Sodium: "400 mg"
    };

    // royal plan popup props
    const visibleRoyal = ref(false);
    const nameRoyal = "Royal Meal Plan";
    const descRoyal =
        "Our Royal Meal Plan offers a luxurious culinary experience crafted with premium ingredients. These gourmet meals are rich in taste and nutrition, perfect for those who seek indulgence while maintaining a balanced diet. A blend of health and elegance in every bite.";
    const benefitsRoyal = [
        "Premium ingredients for superior taste and nutrition",
        "Balanced macros for sustained well-being",
        "Elevated dining experience at every meal"
    ];
    const nutritionRoyal = {
        Calories: "520 kcal",
        Protein: "28 g",
        Carbs: "40 g",
        Fats: "22 g",
        Fiber: "5 g",
        Sugars: "6 g",
        Sodium: "380 mg"
    };

    onMounted(() => {
        const parallaxEls = document.querySelectorAll(".parallax");
        parallaxEls.forEach((el) => useParallax(el));
    });
</script>
