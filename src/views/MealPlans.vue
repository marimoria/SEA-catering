<template>
    <main class="meal_plan">
        <navBar />
        <div class="meal_plan_panel">
            <div class="meal_plan_panel--meal_plan_hero">
                <div class="meal_plan_hero--banner"></div>
                <img src="../assets/images/protein_hero.svg" alt="" class="meal_plan_hero--image" />
            </div>
            <div class="meal_plan_panel--meal_plan_info">
                <p class="meal_plan_info--title">
                    <span class="highlight_paprika">Protein</span> Meal Plan
                </p>
                <p class="meal_plan_info--desc">
                    Power up with protein-packed meals made for strength, recovery, and fullness.
                    Perfect for active lifestyles to keep you energized all day.
                </p>
                <p class="meal_plan_info--price">
                    <span class="bigger_size highlight_paprika">Rp40.000,00</span> /meal
                </p>
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
                                    Creamy avocado & poached egg on whole-grain toast.
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
                                    Lamb kebab with fresh greens and tartar sauce.
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #Lunch>
                        <div class="meals_recipe_wrap">
                            <div class="meals_recipe_wrap--recipe">
                                <img
                                    src="../assets/images/roasted_chicken.svg"
                                    alt=""
                                    class="recipe--image"
                                />
                                <p class="recipe--name">Roast Chick</p>
                                <p class="recipe--desc">
                                    Roasted whole chicken with kale stirfry and lemon slices.
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
                                    Grilled chicken & scallops served with squash and peas.
                                </p>
                            </div>
                        </div>
                    </template>

                    <template #Dinner>
                        <p><strong>Dinner 1</strong><br />Dinner 2</p>
                    </template>
                </mealTypeNav>
                <p class="meal_plan_info--details">
                    See more <span class="highlight_paprika">details</span>
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
</script>
