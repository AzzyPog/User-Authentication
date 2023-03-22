const User = require("../models/User");

async function create (req, res) {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({message: "Usuário foi criado", User: user});
        // throw new Error();
    } catch (error) {
        return res.status(500).json({error})
    };
};

async function index (req, res) {
    try {
        const users = await User.findAll();

    } catch (error) {
        
    }
}


module.exports = {create}