/**
 * Brand Route Testing Examples
 * Test these endpoints using Postman, curl, or any HTTP client
 */

// ============================================
// GET All Brands
// ============================================
// GET /api/brand
// Response:
// {
//   "success": true,
//   "data": [
//     {
//       "code": "BRAND001",
//       "desc": "Samsung",
//       "category_id": "CAT001",
//       "remark": "Electronics Brand",
//       "photo": "samsung_logo.png"
//     },
//     {
//       "code": "BRAND002",
//       "desc": "Apple",
//       "category_id": "CAT001",
//       "remark": "Premium Electronics",
//       "photo": "apple_logo.png"
//     }
//   ]
// }

// ============================================
// GET Brand by Code (Query Parameter)
// ============================================
// GET /api/brand?code=BRAND001
// Response:
// {
//   "success": true,
//   "data": {
//     "code": "BRAND001",
//     "desc": "Samsung",
//     "category_id": "CAT001",
//     "remark": "Electronics Brand",
//     "photo": "samsung_logo.png"
//   }
// }

// ============================================
// SEARCH Brands
// ============================================
// GET /api/brand/search?keyword=samsung
// Response:
// {
//   "success": true,
//   "data": [
//     {
//       "code": "BRAND001",
//       "desc": "Samsung",
//       "category_id": "CAT001",
//       "remark": "Electronics Brand",
//       "photo": "samsung_logo.png"
//     }
//   ],
//   "count": 1
// }

// ============================================
// CREATE a New Brand
// ============================================
// POST /api/brand
// Content-Type: application/json
// Body:
// {
//   "code": "BRAND003",
//   "desc": "Nike",
//   "category_id": "CAT002",
//   "remark": "Sports Footwear",
//   "photo": "nike_logo.png"
// }
// Response:
// {
//   "success": true,
//   "message": "Brand created successfully",
//   "data": {
//     "code": "BRAND003",
//     "desc": "Nike",
//     "category_id": "CAT002",
//     "remark": "Sports Footwear",
//     "photo": "nike_logo.png"
//   }
// }

// ============================================
// UPDATE a Brand
// ============================================
// PUT /api/brand/BRAND001
// Content-Type: application/json
// Body:
// {
//   "desc": "Samsung Electronics Updated",
//   "remark": "Updated remark",
//   "photo": "samsung_new_logo.png"
// }
// Response:
// {
//   "success": true,
//   "message": "Brand updated successfully",
//   "data": {
//     "code": "BRAND001",
//     "desc": "Samsung Electronics Updated",
//     "category_id": "CAT001",
//     "remark": "Updated remark",
//     "photo": "samsung_new_logo.png"
//   }
// }

// ============================================
// DELETE a Brand
// ============================================
// DELETE /api/brand/BRAND001
// Response:
// {
//   "success": true,
//   "message": "Brand deleted successfully"
// }

// ============================================
// CURL Command Examples for Testing
// ============================================

/*
// Search brands (keyword: samsung)
curl -X GET "http://localhost:3000/api/brand/search?keyword=samsung"

// Get all brands
curl -X GET "http://localhost:3000/api/brand"

// Get specific brand by code
curl -X GET "http://localhost:3000/api/brand?code=BRAND001"

// Create new brand
curl -X POST "http://localhost:3000/api/brand" \
  -H "Content-Type: application/json" \
  -d '{"code":"BRAND004","desc":"LG","category_id":"CAT001","remark":"Electronics","photo":"lg_logo.png"}'

// Update brand
curl -X PUT "http://localhost:3000/api/brand/BRAND001" \
  -H "Content-Type: application/json" \
  -d '{"desc":"Samsung New","remark":"Updated","photo":"samsung_updated.png"}'

// Delete brand
curl -X DELETE "http://localhost:3000/api/brand/BRAND001"
*/
