
export const sortItems = (sort, items) => {
  switch (sort.type) {
    case 'vendor':
      items.sort((leftHand, rightHand) => {
        if (sort.reverse) {
          return leftHand.vendor.toLowerCase() > rightHand.vendor.toLowerCase() ? 1 : -1;
        } else {
          return leftHand.vendor.toLowerCase() > rightHand.vendor.toLowerCase() ? -1 : 1;
        }
      });
      break;
    case 'rating':
      items.sort((leftHand, rightHand) => {
        if (sort.reverse) {
          return leftHand.rating > rightHand.rating ? 1 : -1;
        } else {
          return leftHand.rating > rightHand.rating ? -1 : 1;
        }
      });
      break;
    case 'price':
      items.sort((leftHand, rightHand) => {
        if (sort.reverse) {
          return leftHand.discountPrice > rightHand.discountPrice ? 1 : -1;
        } else {
          return leftHand.discountPrice > rightHand.discountPrice ? -1 : 1;
        }
      });
      break;
    default: break;
  }
}