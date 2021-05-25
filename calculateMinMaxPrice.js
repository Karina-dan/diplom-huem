import {countDiscount} from './countDiscount';

export const calculateMinMaxPrice = (items) => {
  countDiscount(items);
  let min = items[0].discountPrice;
  let max = items[0].discountPrice;
  items.forEach(item => {
    if (item.discountPrice < min) {
      min = item.discountPrice;
    }
    if (item.discountPrice > max) {
      max = item.discountPrice;
    }
  })
  return {min, max};
};