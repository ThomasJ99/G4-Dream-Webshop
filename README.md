# DreamShop

A modern e-commerce storefront built with Next.js and Supabase, focused on scalable frontend architecture, URL-driven filtering, and reusable component design.

---
## Wishlist

- [ ] Auth implementation
- [ ] Error handling
- [ ] Optimization
- [ ] Skeletons - on its way!

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
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   ├── cart/
│   ├── favorites/
│   ├── admin/
│   └── products/
│       ├── page.tsx
│       ├── [id]/
│       ├── add-product/
│       └── edit/[id]/
│
├── components/
│   ├── ui/                  # Primitives and layout components
│   │   └── admin/           # Admin-specific components
│   ├── product-card.tsx
│   ├── product-grid.tsx
│   ├── cart-item-card.tsx
│   └── ...
│
├── lib/
│   ├── db/                  # Supabase query functions
│   ├── actions/             # Server actions
│   ├── types.ts
│   ├── utils.ts
│   └── config.ts
│
└── utils/
```
---

###DB

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
