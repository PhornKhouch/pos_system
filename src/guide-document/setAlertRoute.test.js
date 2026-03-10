/**
 * Alert Setting Route Testing Examples
 * Test these endpoints using Postman, curl, or any HTTP client
 */

// ============================================
// GET All Alert Settings
// ============================================
// GET /api/alert-setting
// Response:
// [
//   {
//     "id": 1,
//     "Stock_alert": 5,
//     "Qty_alert": 0,
//     "remark": "Default stock alert",
//     "is_alert": 1
//   }
// ]

// ============================================
// GET Alert Setting by ID
// ============================================
// GET /api/alert-setting/1
// Response:
// {
//   "id": 1,
//   "Stock_alert": 5,
//   "Qty_alert": 0,
//   "remark": "Default stock alert",
//   "is_alert": 1
// }

// ============================================
// CREATE Alert Setting
// ============================================
// POST /api/alert-setting
// Content-Type: application/json
// Body:
// {
//   "Stock_alert": 10,
//   "Qty_alert": 2,
//   "remark": "Custom alert",
//   "is_alert": 1
// }
// Response:
// {
//   "id": 2,
//   "Stock_alert": 10,
//   "Qty_alert": 2,
//   "remark": "Custom alert",
//   "is_alert": 1
// }

// ============================================
// UPDATE Alert Setting
// ============================================
// PUT /api/alert-setting/2
// Content-Type: application/json
// Body:
// {
//   "Stock_alert": 8,
//   "Qty_alert": 1,
//   "remark": "Updated alert",
//   "is_alert": 0
// }
// Response:
// {
//   "message": "Updated successfully"
// }

// ============================================
// DELETE Alert Setting
// ============================================
// DELETE /api/alert-setting/2
// Response:
// {
//   "message": "Deleted successfully"
// }

// ============================================
// CURL Command Examples for Testing
// ============================================

/*
curl -X GET "http://localhost:3000/api/alert-setting"
curl -X GET "http://localhost:3000/api/alert-setting/1"
curl -X POST "http://localhost:3000/api/alert-setting" -H "Content-Type: application/json" -d '{"Stock_alert":10,"Qty_alert":2,"remark":"Custom alert","is_alert":1}'
curl -X PUT "http://localhost:3000/api/alert-setting/2" -H "Content-Type: application/json" -d '{"Stock_alert":8,"Qty_alert":1,"remark":"Updated alert","is_alert":0}'
curl -X DELETE "http://localhost:3000/api/alert-setting/2"
*/
