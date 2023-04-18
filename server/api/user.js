import usersDB from "../schemas/usersDB.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
     
    try{
        const existingUser = await usersDB.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist"});

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if(!validPassword) return res.status(400).json({ message: "Invalid password"});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, "sk", { expiresIn: "1hr"});
        
        res.status(200).json({ result: existingUser, token});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, repassword} = req.body;

    try{
        const existingUser = await usersDB.findOne({ email });

        if(existingUser) {console.log("same User");return res.status(400).json({ message: "Account already exists." })};

        if(password !== repassword) return res.status(400).json({ message: "Passwords do not match." });

        const hashedPass = await bcrypt.hash(password, 12);

        const result = await usersDB.create({ email, password: hashedPass, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id}, "sk", { expiresIn: "1hr"});

        res.status(200).json({ result, token });

    }catch (error){
        res.status(500).json({message: error.message});
    }
}