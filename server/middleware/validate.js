module.exports = function (req, res, next) {
    const { username, email, password } = req.body;

    //validEmail function checks if valid email is inputted
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        console.log(!email.length);
        if (![username, email, password].every((field) => field && field.trim() !== "")) {
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![email, password].every((field) => field && field.trim() !== "")) {
            return res.status(401).json("2nd Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    }

    next();
};