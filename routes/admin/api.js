var express = require('express');
var exRouter = express.Router();
var router = express.Router();  

var async = require('async');
var models = require('service/models');

exRouter.use("/admin/api", router);

/**
 * 관리자 로그인
 */
router.all("/login", function (req, res, next) {
	
	console.log(req.body);
	
	if(req.body.email == "admin" && req.body.password == "1234") {
		req.session.isAdmin = true;
		res.send({
			isSuccess : true
		});
	} else {
		res.send({
			isSuccess : false
		});
		
	}
	
});

/**
 * 관리자 로그아웃
 */
router.all("/logout", function (req, res, next) {
	req.session.isAdmin = false;
	res.redirect("/admin");
});

router.all("/*", function (req, res, next) {
	console.log(req.session.isAdmin);
	if(req.session.isAdmin) {
		next();
	} else {
		res.status(401).end();
	}
});


router.all("/member", function(req, res, next){


	var page = req.body.page ? parseInt(req.body.page) : 1;
	var pageSize = req.body.pageSize ? parseInt(req.body.pageSize) : 10;

	async.series([
	    function(callback) {

			var where = [];
			if(req.body.searchText) {
				where = ['name like ?','%'+req.body.searchText+'%'];
			}
			models.Member.count({
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
				where = ['name like ?','%'+req.body.searchText+'%'];
			}

		    models.Member.findAll({
		    	where : where ,
		    	order : "userId Desc",
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


router.all("/member/:userId", function(req, res, next){

    models.Member.find({
    	where : {userId : req.params.userId}
    })
	.then(function (result) {
		res.send(result);
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});


});

router.all("/member/:userId/update", function(req, res, next){

    models.Member.update(req.body, {
    	where : {userId : req.params.userId}
    })
	.then(function (result) {
		res.end();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});



});


router.all("/member/:userId/delete", function(req, res, next){
    models.Member.destory({
    	where : {userId : req.params.userId}
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