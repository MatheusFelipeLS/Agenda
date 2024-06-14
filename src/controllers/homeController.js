const Contato = require('../models/contatoModel');

exports.index = async (req, res) => {
    try{ 
        const contatos = await Contato.buscaContatos();
        res.render('index', { contatos });
    } catch(e) {
        console.log(e);
    }
};