const coffeeDetails = require("../../models/uploadCoffee/upload_coffee_details_model");
const { sendFail, sendError, sendSuccess } = require("../../utils");

async function getItemsDetails(req, res) {
    try {

        const coffees = await coffeeDetails.find();

        if (!coffees || coffees.length ==0) {
          return  sendFail(res, 404, "No Data Found");
        }

        sendSuccess(res, 200, "Coffee details retrieved successfully.", coffees);

    } catch (e) {

        console.log(`error ${e}`);
        sendError(res, e);
    }

}

module.exports = {getItemsDetails};