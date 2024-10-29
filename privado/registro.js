const enderecoAPIInteressados = 'http://localhost:3000/interessados';
const enderecoAPIFilhotes = 'http://localhost:3000/filhotes';


const formularioInteressado = document.getElementById('formInteressado');
formularioInteressado.onsubmit = function (event) {
    event.preventDefault();
    if (validarCamposInteressado()) {
        gravarInteressado();
    }
};

function gravarInteressado() {
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    const objetoInteressado = {
        cpf,
        nome,
        telefone,
        email
    };

    fetch(enderecoAPIInteressados, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoInteressado)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
        }
        return resposta.json();
    })
    .then(retorno => {
        if (retorno.status === true) {
            exibirMensagem(retorno.mensagem, 'green');
        } else {
            exibirMensagem(retorno.mensagem, 'red');
        }
    })
    .catch(erro => {
        exibirMensagem(`Erro ao gravar interessado: ${erro.message}`, 'yellow');
    });
}
function deletarInteressado(cpf) {
    fetch(`${enderecoAPIInteressados}/${cpf}`, {
        method: 'DELETE'
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
        }
        return resposta.json();
    })
    .then(retorno => {
        exibirMensagem(retorno.mensagem, 'green');
        buscarInteressados();
    })
    .catch(erro => {
        exibirMensagem(`Erro ao deletar interessado: ${erro.message}`, 'yellow');
    });
}
function atualizarInteressado(cpf, nome, telefone, email) {
    const objetoAtualizado = {
        cpf,
        nome,
        telefone,
        email
    };

    fetch(`${enderecoAPIInteressados}/${cpf}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoAtualizado)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
        }
        return resposta.json();
    })
    .then(retorno => {
        exibirMensagem(retorno.mensagem, 'green');
        buscarInteressados();
    })
    .catch(erro => {
        exibirMensagem(`Erro ao atualizar interessado: ${erro.message}`, 'yellow');
    });
}
function buscarInteressados() {
    fetch(enderecoAPIInteressados)
    
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
            }
            return resposta.json();
        })
        .then(interessados => {
            exibirInteressados(interessados);
        })
        .catch(erro => {
            exibirMensagem(`Erro ao buscar interessados: ${erro.message}`, 'yellow');
        });
}

function exibirInteressados(interessados) {
    const lista = document.getElementById('listaInteressados');
    lista.innerHTML = ''; 
    interessados.forEach(interessado => {
        const item = document.createElement('li');
        item.textContent = `${interessado.nome} - ${interessado.cpf}`;
        lista.appendChild(item);
    });
}




function validarCamposInteressado() {
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    if (cpf && nome && telefone && email) {
        return true;
    } else {
        exibirMensagem("Preencha todos os campos do interessado.", 'red');
        return false;
    }
}

// Formulário para filhotes
const formularioFilhote = document.getElementById('formFilhote');
formularioFilhote.onsubmit = function (event) {
    event.preventDefault();
    if (validarCamposFilhote()) {
        gravarFilhote();
    }
};

function gravarFilhote() {
    const especie = document.getElementById('especie').value;
    const raca = document.getElementById('raca').value;

    const objetoFilhote = {
        especie,
        raca
    };

    fetch(enderecoAPIFilhotes, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoFilhote)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
        }
        return resposta.json();
    })
    .then(retorno => {
        if (retorno.status === true) {
            exibirMensagem(retorno.mensagem, 'green');
        } else {
            exibirMensagem(retorno.mensagem, 'red');
        }
    })
    .catch(erro => {
        exibirMensagem(`Erro ao gravar filhote: ${erro.message}`, 'yellow');
    });
}

function validarCamposFilhote() {
    const especie = document.getElementById('especie').value;
    const raca = document.getElementById('raca').value;

    if (especie && raca) {
        return true;
    } else {
        exibirMensagem("Preencha todos os campos do filhote.", 'red');
        return false;
    }
}
function buscarFilhotes() {
    fetch(enderecoAPIFilhotes)
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
            }
            return resposta.json();
        })
        .then(filhotes => {
            exibirFilhotes(filhotes);
        })
        .catch(erro => {
            exibirMensagem(`Erro ao buscar filhotes: ${erro.message}`, 'yellow');
        });
}


function exibirFilhotes(filhotes) {
    const divFilhotes = document.getElementById('listaFilhotes');
    divFilhotes.innerHTML = "";  
}
function atualizarFilhote() {
    const id = document.getElementById('filhoteId').value; // Obtenha o ID do filhote a ser atualizado
    const especie = document.getElementById('especie').value;
    const raca = document.getElementById('raca').value;

    const objetoFilhote = {
        especie,
        raca
    };

    fetch(`${enderecoAPIFilhotes}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoFilhote)
    })
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
        }
        return resposta.json();
    })
    .then(retorno => {
        if (retorno.status === true) {
            exibirMensagem(retorno.mensagem, 'green');
            buscarFilhotes(); // Atualiza a lista de filhotes
        } else {
            exibirMensagem(retorno.mensagem, 'red');
        }
    })
    .catch(erro => {
        exibirMensagem(`Erro ao atualizar filhote: ${erro.message}`, 'yellow');
    });
}
function deletarFilhote(id) {
    if (confirm("Tem certeza que deseja deletar este filhote?")) {
        fetch(`${enderecoAPIFilhotes}/${id}`, {
            method: 'DELETE'
        })
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error(`Erro: ${resposta.status} ${resposta.statusText}`);
            }
            return resposta.json();
        })
        .then(retorno => {
            if (retorno.status === true) {
                exibirMensagem(retorno.mensagem, 'green');
                buscarFilhotes(); 
            } else {
                exibirMensagem(retorno.mensagem, 'red');
            }
        })
        .catch(erro => {
            exibirMensagem(`Erro ao deletar filhote: ${erro.message}`, 'yellow');
        });
    }
}
function exibirMensagem(mensagem, cor = 'black') {
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = `<p style='color:${cor};'>${mensagem}</p>`;
    setTimeout(() => {
        divMensagem.innerHTML = "";
    }, 5000);
}