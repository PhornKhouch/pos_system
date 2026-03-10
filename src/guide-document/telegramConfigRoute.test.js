/**
 * Telegram Config Route Testing Examples
 * Test these endpoints using Postman, curl, or any HTTP client
 */

// ============================================
// GET All Telegram Configs
// ============================================
// GET /api/telegram-config
// Response:
// [
//   {
//     "tel_id": "TELE001",
//     "token": "123456:ABCDEF",
//     "group_id": "-1001234567890",
//     "status": "active",
//     "is_alert": "1"
//   }
// ]

// ============================================
// GET Telegram Config by tel_id
// ============================================
// GET /api/telegram-config/TELE001
// Response:
// {
//   "tel_id": "TELE001",
//   "token": "123456:ABCDEF",
//   "group_id": "-1001234567890",
//   "status": "active",
//   "is_alert": "1"
// }

// ============================================
// CREATE Telegram Config
// ============================================
// POST /api/telegram-config
// Content-Type: application/json
// Body:
// {
//   "tel_id": "TELE002",
//   "token": "654321:ZYXWVU",
//   "group_id": "-1009876543210",
//   "status": "active",
//   "is_alert": "1"
// }
// Response:
// {
//   "tel_id": "TELE002",
//   "token": "654321:ZYXWVU",
//   "group_id": "-1009876543210",
//   "status": "active",
//   "is_alert": "1"
// }

// ============================================
// UPDATE Telegram Config
// ============================================
// PUT /api/telegram-config/TELE002
// Content-Type: application/json
// Body:
// {
//   "token": "654321:NEW",
//   "group_id": "-1009876543210",
//   "status": "inactive",
//   "is_alert": "0"
// }
// Response:
// {
//   "message": "Updated successfully"
// }

// ============================================
// DELETE Telegram Config
// ============================================
// DELETE /api/telegram-config/TELE002
// Response:
// {
//   "message": "Deleted successfully"
// }

// ============================================
// CURL Command Examples for Testing
// ============================================

/*
curl -X GET "http://localhost:3000/api/telegram-config"
curl -X GET "http://localhost:3000/api/telegram-config/TELE001"
curl -X POST "http://localhost:3000/api/telegram-config" -H "Content-Type: application/json" -d '{"tel_id":"TELE002","token":"654321:ZYXWVU","group_id":"-1009876543210","status":"active","is_alert":"1"}'
curl -X PUT "http://localhost:3000/api/telegram-config/TELE002" -H "Content-Type: application/json" -d '{"token":"654321:NEW","group_id":"-1009876543210","status":"inactive","is_alert":"0"}'
curl -X DELETE "http://localhost:3000/api/telegram-config/TELE002"
*/
