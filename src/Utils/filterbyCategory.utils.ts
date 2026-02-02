import { CategoryInterface, ProductDataInterface } from "../Services/NewsData";

export const filterByCategory = (
  items: ProductDataInterface[],
  category?: CategoryInterface
): ProductDataInterface[] => {
  if (!category) return items;

  return items.filter(
    item =>
      item.category_id === category.id ||
      item.category === category.name
  );
};

export const filterBySearch = (
  items: ProductDataInterface[],
  searchQuery: string
): ProductDataInterface[] => {
  if (!searchQuery.trim()) return items;

  const lowerQuery = searchQuery.toLowerCase();

  return items.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery)
  );
};

