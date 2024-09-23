// const { Router } = require("express")
// const UserModel = require("../models/User")

// const authRouter = Router();

// authRouter.post("/signup", async (req, res) => {
//     console.log(req.body)
//     const user = await new UserModel(req.body)
//     user.save((err, success) => {
//         if (err) {
//             res.status(500).send({ message: "Error occurred" })
//         }
//         return res.status(201).send({ message: "Sign up success", token: 54321 })
//     });
// })

// authRouter.post("/login", async (req, res) => {
//     console.log("req", req.body);
//     // const { email, password } = req.body;
//     const checkUser = await UserModel.findOne(req.body)

//     if (!checkUser) {
        
//         return res.status(401).send("Please enter valid credentils");
//     }

//     let payload = {
//         "_id": checkUser._id,
//         "name": checkUser.name,
//         "token": "s4dfaidhfij45iicuhai"
//     }
//     return res.status(201).send(payload);

// })

// module.exports = authRouter;



const { Router } = require("express");
const UserModel = require("../models/User");

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    
    try {
        const user = new UserModel(req.body); // No need to await the instantiation
        await user.save(); // Use await for save operation
        return res.status(201).send({ message: "Sign up success", token: 54321 });
    } catch (err) {
        return res.status(500).send({ message: "Error occurred" });
    }
});

authRouter.post("/login", async (req, res) => {
    console.log("req", req.body);
    const checkUser = await UserModel.findOne(req.body);

    if (!checkUser) {
        return res.status(401).send("Please enter valid credentials");
    }

    let payload = {
        "_id": checkUser._id,
        "name": checkUser.name,
        "token": "s4dfaidhfij45iicuhai"
    };
    return res.status(201).send(payload);
});

module.exports = authRouter;
