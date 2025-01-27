const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, '')));

// Rota principal
app.get('/', async (req, res) => {
    try {
        const { instalacao, documento } = req.query;

        if (!instalacao || !documento) {
            return res.status(400).send('Parâmetros "instalacao" e "documento" são obrigatórios.');
        }

        const data = {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "idPagamento": "string",
            "chavePix": "string",
            "endToEndId": "string",
            "txId": "string",
            "valor": "296.96",
            "dhDataPagamento": "2024-12-13T18:24:03.011Z",
            "dhDataProcessamento": "2024-12-13T18:24:03.011Z",
            "nomePagador": "string",
            "cnpjPagador": "string",
            "cpfPagador": "03426985233",
            "infoPagador": "string",
            "codigoBanco": "string",
            "nomeBanco": "string",
            "retornoCcs": "string",
            "paginaApi": 0,
            "numeroPagamento": 0,
            "recebedor": {
                "nome": "Companhia Paulista de Força e Luz",
                "cnpj": "33050196000188",
                "agencia": "2002",
                "numeroConta": "2670003"
            }            
        };

        console.log('Realizando a chamada para api')
        // Faz a chamada para a API
        const apiResponse = await axios.post("http://localhost:5400/pagamentosPixBradesco/gerarJornadaPixBradesco", data);

        console.log(apiResponse)

        // Supondo que a API retorna o link no campo `link`
        const { url } = apiResponse.data;

        if (!url) {
            res.redirect("/redirect-error.html");
        }

        res.redirect(url);

    } catch (error) {
        res.redirect("/redirect-error.html");
    }
});

app.get('/callback', async (req, res) => {
    res.redirect("https://www.cpfl.com.br");
})

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
