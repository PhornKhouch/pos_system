const fs = require("fs/promises");
const path = require("path");
const moment = require("moment");

const logError = async (controller,err,res) => {
    try {
        const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
        const folderPath = path.join(__dirname, "../../logs");
        const filePath = path.join(folderPath, `${controller}${moment().format("YYYY-MM-DD")}.txt`);
        // Create "logs" folder if missing
        await fs.mkdir(folderPath, { recursive: true });
        const logMessage = `[${timestamp}] ${err.message}\n`;

        await fs.appendFile(filePath, logMessage);

    } catch (error) {
        console.error("Error writing to log file:", error);
    }

    res.status(500).send("Internal Server Error!");
};

module.exports = logError;
