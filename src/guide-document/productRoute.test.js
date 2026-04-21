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
// Content-Type: multipart/form-data
// Body (form-data fields):
//   prd_id      : "PRD002"              (text)
//   prd_name    : "Apple iPhone 15"     (text)
//   category_id : "CAT001"              (text)
//   brand_id    : "BRAND002"            (text)
//   stock_date  : "2024-02-01"          (text)
//   exp_date    : "2026-02-01"          (text)
//   qty         : "100"                 (text)
//   unit_cost   : "800"                 (text)
//   telegram    : "TELE002"             (text)
//   status      : "avaible"             (text)
//   remark      : "Latest iPhone model" (text)
//   photo       : <select image file>   (file)
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
// PUT /api/product
// Content-Type: multipart/form-data
// Body (form-data fields - only include fields to update):
//   prd_id      : "PRD001"              (text, required)
//   prd_name    : "Samsung TV 65 inch"  (text, optional)
//   qty         : "30"                  (text, optional)
//   unit_cost   : "700"                 (text, optional)
//   status      : "low"                 (text, optional)
//   remark      : "Updated stock"       (text, optional)
//   photo       : <select new image>    (file, optional - omit to keep existing photo)
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

// Create new product (with photo file upload)
curl -X POST "http://localhost:3000/api/product" \
  -F "prd_id=PRD003" \
  -F "prd_name=LG Refrigerator" \
  -F "category_id=CAT001" \
  -F "brand_id=BRAND003" \
  -F "stock_date=2024-02-10" \
  -F "exp_date=2026-02-10" \
  -F "qty=25" \
  -F "unit_cost=900" \
  -F "telegram=TELE003" \
  -F "status=avaible" \
  -F "remark=Side by side fridge" \
  -F "photo=@/path/to/lg_fridge.jpg"

// Update product (text fields only, no photo change)
curl -X PUT "http://localhost:3000/api/product" \
  -F "prd_id=PRD001" \
  -F "qty=40" \
  -F "status=low" \
  -F "remark=Stock updated"

// Update product (with new photo)
curl -X PUT "http://localhost:3000/api/product" \
  -F "prd_id=PRD001" \
  -F "qty=40" \
  -F "photo=@/path/to/new_photo.jpg"

// Delete product
curl -X DELETE "http://localhost:3000/api/product/PRD001"
*/
