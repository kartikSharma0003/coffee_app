const User = require("../../models/auth/user_login");
const { sendFail, sendError, sendSuccess } = require("../../utils");
const jwt = require("jsonwebtoken");
const {config} = require("../../config")


async function createUser(req, res) {
    try {
        const { id, password } = req.body;


        if (!id) {
            return sendFail(res, 400, "Please Enter Id");
        }
        if (!password) {
            return sendFail(res, 400, "Please Enter Password");
        }


        const exist = await User.findOne({ id });
        if (exist) {
            return sendFail(res, 400, "User Already Exists");
        }


        const admin = new User({ id, password });
        await admin.save();

        sendSuccess(res, 201, "User Created Successfully", admin);
    } catch (err) {

        sendError(res, err);
    }
}

async function loginUser(req, res) {
    try {
        const { id, password } = req.body;

        const admin = await User.findOne({ id });
        if (!admin) {
            return sendFail(res, 404, "User Not found");
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
            config.userToken,
        
            { expiresIn: '1d' } 
        );


         sendSuccess(res,200,"Login Sucessfully",{token})

    } catch (error) {
        sendError(res,error)
     }

}



module.exports = { createUser,loginUser };
