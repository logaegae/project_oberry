var express = require('express');
var exRouter = express.Router();
var router = express.Router();  

var async = require('async');
var models = require('service/models');

exRouter.use("/admin/api", router);

router.all("/contact", function(req, res, next){


	var page = req.body.page ? parseInt(req.body.page) : 1;
	var pageSize = req.body.pageSize ? parseInt(req.body.pageSize) : 10;

	async.series([
	    function(callback) {

			var where = [];
			if(req.body.searchText) {
				where = ['title like ?','%'+req.body.searchText+'%'];
			}
			models.Contact.count({
				where : where
			})
	    	.then(function (result) {
	    		callback(null, result);
	    	})
	    	.catch(function (err) {
	    		process.nextTick(function () {throw err});
	    	});
	    },
	    function(callback) {


			var where = [];
			if(req.body.searchText) {
				where = ['title like ?','%'+req.body.searchText+'%'];
			}

		    models.Contact.findAll({
		    	where : where ,
		    	order : "replyYn Asc, contactId Desc",
		    	offset : (page-1)*pageSize,
		    	limit : pageSize
			})
	    	.then(function (result) {
	    		callback(null, result);
	    	})
	    	.catch(function (err) {
	    		process.nextTick(function () {throw err});
	    	});


	    }
	], function (err, result) {
		if(err) next(err);
		res.send({
			totalCount : result[0],
			list : result[1],
			currentPage : page
		});
	});


});


router.all("/contact/:contactId", function(req, res, next){

    models.Contact.find({
    	where : {contactId : req.params.contactId}
    })
	.then(function (result) {
		res.send(result);
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});


});

router.all("/contact/:contactId/update", function(req, res, next){
	
	var data = req.body;
	if(data.replyContent && data.replyContent != '') {
		data.replyDate = new Date();
		data.replyYn = 'Y';
	}

    models.Contact.update(data, {
    	where : {contactId : req.params.contactId}
    })
	.then(function (result) {
		res.end();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});



});


router.all("/contact/:contactId/delete", function(req, res, next){
    models.Contact.destory({
    	where : {contactId : req.params.contactId}
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