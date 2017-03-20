var express = require('express');
var exRouter = express.Router();
var router = express.Router();  

var async = require('async');
var models = require('service/models');
var upload = require('service/upload');

exRouter.use("/admin/api/category", router);


router.all("/", function(req, res, next){


	var where = [];
    models.Category.findAll({
    	where : where ,
    	order : "categoryId ASC"
	})
	.then(function (result) {
		res.send({list : result});
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});


});



router.all("/insert", function(req, res, next){

	console.log(req.body);

	var data = req.body;
	data.registDate = new Date();

    models.Category.create(data)
	.then(function (result) {
		res.end();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});



});

router.all("/:categoryId", function(req, res, next){

    models.Category.find({
    	where : {categoryId : req.params.categoryId}
    })
	.then(function (result) {
		res.send(result);
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});




});



router.all("/:categoryId/update", function(req, res, next){

	console.log(req.body);
	var data = req.body;
    models.Category.update(data, {
    	where : {categoryId : req.params.categoryId}
    })
	.then(function (result) {
		res.end();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});



});


router.all("/:categoryId/delete", function(req, res, next){
    models.Category.destroy({
    	where : {categoryId : req.params.categoryId}
    })
	.then(function (result) {
		res.end();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
});

router.use(function (err, req, res, next) {
	console.log(err);
	res.status(500).send("error");
});

module.exports = exRouter;