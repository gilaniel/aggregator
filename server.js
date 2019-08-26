const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.listen(4455, () => {
	console.log('server runing');
});

app.get('/',(req,res) => {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/api/getfavorites', (req,res) => {
	fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
    if (err){
      console.log('error');
    } else {
			if (!data.length) {
				res.json([]);
				return;
			}
			res.json(JSON.parse(data));
		}
	});
});

app.get('/api/addtofavorite',(req,res) => {
	fetch(req.query.page)
		.then(response => response.text())
		.then(text => pageParser({link: req.query.page, response: text}));

	res.json({ body: 'OK!' });
});

function pageParser(params) {

	const dom = new JSDOM(params.response);

	const document = dom.window.document;

	let product = {
		id: params.link.split('lamoda.ru/p/')[1].split('/')[0],
		title: document.getElementsByClassName('ii-product__brand-text')[0].textContent,
		img: 'https:' + document.getElementsByClassName('gallery-image')[0].src,
		link: params.link,
		price: document.getElementsByClassName('ii-product__price-current')[0].innerHTML
	};

	let items = [];

	fs.readFile('data.json', 'utf8', function readFileCallback(err, data){
    if (err){
      console.log('error');
    } else {
			items = JSON.parse(data || '[]');
			
			items.push(product);
			
			fs.writeFile('data.json', JSON.stringify(items), 'utf8', function(err) {
				if (err) throw err;
				console.log('complete');
			});
		}
	});
}