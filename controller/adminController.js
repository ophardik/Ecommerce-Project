// const signupModel = require("../model/signup");
const userModel = require("../model/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel = require("../model/product")
const cartModel = require("../model/cart")
const paymentModel = require("../model/payment")
const orderProduct = require("../model/orderedProduct")
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const multer = require("multer");
const upload = multer({ dest: 'uploads/' })
const nodemailer = require("nodemailer")
const PDFDocument = require("pdfkit")
const fs = require("fs");



const key = "QWERTYUIOP";
console.log(process.env.STRIPE_SECRET_KEY);


const signup = async (req, res) => {
    try {
        console.log('admin-controller', req.body);
        const { userName, password, dob, email, is_active, is_deleted, loggedIn } = req.body;


        const existingUser = await userModel.findOne({ userName, email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                msg: "Username already taken or Email is wrong",
            });
        }

        const profileImage = req.file ? `http://localhost:${process.env.PORT || 8002}/uploads/${req.file.filename}` : null;
        const hashedPassword = await bcrypt.hash(password, 12);

        await userModel.create({
            userName,
            password: hashedPassword,
            dob,
            email,
            is_active,
            is_deleted,    
            role: "user",
            url: profileImage,
            loggedIn,
        });


        return res.status(200).json({
            success: true,
            msg: "SignUP successful",
            userName,
            email,
            dob,
            url: profileImage,
            loggedIn
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        if (!user.is_active) {
            return res.status(401).json({ message: "User is not active" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        const token = jwt.sign({ email: user.email }, key, { expiresIn: '1h' });
        console.log(token);

        const subject = "Login Successful";
        const text = `Hello ${user.email}, You have successfully logged into our website.`;
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007BFF;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                }
                .body {
                    padding: 20px;
                }
                .body p {
                    line-height: 1.6;
                }
                .footer {
                    background-color: #f1f1f1;
                    color: #333333;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Welcome to Our Service</h1>
                </div>
                <div class="body">
                    <p>Hello ${user.email},</p>
                    <p>Thank you for joining us. We are thrilled to have you on board. Here are some details about your account and services:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nisi. Curabitur quis bibendum ligula. Nulla facilisi. Integer ac sem id velit ornare efficitur. Ut in libero eget ligula semper varius.</p>
                    <p>If you have any questions, feel free to reach out to our support team.</p>
                    <p>Best Regards,</p>
                    <p>Your Company</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        await sendMail(user.email, subject, text, html);

        return res.status(200).json({
            success: true,
            msg: "Login successful",
            userData: {
                userName: user.userName,
                email: user.email,
                DOB: user.DOB,
                is_active: user.is_active,
                is_deleted: user.is_deleted,
                token: token,
                loggedIn: true,
                _id: user._id,
            },
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
};

const userActive = async (req, res) => {
    const userEmail = req.body.email; // Changed userEmail to email to match your postman data
    const isActive = req.body.is_active === 'true' || req.body.is_active === true; // Ensure is_active is a boolean
    console.log(req.body);

    try {
        const user = await userModel.findOneAndUpdate(
            { email: userEmail },
            { is_active: isActive },
            { new: true } // This option returns the updated document
        );

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "User status updated successfully",
            user
        });
    } catch (err) {
        console.error("Error updating user status:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const userDelete = async (req, res) => {
    const userEmail = req.body.email; // Assuming you're sending 'email' in the request body
    try {
        // Find the user by email and delete
        const deletedUser = await userModel.findOneAndDelete({ email: userEmail });
        if (deletedUser) {
            res.status(200).json({
                status: true,
                message: "User account deleted successfully"
            });
        } else {
            res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const loggedIn = async (req, res) => {
    console.log(req.body)
    const { email } = req.body;
    try {
        await userModel.findOneAndUpdate({ email: email })
            .then((resp) => {
                res.status(200).json({
                    status: true,
                    message: "User is logged in"
                })
            })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const usersList = async (req, res) => {

    try {
        const allUsers = await userModel.find();
        return res.status(200).json({ data: allUsers });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addProduct = async (req, res) => {
    try {
        const { title, price, description, category, url, is_active, is_deleted } = req.body;

        await productModel.create({
            title,
            price,
            description,
            category,
            url,
            is_active,
            is_deleted,
        })

        return res.status(200).json({
            success: true,
            msg: "Product added successfully",
            title: title,
            price: price,
            description: description,
            url: "url",
            is_active: is_active,
            is_deleted: is_deleted,
        });
    } catch (error) {
        console.log("error is", error)
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
}

const productList = async (req, res) => {
    try {
        const allProducts = await productModel.find({ is_deleted: false });
        return res.status(200).json({ data: allProducts })
    } catch (error) {
        console.log("Error fetching data", error);
        res.status(500).json({ message: 'Internal server error' });

    }
}

const activeProduct = async (req, res) => {
    const { _id, is_active } = req.body; // Fix destructuring
    const isActive = is_active === 'true' || is_active === true; // No need for req.body.is_active.title
    console.log(req.body);
    try {
        const product = await productModel.findOneAndUpdate(
            { _id: _id }, // Fix variable name
            { is_active: isActive },
            { new: true } // This option returns the updated document
        );

        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found" // Change message
            });
        }

        res.status(200).json({
            status: true,
            message: "Product status updated successfully", // Change message
            product // Fix response object key
        });
    } catch (err) {
        console.error("Error updating product status:", err); // Change log message
        return res.status(500).json({ error: "Internal server error" });
    }
}


const productDelete = async (req, res) => {
    const productTitle = req.body.productTitle;
    try {
        // Find the user by email
        console.log(req.body)
        await productModel.findByIdAndDelete({ _id: req.body._id }, { is_deleted: req.body.is_deleted }).then((resp) => {
            res.status(200).json({
                status: true,
                message: "Product deleted successfully"
            })
        })
            .catch(err => { console.log("Product not found", err) })


    } catch (error) {
        // console.error("Error updating user status:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const cartList = async (req, res) => {
    try {
        const { userId } = req.body;
        //   console.log(`Received userId: ${userId} `);

        if (!userId) {
            return res.status(400).json({
                success: false,
                msg: "Both userId   are required.",
            });
        }

        let cart = await cartModel.find({ userId: userId });
        if (!cart) {
            console.log(`No cart found for userId ${userId} with productId ${productId}`);
            return res.status(200).json({
                success: true,
                msg: "Your cart is empty or the product is not in the cart",
            });
        }
        // console.log(`Cart for userId ${userId} :`, cart);

        let productIds = cart.map(item => item.productId);

        let products = await productModel.find({ _id: { $in: productIds } });
        const cartMap = cart.reduce((acc, item) => {
            acc[item.productId] = item.quantity;
            return acc;
        }, {});

        // Combine product details with their quantities from the cart
        const result = products.map(product => ({
            _id: product._id,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            url: product.url,
            quantity: cartMap[product._id] || 0 // Default to 0 if not found in cart
        }));

        const event = req.body;
        //   console.log(event);


        return res.status(200).json({
            success: true,
            // cart,
            // products,
            result
        });
    } catch (err) {
        console.error(`Error fetching cart or product: ${err.message}`);
        return res.status(500).json({
            success: false,
            msg: err.message,
        });
    }
};

const Addcartlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Find the existing cart item for the given user and product
        const existingCartItem = await cartModel.findOne({ userId, productId });

        if (existingCartItem) {
            // Increment the quantity if the product is already in the cart
            existingCartItem.quantity += 1;
            await existingCartItem.save();
        } else {
            // Add a new product to the cart if it doesn't exist
            await cartModel.create({ userId, productId, quantity: 1 });
        }

        res.status(200).json({ status: true, message: "Item added to cart successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};


const updateCartItem = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || typeof quantity !== 'number') {
            return res.status(400).json({ success: false, message: 'User ID, Product ID, and quantity are required' });
        }

        if (quantity <= 0) {
            // Delete the cart item if the quantity is 0 or less
            const deletedCartItem = await cartModel.findOneAndDelete({ userId: userId, productId: productId });

            if (!deletedCartItem) {
                return res.status(404).json({ success: false, message: 'Cart item not found' });
            }

            return res.status(200).json({ success: true, message: 'Cart item deleted successfully' });
        } else {
            // Update the quantity if greater than 0
            const updatedCartItem = await cartModel.findOneAndUpdate(
                { userId: userId, productId: productId },
                { quantity: quantity },
                { new: true }
            );

            if (!updatedCartItem) {
                return res.status(404).json({ success: false, message: 'Cart item not found' });
            }

            return res.status(200).json({ success: true, message: 'Cart updated successfully', cartItem: updatedCartItem });
        }
    } catch (error) {
        console.error('Error updating cart:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const paymentDetails = async (req, res) => {
    const { products, userId } = req.body;
    console.log("User information", userId)

    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.title,
            },
            unit_amount: product.price * 100,
        },
        quantity: Math.max(1, product.quantity)
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:3000/success?userId=${userId}`,
            cancel_url: "http://localhost:3000/cancel",
        });
        //console.log(session ,"sessionsessionsessionsession")
        await orderedProduct(req.body)
        //     await clearCart(userId);
        const subtotal = products.reduce((total, product) => total + product.price, 0);
        const tax = subtotal * 0.05;
        const shipping = 5.0;
        const totalAmount = subtotal + tax + shipping;

        res.json({ id: session.id });

        const invoiceData = {
            invoiceNumber: `INV-${new Date().getTime()}`, // Unique invoice number
            date: new Date().toLocaleDateString(),
            items: products.map(product => ({ name: product.title, price: product.price })),
            totalAmount: products.reduce((total, product) => total + product.price, 0),
            subtotal,
            tax,
            shipping,
            totalAmount,
        };

        const outputPath = `invoices/invoice_${userId}_${new Date().getTime()}.pdf`;// Unique file name for each transaction
        console.log(`Invoice generated at: ${outputPath}`);
        generateInvoicePDF(invoiceData, outputPath);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create payment session' });
        console.log(error)
    }
};

const paymentBook = async (req, res) => {
    const event = req.body;
    console.log("Received event:", event); // Log the entire event object

    if (event.type === 'payment_intent.succeeded') {
        console.log("Payment successfull");
        // Check if the data property exists before accessing it
        if (event.data && event.data.object) {
            const paymentIntent = event.data.object;
            const customer = paymentIntent.customer;
            const paymentMethod = paymentIntent.payment_method;
            const amount = paymentIntent.amount;

            const products = paymentIntent.line_items && paymentIntent.line_items.data
                ? paymentIntent.line_items.data.map((item) => item.price_data.product_data.name)
                : [];

            const payment = {
                customer_id: customer,
                payment_method: paymentMethod,
                amount: amount,
                products: products,
            };
            console.log("Payment:", payment); // Log the payment object

            try {
                const paymentDoc = new paymentModel(payment);
                await paymentDoc.save();
                // console.log('Payment saved to database:', payment);
            } catch (error) {
                console.error('Error saving payment:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
        }
    }


    res.json({
        received: true,
        msg: "Transaction Successful"
    });


};

const clearCart = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Fetch the user data
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const subject = "Order Placed Successfully";
        const text = `Hello ${user.email}, You have successfully placed an order.`;
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007BFF;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                }
                .body {
                    padding: 20px;
                }
                .body p {
                    line-height: 1.6;
                }
                .footer {
                    background-color: #f1f1f1;
                    color: #333333;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Welcome to Our Service</h1>
                </div>
                <div class="body">
                    <p>Hello ${user.email},</p>
                    <p>Thank you for your order. We are thrilled to have you as a customer. Here are some details about your order and services:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nisi. Curabitur quis bibendum ligula. Nulla facilisi. Integer ac sem id velit ornare efficitur. Ut in libero eget ligula semper varius.</p>
                    <p>If you have any questions, feel free to reach out to our support team.</p>
                    <p>Best Regards,</p>
                    <p>Your Company</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Send the email
        await cartModel.deleteMany({ userId: userId });
        await sendMail(user.email, subject, text, html);

        // Ensure the response is only sent once
        if (!res.headersSent) {
            return res.status(200).json({ success: true, message: 'Cart cleared successfully' });
        }

    } catch (error) {
        console.error('Error clearing cart:', error);

        // Ensure that if an error occurs, the response is only sent once
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};

const orderedProduct = async (product_data) => {
    try {
        console.log(product_data)

        for (const product of product_data.products) {
            const paymentDoc = new orderProduct({
                userId: product_data.userId,
                productName: product.title,
                productPrice: product.price,
                productUrl: product.url,
            });
            await paymentDoc.save();
            // console.log('Payment saved to database:', product);
        }
    } catch (error) {
        console.log("Error", error);
    }
};

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "personalhardik90@gmail.com",
        pass: "pkymelzjbuvktnlz",
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function sendMail(to, subject, text, html) {
    // Define mail options inside the function
    const mailOptions = {
        from: "personalhardik90@gmail.com", // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html // html body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email: " + error);
    }
}

const generateInvoicePDF = (invoiceData, outputPath) => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(outputPath));

    // Add text content to the PDF
    doc.fontSize(25)
        .text('Invoice', { align: 'center' })
        .moveDown(); // Move down to the next line

    // Add invoice data
    doc.fontSize(12)
        .text(`Invoice Number: ${invoiceData.invoiceNumber}`)
        .text(`Date: ${invoiceData.date}`)
        .moveDown(); // Move down to the next line

    // Add itemized list
    doc.text('Items:');
    invoiceData.items.forEach((item, index) => {
        doc.text(`${index + 1}. ${item.name}: $${item.price.toFixed(2)}`);
    });

    // Add subtotal, tax, shipping, and total amount
    doc.moveDown(); // Move down to the next line
    doc.fontSize(12)
        .text(`Subtotal: $${invoiceData.subtotal.toFixed(2)}`, { align: 'right' })
        .text(`Tax (5%): $${invoiceData.tax.toFixed(2)}`, { align: 'right' })
        .text(`Shipping: $${invoiceData.shipping.toFixed(2)}`, { align: 'right' })
        .moveDown(); // Move down to the next line

    doc.fontSize(16)
        .text(`Total Amount: $${invoiceData.totalAmount.toFixed(2)}`, { align: 'right' });

    doc.end(); // Finalize PDF file
}

const contactUs = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        console.log(name, email, subject, message);
        const information = "Request Received Successfully";
        const text = `Hello ${name}, We have successfully received your information.`;
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007BFF;
                    color: #ffffff;
                    padding: 10px 20px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                }
                .body {
                    padding: 20px;
                }
                .body p {
                    line-height: 1.6;
                }
                .footer {
                    background-color: #f1f1f1;
                    color: #333333;
                    padding: 10px 20px;
                    text-align: center;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Welcome to Our Service</h1>
                </div>
                <div class="body">
                    <p>Hello ${email},</p>
                    <p>Thank you for your review. Our team member will get in touch with you shortly:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nisi. Curabitur quis bibendum ligula. Nulla facilisi. Integer ac sem id velit ornare efficitur. Ut in libero eget ligula semper varius.</p>
                    <p>If you have any questions, feel free to reach out to our support team.</p>
                    <p>Best Regards,</p>
                    <p>Your Company</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `;
        await sendMail(email, information, text, html);
        console.log("Email sent");

        // Respond to the client
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error("Error sending email", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
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
    orderedProduct,
    sendMail,
    generateInvoicePDF,
    contactUs,
}

