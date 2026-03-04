// 페이지네이션 슬라이스 범위 계산 (offset/limit)
export const getSliceIndex = (products, query) => {
  const offset = query.offset ? Number(query.offset) : 0;
  const limit = query.limit ? Number(query.limit) : products.length;
  const endIndex = offset + limit > products.length ? products.length : offset + limit;

  return { startIndex: offset, endIndex };
};

// 카테고리 필터: 유효한 categoryId(1~5)만 적용
export const getProductsByCategoryId = (products, categoryId) => {
  const numberCategoryId = Number(categoryId);

  return numberCategoryId > 0 && numberCategoryId < 6
    ? products.filter((item) => item.category.id === numberCategoryId)
    : products;
};

// 단일 가격 필터
export const getProductsByPrice = (products, price) =>
  price ? products.filter((item) => item.price === Number(price)) : products;

// 가격 범위 필터: min/max 미입력 시 전체 범위 허용
export const getProductsByPriceRange = ({ products, minPrice, maxPrice }) => {
  const minValue = minPrice ? Number(minPrice) : Number.MIN_SAFE_INTEGER;
  const maxValue = maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;

  return products.filter((item) => item.price >= minValue && item.price <= maxValue);
};

// 상품명 부분 일치 검색
export const getProductsByTitle = (products, title) =>
  title ? products.filter((item) => item.title.includes(title)) : products;

// 강의와 동일한 필터 체인 순서 유지
// categoryId -> priceRange -> price -> title
export const getFilteredProductsByQuery = (products, query) => {
  const categoryFiltered = getProductsByCategoryId(products, query.categoryId);
  const priceRangeFiltered = getProductsByPriceRange({
    products: categoryFiltered,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
  });
  const priceFiltered = getProductsByPrice(priceRangeFiltered, query.price);

  return getProductsByTitle(priceFiltered, query.title);
};
