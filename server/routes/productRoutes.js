import { categoriesJSON, productsJSON } from '../repositories/responseRepository.js';
import { getFilteredProductsByQuery, getSliceIndex } from '../services/productService.js';

// 상품 목록/상세 라우트 등록
export const registerProductRoutes = (app) => {
  // 목록 조회: 필터 + 페이지네이션 + lastPage 계약 반환
  app.get('/products', (req, res) => {
    const filteredProducts = getFilteredProductsByQuery(productsJSON, req.query);
    const { startIndex, endIndex } = getSliceIndex(filteredProducts, req.query);

    res.send({
      products: filteredProducts.slice(startIndex, endIndex),
      lastPage: endIndex === filteredProducts.length,
    });
  });

  // 상세 조회: id 미존재 시 강의 기준으로 404 + "not found"
  app.get('/products/:id', (req, res) => {
    const product = productsJSON.find(({ id }) => String(id) === req.params.id);

    if (!product) {
      return res.status(404).send('not found');
    }

    return res.send(product);
  });

  // 강의: /categories는 categories.json 원본 형태로 반환
  // 내 프로젝트: 라우트 분리 구조는 유지하고 응답 계약은 강의와 동일하게 맞춤
  app.get('/categories', (_, res) => {
    res.send(categoriesJSON);
  });
};
