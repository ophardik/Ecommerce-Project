// const signupModel = require("../model/signup");
const userModel=require("../model/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productModel=require("../model/product")

const key = "QWERTYUIOP";

const signup = async (req, res) => {
    try {
        console.log('user-controller',req.body)
        const { userName, password, dob, email,is_active,is_deleted,url,loggedIn} = req.body;

        const existingUser = await userModel.findOne({ userName, email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                msg: "Username already taken or Email is wrong",
            });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 12);
        await userModel.create({
            userName,
            password: hashedPassword, // Store the hashed password
            dob,
            email,
            is_active,
            is_deleted,
            role:"user",
            url,
            loggedIn,
        });

        return res.status(200).json({
            success: true,
            msg: "SignUP successful",
            userName: userName,
            email: email,
            dob: dob,
            url: "url",
            loggedIn:loggedIn
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        // Check if the user is active
        if (!user.is_active) {
            return res.status(401).json({ message: "User is not active" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        // Update user's loggedIn status
        user.loggedIn = true;
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ email: user.email }, key, { expiresIn: '1h' });

        // Return user data along with token
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
                loggedIn: user.loggedIn,
            },
        });

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
}


const userActive = async (req, res) => {
    const userEmail = req.body.userEmail;
    console.log(req.body)
    try {
        await userModel.findOneAndUpdate({ email: userEmail }, { is_active: req.body.is_active }).then((resp) => {
            res.status(200).json({
                status: true,
                message: "User status updated successfully"
            })
        })
            .catch(err => { console.log("User not found", err) })

    } catch (err) {
        console.error("Error updating user status:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const userDelete = async (req, res) => {
    const userEmail = req.body.userEmail;
    try {
        // Find the user by email
        await userModel.findOneAndUpdate({ email: userEmail }, { is_deleted: req.body.is_deleted }).then((resp) => {
            res.status(200).json({
                status: true,
                message: "User account deleted successfully"
            })
        })
            .catch(err => { console.log("User not found", err) })


    } catch (error) {
        // console.error("Error updating user status:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const loggedIn=async(req,res)=>{
    console.log(req.body)
    const{email}=req.body;
    try{
        await userModel.findOneAndUpdate({email:email})
        .then((resp)=>{
            res.status(200).json({
                status: true,
                message: "User is logged in"
            })
        })

    }catch(error){
        return res.status(500).json({ error: "Internal server error" });
    }
}

const usersList=async(req,res)=>{
        
    try{
        const allUsers= await userModel.find();
        return res.status(200).json({data:allUsers});
    }catch(error){
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addProduct=async(req,res)=>{
    try{
   const{title,price,description,category,url,is_active,is_deleted}=req.body;

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
    is_active:is_active,
    is_deleted:is_deleted,
});
    }catch(error){
        console.log("error is",error)
        return res.status(400).json({
            success: false,
            msg: err.message,
        });
    }
}

const productList=async(req,res)=>{
    try{
       const allProducts=await productModel.find();
       return res.status(200).json({data:allProducts})
    }catch(error){
       console.log("Error fetching data",error);
       res.status(500).json({ message: 'Internal server error' });

    }
}


const productDelete = async (req, res) => {
    const productTitle = req.body.productTitle;
    try {
        // Find the user by email
        await userModel.findOneAndUpdate({ title: productTitle }, { is_deleted: req.body.is_deleted }).then((resp) => {
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
    
}
