const axios = require("axios");

const sendTelegramMessage = async (text) => {
  try {
    const token = "8541082408:AAGGCDXvWOzK8JMDVXL1-Cv5NcwftbnzMJ4";
    const chatId = "-1003485010428";

    if (!token || !chatId) {
      console.log("Telegram bot token or chat ID is not configured - skipping notification");
      return;
    }
    console.log("Sending Telegram message to chat ID:", chatId);
    
    const response = await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    });
    
    console.log("✅ Telegram notification sent successfully! Message ID:", response.data.result.message_id);
  } catch (error) {
    console.error("❌ Telegram send error:");
    console.error("   Status:", error.response?.status);
    console.error("   Error:", error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      console.error("   Possible causes:");
      console.error("   - Chat ID is incorrect");
      console.error("   - You have not started a conversation with the bot (send /start)");
      console.error("   - Bot is blocked by the user");
    }
  }
};

const alertNewSale = async (sale) => {
  try {
    // Use created_on for accurate timestamp with time, fallback to sale_date
    const dateToFormat = sale.created_on || sale.sale_date || new Date();
    console.log('📅 Input to format:', dateToFormat, 'Type:', typeof dateToFormat);
    const formattedDate = new Date(dateToFormat).toLocaleString("en-US", { timeZone: "Asia/Phnom_Penh" });
    console.log('✅ Formatted output:', formattedDate, 'Type:', typeof formattedDate);
    
    const message =
      `🧾 <b>New Sale</b>\n\n` +
      `<b>Sale ID:</b> ${sale.sale_id}\n` +
      `<b>Invoice ID:</b> ${sale.invoice_id}\n` +
      `<b>Amount:</b> $${parseFloat(sale.amount || 0).toFixed(2)}\n` +
      `<b>Subtotal:</b> $${parseFloat(sale.sub_total || 0).toFixed(2)}\n` +
      `<b>Tax:</b> $${parseFloat(sale.tax || 0).toFixed(2)}\n` +
      `<b>Payment Method:</b> ${sale.pay_method}\n` +
      `<b>Date:</b> ${formattedDate}\n` +
      `<b>Created By:</b> ${sale.create_by}`;

    console.log('📤 Sending message with formatted date');
    await sendTelegramMessage(message);
  } catch (error) {
    console.error('❌ Error in alertNewSale:', error.message);
  }
};

const alertLowStock = async (product) => {
  const message =
    `⚠️ <b>Low Stock Alert</b>\n\n` +
    `<b>Product ID:</b> ${product.prd_id}\n` +
    `<b>Name:</b> ${product.prd_name}\n` +
    `<b>Quantity Left:</b> ${product.qty}\n` +
    `<b>Status:</b> Low Stock (≤10 items)`;

  await sendTelegramMessage(message);
};

const alertOutOfStock = async (product) => {
  const message =
    `❌ <b>Out of Stock Alert</b>\n\n` +
    `<b>Product ID:</b> ${product.prd_id}\n` +
    `<b>Name:</b> ${product.prd_name}\n` +
    `<b>Quantity:</b> ${product.qty}\n` +
    `<b>Status:</b> OUT OF STOCK`;

  await sendTelegramMessage(message);
};

module.exports = {
  sendTelegramMessage,
  alertNewSale,
  alertLowStock,
  alertOutOfStock,
};
