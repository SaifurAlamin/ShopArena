export const calculateSubtotal = (items = []) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const calculateShipping = (subtotal) =>
  subtotal === 0 || subtotal >= 3000 ? 0 : 80;

export const calculateDiscount = (subtotal, discount = 0) =>
  Math.max(0, subtotal * (discount / 100));

export const calculateGrandTotal = ({ subtotal = 0, shipping = 0, discount = 0 }) =>
  Math.max(0, subtotal + shipping - discount);