const ratingOption = [1, 2, 3, 4, 5];
const categoryOptionAv = [
  { cate: "Men", checked: false },
  { cate: "Women", checked: false },
  { cate: "Anyone", checked: false },
];
const brandOptionAv = [
  { brand: "Timex", checked: false },
  { brand: "Fossil", checked: false },
  { brand: "Fastrack", checked: false },
  { brand: "Casio", checked: false },
  { brand: "Amazfit", checked: false },
  { brand: "Armani exchange", checked: false },
];

const priceRanges = [
  { value: "", label: "-- Select price range --" },
  { value: "200-1000", label: "₹200 - ₹1000" },
  { value: "1000-10000", label: "₹1000 - ₹10000" },
  { value: "10000-25000", label: "₹10000 - ₹25000" },
  { value: "25000-60000", label: "₹25000 - ₹60000" },
];

export { ratingOption, categoryOptionAv, brandOptionAv, priceRanges };
