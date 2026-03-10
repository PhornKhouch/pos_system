const { DATE } = require('sequelize');
const { Sale , SaleItemDetail, MasterProduct } = require('../models');
const logError = require('../utils/logger');
const { alertNewSale } = require('../utils/sendtelegram');

// const buildPhotoPath = (req, file) => {
//     if (!file) {
//         return null;
//     }
//     return `/assets/upload/${file.filename}`;
// };
// GET all products or get by ID
const saleItem = async (req, res) => {
    try {
         //body parameters
        const {invoice_id,sale_date,amount,sub_total,tax,pay_method,create_by,created_on} = req.body;
        //sale
        const sale_id = `sale_${Date.now()}`; // generate unique sale_id using timestamp
        const now = new Date();
        const sale = await Sale.create({
            sale_id, // use the generated sale_id
            invoice_id,
            sale_date,
            amount,
            sub_total,
            tax,
            pay_method,
            create_by,
            created_on
        }); // save to database for sale item (header table)

        //proudct master 
        
        //sale details
        var ListItemSale = req.body.saleItems; // array of sale item details from request body
        for (let i = 0; i < ListItemSale.length; i++) {
            const item = ListItemSale[i];
            const std_id = `std${Date.now()}_${i}`; // unique: timestamp + index
            await SaleItemDetail.create({
                std_id: std_id,
                sale_id: sale_id, // use the generated sale_id from the header
                prd_id: item.prd_id,
                qty: item.qty,
                price: item.price,
            });

            // Update stock quantity for each product sold
            var product = await MasterProduct.findByPk(item.prd_id);
            if (product) {
                product.qty = product.qty - item.qty; // reduce stock by quantity sold
                await product.save(); // save updated product back to database
            }

            //send to telegram
            alertNewSale(sale);



            //notify low stock if qty is less than 10
                //seting if stock alert is on
                // if stock is on <> 5
        }


      
        res.status(200).json({
            success: true,
            message: 'Sale created successfully',
        });

    }
    catch (error) {
        console.log("Full error:", error); // Log full error for debugging
        console.log("Error name:", error.name);
        console.log("Error message:", error.message);
        console.log("Error errors:", error.errors); // Sequelize validation errors
        const errorMsg = error.errors ? error.errors.map(e => e.message).join(', ') : (error.message || 'Unknown error');
        console.log("Error to log:", errorMsg);
        logError("posSaleController", { message: errorMsg }, res);
    }
}

module.exports = {
    saleItem,
    // search,
    // create,
    // update,
    // deleteProduct
}