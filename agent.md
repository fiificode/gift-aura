# GiftAura E-commerce Website — AI Agent Context

## 🧠 Project Overview
GiftAura is a playful, modern e-commerce platform designed for selling gift items (cards, hampers, candles, etc.). The system must provide a smooth shopping experience while incorporating a gamified referral system called the **Birthday Buddy Bonus**.

The UI/UX should feel:
- Joyful 🎁
- Colorful but clean
- Slightly premium but friendly
- Conversion-focused

---

## 🎨 Branding & Design System

### Primary Colors (from logo)
- Gradient: Pink → Orange
  - Pink: #D9468F (approx)
  - Orange: #F59E0B (approx)
- Accent Gold/Yellow: #FBBF24
- Background: #FFFFFF / very light gray (#FAFAFA)
- Text: #1F2937 (dark gray)

### Style Guidelines
- Use soft gradients (pink → orange) for CTAs and highlights
- Rounded corners (border-radius: 12px–20px)
- Subtle shadows for cards
- Use playful icons (gifts, stars, sparkles)
- Animations: hover lift, button glow, micro-interactions

---

## 🏗️ Tech Stack (Recommended)
- Framework: Next.js (App Router)
- Styling: TailwindCSS
- State: Zustand
- Backend: Supabase
- Payments: Mock
- Auth: Clerk

---

## 📄 Required Pages

### 1. 🏠 Home Page
**Goal:** Drive engagement and conversions

#### Sections:
- Hero Section
  - Big headline: “Make Every Gift Magical 🎁”
  - CTA: “Shop Now”
  - Gradient background

- Featured Products
- Categories Preview (Cards, Hampers, Candles, etc.)
- Birthday Buddy Bonus Banner (IMPORTANT)
- Testimonials / Reviews
- Footer

---

### 2. 🛍️ Product / Category Page

#### Features:
- Product grid (cards)
- Search bar (top)
- Filters (price, category)
- Sorting (price, popularity)

#### Product Card:
- Image
- Name
- Price
- Add to Cart button

#### Search Functionality:
- Real-time filtering
- Case-insensitive
- Matches name and category

---

### 3. 💳 Checkout Page

#### Flow:
1. Cart Summary
2. Shipping Info Form
3. Payment Section
4. Order Review
5. Confirm Order

#### Fields:
- Name
- Address
- Phone
- Email

#### Payment:
- Mock payment (success screen)

---

### 4. 📞 Customer Service Page

#### Sections:
- FAQ
- Contact Form
- Email & Phone info
- Order tracking input (mock)

---

## 🎁 Birthday Buddy Bonus (CORE FEATURE)

### Concept:
Gamified referral system.

### Rules:
- Each referral = 1 point
- 5 referrals = unlock Surprise Hamper
- Reward options:
  - 10% discount
  - Free small gift (candle/card)

### UI Requirements:
- Progress bar (e.g., 3/5 referrals)
- Badge system:
  - 🎉 “Starter Gifter”
  - 🎁 “Gift Pro”
  - 👑 “Gift Master”

### Display Locations:
- Home page banner
- User dashboard (optional)
- Checkout upsell

### Sample Text:
“Invite friends, earn rewards! 🎉  
Bring 5 friends and unlock a Surprise Hamper!”

---

## 🛒 Core Functionalities

### Cart System
- Add/remove items
- Quantity control
- Persist in local storage

### Checkout Logic
- Calculate total
- Apply discount (Birthday Bonus)
- Show order confirmation

---

## 📦 Data Structure (Example)

```json
{
  "id": "1",
  "name": "Birthday Candle Set",
  "price": 25,
  "category": "Candles",
  "image": "/products/candle.jpg"
}