import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
    const cookieOptions = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    res.cookie("token", token, cookieOptions);
}


