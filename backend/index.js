const express = require("express");
const cors = require("cors");
require('./db/config');
const app = express();
const mongoose = require('mongoose');
const User = require("./db/User");
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';


app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save(); //can't use select here
    result = result.toObject();
    delete result.password; //delete password from response
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "Something went wrong" });
        }
        res.send({ result, auth: token });
    })
});

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password"); //remove password
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "Something went wrong" });
                }
                res.send({ user, auth: token });
            })
        } else {
            res.send({ result: "No user found" });
        }
    }
});

app.post("/add-product", verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
});


app.get("/products", verifyToken, async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
    }

    let products = await Product.find({ userId: userId });
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No products found" });
    }
});



app.delete("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
        res.send(product);
    } else {
        res.send({ result: "No product found" });
    }
});

app.put("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
        ]
    })
    res.send(result);
});

//middleware
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ result: "Please provide valid token" });
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({ result: "Please add token with header" });
    }
}

app.listen(5000);
