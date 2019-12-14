export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(item => {
      return item.id === cartItemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  }
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // memo: このコードはなくて良いと思う -> removeしようとしたcartItemがカートの中に入っているかを確認できる点でメリットがある(らしい)
  // -> 再考したらやっぱり無くても良さそう(結果は同じになるので)
  // const targetCartItem = cartItems.find(
  //   cartItem => cartItem.id === cartItemToRemove.id
  // );

  if (cartItemToRemove.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
