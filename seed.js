import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for seeding

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  console.error(
    "Make sure to set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
async function seedDatabase() {
  try {
    console.log("Reading products.json...");
    const dataPath = path.join(process.cwd(), "server", "products.json");
    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

    const { categories, products } = data;

    console.log(
      `Found ${categories.length} categories and ${products.length} products`,
    );

    // Insert categories first
    console.log("Inserting categories...");
    const { data: insertedCategories, error: categoriesError } = await supabase
      .from("categories")
      .upsert(categories, { onConflict: "id" })
      .select();

    if (categoriesError) {
      console.error("Error inserting categories:", categoriesError);
      return;
    }

    console.log(`Inserted ${insertedCategories.length} categories`);

    // Separate reviews from products data
    const allReviews = [];
    const productsWithoutReviews = products.map((product) => {
      if (product.reviews && product.reviews.length > 0) {
        // Add product_id to each review
        const productReviews = product.reviews.map((review) => ({
          product_id: product.id,
          rating: review.rating,
          comment: review.comment,
          date: review.date,
          reviewer_name: review.reviewerName,
          reviewer_email: review.reviewerEmail,
        }));
        allReviews.push(...productReviews);
      }

      // Return product without reviews
      const { reviews, ...productData } = product;
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        category_id: product.categoryId,
        price: product.price,
        discount_percentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags,
        brand: product.brand,
        sku: product.sku,
        weight: product.weight,
        dimensions: product.dimensions,
        warranty_information: product.warrantyInformation,
        shipping_information: product.shippingInformation,
        availability_status: product.availabilityStatus,
        return_policy: product.returnPolicy,
        minimum_order_quantity: product.minimumOrderQuantity,
        meta: product.meta,
        images: product.images,
        thumbnail: product.thumbnail,
        created_at: product.meta?.createdAt || new Date().toISOString(),
        updated_at: product.meta?.updatedAt || new Date().toISOString(),
      };
    });

    // Insert products in batches to avoid payload size limits
    const batchSize = 50;
    console.log("Inserting products...");

    for (let i = 0; i < productsWithoutReviews.length; i += batchSize) {
      const batch = productsWithoutReviews.slice(i, i + batchSize);
      const { error: productsError } = await supabase
        .from("products")
        .upsert(batch, { onConflict: "id" });

      if (productsError) {
        console.error(
          `Error inserting products batch ${Math.floor(i / batchSize) + 1}:`,
          productsError,
        );
        return;
      }

      console.log(
        `Inserted products batch ${Math.floor(i / batchSize) + 1} (${batch.length} products)`,
      );
    }

    // Insert reviews in batches
    console.log(`Inserting ${allReviews.length} reviews...`);
    for (let i = 0; i < allReviews.length; i += batchSize) {
      const batch = allReviews.slice(i, i + batchSize);
      const { error: reviewsError } = await supabase
        .from("reviews")
        .insert(batch);

      if (reviewsError) {
        console.error(
          `Error inserting reviews batch ${Math.floor(i / batchSize) + 1}:`,
          reviewsError,
        );
        return;
      }

      console.log(
        `Inserted reviews batch ${Math.floor(i / batchSize) + 1} (${batch.length} reviews)`,
      );
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

seedDatabase();
