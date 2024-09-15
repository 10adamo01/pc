const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Endpoint do pobierania procesorów
app.get('/api/cpu', async (req, res) => {
    try {
        const xkomURL = 'https://www.x-kom.pl/g-5/c/10-procesory.html';
        const komputronikURL = 'https://www.komputronik.pl/category/2614/procesory.html';

        const xkomResponse = await axios.get(xkomURL);
        const $xkom = cheerio.load(xkomResponse.data);
        let xkomCPUs = [];
        $xkom('.product-name').each((i, el) => {
            xkomCPUs.push($xkom(el).text());
        });

        const komputronikResponse = await axios.get(komputronikURL);
        const $komputronik = cheerio.load(komputronikResponse.data);
        let komputronikCPUs = [];
        $komputronik('.product-entry .name').each((i, el) => {
            komputronikCPUs.push($komputronik(el).text());
        });

        const cpus = [...xkomCPUs, ...komputronikCPUs];
        res.json(cpus);
    } catch (error) {
        res.status(500).send('Błąd podczas pobierania danych.');
    }
});

// Endpoint do pobierania kart graficznych
app.get('/api/gpu', async (req, res) => {
    try {
        const xkomURL = 'https://www.x-kom.pl/g-5/c/1110-karty-graficzne.html';
        const komputronikURL = 'https://www.komputronik.pl/category/2683/karty-graficzne.html';

        const xkomResponse = await axios.get(xkomURL);
        const $xkom = cheerio.load(xkomResponse.data);
        let xkomGPUs = [];
        $xkom('.product-name').each((i, el) => {
            xkomGPUs.push($xkom(el).text());
        });

        const komputronikResponse = await axios.get(komputronikURL);
        const $komputronik = cheerio.load(komputronikResponse.data);
        let komputronikGPUs = [];
        $komputronik('.product-entry .name').each((i, el) => {
            komputronikGPUs.push($komputronik(el).text());
        });

        const gpus = [...xkomGPUs, ...komputronikGPUs];
        res.json(gpus);
    } catch (error) {
        res.status(500).send('Błąd podczas pobierania danych.');
    }
});

// Dodaj pozostałe endpointy (płyty główne, RAM, dyski, zasilacze, obudowy)
// ...

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
