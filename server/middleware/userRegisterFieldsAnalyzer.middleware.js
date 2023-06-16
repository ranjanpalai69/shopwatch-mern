
const isValidEmail = (email) => {
    // Regular expression to validate email format and domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|info|biz)$/i;
    return emailRegex.test(email);
}

const validateUserFields = (req, res, next) => {
    const { name, email, password, mobile, role } = req.body;

    // Validate name field
    if (!name) {
        return res.status(400).send({ error: "Please provide name",hint:"n1" });
    }

    // Validate email field
    if (!email) {
        return res.status(400).send({ error: "Please provide email",hint:"e1" });
    } else if (!isValidEmail(email)) {
        return res.status(400).send({ error: "Please provide a valid email address",hint:"e2"});
    }

    // Validate password field
    if (!password) {
        return res.status(400).send({ error: "Please provide password",hint:"p1" });
    }
    if (password.length < 6) {
        return res.status(400).send({ error: "Password must be at least 6 characters long",hint:"p2" });
    }
    if (!/[A-Z]/.test(password)) {
        return res.status(400).send({ error: "Password must contain at least one uppercase letter",hint:"p3" });
    }
    if (!/[a-z]/.test(password)) {
        return res.status(400).send({ error: "Password must contain at least one lowercase letter",hint:"p4" });
    }
    if (!/\d/.test(password)) {
        return res.status(400).send({ error: "Password must contain at least one digit",hint:"p5" });
    }
    if (!/[@#%&^()/?!]/.test(password)) {
        return res.status(400).send({ error: "Password must contain at least one special character (@,#,%,&,^,(,),/?) ",hint:"p6" });
    }



    // Validate mobile field

    // console.log(mobile.toString().length)
    if (!mobile) {
        return res.status(400).send({ error: "Please provide mobile number",hint:"m1" });
    } else if (typeof mobile !== 'number') {
        return res.status(400).send({ error: "Mobile number must be a number",hint:"m2" });
    } else if (mobile.toString().length < 10 || mobile.toString().length > 10) {
        return res.status(400).send({ error: "Mobile number cannot less 10 digits or greater then 10 digits",hint:"m3" });
    }

    // Validate role field
    if (role && !["user", "admin", "superAdmin"].includes(role)) {
        return res.status(400).send({ error: "Invalid role, please provide user, admin, or superAdmin",hint:"r1" });
    }

    next();
}

module.exports = validateUserFields
