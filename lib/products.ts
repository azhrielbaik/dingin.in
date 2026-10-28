import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { Product, Category } from "@/types";

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(
  currentSlug: string,
  category: string,
  limit = 4
): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== currentSlug && p.category === category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Fallback to other products if category has few items
  const others = products.filter(
    (p) => p.slug !== currentSlug && p.category !== category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export function filterAndSortProducts(
  items: Product[],
  options: {
    category?: string;
    search?: string;
    halalOnly?: boolean;
    sort?: SortOption;
  }
): Product[] {
  let result = [...items];

  // Category filter
  if (options.category && options.category !== "all") {
    result = result.filter((p) => p.category === options.category);
  }

  // Halal filter
  if (options.halalOnly) {
    result = result.filter((p) => p.halal);
  }

  // Search filter (name, description, pieces, composition)
  if (options.search && options.search.trim().length > 0) {
    const q = options.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.composition && p.composition.toLowerCase().includes(q)) ||
        (p.pieces && p.pieces.toLowerCase().includes(q))
    );
  }

  // Sorting
  if (options.sort) {
    switch (options.sort) {
      case "price-asc":
        result.sort((a, b) => {
          const minA = Math.min(...a.variants.map((v) => v.price));
          const minB = Math.min(...b.variants.map((v) => v.price));
          return minA - minB;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const maxA = Math.max(...a.variants.map((v) => v.price));
          const maxB = Math.max(...b.variants.map((v) => v.price));
          return maxB - maxA;
        });
        break;
      case "newest":
        result.sort((a, b) => {
          const aNew = a.badges?.includes("new") ? 1 : 0;
          const bNew = b.badges?.includes("new") ? 1 : 0;
          return bNew - aNew;
        });
        break;
      case "featured":
      default:
        result.sort((a, b) => {
          const aRank = (a.featured ? 2 : 0) + (a.badges?.includes("bestseller") ? 1 : 0);
          const bRank = (b.featured ? 2 : 0) + (b.badges?.includes("bestseller") ? 1 : 0);
          return bRank - aRank;
        });
        break;
    }
  }

  return result;
}

