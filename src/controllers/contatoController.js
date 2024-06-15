const Contato = require('../models/contatoModel');
const Login = require('../models/loginModel');

exports.index = (req, res) => {
    res.render('contato', { contato: {} });
};

exports.register = async (req, res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register();
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return; 
        }
    
        req.flash('success', 'Seu contato foi registrado');
        const login = new Login(null, req.session.user.email, req.session.user.contatos);
        await login.addOne(contato.contato._id);
        req.session.user = login.user;
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return; 
    } catch(e) {
        return res.render('404');
    }
};

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const contato = await Contato.buscarPorId(req.params.id);

    if(!contato) return res.render('404');
    
    res.render('contato', { contato });
};

exports.edit = async function(req, res) {
    try{
        if(!req.params.id) return res.render('404');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);

        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(() => res.redirect('back'));
            return; 
        }

        req.flash('success', 'Seu contato editado com sucesso');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`));
        return; 

    } catch(e) { 
        console.log(e);
        res.render('404');
    }
};

exports.delete = async function(req, res) {
    if(!req.params.id) return res.render('404');

    const login = new Login(null, req.session.user.email, req.session.user.contatos);
    await login.deleteOne(req.params.id);

    req.session.user.contatos = login.user.contatos;

    const contato = await Contato.delete(req.params.id);

    if(!contato) return res.render('404');
    
    req.flash('success', 'Seu contato apagado com sucesso');
    req.session.save(() => res.redirect(`back`));
    return; 
};