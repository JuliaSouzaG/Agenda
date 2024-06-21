document.addEventListener('DOMContentLoaded', (event) => {
    // Recupera os dados do localStorage
    const pessoa = JSON.parse(localStorage.getItem('pessoa'));

    if (pessoa) {
        // Exibe os dados na página
        document.getElementById('nome').innerText = `${pessoa.nome}`;
        document.getElementById('number').innerText = `${pessoa.telefone}`;
        const letraNome = pessoa.nome.substr(0, 1);
        console.log(letraNome);
        document.getElementById('letraNome').innerHTML = `${letraNome}`;
        document.getElementById('emailInfo').innerText = `${pessoa.email}`;
        document.getElementById('informacoes').innerText = `${pessoa.informacoes}`;
        document.getElementById('call').setAttribute('href', `sms:${pessoa.telefone}`);
        const tel = pessoa.telefone.replace(/[^a-z0-9]/gi,'');
        document.getElementById('zap').setAttribute('href', `https://wa.me/+55${tel}`);
        document.getElementById('emailLink').setAttribute('href', `mailto:${pessoa.email}`);
        
        
       
    } else {
        console.error('Nenhum dado encontrado no localStorage.');
    }

    const editarBtn = document.getElementById('editarBtn')
    editarBtn.addEventListener('click', function (event) {
        localStorage.setItem('pessoa', JSON.stringify(pessoa));
        location.href = 'edit.html';
    })
})
