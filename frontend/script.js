const nameTxt = document.getElementById('name');
const telTxt = document.getElementById('tel');
const enderecoTxt = document.getElementById('endereco');
const informacoesTxt = document.getElementById('informacoes');
const cadBtn = document.getElementById('cadBtn');
const alerta = document.getElementById('alerta')

cadBtn.addEventListener('click', function(event) {

    saveContact(nameTxt, telTxt, enderecoTxt);

    document.getElementById('name').value = '';
    document.getElementById('tel').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('informacoes').value = '';

})

async function saveContact(name, telefone, endereco, informacoes) {

    let data = {
        nome: nameTxt.value,
        telefone: telTxt.value,
        endereco: enderecoTxt.value,
        informacoes: informacoesTxt.value
    }

    console.log(data)

    fetch('http://localhost:3000/api/agenda/criar', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data);
            alerta.innerHTML= `
            <div class="alert alert-success d-flex align-items-center" role="alert">
                <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                  An example success alert with an icon
                </div>
            </div>`
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao enviar dados. Verifique o console para mais informações.');
        });
}
console.log('passando')

// function buscarPessoa() {
//     // Faz a requisição para a API
//     fetch(`http://localhost:3000/api/agenda/listar`)
//       .then(response => response.json()) 
//       .then(data => {
//         // Preenche a tabela com os dados recebidos
//         preencherTabela(data);
//       })
//       .catch(error => {
//         console.error('Erro ao obter dados da API:', error);
//       });
      
//   }

// function preencherTabela(data) {
//     const tabela = document.getElementById('tblPessoa');
//     const tbody = tabela.querySelector('tbody');
  
//     // Limpa o conteúdo atual da tabela
//     tbody.innerHTML = '';
  
//     // Itera sobre os dados e os insere na tabela
  
//     data.forEach(function (pessoa) {
//       const tr = document.createElement('tr');
//       tr.innerHTML = `
//         <td>${pessoa.nome}</td>
//         <td>${pessoa.numero}</td>
//       `;
//       tbody.appendChild(tr);
//     });
//   }

//   buscarPessoa()