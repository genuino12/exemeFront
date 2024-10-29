document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formInteressado');
    const nomeInput = document.getElementById('nome');
    const nomeError = document.getElementById('nomeError');
    const cpfInput = document.getElementById('cpf');
    const cpfError = document.getElementById('cpfError');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const telefoneInput = document.getElementById('telefone');
    const telefoneError = document.getElementById('telefoneError');
   

    // Validação do primeiro formulário (Interessados)
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nome = nomeInput.value.trim();
        const cpf = cpfInput.value.trim();
        const email = emailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        emailError.textContent = '';
        nomeError.textContent = '';
        telefoneError.textContent = '';
        cpfError.textContent = '';

        // Validação de Nome
        if (!nomeInput) {
            alert("Campo 'nome' não encontrado.");
            return false;
        }
        
        if (nome.trim() === "") {
            alert("O campo nome não pode estar vazio.");
            return false;
        }
        
        const regexNome = /^[a-zA-Zà-úÀ-Ú\s'-]+$/;
        if (!regexNome.test(nome)) {
            alert("Nome inválido! Insira apenas letras e espaços.");
            return;
        }

        // Validação de CPF
        const cpfMensagem = validarCPF(cpf);
        if (cpfMensagem) {
            alert(cpfMensagem);
            return;
        }

        // Validação de Email
        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Validação de Telefone
        const regexTelefone = /^\(\d{2}\)\d{5}-\d{4}$/;
        if (!regexTelefone.test(telefone)) {
            alert("Telefone inválido! Use o formato (xx)xxxxx-xxxx.");
            return;
        }

        setTimeout(() => {
            alert('Cadastro realizado com sucesso!');
        
        }, 1000);
    });

    // Funções de validação
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return "CPF inválido: o CPF deve ter 11 dígitos e não pode ser uma sequência repetitiva.";
        }

        let soma = 0;
        let resto;

        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) {
            return "CPF inválido: o primeiro dígito verificador está incorreto.";
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) {
            return "CPF inválido: o segundo dígito verificador está incorreto.";
        }

        return "";
    }


    if (!validateEmail(email)) {
        emailError.textContent = 'Por favor, insira um e-mail válido.';
        return;
}
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
});