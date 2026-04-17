# Supabase Seeding Instructions

## Prerequisites
1. Set up your Supabase project and get the connection details
2. Add the following environment variables to your `.env` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Database Schema
The seeding creates three tables:
- `categories` - Product categories
- `products` - Product information (without reviews)
- `reviews` - Individual product reviews with foreign key to products

## Steps to Seed the Database

1. **Create the database schema:**
   Run the SQL in `supabase-schema.sql` in your Supabase SQL editor or via the Supabase CLI.

2. **Run the seed script:**
   ```bash
   npm run seed
   ```

## What the seed script does:
- Reads data from `server/products.json`
- Inserts categories first
- Transforms product data and inserts products (excluding reviews)
- Extracts reviews from products and inserts them into the separate `reviews` table
- Uses batching to handle large datasets efficiently
- Uses upsert for products to handle existing data

## Schema Details:
- **categories**: id, name, slug, image
- **products**: id, title, description, category_id, price, discount_percentage, rating, stock, tags[], brand, sku, weight, dimensions (JSONB), warranty_information, shipping_information, availability_status, return_policy, minimum_order_quantity, meta (JSONB), images[], thumbnail, created_at, updated_at
- **reviews**: id, product_id (FK), rating, comment, date, reviewer_name, reviewer_email, created_at

## Notes:
- The script uses the service role key for admin operations
- Reviews are normalized into a separate table for better querying and relationships
- Products are inserted with their original IDs to maintain references
- Nested objects (dimensions, meta) are stored as JSONB columns
- Tags and images are stored as PostgreSQL arrays