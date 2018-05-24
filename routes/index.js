var express = require('express');
var axios = require('axios');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('vista', {
        title: 'Vistas'
    });
});



router.post('/', function (req, res, next) {
  let token = localStorage.getItem('token');
  localStorage.setItem('buscar', req.body.buscar)
  localStorage.setItem('exclude', req.body.exclude)
  let buscar = req.body.buscar ;
  let exclude = req.body.exclude;
  let [mega_productos, atacado_productos, nissei_productos, cellshop_productos] = [[], [], [], []],
  [ hbgames_productos, pioneer_productos, visaovip_productos, casabo_productos ] = [[], [], [], []],
  [ madridcenter_productos, alborada_productos ] = [[], []],
  [cont_mega, cont_ata, cont_nis, cont_cell, cont_hb, cont_pio, cont_vis, cont_casa] = [0, 0, 0, 0, 0, 0, 0, 0],
  [cont_madri, cont_albo] = [0, 0],
  [cont_mega_t, cont_ata_t, cont_nis_t, cont_cell_t, cont_hb_t, cont_pio_t, cont_vis_t, cont_casa_t]= [0, 0, 0, 0, 0, 0, 0, 0],
  [cont_madri_t, cont_albo_t] = [0, 0]
  let url = ''

  if (exclude) {
    url = `http://204.48.23.1:5000/?token=${token}&search=${buscar}&block=${exclude}`
  } else {
    url = `http://204.48.23.1:5000/?token=${token}&search=${buscar}`
  }

  axios({
    method: 'get',
    url: url,
  }).then(response => {
    let results = response.data
    console.log(Number(response.data.products.length));
  
    
    for (let i = 0; i < Number(response.data.products.length); i++){
      if (results.products[i].store == 'megaeletronicos'){
        mega_productos.push({
          'product': results['products'][i]['product'],
          'price': results['products'][i]['price'],
          'stock': results['products'][i]['stock']
        })
        cont_mega += 1
        if (results.products[i].stock){
          cont_mega_t += 1
        }
      }
      else if(results.products[i].store == 'atacadogames'){
        atacado_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_ata += 1
        if (results.products[i].stock) {
          cont_ata_t += 1
        }
      }
      else if(results.products[i].store == 'casanissei'){
        nissei_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_nis += 1
        if (results.products[i].stock) {
          cont_nis_t += 1
        }
      } 
      else if(results.products[i].store == 'cellshop'){
        cellshop_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_cell += 1
        if (results.products[i].stock){
          cont_cell_t += 1
        }
      }
      else if(results.products[i].store == 'hbgames'){
        hbgames_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_hb += 1
        if (results.products[i].stock){
          cont_hb_t += 1
        }
      }
      else if(results.products[i].store == 'pioneer'){
        pioneer_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_pio += 1
        if (results.products[i].stock){
          cont_pio_t += 1
        }
      }
      else if(results.products[i].store == 'visaovip'){
        visaovip_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_vis += 1
        if (results.products[i].stock){
          cont_vis_t += 1
        }
      }
      else if(results.products[i].store == 'madridcenter'){
        madridcenter_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results['products'][i]['stock']
        })
        cont_madri += 1
        if (results.products[i].stock) {
          cont_madri_t += 1
        } 
      }
      else if(results.products[i].store == 'casabo'){
        casabo_productos.push({
          'product': results['products'][i]['product'],
          'price': results['products'][i]['price'],
          'stock': results['products'][i]['stock']
        })
        cont_casa += 1
        if (results.products[i].stock) {
          cont_casa_t += 1
        } 
      }
      else if(results.products[i].store == 'alborada'){
        alborada_productos.push({
          'product': results['products'][i]['product'],
          'price': results['products'][i]['price'],
          'stock': results['products'][i]['stock']
        })
        cont_albo += 1
        if (results.products[i].stock) {
          cont_albo_t += 1
        } 
      }
    }
    res.render('vista', {
      buscar : buscar,
      exclude : exclude,
      mega_productos : mega_productos,
      atacado_productos : atacado_productos,
      nissei_productos : nissei_productos,
      cellshop_productos : cellshop_productos,
      hbgames_productos : hbgames_productos,
      pioneer_productos : pioneer_productos,
      visaovip_productos : visaovip_productos,
      casabo_productos : casabo_productos,
      madridcenter_productos : madridcenter_productos,
      alborada_productos : alborada_productos,
      cont_mega : cont_mega,
      cont_ata : cont_ata,
      cont_nis : cont_nis,
      cont_cell : cont_cell,
      cont_hb : cont_hb,
      cont_pio : cont_pio,
      cont_vis : cont_vis,
      cont_casa : cont_casa,
      cont_madri : cont_madri,
      cont_albo : cont_albo,
      todos : false,
      cont_mega_t : cont_mega_t,
      cont_ata_t : cont_ata_t,
      cont_nis_t : cont_nis_t,
      cont_cell_t : cont_cell_t,
      cont_hb_t : cont_hb_t,
      cont_pio_t : cont_pio_t,
      cont_vis_t : cont_vis_t,
      cont_casa_t : cont_casa_t,
      cont_madri_t : cont_madri_t,
      cont_albo_t : cont_albo_t
    });
  }).catch((error) => {
    res.redirect('/login');
  });
});

router.get('/true', function (req, res, next) {
  let token = localStorage.getItem('token');
  let buscar = localStorage.getItem('buscar')
  let exclude = localStorage.getItem('exclude')
  let [mega_productos, atacado_productos, nissei_productos, cellshop_productos] = [[], [], [], []],
  [ hbgames_productos, pioneer_productos, visaovip_productos, casabo_productos ] = [[], [], [], []],
  [ madridcenter_productos, alborada_productos ] = [[], []],
  [cont_mega, cont_ata, cont_nis, cont_cell, cont_hb, cont_pio, cont_vis, cont_casa] = [0, 0, 0, 0, 0, 0, 0, 0],
  [cont_madri, cont_albo] = [0, 0],
  [cont_mega_t, cont_ata_t, cont_nis_t, cont_cell_t, cont_hb_t, cont_pio_t, cont_vis_t, cont_casa_t]= [0, 0, 0, 0, 0, 0, 0, 0],
  [cont_madri_t, cont_albo_t] = [0, 0]
  let url = ''

  if (exclude) {
    url = `http://204.48.23.1:5000/?token=${token}&search=${buscar}&block=${exclude}`
  } else {
    url = `http://204.48.23.1:5000/?token=${token}&search=${buscar}`
  }

  axios({
    method: 'get',
    url: url,
  }).then(response => {
    let results = response.data
    console.log(Number(response.data.products.length));
  
    
    for (let i = 0; i < Number(response.data.products.length); i++){
      if (results.products[i].store == 'megaeletronicos'){
        mega_productos.push({
          'product': results['products'][i]['product'],
          'price': results['products'][i]['price'],
          'stock': results['products'][i]['stock']
        })
        cont_mega += 1
        if (results.products[i].stock){
          cont_mega_t += 1
        }
      }
      else if(results.products[i].store == 'atacadogames'){
        atacado_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_ata += 1
        if (results.products[i].stock) {
          cont_ata_t += 1
        }
      }
      else if(results.products[i].store == 'casanissei'){
        nissei_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_nis += 1
        if (results.products[i].stock) {
          cont_nis_t += 1
        }
      } 
      else if(results.products[i].store == 'cellshop'){
        cellshop_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_cell += 1
        if (results.products[i].stock){
          cont_cell_t += 1
        }
      }
      else if(results.products[i].store == 'hbgames'){
        hbgames_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_hb += 1
        if (results.products[i].stock){
          cont_hb_t += 1
        }
      }
      else if(results.products[i].store == 'pioneer'){
        pioneer_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_pio += 1
        if (results.products[i].stock){
          cont_pio_t += 1
        }
      }
      else if(results.products[i].store == 'visaovip'){
        visaovip_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results.products[i].stock
        })
        cont_vis += 1
        if (results.products[i].stock){
          cont_vis_t += 1
        }
      }
      else if(results.products[i].store == 'madridcenter'){
        madridcenter_productos.push({
          'product': results.products[i].product,
          'price': results.products[i].price,
          'stock': results['products'][i]['stock']
        })
        cont_madri += 1
        if (results.products[i].stock) {
          cont_madri_t += 1
        } 
      }
      else if(results.products[i].store == 'casabo'){
        casabo_productos.push({
          'product': results['products'][i]['product'],
          'price': results['products'][i]['price'],
          'stock': results['products'][i]['stock']
        })
        cont_casa += 1
        if (results.products[i].stock) {
          cont_casa_t += 1
        } 
      }
      else if(results.products[i].store == 'alborada'){
        alborada_productos.push({
          'product': results['products'][i]['product'],
          'price': results['products'][i]['price'],
          'stock': results['products'][i]['stock']
        })
        cont_albo += 1
        if (results.products[i].stock) {
          cont_albo_t += 1
        } 
      }
    }
    res.render('vista', {
      buscar : buscar,
      exclude : exclude,
      mega_productos : mega_productos,
      atacado_productos : atacado_productos,
      nissei_productos : nissei_productos,
      cellshop_productos : cellshop_productos,
      hbgames_productos : hbgames_productos,
      pioneer_productos : pioneer_productos,
      visaovip_productos : visaovip_productos,
      casabo_productos : casabo_productos,
      madridcenter_productos : madridcenter_productos,
      alborada_productos : alborada_productos,
      cont_mega : cont_mega,
      cont_ata : cont_ata,
      cont_nis : cont_nis,
      cont_cell : cont_cell,
      cont_hb : cont_hb,
      cont_pio : cont_pio,
      cont_vis : cont_vis,
      cont_casa : cont_casa,
      cont_madri : cont_madri,
      cont_albo : cont_albo,
      todos : true,
      cont_mega_t : cont_mega_t,
      cont_ata_t : cont_ata_t,
      cont_nis_t : cont_nis_t,
      cont_cell_t : cont_cell_t,
      cont_hb_t : cont_hb_t,
      cont_pio_t : cont_pio_t,
      cont_vis_t : cont_vis_t,
      cont_casa_t : cont_casa_t,
      cont_madri_t : cont_madri_t,
      cont_albo_t : cont_albo_t
    });
  }).catch((error) => {
    res.redirect('/login');
  });
});



module.exports = router;





















/*
funcion que retorna varios valores
function hola() {
  var h = 'hola'
  var no = ' no'
  return [h, no]
}

var h, n = hola()
*/