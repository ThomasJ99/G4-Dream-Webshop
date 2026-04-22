# DreamShop

A modern e-commerce storefront built with Next.js and Supabase, focused on scalable frontend architecture, URL-driven filtering, and reusable component design.

---
## Deployment
https://g4-dream-webshop.vercel.app/

---
## Wishlist

- [ ] Auth implementation
- [ ] Error handling
- [x] Optimization
- [x] Skeletons

---

## Tech Stack

 Next.js | Framework, App Router, Server Components 
 TypeScript | Type safety 
 Tailwind CSS | Styling 
 Supabase | Database & *authentication* 
 shadcn/ui | UI component primitives 
 Framer Motion | Animations 
 Lucide React | Icons 
 Biome | Linting & formatting 

---

## Features

### Product Catalogue
- Dynamic product grid with Framer Motion animations
- Category filtering, search, and pagination
- Reusable `ProductCard` with image hover previews and availability badges

### Shopping Cart
- Cookie-based cart persistence
- Add, remove, and update item quantities
- Order summary with dynamic total and VAT calculation

### Favorites
- Save and remove favorite products
- Persistent favorites storage

### Filtering System
Filters are driven entirely by URL parameters — no global state required:
`/products?_categoryId=3&_q=shirt&_limit=12&_page=2`

This gives you shareable filtered URLs, server-side filtering, and zero client-side state overhead.

### Admin Dashboard
- Full product CRUD (create, edit, delete)
- Product table with pagination and search
- Inventory and stats widgets

---

## Architecture

The project follows a strict server/client split using Next.js App Router conventions.

**Server components** handle data fetching, filtering, pagination, and layout rendering.  
**Client components** handle interactions — filters, cart, favorites, and form submissions.
```
dream-webshop/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── products/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── add-product/
│   │   │   └── page.tsx
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       └── not-found.tsx
│   │
│   ├── cart/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   ├── favorites/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   ├── about/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   │
│   └── admin/
│       ├── page.tsx
│       └── layout.tsx
│
├── components/
│   ├── product-card.tsx
│   ├── product-grid.tsx
│   ├── product-grid-pagination.tsx
│   ├── product-grid-skeleton.tsx
│   ├── product-badge.tsx
│   ├── cart-item-card.tsx
│   ├── category-grid.tsx
│   ├── category-grid-skeleton.tsx
│   ├── featured-grid.tsx
│   ├── featured-grid-skeleton.tsx
│   ├── filter-products.tsx
│   ├── toast-listener.tsx
│   │
│   └── ui/
│       ├── button.tsx
│       ├── footer.tsx
│       ├── hero.tsx
│       ├── input.tsx
│       ├── navigation.tsx
│       ├── skeleton.tsx
│       ├── add-favorite.tsx
│       ├── delete-favorite.tsx
│       │
│       └── admin/
│           ├── create-form.tsx
│           ├── dashboard-widget.tsx
│           ├── delete-actions.tsx
│           ├── edit-form.tsx
│           ├── header.tsx
│           ├── product-table.tsx
│           ├── product-table-pagination.tsx
│           ├── profile-dropdown.tsx
│           ├── search-widget.tsx
│           └── sidebar.tsx
│
├── lib/
│   ├── config.ts
│   ├── types.ts
│   ├── utils.ts
│   ├── db.ts
│   ├── actions.ts
│   │
│   ├── db/
│   │   ├── categories-db.ts
│   │   ├── carts-db.ts
│   │   ├── favorites-db.ts
│   │   ├── products-db.ts
│   │   └── reviews-db.ts
│   │
│   └── actions/
│       ├── cart-actions.ts
│       ├── categories-actions.ts
│       ├── product-actions.ts
│       └── reviews-actions.ts
│
├── utils/
│   ├── getSearchParams.ts
│   └── utils.ts
│
├── public/
├── data/
├── .env
├── .gitignore
├── biome.json
├── components.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── seed.js
├── supabase-schema.sql
├── supabaseClient.js
├── tsconfig.json
└── README.md
```
---

### DB

<img width="847" height="772" alt="image" src="https://github.com/user-attachments/assets/5f9c26ff-b5b8-49f1-87c0-84edb6997b4d" />

---

## Getting Started

1. **Clone the repository**

2. **Set up environment variables**

   Create a `.env` file in the root:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

3. **Install dependencies**
```bash
   npm install
```

4. **Seed the database**
```bash
   npm run seed
```

5. **Start the development server**
```bash
   npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run Biome linter |
| `npm run format` | Format code with Biome |
| `npm run seed` | Seed the database |

---

## Team

Thomas · Victor · Gustav · Ed · Alex
