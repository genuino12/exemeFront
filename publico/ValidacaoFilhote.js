document.addEventListener('DOMContentLoaded', function() {
    const especieInput = document.getElementById('especie');
    const racaInput = document.getElementById('racaFilhote');
    const especieError = document.getElementById('especieError');
    const racaError = document.getElementById('racaError');
    const form = document.getElementById('formFilhote');

    // Validação do segundo formulário (Filhotes)
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const especie = especieInput.value.trim();
        const raca = racaInput.value.trim();

        // Resetar mensagens de erro
        especieError.textContent = '';
        racaError.textContent = '';

        let hasError = false;
        const lettersAndSpaces = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

        // Verificação do campo "Espécie"
        if (especie === "") {
            especieError.textContent = "Por favor, preencha o campo com a espécie do seu animal.";
            hasError = true;
        } else if (!lettersAndSpaces.test(especie)) {
            especieError.textContent = "O campo 'Espécie' deve conter apenas letras e espaços.";
            hasError = true;
        }

        // Verificação do campo "Raça"
        if (raca === "") {
            racaError.textContent = "Por favor, preencha o campo de raça.";
            hasError = true;
        } else if (!lettersAndSpaces.test(raca)) {
            racaError.textContent = "O campo 'Raça' deve conter apenas letras e espaços.";
            hasError = true;
        }

        if (hasError) {
            return;
        }

        setTimeout(() => {
            alert('Cadastro de filhote realizado com sucesso!');
            form.reset();
        }, 1000);
    });
});
