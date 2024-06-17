const nameTxt = document.getElementById('name');
const telTxt = document.getElementById('tel');
const enderecoTxt = document.getElementById('endereco');
const cadBtn = document.getElementById('cadBtn');

function buscarPessoa() {
    // Faz a requisição para a API
    fetch(`http://localhost:3000/api/agenda/listar`)
        .then(response => response.json())
        .then(data => {
            // Preenche a tabela com os dados recebidos
            preencherTabela(data);
        })
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
        });

}

const tabela = document.getElementById('tblPessoa');
const tbody = tabela.querySelector('tbody');
    
function preencherTabela(data) {

    // Limpa o conteúdo atual da tabela
    tbody.innerHTML = '';

    // Itera sobre os dados e os insere na tabela

    data.forEach(function (pessoa) {

        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${pessoa.nome}</td>
        <td>${pessoa.telefone}</td>
      `;
      
        // tr.setAttribute('onclick', 'teste()')
        tr.id =  pessoa.id;
        tbody.appendChild(tr);

    });
}
document.querySelectorAll('tr').forEach( function(tr) {
    
    tr.addEventListener('click', function(event) {

    const el = event.target

    const id = el.id;

    console.log('oi');

  });
  
});


buscarPessoa()