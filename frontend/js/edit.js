document.addEventListener('DOMContentLoaded', (event) => {
    // Recupera os dados do localStorage
    const pessoa = JSON.parse(localStorage.getItem('pessoa'));

    if (pessoa) {
        // Exibe os dados na página
        document.getElementById('editNome').value = `${pessoa.nome}`;
        document.getElementById('editTel').value = `${pessoa.telefone}`;
        document.getElementById('editEmail').value = `${pessoa.email}`;
        document.getElementById('editInfo').innerText = `${pessoa.informacoes}`;

        document.getElementById('btnDeletar').addEventListener('click', function () {
            fetch(`http://localhost:3000/api/agenda/deletar?id=${pessoa.id}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    localStorage.setItem('contatoDeletado', 'true');
                    location.href = 'inicio.html';
                })
                .catch((error) => {
                    console.error('Erro ao deletar banco:', error);
                })
        })


        document.getElementById('btnEditar').addEventListener('click', function () {
            // Obtém os novos valores dos campos
            const novoNome = document.getElementById('editNome');
            const novoTel = document.getElementById('editTel');
            const novoEmail = document.getElementById('editEmail');
            const novaInfo = document.getElementById('editInfo');

            if (novoNome === '' || novoTel === '') {
                console.log('aaaaaaaaaaaa');
            } else {
                // Monta o objeto com os novos dados
                const data = {
                    nome: novoNome.value,
                    telefone: novoTel.value,
                    email: novoEmail.value,
                    informacoes: novaInfo.value,
                }

                // Faz a requisição PUT para atualizar os dados
                fetch(`http://localhost:3000/api/agenda/alterar?id=${pessoa.id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        localStorage.setItem('contatoEditado', 'true'); // armazena no localstorage que houve edição
                        location.href='inicio.html'; // redireciona para a página inicial
                        console.log(data);
                    })
                    .catch((error) => {
                        console.error('Erro ao editar banco:', error);
                    })
            }
        })
    } else {
        console.error('Nenhum dado encontrado no localStorage.');
    }
})
