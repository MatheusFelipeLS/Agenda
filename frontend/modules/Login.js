import validator from "validator";

export default class Login {
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
        
        const emailCriarInput = el.querySelector('.email-criar');
        const passwordCriarInput = el.querySelector('.password-criar');

        if(emailCriarInput && !validator.isEmail(emailCriarInput.value)) {
            this.createError(emailCriarInput, `Email inválido.`);
            valid = false;
        }

        if(passwordCriarInput && (passwordCriarInput.value.length < 3 || passwordCriarInput.value.length > 50)) {
            this.createError(passwordCriarInput, `Senha tem que ter entre 3 e 50 caracteres.`);
            valid = false;
        }

        if(valid) this.form.submit();
    }

    createError(field, msg) {
        //cria uma div com a mensagem de erro
        const div = document.createElement('div');
        div.style.color = 'red'; //cor da mensagem
        div.style.fontSize = '12px'; //tamanho da letra da mensagem
        div.style.marginTop = '2px';
        div.innerText = msg;
        div.classList.add('error-text');
        field.insertAdjacentElement('afterend', div);
    }
}