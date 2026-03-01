/**
 * Category Route Testing Examples
 * Test these endpoints using Postman, curl, or any HTTP client
 */

// ============================================
// GET All Categories
// ============================================
// GET /api/category
// Response:
// {
//   "success": true,
//   "data": [
//     {
//       "code": "CAT001",
//       "desc": "Electronics",
//       "remark": "Electronic devices"
//     },
//     {
//       "code": "CAT002",
//       "desc": "Clothing",
//       "remark": "All types of clothing"
//     }
//   ]
// }

// ============================================
// GET Category by Code (Query Parameter)
// ============================================
// GET /api/category?code=CAT001
// Response:
// {
//   "success": true,
//   "data": {
//     "code": "CAT001",
//     "desc": "Electronics",
//     "remark": "Electronic devices"
//   }
// }

// ============================================
// SEARCH Categories
// ============================================
// GET /api/category/search?keyword=electronics
// Response:
// {
//   "success": true,
//   "data": [
//     {
//       "code": "CAT001",
//       "desc": "Electronics",
//       "remark": "Electronic devices"
//     }
//   ],
//   "count": 1
// }

// ============================================
// CREATE a New Category
// ============================================
// POST /api/category
// Content-Type: application/json
// Body:
// {
//   "code": "CAT003",
//   "desc": "Books",
//   "remark": "Educational books"
// }
// Response:
// {
//   "success": true,
//   "message": "Category created successfully",
//   "data": {
//     "code": "CAT003",
//     "desc": "Books",
//     "remark": "Educational books"
//   }
// }

// ============================================
// UPDATE a Category
// ============================================
// PUT /api/category/CAT001
// Content-Type: application/json
// Body:
// {
//   "desc": "Updated Electronics",
//   "remark": "Updated remark"
// }
// Response:
// {
//   "success": true,
//   "message": "Category updated successfully",
//   "data": {
//     "code": "CAT001",
//     "desc": "Updated Electronics",
//     "remark": "Updated remark"
//   }
// }

// ============================================
// DELETE a Category
// ============================================
// DELETE /api/category/CAT001
// Response:
// {
//   "success": true,
//   "message": "Category deleted successfully"
// }

// ============================================
// CURL Command Examples for Testing
// ============================================

/*
// Search categories (keyword: electronics)
curl -X GET "http://localhost:3000/api/category/search?keyword=electronics"

// Get all categories
curl -X GET "http://localhost:3000/api/category"

// Get specific category by code
curl -X GET "http://localhost:3000/api/category?code=CAT001"

// Create new category
curl -X POST "http://localhost:3000/api/category" \
  -H "Content-Type: application/json" \
  -d '{"code":"CAT004","desc":"Furniture","remark":"Home furniture"}'

// Update category
curl -X PUT "http://localhost:3000/api/category/CAT001" \
  -H "Content-Type: application/json" \
  -d '{"desc":"New Description","remark":"New remark"}'

// Delete category
curl -X DELETE "http://localhost:3000/api/category/CAT001"
*/
