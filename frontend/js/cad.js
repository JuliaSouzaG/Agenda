const nameTxt = document.getElementById('name');
const telTxt = document.getElementById('tel');
const emailTxt = document.getElementById('email');
const infoTxt = document.getElementById('informacoes');
const cadBtn = document.getElementById('cadBtn');
const alerta = document.getElementById('alerta');

cadBtn.addEventListener('click', function(event) {

    saveContact(nameTxt, telTxt, emailTxt, infoTxt);

    nameTxt.value = '';
    telTxt.value = '';
    emailTxt.value = '';
    infoTxt.value = '';

})

async function saveContact(nome, telefone, email, info) {

    let data = {
        nome: nome.value,
        telefone: telefone.value,
        email: email.value,
        informacoes: info.value
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
            localStorage.setItem('contatoCriado', 'true');
            location.href='inicio.html';
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao enviar dados. Verifique o console para mais informações.');
        });
}
