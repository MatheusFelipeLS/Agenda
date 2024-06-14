import validator from "validator";

export default class Contato {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        let valid = true;

        for(let errorText of this.form.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const telefoneInput = el.querySelector('input[name="telefone"]');

        if(!nomeInput.value.length) {
            this.createError(nomeInput, `Nome é um campo obrigatório.`);
            valid = false;
        } 

        if(!validator.isEmail(emailInput.value) && !telefoneInput.value) {
            this.createError(emailInput, `Email inválido.`);
            valid = false;
        } 

        if(!emailInput.value && !telefoneInput.value) {
            this.createError(emailInput, `Alguma forma de contato (email ou telefone) deve ser informado.`);
            this.createError(telefoneInput, `Alguma forma de contato (email ou telefone) deve ser informado.`);
            valid = false;
        } 

        if(valid) this.form.submit();
    }

    createError(field, msg) {
        //cria uma div com a mensagem de erro
        const div = document.createElement('div');
        div.style.color = 'red'; //cor da mensagem
        div.style.fontSize = '12px'; //tamanho da letra da mensagem
        div.innerText = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}