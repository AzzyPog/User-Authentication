const User = require("../models/User");

async function create (req, res) {
    try {
        const user = await User.create(req.body);
        if(user) return res.status(201).json({message: "Usuário foi criado", User: user});
        throw new Error();
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({message: error.message});
        } else return res.status(500).json({message: "algo deu errado.", Error: error});
    };
};

async function index (req, res) {
    try {
        const users = await User.findAll();
        if(users) return res.status(200).json({message: "usuários listados.", Users: users});
        throw new Error();
    } catch (error) {
        return res.status(500).json(error+"!");
    };
};

async function show (req, res) {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) return res.status(200).json({message: "usuário encontrado.", User: user});
        throw new Error();
    } catch (error) {
        return res.status(500).json(error+"!");
    };
};

async function update (req, res) {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if(user){
            const [updated] = await user.update(req.body);
            if (updated) return res.status(200).json({message: "usuário atualizado.", User: user});
        }
        throw new Error();
    } catch (error) {
        console.log(error)
        return res.status(500).json(error+"!");
    };
};


async function destroy (req, res) {
    const {id} = req.params;
    try {
        const user = await User.destroy({where: {id: id}});
        if(user) return res.status(200).json({message: "usuário deletado."});
        throw new Error();
    } catch (error) {
        if (error == "Error") return res.status(404).json({message: "Usuário não existe."})
        return res.status(500).json(error+"!");
    };
};

module.exports = {create, index, show, update, destroy};