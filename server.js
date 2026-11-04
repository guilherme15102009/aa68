const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const arquivo = path.join(__dirname, "mensagens.json");
app.use(express.json());
app.use(express.static("public"));
function lerMensagens() {
try {
return JSON.parse(fs.readFileSync(arquivo, "utf8"));
} catch {
return [];
}
}
// Receber e armazenar mensagens
app.post("/mensagens", (req, res) => {
const { mensagem } = req.body;
if (typeof mensagem !== "string" || !mensagem.trim()) {
return res.status(400).json({
erro: "Mensagem inválida"
});
}
const mensagens = lerMensagens();
const novaMensagem = {
id: Date.now(),
texto: mensagem.trim(),
data: new Date().toISOString()
};
mensagens.push(novaMensagem);
fs.writeFileSync(
arquivo,
JSON.stringify(mensagens, null, 2)
);
res.status(201).json({
sucesso: true,
mensagem: novaMensagem
});
});
// Disponibilizar as mensagens
app.get("/mensagens", (req, res) => {
res.json(lerMensagens());
});
app.listen(PORT, "0.0.0.0", () => {
console.log(`Servidor rodando na porta ${PORT}`);
});