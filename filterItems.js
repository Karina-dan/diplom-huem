
export const filterItems = (filters, items) => {
  let filtered = [...items];

  if (filters.discount) {
    filtered = items.filter(item => item.discount > 0);
  }
  if (filters.guarantee) {
    filtered = filtered.filter(item => item.garancy > 0);
  }
  if (filters.price.min && filters.price.max) {
    filtered = filtered.filter(item =>
      item.discountPrice >= filters.price.min && item.discountPrice <= filters.price.max
    );
  }
  return filtered;
};