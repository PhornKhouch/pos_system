const { BakongKHQR, khqrData, IndividualInfo, MerchantInfo } = require("bakong-khqr");
const axios = require('axios');
const logError = require('../utils/logger');

/**
 * Check payment status using Bakong Open API (Official Spec)
 * POST /api/khqr/check-payment
 * Body: { hash, md5 }
 * 
 * Official API Endpoints:
 * - POST /v1/check_transaction_by_hash (body: { hash })
 * - POST /v1/check_transaction_by_md5 (body: { md5 })
 */
const checkPaymentStatus = async (req, res) => {
    try {
        const { hash, md5 } = req.body;
        
        // Check if Bakong API is enabled
        if (process.env.BAKONG_API_ENABLED !== 'true') {
            return res.status(400).json({
                success: false,
                message: 'Bakong API verification is not enabled. Please configure BAKONG_API_TOKEN in .env',
            });
        }

        if (!hash && !md5) {
            return res.status(400).json({
                success: false,
                message: 'Hash or MD5 is required',
            });
        }

        // Call Bakong Open API to check transaction status
        const apiUrl = process.env.BAKONG_API_URL || 'https://sit-api-bakong.nbc.org.kh';
        const apiToken = process.env.BAKONG_API_TOKEN;

        // Determine which endpoint to use based on provided parameter
        const endpoint = hash ? '/v1/check_transaction_by_hash' : '/v1/check_transaction_by_md5';
        const requestBody = hash ? { hash } : { md5 };

        const response = await axios.post(`${apiUrl}${endpoint}`, requestBody, {
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json',
            },
            timeout: 10000, // 10 seconds timeout
        });

        // Official response format:
        // { responseCode: 0, responseMessage: "...", data: {...} }
        // responseCode: 0 = Success, 1 = Failed
        
        if (response.data && response.data.responseCode === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    hash: response.data.data.hash,
                    fromAccountId: response.data.data.fromAccountId,
                    toAccountId: response.data.data.toAccountId,
                    currency: response.data.data.currency,
                    amount: response.data.data.amount,
                    description: response.data.data.description,
                },
                message: response.data.responseMessage || 'Transaction found successfully',
            });
        }

        // responseCode: 1 = Failed
        return res.status(404).json({
            success: false,
            message: response.data?.responseMessage || 'Transaction not found',
        });

    } catch (error) {
        console.error("Bakong API check payment error:", error.message);
        
        if (error.response) {
            // Handle HTTP error codes: 400, 401, 404, 500
            const statusCode = error.response.status;
            const errorMessage = error.response.data?.responseMessage || 
                                error.response.data?.message || 
                                'Failed to check payment status';
            
            return res.status(statusCode).json({
                success: false,
                message: errorMessage,
            });
        }
        
        logError("khqrController - checkPaymentStatus", { message: error.message || 'Unknown error' }, res);
    }
};

/**
 * Generate a KHQR QR code string for payment
 * POST /api/khqr/generate
 * Body: { amount, currency, billNumber, storeLabel, terminalLabel }
 */
const generateKHQR = async (req, res) => {
    try {
        const { amount, currency, billNumber } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount is required and must be greater than 0',
            });
        }

        // ─── Configure your Bakong account info here ───
        // TODO: Replace with your real Bakong account ID (e.g., "yourname@wing", "yourname@abaa")
        const BAKONG_ACCOUNT_ID = process.env.BAKONG_ACCOUNT_ID || "khouch_phorn@bkrt";
        const MERCHANT_NAME = process.env.MERCHANT_NAME || "My Store";
        const MERCHANT_CITY = process.env.MERCHANT_CITY || "Phnom Penh";

        // Determine currency (default USD)
        const qrCurrency = currency === "KHR"
            ? khqrData.currency.khr
            : khqrData.currency.usd;

        const optionalData = {
            currency: qrCurrency,
            amount: parseFloat(amount),
            billNumber: billNumber || `INV-${Date.now()}`,
            mobileNumber: process.env.MERCHANT_PHONE || "",
            storeLabel: process.env.STORE_LABEL || "POS Store",
            terminalLabel: "POS-T1",
            expirationTimestamp: Date.now() + (5 * 60 * 1000), // expires in 5 minutes
        };

        const individualInfo = new IndividualInfo(
            BAKONG_ACCOUNT_ID,
            qrCurrency,
            MERCHANT_NAME,
            MERCHANT_CITY,
            optionalData
        );

        const khqr = new BakongKHQR();
        const response = khqr.generateIndividual(individualInfo);

        if (response && response.data) {
            // response.data.qr contains the EMV-compliant KHQR string
            // This string can be encoded into a QR code image for customers to scan
            // with any Bakong-supported banking app (ABA, Wing, ACLEDA, etc.)
            return res.status(200).json({
                success: true,
                data: {
                    qr: response.data.qr,       // The KHQR string to encode as QR image
                    md5: response.data.md5,       // MD5 hash for verification
                    merchantName: MERCHANT_NAME,
                    currency: currency || 'USD',
                    amount: parseFloat(amount),
                },
                message: 'KHQR generated successfully',
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to generate KHQR',
        });

    } catch (error) {
        console.error("KHQR generation error:", error);
        logError("khqrController", { message: error.message || 'Unknown error' }, res);
    }
};

/**
 * Verify/decode a KHQR string
 * POST /api/khqr/verify
 * Body: { qrString }
 */
const verifyKHQR = async (req, res) => {
    try {
        const { qrString } = req.body;

        if (!qrString) {
            return res.status(400).json({
                success: false,
                message: 'QR string is required',
            });
        }

        const isValid = BakongKHQR.verify(qrString).isValid;
        const decoded = BakongKHQR.decode(qrString);

        return res.status(200).json({
            success: true,
            data: {
                isValid,
                decoded,
            },
        });
    } catch (error) {
        console.error("KHQR verify error:", error);
        logError("khqrController", { message: error.message || 'Unknown error' }, res);
    }
};

module.exports = {
    generateKHQR,
    verifyKHQR,
    checkPaymentStatus,
};
