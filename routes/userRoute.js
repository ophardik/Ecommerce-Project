const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const {
    signup,
    login,
    userActive,
    userDelete,
    usersList,
    loggedIn,
    addProduct,
    productList,
    productDelete, 
    activeProduct,
    cartList,
    Addcartlist,
    paymentDetails,
    updateCartItem,
    paymentBook,
    clearCart,
    contactUs,
    
    
} = require("../controller/adminController");

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});



const upload = multer({ storage: storage });

router.post("/sign-up", upload.single("profileImage"), signup);
router.post("/log-in", login);
router.post("/user_IsActive", userActive);
router.delete("/user_Delete", userDelete);
router.post("/users", usersList);
router.post("/loggedIn", loggedIn);
router.post("/addProduct", addProduct);
router.post("/productList", productList);
router.delete("/productDelete", productDelete);
router.post("/product_IsActive", activeProduct);
router.post("/cartList", cartList);
router.post("/addCart", Addcartlist);
router.post("/payment", paymentDetails);
router.post("/updated", updateCartItem);
router.post("/paymentDetails",paymentBook)
router.delete('/clearCart',clearCart)
router.post("/contactUs",contactUs)
module.exports = router;
