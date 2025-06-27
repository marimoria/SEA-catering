# SEA Catering 🍱

**“Healthy Meals, Anytime, Anywhere”**

SEA Catering is a customizable healthy meal subscription platform built for Indonesian customers. Originally a small local service, SEA Catering quickly went viral and now serves cities across the country. To meet rising demand, this app was developed to streamline subscriptions, offer meal customization, and improve delivery efficiency. 

⚠️ This project was built as a technical selection submission for [Compfest UI Software Engineering Academy 2025](https://compfest.id/).

---

## 🪟 Deployed Website
This project was deployed using GitHub Pages: https://marimoria.github.io/SEA-catering/#/

---

## 📌 Features

- 🏠 Responsive homepage with slogan, features, and contact info.
- 🔐 Secure user authentication & profile management.
- 📖 Interactive navigation bar across all pages.
- 🍛 Meal plans, types, and recipes fully dynamic & integrated to database. 
- 📝 Testimonials with form + carousel display.
- 📦 Subscription system with validation and dynamic price calculation.
- 🧠 User dashboard: pause, cancel, view subscriptions, and modify profile.
- 🌐 Supabase backend with Edge Functions, scheduled PostgreSQL functions, and Row-Level Security.
- 📞 A contact-us page that allows direct message from user to SEA catering support email.
- 📱 Mobile-first UI with dynamic SCSS styling

---

## 🧑‍💻 Tech Stack

| Frontend           | Backend / DB            |
|--------------------|-------------------------|
| Vue                | Supabase                |
| Vite               | EmailJs                 |
| GSAP              

---

## 🏃🏻‍♀️ Getting Started
Dear Compfest Selection Team, I have provided the `.env` file as well as an admin account to my website in my selection pdf file. Please follow the steps below to get my project up and running.

### 1. Clone the repo
```bash
git clone https://github.com/marimoria/SEA-catering.git
cd sea-catering
npm install
```

### 2. Make `.env.local` file
Please paste the contents from the selection pdf file. It should look like this:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

### 3. Activate the project
```bash
npm run dev -> host with live-server (works with supabase)
npm run preview -> preview build
npm run build -> build into dist
```

### 4.1. Make a regular acount
- Sign up with email.
- Follow confirmation link sent to email.
- Login.

### 4.2. Login to admin account
- Login with email & password provided

---
## 🔄️ Duplicating This Project

### 1. Clone the repo

```bash
git clone https://github.com/marimoria/SEA-catering.git
cd sea-catering
npm install
```

### 2.1. Supabase Setup

- Create a new project at [supabase.com](https://supabase.com)
- Go to **Settings > API**, copy:
  - `Project URL` → `VITE_SUPABASE_URL`
  - `anon public key` → `VITE_SUPABASE_ANON_KEY`
- Add your key & url to your `.env` file.
- Enable **Email Auth** in `Authentication > Providers`

### 2.2. EmailJs Setup

- Go to [EmailJs](https://www.emailjs.com/) and sign up or log in.
- Click "Add new service" and connect your email provider.
- Copy the service ID → `VITE_EMAILJS_SERVICE_ID=your_service_id`.
- Go to "Email Templates" and create a new template like so & replace to email with your staff email.
  ![image](https://github.com/user-attachments/assets/66023b2e-4abc-455c-a6c0-cd33db8642f7)
- Save it and copy the template ID → `VITE_EMAILJS_TEMPLATE_ID=your_template_id`  
- Go to "Account" → "API Keys"  
- Copy the public key → `VITE_EMAILJS_PUBLIC_KEY=your_public_key`  
- Add all three to your `.env` file.

### 3. Create `.env` file

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Database Tables

Go to your `projects` and head to `SQL Editor`, run the following scripts separately to prevent conflicts:

1. `profiles` table
```sql
-- TABLE
create table if not exists profiles (
  id uuid primary key not null references auth.users(id) on delete cascade,
  username text unique not null,
  full_name text not null,
  phone text unique not null,
  allergies text,
  created_at timestamp with time zone default timezone('utc', now())
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- SELECT
create policy "Allow self or admin to SELECT"
on profiles
for select
using (
  (select auth.uid()) = id OR
  (select exists (
    select 1 from admin_roles where id = (select auth.uid())
  ))
);

-- INSERT
create policy "Users can INSERT their own profile"
on profiles
for insert
with check (
  (select auth.uid()) = id
);

-- UPDATE
create policy "Users can UPDATE their own profile"
on profiles
for update
using (
  (select auth.uid()) = id
)
with check (
  (select auth.uid()) = id
);

-- DELETE
create policy "Only admins can DELETE"
on profiles
for delete
using (
  (select exists (
    select 1 from admin_roles where id = (select auth.uid())
  ))
);
```

2. `admin_roles` table
> **Note:** The user must already signed up & confirmed their email before you manually promote them into becoming an admin. You must copy their id from profiles table and insert them manually through the SQL editor like the example below.
```sql
create table if not exists admin_roles (
  id uuid primary key references auth.users(id) on delete cascade
);

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow user to check if they are admin"
ON admin_roles
FOR SELECT
USING (id = auth.uid());
```
```sql
insert into admin_roles (id) values ('user_id');
```

3. `meal_plans`
> **Note:** You have to add meal plans and their details through the `SQL Editor` like the example below.
```sql
create table meal_plans (
  id uuid primary key default gen_random_uuid(),
  title text unique not null, -- 'diet', 'protein', 'royal'
  desc_short text,
  desc_long text,
  price numeric(10, 2),
  colors jsonb, -- { "dark": "#...", "medium": "#...", "light": "#..." }
  hero_image text,
  popup_benefits text[],
  popup_nutrition jsonb
);

-- meal_types (tabs like Breakfast, Lunch, Dinner)
create table recipes (
  meal_plan_id uuid references meal_plans(id) on delete cascade,
  meal_type text check (meal_type in ('breakfast', 'lunch', 'dinner')), -- breakfast / lunch / dinner
  name text not null,
  description text,
  image text,
  order_index integer default 0, -- for custom orders
  colors jsonb
);

alter table meal_plans enable row level security;
alter table recipes enable row level security;

-- meal_plans: public read
create policy "Public read access to meal_plans"
on meal_plans
for select
to public
using (true);

-- recipes: public read
create policy "Public read access to recipes"
on recipes
for select
to public
using (true);
```
```sql
insert into meal_plans (title, desc_short, desc_long, price, colors, hero_image, popup_benefits, popup_nutrition)
values 
-- Diet
(
  'diet',
  'Nourish your body with low-calorie, high-nutrient meals to support weight management. Each dish is balanced for portion control without sacrificing flavor.',
  'Our Diet Meal Plan is crafted to help you achieve your health goals without compromising on taste. Packed with essential nutrients and rich in fiber, these meals are designed to support weight management, boost metabolism, and keep you full longer. Ideal for those looking to stay light, energized, and nourished throughout the day.',
  30000.00,
  '{"dark": "#2e5a32", "medium": "#4f9447", "light": "#8ebe3f"}',
  'veggies_hero.webp',
  array[
    'Keeps you full with fiber-rich ingredients.',
    'Regulates digestion & metabolism.',
    'Low in calories but high nutrients.'
  ],
  '{
    "Calories": "300 kcal",
    "Protein": "18 g",
    "Carbs": "32 g",
    "Fats": "9 g",
    "Fiber": "7 g",
    "Sugars": "5 g",
    "Sodium": "320 mg"
  }'::jsonb
),

-- Protein
(
  'protein',
  'Power up with protein-packed meals made for strength, recovery, and fullness. Perfect for active lifestyles to keep you energized all day.',
  'Our Protein Meal Plan is tailored for muscle maintenance, post-workout recovery, and sustained energy levels. Each meal is high in quality protein sources like lean meats, legumes, and eggs, balanced with smart carbs and healthy fats to support an active lifestyle.',
  40000.00,
  '{"dark": "#680a0a", "medium": "#d54f22", "light": "#f28c28"}',
  'protein_hero.webp',
  array[
    'Supports muscle growth and recovery',
    'Keeps you full and energized throughout the day',
    'Ideal for fitness and active routines'
  ],
  '{
    "Calories": "450 kcal",
    "Protein": "35 g",
    "Carbs": "25 g",
    "Fats": "15 g",
    "Fiber": "6 g",
    "Sugars": "4 g",
    "Sodium": "400 mg"
  }'::jsonb
),

-- Royal
(
  'royal',
  'An elite culinary experience crafted with the world most exquisite ingredients. From black truffle to A5 Wagyu, each meal is designed for indulgence, balance, and unforgettable taste',
  'Our Royal Meal Plan offers a luxurious culinary experience crafted with premium ingredients. These gourmet meals are rich in taste and nutrition, perfect for those who seek indulgence while maintaining a balanced diet. A blend of health and elegance in every bite.',
  60000.00,
  '{"dark": "#2c0b47", "medium": "#5e3a87", "light": "#a678e2"}',
  'fancy_food.webp',
  array[
    'Premium ingredients for superior taste and nutrition',
    'Balanced macros for sustained well-being',
    'Elevated dining experience at every meal'
  ],
  '{
    "Calories": "520 kcal",
    "Protein": "20 g",
    "Carbs": "40 g",
    "Fats": "22 g",
    "Fiber": "5 g",
    "Sugars": "6 g",
    "Sodium": "380 mg"
  }'::jsonb
);
```
```sql
-- Diet Recipes
with diet as (
  select id from meal_plans where title = 'diet'
)
insert into recipes (meal_plan_id, meal_type, name, description, image, order_index)
values
((select id from diet), 'breakfast', 'Oat Berry Bowl', 'Rolled oats soaked in almond milk, topped with mixed berries and chia seeds.', 'fruits_hero.webp', 1),
((select id from diet), 'breakfast', 'Egg White Wrap', 'Fluffy egg whites with spinach, tomato, and low-fat cheese in a whole-wheat tortilla.', 'egg_wrap.webp', 2),
((select id from diet), 'lunch', 'Pad Thai', 'Stir-fried rice noodles with shrimp, bean sprouts, scrambled egg, and peanuts.', 'pad_thai.webp', 1),
((select id from diet), 'lunch', 'Quinoa Salad', 'Grilled chicken, quinoa, cucumber, mint, and lemon vinaigrette.', 'quinoa_salad.webp', 2),
((select id from diet), 'dinner', 'Grilled Salmon', 'Herb-seasoned salmon with roasted bell peppers, broccoli, and lemon.', 'grilled_salmon.webp', 1),
((select id from diet), 'dinner', 'Baked Peppers', 'Bell peppers filled with cauliflower rice, mushrooms, and black beans.', 'stuffed_peppers.webp', 2);

-- Protein Recipes
with protein as (
  select id from meal_plans where title = 'protein'
)
insert into recipes (meal_plan_id, meal_type, name, description, image, order_index)
values
((select id from protein), 'breakfast', 'Avo & Egg', 'Whole-grain toast topped with avocado and poached egg.', 'toast_egg.webp', 1),
((select id from protein), 'breakfast', 'Kebab', 'Lamb skewers with crisp greens and tartar sauce.', 'kebab.webp', 2),
((select id from protein), 'lunch', 'Cheese Burger', 'Beef patty with cheese, tomato, lettuce, and fries.', 'burger.webp', 1),
((select id from protein), 'lunch', 'Chicken Platter', 'Grilled chicken and scallops with buttery squash and potato wedges.', 'chicken_platter.webp', 2),
((select id from protein), 'dinner', 'Roast Chick', 'Roasted chicken with kale and lemon.', 'roasted_chicken.webp', 1),
((select id from protein), 'dinner', 'Grilled Steak', 'Steak with arugula, tomatoes, and grilled veggies.', 'grill_steak.webp', 2);

-- Royal Recipes
with royal as (
  select id from meal_plans where title = 'royal'
)
insert into recipes (meal_plan_id, meal_type, name, description, image, order_index)
values
((select id from royal), 'breakfast', 'Caviar Tartine', 'Brioche toast with eggs, crème fraîche, and black caviar.', 'caviar_tartine.webp', 1),
((select id from royal), 'breakfast', 'Truffle Omelette', 'Omelette with mushrooms, parmesan, and black truffle.', 'truffle_omelette.webp', 2),
((select id from royal), 'lunch', 'A5 Wagyu', 'Seared Wagyu over gold-flaked rice with miso egg and yuzu pickles.', 'wagyu.webp', 1),
((select id from royal), 'lunch', 'Foie Gras Salad', 'Foie gras with arugula, figs, pecans, and vinaigrette.', 'foie_gras.webp', 2),
((select id from royal), 'dinner', 'Shrimp Spaghetti', 'Spaghetti in truffle cream sauce with garlic butter shrimp.', 'shrimp_sphagetti.webp', 1),
((select id from royal), 'dinner', 'Duck à l’Orange', 'Duck with orange glaze, truffle mash, and broccolini.', 'duck.webp', 2);
```

4. `testimonies` table
```sql
create table if not exists testimonies (
  testimony_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null,
  summary text not null,
  rating integer check (rating between 1 and 5) default 1,
  review_message text not null,
  created_at timestamp with time zone default timezone('utc', now())
);

alter table testimonies enable row level security;

-- SELECT
create policy "Allow all to view testimonies"
on testimonies
for select
using (
  true
);

-- INSERT
create policy "Users can INSERT their own testimonies"
on testimonies
for insert
with check (
  (select auth.uid()) = user_id
);
```

5. `subscriptions` table
```sql
create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references profiles(id) on delete cascade,

  status text not null default 'active'
    check (status in ('active', 'paused')),

  total_price numeric(12,2) not null,

  pause_start date,
  pause_end date,

  created_at timestamp with time zone default timezone('Asia/Jakarta', now()) not null
);

alter table subscriptions enable row level security;

-- Allow users to view their own subscriptions or allow admins
create policy "User can view own subscriptions"
on subscriptions
for select
using (
  (select auth.uid()) = user_id OR
  (select exists (
    select 1 from admin_roles where user_id = (select auth.uid())
  ))
);

-- Allow users to insert their own subscriptions
create policy "User can insert own subscriptions"
on subscriptions
for insert
with check (
  (select auth.uid()) = user_id
);

-- Allow users to update their own subscriptions or allow admins
create policy "User can update own subscriptions"
on subscriptions
for update
using (
  (select auth.uid()) = user_id OR
  (select exists (
    select 1 from admin_roles where user_id = (select auth.uid())
  ))
)
with check (
  (select auth.uid()) = user_id
);

-- Allow users to delete their own subscriptions or allow admins
create policy "User can delete own subscriptions"
on subscriptions
for delete
using (
  (select auth.uid()) = user_id OR
  (select exists (
    select 1 from admin_roles where user_id = (select auth.uid())
  ))
);
```

6. `subscription_items` table
```sql
create table if not exists subscription_items (
  id uuid primary key default gen_random_uuid(),

  -- Link to parent subscription
  subscription_id uuid not null references subscriptions(id) on delete cascade,

  -- Link to the selected meal plan
  meal_plan_id uuid not null references meal_plans(id) on delete restrict,

  -- Arrays of selected options
  meal_types text[] not null check (
    array_length(meal_types, 1) > 0
    and meal_types <@ array['breakfast', 'lunch', 'dinner']
  ),

  delivery_days text[] not null check (
    array_length(delivery_days, 1) > 0
    and delivery_days <@ array['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  ),

  created_at timestamp with time zone default timezone('Asia/Jakarta', now()) not null
);

alter table subscription_items enable row level security;

-- User and admins can see their own subscription items
create policy "User can view own subscription_items"
on subscription_items
for select
using (
  exists (
    select 1 from subscriptions
    where subscriptions.id = subscription_items.subscription_id
    and (
      subscriptions.user_id = (select auth.uid())
      or exists (
        select 1 from admin_roles where user_id = (select auth.uid())
      )
    )
  )
);

-- User can insert their own subscriptions items
create policy "User can insert own subscription_items"
on subscription_items
for insert
with check (
  exists (
    select 1 from subscriptions
    where subscriptions.id = subscription_items.subscription_id
    and subscriptions.user_id = (select auth.uid())
  )
);

-- users or admins can update subscription items
create policy "User can update own subscription_items"
on subscription_items
for update
using (
  exists (
    select 1 from subscriptions
    where subscriptions.id = subscription_items.subscription_id
    and (
      subscriptions.user_id = (select auth.uid())
      or exists (
        select 1 from admin_roles where user_id = (select auth.uid())
      )
    )
  )
)
with check (
  exists (
    select 1 from subscriptions
    where subscriptions.id = subscription_items.subscription_id
    and subscriptions.user_id = (select auth.uid())
  )
);

-- allow users or admins to delete their own subscription
create policy "User can delete own subscription_items"
on subscription_items
for delete
using (
  exists (
    select 1 from subscriptions
    where subscriptions.id = subscription_items.subscription_id
    and (
      subscriptions.user_id = (select auth.uid())
      or exists (
        select 1 from admin_roles where user_id = (select auth.uid())
      )
    )
  )
);
```

7. `resume_expired_subscription()` function
> **Note:** This function is ran every midnight but you can run it manually as well for good meassure like the example below.
```sql
-- Enable pg_cron
create extension if not exists pg_cron;

-- Create a SQL function to update expired paused subscriptions
create or replace function resume_expired_subscriptions()
returns void as $$
begin
  update subscriptions
  set status = 'active',
      pause_start = null,
      pause_end = null
  where status = 'paused'
    and pause_end is not null
    and pause_end <= (now() at time zone 'Asia/Jakarta')::date;
end;
$$ language plpgsql;

-- Run the function daily
select cron.schedule(
  'resume_paused_subs_daily',
  '0 0 * * *',  -- at midnight
  $$select resume_expired_subscriptions();$$
);
```
```sql
select * from resume_expired_subscriptions();
```

### 5. Edge Functions

> ‼️ This edge function will be able to access ALL profiles table to check for username and phone duplicates by using your `SERVICE_ROLE_KEY`. This key is very powerful and should not be used anywhere in your front-end side since they bypass every RLS policies.
- Go to your `project` -> `Edge Functions`
- Click `Deploy a new function` via editor
- In `index.ts` paste the following script
- Change `your_dev_localhost_url` and `your_website_domain` to your actual domains
- Name your function `checkUniqueSignUp`
- Deploy your function
```ts
import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const allowedOrigins = [
  "your_dev_localhost_url,
  "your_website_domain"
];
serve(async (req)=>{
  const origin = req.headers.get("origin") ?? "";
  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  try {
    const { username, phone } = await req.json();
    const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"), {
      global: {
        headers: {
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`
        }
      }
    });
    const { data: usernameData } = await supabase.from("profiles").select("id").eq("username", username).maybeSingle();
    const { data: phoneData } = await supabase.from("profiles").select("id").eq("phone", phone).maybeSingle();
    return new Response(JSON.stringify({
      usernameExists: !!usernameData,
      phoneExists: !!phoneData
    }), {
      status: 200,
      headers: corsHeaders
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "Invalid request",
      details: error.message ?? String(error)
    }), {
      status: 400,
      headers: corsHeaders
    });
  }
});
```

### 6. Activate Project
```bash
npm run dev -> host with live server
npm run preview -> preview of build
npm run build -> build into dist
```
---


## ⭐ Acknowledgements
- Images are taken from freepik.
- Made with sleepless nights.
