/**
 * Product Route Testing Examples
 * Test these endpoints using Postman, curl, or any HTTP client
 */

// ============================================
// GET All Products
// ============================================
// GET /api/product
// Response:
// {
//   "success": true,
//   "data": [
//     {
//       "prd_id": "PRD001",
//       "prd_name": "Samsung TV 55 inch",
//       "category_id": "CAT001",
//       "brand_id": "BRAND001",
//       "stock_date": "2024-01-15",
//       "exp_date": "2026-01-15",
//       "qty": 50,
//       "unit_cost": 500,
//       "telegram": "TELE001",
//       "status": "avaible",
//       "remark": "4K UHD TV",
//       "photo": "samsung_tv.png"
//     }
//   ]
// }

// ============================================
// GET Product by ID (Query Parameter)
// ============================================
// GET /api/product?prd_id=PRD001
// Response:
// {
//   "success": true,
//   "data": {
//     "prd_id": "PRD001",
//     "prd_name": "Samsung TV 55 inch",
//     "category_id": "CAT001",
//     "brand_id": "BRAND001",
//     "stock_date": "2024-01-15",
//     "exp_date": "2026-01-15",
//     "qty": 50,
//     "unit_cost": 500,
//     "telegram": "TELE001",
//     "status": "avaible",
//     "remark": "4K UHD TV",
//     "photo": "samsung_tv.png"
//   }
// }

// ============================================
// SEARCH Products
// ============================================
// GET /api/product/search?keyword=samsung
// Response:
// {
//   "success": true,
//   "data": [
//     {
//       "prd_id": "PRD001",
//       "prd_name": "Samsung TV 55 inch",
//       "category_id": "CAT001",
//       "brand_id": "BRAND001",
//       "stock_date": "2024-01-15",
//       "exp_date": "2026-01-15",
//       "qty": 50,
//       "unit_cost": 500,
//       "telegram": "TELE001",
//       "status": "avaible",
//       "remark": "4K UHD TV",
//       "photo": "samsung_tv.png"
//     }
//   ],
//   "count": 1
// }

// ============================================
// CREATE a New Product
// ============================================
// POST /api/product
// Content-Type: application/json
// Body:
// {
//   "prd_id": "PRD002",
//   "prd_name": "Apple iPhone 15",
//   "category_id": "CAT001",
//   "brand_id": "BRAND002",
//   "stock_date": "2024-02-01",
//   "exp_date": "2026-02-01",
//   "qty": 100,
//   "unit_cost": 800,
//   "telegram": "TELE002",
//   "status": "avaible",
//   "remark": "Latest iPhone model",
//   "photo": "iphone15.png"
// }
// Response:
// {
//   "success": true,
//   "message": "Product created successfully",
//   "data": {
//     "prd_id": "PRD002",
//     "prd_name": "Apple iPhone 15",
//     "category_id": "CAT001",
//     "brand_id": "BRAND002",
//     "stock_date": "2024-02-01",
//     "exp_date": "2026-02-01",
//     "qty": 100,
//     "unit_cost": 800,
//     "telegram": "TELE002",
//     "status": "avaible",
//     "remark": "Latest iPhone model",
//     "photo": "iphone15.png"
//   }
// }

// ============================================
// UPDATE a Product
// ============================================
// PUT /api/product/PRD001
// Content-Type: application/json
// Body:
// {
//   "prd_name": "Samsung TV 65 inch",
//   "qty": 30,
//   "unit_cost": 700,
//   "status": "low",
//   "remark": "Updated stock"
// }
// Response:
// {
//   "success": true,
//   "message": "Product updated successfully",
//   "data": {
//     "prd_id": "PRD001",
//     "prd_name": "Samsung TV 65 inch",
//     "category_id": "CAT001",
//     "brand_id": "BRAND001",
//     "stock_date": "2024-01-15",
//     "exp_date": "2026-01-15",
//     "qty": 30,
//     "unit_cost": 700,
//     "telegram": "TELE001",
//     "status": "low",
//     "remark": "Updated stock",
//     "photo": "samsung_tv.png"
//   }
// }

// ============================================
// DELETE a Product
// ============================================
// DELETE /api/product/PRD001
// Response:
// {
//   "success": true,
//   "message": "Product deleted successfully"
// }

// ============================================
// Status Values
// ============================================
// "low" - Low stock
// "avaible" - Available
// "unvaible" - Unavailable

// ============================================
// CURL Command Examples for Testing
// ============================================

/*
// Search products (keyword: samsung)
curl -X GET "http://localhost:3000/api/product/search?keyword=samsung"

// Get all products
curl -X GET "http://localhost:3000/api/product"

// Get specific product by ID
curl -X GET "http://localhost:3000/api/product?prd_id=PRD001"

// Create new product
curl -X POST "http://localhost:3000/api/product" \
  -H "Content-Type: application/json" \
  -d '{
    "prd_id":"PRD003",
    "prd_name":"LG Refrigerator",
    "category_id":"CAT001",
    "brand_id":"BRAND003",
    "stock_date":"2024-02-10",
    "exp_date":"2026-02-10",
    "qty":25,
    "unit_cost":900,
    "telegram":"TELE003",
    "status":"avaible",
    "remark":"Side by side fridge",
    "photo":"lg_fridge.png"
  }'

// Update product
curl -X PUT "http://localhost:3000/api/product/PRD001" \
  -H "Content-Type: application/json" \
  -d '{
    "qty":40,
    "status":"low",
    "remark":"Stock updated"
  }'

// Delete product
curl -X DELETE "http://localhost:3000/api/product/PRD001"
*/
