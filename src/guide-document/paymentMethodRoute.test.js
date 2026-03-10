/**
 * Payment Method Route Testing Examples
 * Test these endpoints using Postman, curl, or any HTTP client
 */

// ============================================
// GET All Payment Methods
// ============================================
// GET /api/payment-method
// Response:
// [
//   {
//     "code": "CASH",
//     "type": "Cash",
//     "is_active": 1,
//     "fee": 0.00
//   }
// ]

// ============================================
// GET Payment Method by Code
// ============================================
// GET /api/payment-method/CASH
// Response:
// {
//   "code": "CASH",
//   "type": "Cash",
//   "is_active": 1,
//   "fee": 0.00
// }

// ============================================
// CREATE Payment Method
// ============================================
// POST /api/payment-method
// Content-Type: application/json
// Body:
// {
//   "code": "CARD",
//   "type": "Credit Card",
//   "is_active": 1,
//   "fee": 2.5
// }
// Response:
// {
//   "code": "CARD",
//   "type": "Credit Card",
//   "is_active": 1,
//   "fee": 2.5
// }

// ============================================
// UPDATE Payment Method
// ============================================
// PUT /api/payment-method/CARD
// Content-Type: application/json
// Body:
// {
//   "type": "Debit Card",
//   "is_active": 1,
//   "fee": 1.5
// }
// Response:
// {
//   "message": "Updated successfully"
// }

// ============================================
// DELETE Payment Method
// ============================================
// DELETE /api/payment-method/CARD
// Response:
// {
//   "message": "Deleted successfully"
// }

// ============================================
// CURL Command Examples for Testing
// ============================================

/*
curl -X GET "http://localhost:3000/api/payment-method"
curl -X GET "http://localhost:3000/api/payment-method/CASH"
curl -X POST "http://localhost:3000/api/payment-method" -H "Content-Type: application/json" -d '{"code":"CARD","type":"Credit Card","is_active":1,"fee":2.5}'
curl -X PUT "http://localhost:3000/api/payment-method/CARD" -H "Content-Type: application/json" -d '{"type":"Debit Card","is_active":1,"fee":1.5}'
curl -X DELETE "http://localhost:3000/api/payment-method/CARD"
*/
