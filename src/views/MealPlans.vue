<template>
    <main class="meal_plan">
        <navBar />
        <div class="meal_plan_panel">
            <div class="meal_plan_panel--meal_plan_hero">
                <div id="banner_diet" class="meal_plan_hero--banner"></div>
                <img
                    data-speedx="0.03"
                    data-speedy="0.03"
                    src="../assets/images/veggies_hero.svg"
                    alt=""
                    class="parallax meal_plan_hero--image"
                />
            </div>
            <div class="meal_plan_panel--meal_plan_info">
                <p class="meal_plan_info--title">
                    <span class="highlight_basil">Diet</span> Meal Plan
                </p>
                <p class="meal_plan_info--desc">
                    Nourish your body with low-calorie, high-nutrient meals to support weight
                    management. Each dish is balanced for portion control without sacrificing
                    flavor.
                </p>
                <router-link to="/subscription">
                    <p id="price_diet" class="meal_plan_info--price">
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
                                <img
                                    src="../assets/images/fruits_hero.svg"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Oat Berry Bowl</p>
                                <p class="recipe--desc">
                                    Rolled oats soaked in almond milk, topped with mixed berries and
                                    chia seeds for a light, fiber-rich start.
                                </p>
                            </div>
                            <div id="recipe_diet" class="meals_recipe_wrap--recipe">
                                <img
                                    src="../assets/images/egg_wrap.svg"
                                    alt=""
                                    class="recipe--image"
                                />
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
                                <img
                                    src="../assets/images/pad_thai.svg"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Pad Thai</p>
                                <p class="recipe--desc">
                                    Stir-fried rice noodles with juicy shrimp, bean sprouts,
                                    scrambled egg, and crushed peanuts in a sweet-savory tamarind
                                    sauce
                                </p>
                            </div>
                            <div id="recipe_diet" class="meals_recipe_wrap--recipe">
                                <img
                                    src="../assets/images/quinoa_salad.svg"
                                    alt=""
                                    class="recipe--image"
                                />
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
                                    src="../assets/images/grilled_salmon.svg"
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
                                    src="../assets/images/stuffed_peppers.svg"
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
                <p id="details_diet" class="meal_plan_info--details">
                    See more <span class="highlight_basil">details</span>
                </p>
            </div>
        </div>

        <div class="meal_plan_panel">
            <div class="meal_plan_panel--meal_plan_hero">
                <div class="meal_plan_hero--banner"></div>
                <img
                    data-speedx="0.03"
                    data-speedy="0.03"
                    src="../assets/images/protein_hero.svg"
                    alt=""
                    class="parallax meal_plan_hero--image"
                />
            </div>
            <div class="meal_plan_panel--meal_plan_info">
                <p class="meal_plan_info--title">
                    <span class="highlight_paprika">Protein</span> Meal Plan
                </p>
                <p class="meal_plan_info--desc">
                    Power up with protein-packed meals made for strength, recovery, and fullness.
                    Perfect for active lifestyles to keep you energized all day.
                </p>
                <router-link to="/subscription">
                    <p class="meal_plan_info--price">
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
                                <img
                                    src="../assets/images/toast_egg.svg"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Avo & Egg</p>
                                <p class="recipe--desc">
                                    Whole-grain toast topped with creamy avocado and soft-poached
                                    egg. Light, energizing, and rich in healthy fats.
                                </p>
                            </div>
                            <div class="meals_recipe_wrap--recipe">
                                <img
                                    src="../assets/images/kebab.svg"
                                    alt=""
                                    class="recipe--image"
                                />
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
                                <img
                                    src="../assets/images/burger.svg"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Cheese Burger</p>
                                <p class="recipe--desc">
                                    Grilled beef patty layered with cheese, tomato, lettuce, and
                                    pickles, served with golden homemade fries.
                                </p>
                            </div>
                            <div class="meals_recipe_wrap--recipe">
                                <img
                                    src="../assets/images/chicken_platter.svg"
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
                                    src="../assets/images/roasted_chicken.svg"
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
                                <img
                                    src="../assets/images/grill_steak.svg"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Grilled Steak</p>
                                <p class="recipe--desc">
                                    Butter-basted steak with arugula, cherry tomatoes, and grilled
                                    veggies. A savory end to a strong day.
                                </p>
                            </div>
                        </div>
                    </template>
                </mealTypeNav>
                <p class="meal_plan_info--details">
                    See more <span class="highlight_paprika">details</span>
                </p>
            </div>
        </div>

        <div class="meal_plan_panel">
            <div class="meal_plan_panel--meal_plan_hero">
                <div id="banner_royal" class="meal_plan_hero--banner"></div>
                <img
                    data-speedx="0.03"
                    data-speedy="0.03"
                    src="../assets/images/fancy_food.svg"
                    alt=""
                    class="parallax meal_plan_hero--image"
                />
            </div>
            <div class="meal_plan_panel--meal_plan_info">
                <p class="meal_plan_info--title">
                    <span class="highlight_purple">Royal</span> Meal Plan
                </p>
                <p class="meal_plan_info--desc">
                    An elite culinary experience crafted with the world’s most exquisite
                    ingredients. From black truffle to A5 Wagyu, each meal is designed for
                    indulgence, balance, and unforgettable taste
                </p>
                <router-link to="/subscription">
                    <p id="price_royal" class="meal_plan_info--price">
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
                                    src="../assets/images/caviar_tartine.svg"
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
                                    src="../assets/images/truffle_omelette.svg"
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
                                <img
                                    src="../assets/images/wagyu.svg"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">A5 Wagyu</p>
                                <p class="recipe--desc">
                                    Seared Japanese A5 Wagyu over gold-flaked rice, served with
                                    miso-marinated egg and yuzu pickles.
                                </p>
                            </div>
                            <div id="recipe_royal" class="meals_recipe_wrap--recipe">
                                <img
                                    src="../assets/images/foie_gras.svg"
                                    alt=""
                                    class="recipe--image"
                                />
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
                                    src="../assets/images/shrimp_sphagetti.svg"
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
                                <img src="../assets/images/duck.svg" alt="" class="recipe--image" />
                                <p class="recipe--name">Duck à l’Orange</p>
                                <p class="recipe--desc">
                                    Crispy-skinned duck breast glazed in orange liqueur reduction,
                                    paired with truffle mash and broccolini.
                                </p>
                            </div>
                        </div>
                    </template>
                </mealTypeNav>
                <p id="details_royal" class="meal_plan_info--details">
                    See more <span class="highlight_purple">details</span>
                </p>
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
    import { useParallax } from "../components/composables/useParallax";
    import { onMounted } from "vue";

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    onMounted(() => {
        const parallaxEls = document.querySelectorAll(".parallax");
        parallaxEls.forEach((el) => useParallax(el));
    });
</script>
