const form = document.getElementById('form-produto');
const inputId = document.getElementById('id');
const inputNome = document.getElementById('nome');
const inputCategoria = document.getElementById('categoria');
const inputPreco = document.getElementById('preco');

function obterProduto(){
    localStorage.setItem('id', inputId.value);
    localStorage.setItem('nome', inputNome.value);
    localStorage.setItem('categoria', inputCategoria.value);
    localStorage.setItem('preco', inputPreco.value);
}

