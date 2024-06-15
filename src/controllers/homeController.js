const Contato = require('../models/contatoModel');

exports.index = async (req, res) => {
    try{ 
        const contatos = new Array();
        if(req.session.user) {
            for(let id of req.session.user.contatos) {
                contatos.push(await Contato.buscarPorId(String(id)));
            }
        }
        res.render('index', { contatos });
    } catch(e) {
        console.log(e);
    }
};