var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
res.render('index', {title: 'express'});
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'The Test' });
});

/* Get basicD3 page */
router.get('/basicD3', function(req, res, next){
    res.render('basicD3');
});

/* Get basicD3 page */
router.get('/basicBarChart', function(req, res, next){
    res.render('basicBarChart');
});

/* Get temp5mins page */
router.get('/temp5mins', function(req, res, next){
    res.render('temp5mins');
});

/* Get tempHourly page */
router.get('/tempHourly', function(req, res, next){
    res.render('tempHourly');
});

/* Get tempdaily page */
router.get('/tempDaily', function(req, res, next){
    res.render('tempDaily');
});

/* Get tempdaily page */
router.get('/temperatureCode', function(req, res, next){
    res.render('temperatureCode');
});

/* Get tempdaily page */
router.get('/temperatureHourlyAverages', function(req, res, next){
    res.render('temperatureHourlyAverages');
});

/* Get tempdaily page */
router.get('/temperatureDailyAverages', function(req, res, next){
    res.render('temperatureDailyAverages');
});

module.exports = router;
