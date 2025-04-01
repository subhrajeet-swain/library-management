import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = currentTime + (8 * 60 * 60); // 8 hours expiration

    const token = jwt.sign(
        {
            id: userId,
            iat: currentTime,
            exp: expirationTime
        },
        process.env.JWT_ACCESS_TOKEN_SECRET
    );

    return {
        token,
        creationTime: new Date(currentTime * 1000),
        expirationTime: new Date(expirationTime * 1000)
    };
};

export {
    generateAccessToken,
};