const campo = document.getElementById("mensagem");
const lista = document.getElementById("mensagens");
// Enviar uma mensagem ao servidor
async function enviarMensagem() {
const texto = campo.value.trim();
if (!texto) {
alert("Digite uma mensagem!");
return;
}
try {
const resposta = await fetch("/mensagens", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
mensagem: texto
})
});
if (!resposta.ok) {
throw new Error("Erro ao enviar");
}
campo.value = "";

carregarMensagens();
} catch (erro) {
alert("Não foi possível enviar a mensagem.");
}
}
// Buscar e exibir as mensagens
async function carregarMensagens() {
try {
const resposta = await fetch("/mensagens");
const mensagens = await resposta.json();
lista.innerHTML = "";
mensagens.reverse().forEach(item => {
const div = document.createElement("div");
div.className = "mensagem";
div.textContent = item.texto;
lista.appendChild(div);
});
} catch (erro) {
console.error("Erro ao carregar mensagens:", erro);
}
}
// Carregar ao abrir e atualizar a cada 3 segundos
carregarMensagens();
setInterval(carregarMensagens, 3000);