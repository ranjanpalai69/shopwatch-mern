const userModal = require("../modals/user.modal");

const adminAccess = async (req, res, next) => {
    const { userId } = req.body;
    //  console.log(userId)
    // find user 👍👍👍👍 
    const user = await userModal.findById({ _id: userId });
    if (user.role === "admin") {
        next()
    } else {
        res.status(401).json({msg:"You are not authorised, this is for admin only",hint:"adAcNo"})
    }
}

const SuperAdminAccess = async (req, res, next) => {
    const { userId } = req.body;
    //  console.log(userId)
    // find user 👍👍👍👍 
    const user = await userModal.findById({ _id: userId });
    if (user.role === "superAdmin") {
        next()
    } else {
        res.status(401).json({msg:"You are not authorised, this is for superAdmin only",hint:"suAcNo"})
    }
}
module.exports = {
    adminAccess,
    SuperAdminAccess
}