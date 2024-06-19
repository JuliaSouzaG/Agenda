document.addEventListener('DOMContentLoaded', (event) => {
    // Recupera os dados do localStorage
    const pessoa = JSON.parse(localStorage.getItem('pessoa'))

    if (pessoa) {
        // Exibe os dados na página
        document.getElementById('editNome').value = `${pessoa.nome}`
        document.getElementById('editTel').value = `${pessoa.telefone}`
        document.getElementById('editEmail').value = `${pessoa.email}`
        document.getElementById('editInfo').innerText = `${pessoa.informacoes}`
    } else {
        console.error('Nenhum dado encontrado no localStorage.')
    }

    document.getElementById('btnDeletar').addEventListener('click', function() {
        fetch(`http://localhost:3000/api/agenda/deletar?id=${pessoa.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                localStorage.setItem('contatoDeletado', 'true')
                location.href='inicio.html'
            })
            .catch((error) => {
                console.error('Erro ao deletar banco:', error)
            })
}
)
})


    