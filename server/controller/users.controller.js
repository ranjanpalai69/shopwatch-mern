const userModal = require("../modals/user.modal");
const bcrypt = require("bcrypt");
const generateToken = require("../generateToken");
const crypto = require('crypto');
const forgotModal = require("../modals/Forget.password.model");
const sendEmail = require("./sendmail");

// register user 👍👍👍👍👍

const createUser = async (req, res) => {
    try {
        const { name, email, password, mobile, avator, role } = req.body;

        // userExits

        const userExits = await userModal.findOne({ email })

        if (userExits) {
            return res.status(400).send({ msg: `This email : ${email} already exits, try with different email or login`, hint: "em1" })
        }

        const gensalt = 5;
        const salt = bcrypt.genSaltSync(gensalt);
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = new userModal({
            name,
            email,
            password: hashPassword,
            mobile,
            avator,
            role
        });
        await user.save();
        res.status(201).send({ message: "Register successful",role:role?role:"user",avator:req.body.avator });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login user 👍👍👍👍👍

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "email and password required" })
    }
    const user = await userModal.findOne({ email });

    if (!user) {
        return res.status(404).send({ message: `This email : ${email} is not found in our database`,hint:"paenot" })
    }

    //   res.send(user)

    const passWordMatch = bcrypt.compareSync(password, user.password)
    if (!passWordMatch) {
        res.status(400).send({ message: `Wrong password`,hint:"wrong" })
    }
    else {
        try {
            // res.send(passWordMatch)
            const token = generateToken(user);

            res.cookie("myToken", token, {
                // for one day expiration
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            res.status(200).send({
                messssage: "Login Successful",
                token: token,
                role: user.role,
                name: user.name,
                avator:user.avator
            })

        } catch (error) {
            res.status(500).send({ message: "Internel server error", error: `${error}` })
        }
    }
}


// get token 👍

const getToken=async(req,res)=>{
    const token = req.cookies.myToken;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    res.json({ token });
  }
}


const getLoggedUserData=async(req,res)=>{
    const {userId}=req.body;

    try {

        let CheckExits = await userModal.findById({ _id: userId })
        if (!CheckExits) {
            return res.status(404).send({ message: "User not found " });
        } else {
            let user= await userModal.findById({ _id: userId })
            res.status(200).send({ user})
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// get all users (superAdmin) 👍👍👍👍👍

const getAllUsers = async (req, res) => {
    try {
        const { userId } = req.body;
        // $ne will neglect who is making request and others users will give
        const users = await userModal.find({ _id: { $ne: userId } });

        if (users.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ err: error.message });
    }
};



const getSingleUser = async (req, res) => {
    const { user, email, name } = req.body;

    if (!user && !email && !name) {
        return res.status(400).send({ message: "At least one of the fields (userId, email, name) is required." });
    }
    try {

        const filter = {};

        if (user) {
            filter._id = user;
        }

        if (email) {
            filter.email = email;
        }

        if (name) {
            filter.name = name;
        }

        // console.log("filter::-", filter);

        const findUser = await userModal.find(filter)

        if (findUser.length === 0) {
            return res.status(404).send({ message: "User not found" })
        }

        res.status(200).send(findUser)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



// get all users (superAdmin) 👍👍👍👍👍
const addUser = async (req, res) => {
    try {
        const { email, password,role } = req.body;

        // userExits

        const userExits = await userModal.findOne({ email })

        if (userExits) {
            return res.status(400).send({ msg: `This email : ${email} already exits, try with different email or login` })
        }

        const gensalt = 5;
        const salt = bcrypt.genSaltSync(gensalt);
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = new userModal({
            ...req.body,
            email,
            password: hashPassword,
        });
        await user.save();
        res.status(201).json({ "message": "Register successful",role:role?role:"user",avator:req.body.avator  });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// update user  (superAdmin) 👍👍👍👍👍

const updateUser = async (req, res) => {
    let newData = { ...req.body };
    try {

        let CheckExits = await userModal.findById({ _id: newData.update_user_id })
        if (!CheckExits) {
            return res.status(404).send({ message: "User not found " });
        } else {
            await userModal.findByIdAndUpdate({ _id: newData.update_user_id }, newData)
            res.status(200).send({ message: "User updated success" })
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Remove user (superAdmin) 👍👍👍👍👍

const removeUser = async (req, res) => {
    let RemoveUserId = req.body.remove_user_id;

    if (!RemoveUserId) {
        return res.status(400).send({ message: "Required user_id " });
    }
    try {

        let CheckExits = await userModal.findById({ _id: RemoveUserId })
        if (!CheckExits) {
            return res.status(404).send({ message: "User not found " });
        } else {
            await userModal.findByIdAndDelete({ _id: RemoveUserId })
            res.status(200).send({ message: "User Remove success" })
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


// change password 👍👍👍👍👍


const ChangePassword = async (req, res) => {
    const { email, password, newPassword } = req.body;

    if (!email || !password) {
        return res.status(400).send({ msg: "email and current password required" })
    }

    if (!newPassword) {
        return res.status(400).send({ msg: " New password required" })
    }

    if (newPassword.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    if (!/[A-Z]/.test(newPassword)) {
        return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
    }
    if (!/[a-z]/.test(newPassword)) {
        return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
    }
    if (!/\d/.test(newPassword)) {
        return res.status(400).json({ error: "Password must contain at least one digit" });
    }
    if (!/[@#%&^()/?!]/.test(newPassword)) {
        return res.status(400).json({ error: "Password must contain at least one special character (@,#,%,&,^,(,),/?) " });
    }


    try {
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.status(404).send({msg:"User not found"});
        }

        // check if old password matches the one in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({msg:"Invalid old password"});
        }

        // hash and update user's password with the new password
        const hashedPassword = await bcrypt.hash(newPassword, 5);
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({msg:"Password updated successfully"});
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// forget password password 👍👍👍👍👍

const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: "Email is required" })
    }

    try {
        const user = await userModal.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found", hint: "not" });
        }

        // console.log("user",user)

        // send an email to the user's Gmail address
        const subject = "Password reset request";
        const token = crypto.randomBytes(20).toString('hex');
        const expirationDate = Date.now() + 300000;
        // const expirationDate = Date.now() + 120000;

        const resetLink = `https://my-shoping-frontend.vercel.app//reset_password/token/${token}`;
        const message = `Hello, ${user.name}.\n to reset your password, please click on the following link:\n${resetLink}.\nThis token will expire in 5 minutes.`;

        try {
            await sendEmail(email, subject, message);

        } catch (error) {

            if (error.message === 'Invalid email credentials from admin side') {
                return res.status(401).send({ message: "Invalid email credentials" });
            } else {
                return res.status(500).send({ message: "Error sending email" });
            }
        }
        const newToken = new forgotModal({
            userId: user._id,
            token,
            expirationDate: new Date(expirationDate),
        });

        await newToken.save();
        res.status(200).send({ message: `Email has been sent to email: ${user.email}`, hint: "send" });
    } catch (error) {
        res.status(400).send({ msg: "Something went wrong", error: error.message });
    }
};


// validating  token and time for forgetting password 👍👍👍👍👍
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token) {
        return res.status(400).send({ message: "Please provide token" });
    }


    try {
        // verify that the unique token exists in your database and hasn't expired
        const passwordResetToken = await forgotModal.findOne({ token });
        if (!passwordResetToken || passwordResetToken.expirationDate < new Date()) {
            if (passwordResetToken) {
                await passwordResetToken.removeToken();
            }
            return res.status(400).send({ message: "Invalid or expired token" });

        }
        if (!newPassword) {
            return res.status(400).send({ msg: " New password required" })
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        if (!/[A-Z]/.test(newPassword)) {
            return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
        }
        if (!/[a-z]/.test(newPassword)) {
            return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
        }
        if (!/\d/.test(newPassword)) {
            return res.status(400).json({ error: "Password must contain at least one digit" });
        }
        if (!/[@#%&^()/?!]/.test(newPassword)) {
            return res.status(400).json({ error: "Password must contain at least one special character (@,#,%,&,^,(,),/?) " });
        }

        // If the token is valid, allow the user to update their password

        const user = await userModal.findById(passwordResetToken.userId);
        // hash and update user's password with the new password
        const hashedPassword = await bcrypt.hash(newPassword, 5);
        user.password = hashedPassword;
        await user.save();

        // Remove the token from the database
        await passwordResetToken.removeToken();
        res.status(200).send({ message: "Password reset successful" });

    } catch (error) {
        res.status(400).send({ msg: "Something went wrong", error: error.message });
    }
};


module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    addUser,
    updateUser,
    removeUser,
    getSingleUser,
    ChangePassword,
    forgetPassword,
    resetPassword,
    getToken,
    getLoggedUserData

}