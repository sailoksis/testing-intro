function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  const newQuantity = existingProduct
    ? existingProduct.quantity + quantity
    : quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе');
  }

  if (existingProduct) {
    return cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: newQuantity };
      }

      return item;
    });
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  const existingProduct = cart.find(
    (item) => item.id === productId
  );

  if (!existingProduct) {
    return [...cart];
  }

  if (quantity <= 0 || quantity > existingProduct.stock) {
    throw new RangeError('Недопустимое количество товара');
  }

  return cart.map((item) => {
    if (item.id === productId) {
      return { ...item, quantity };
    }

    return item;
  });
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
