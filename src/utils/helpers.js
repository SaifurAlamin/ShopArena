export const truncateText = (text = "", limit = 80) =>
  text.length > limit ? `${text.slice(0, limit).trim()}...` : text;

export const getDiscountPercentage = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

export const classNames = (...classes) => classes.filter(Boolean).join(" ");