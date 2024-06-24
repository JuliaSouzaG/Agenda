document.addEventListener('DOMContentLoaded', (event) => {
    const nameTxt = document.getElementById('name')
    const telTxt = document.getElementById('tel')
    const emailTxt = document.getElementById('email')
    const cadBtn = document.getElementById('cadBtn')

    const tabela = document.getElementById('tblPessoa')
    if (!tabela) {
        console.error('Tabela com id "tblPessoa" não encontrada.')
        return
    }

    const tbody = tabela.querySelector('tbody')
    if (!tbody) {
        console.error('Elemento tbody não encontrado dentro da tabela.')
        return
    }

    // verifica se houve deleção/ediçao ou exclusão e mostra o toast
    const contatoCriado = localStorage.getItem('contatoCriado')
    const contatoDeletado = localStorage.getItem('contatoDeletado')
    const contatoEditado = localStorage.getItem('contatoEditado')
    if (contatoCriado) {
        const toastLiveExample = document.getElementById('criarToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()

        // Remove o item do localStorage para que o toast não apareça novamente na próxima recarga
        localStorage.removeItem('contatoCriado')
    }
    if (contatoDeletado) {
        const toastLiveExample = document.getElementById('deleteToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()

        localStorage.removeItem('contatoDeletado')
    }
    if (contatoEditado) {
        const toastLiveExample = document.getElementById('editToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()

        localStorage.removeItem('contatoEditado')
    }

    function buscarPessoa() {
        // Faz a requisição para a API
        fetch(`http://localhost:3000/api/agenda/listar`)
            .then((response) => response.json())
            .then((data) => {
                // Preenche a tabela com os dados recebidos
                preencherTabela(data)
            })
            .catch((error) => {
                console.error('Erro ao obter dados da API:', error)
            })
    }

    document.getElementById('btnPesquisar').addEventListener('click', function () {
        const nome = document.getElementById('nomeSearch').value
        // Faz a requisição para a API
        fetch(`http://localhost:3000/api/agenda/listarnome?nome=${nome}`)
            .then((response) => response.json())
            .then((data) => {
                preencherTabela(data.pessoa)
                // Preenche a tabela com os dados recebidos
            })
            .catch((error) => {
                console.error('Erro ao obter dados da API:', error)
            })
    })

    function preencherTabela(data) {
        // Limpa o conteúdo atual da tabela
        tbody.innerHTML = ''

        // Itera sobre os dados e os insere na tabela
        data.forEach(function (pessoa) {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${pessoa.nome}</td>
                <td>${pessoa.telefone}</td>
            `
            tr.setAttribute('onclick', "location.href='info.html'")
            tr.id = pessoa.id
            tbody.appendChild(tr)

            // guarda os dados da pessoa quando o tr é clicado e redireciona p/ info.html
            tr.addEventListener('click', () => {
                localStorage.setItem('pessoa', JSON.stringify(pessoa))
                location.href = 'info.html'
            })
        })
    }

    buscarPessoa()
})
