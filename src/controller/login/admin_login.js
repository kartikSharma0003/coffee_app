const Admin = require("../../models/auth/admin_login");
const { sendFail, sendError, sendSuccess } = require("../../utils");
const jwt = require("jsonwebtoken");
const {config} = require("../../config")


async function createAdmin(req, res) {
    try {
        const { id, password } = req.body;


        if (!id) {
            return sendFail(res, 400, "Please Enter Id");
        }
        if (!password) {
            return sendFail(res, 400, "Please Enter Password");
        }


        const exist = await Admin.findOne({ id });
        if (exist) {
            return sendFail(res, 400, "Admin Already Exists");
        }


        const admin = new Admin({ id, password });
        await admin.save();

        sendSuccess(res, 201, "Admin Created Successfully", admin);
    } catch (err) {

        sendError(res, err);
    }
}

async function loginAdmin(req, res) {
    try {
        const { id, password } = req.body;

        const admin = await Admin.findOne({ id });
        if (!admin) {
            return sendFail(res, 404, "Admin Not found");
        }

        const isMatch = await admin.comparePassword(password);

        if(!isMatch){
            return sendFail(res,404,"Password is Incorrect");
        }



        const token = jwt.sign(
            {
                id: id,
                dateTime: new Date().toISOString(),
                isAdmin: true

            },
            config.adminToken,
        
            { expiresIn: '1d' }  // Token expiry set to 1 day
        );


        return sendSuccess(res,200,"Login Sucessfully",{token})

    } catch (e) {

     }

}



module.exports = { createAdmin,loginAdmin };
