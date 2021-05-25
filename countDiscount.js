
export const countDiscount = (items) => {
  items.forEach(item => {
    if (item.discount > 0) {
      item.discountPrice = item.price - (item.price * (item.discount / 100));
    } else {
      item.discountPrice = item.price;
    }
  })
};