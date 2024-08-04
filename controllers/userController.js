
const User = require('../model/userModel.js');
const home = (req, res)=>{
    res.send('Hello World!');
}

const register = async (req, res)=>{
    const {name, email, password} = req.body;
    
    try {
        if(!name|| !email || !password) {
            return res.status(401).json({
                success:false,
                message: "Everyfield is Require"
            })
        }
    
        const userExist = await User.findOne({email});
    
        if(userExist){
            return res.status(401).json({
                success:false,
                message: "user already exist"
            })
        }
        const user = await User.create({
            name,
            email,
            password
        });
        // await user.save(); // require when we want to update anything 

        return res.status(200).json({
            success:true,
            message: "user saved successfully"
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message: error.message
        })
    }
}
const login = async (req, res)=>{
    const {email, password} = req.body;
    const users = await User.find({email});

    try {
        if(!users){
            return res.status(400).json({
                success:false,
                message:"NO user exist with this email"
            })
        }
        if(!password.localeCompare(users.password)){
            return res.status(400).json({
                success:false,
                message:"please enter a correct password",
                users
            })
        }
        return res.status(200).json({
            success:true,
            message:"logged in successfull"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {home, register, login}
