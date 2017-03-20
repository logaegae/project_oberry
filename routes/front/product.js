var express=require('express');
var exRouter = express.Router();
var router = express.Router();
var path = require('path');
var async = require('async');
var models = require('service/models');
var upload = require('service/upload');

var app = express();

exRouter.use("/product", router);

router.all("/list", function(req, res, next){
	
    models.Product.findAll({
    	where :  {} ,
    	order : "sortNo ASC, productId Desc"
	})
	.then(function (result) {
		res.render("shop", {list:result});
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
		
});


router.all("/detail/:productId", function(req, res, next){
	
	models.Product.find({
		where : {productId : req.params.productId}
	})
	.then(function (result) {
		res.render("detail", {detail:result});
	})
});


router.all("/insert", function(req, res, next){
	
	var data = {
		orderId : req.body.orderid,
		orderName : req.body.ordername,
		buyerEmail : req.body.email,
		buyerName : req.body.buyername,
		buyerTel : req.body.phone,
		buyerAddr :	req.body.address,
		buyerPostCode : req.body.postcode,
		buyerUserId : req.body.userid,
		impUid : req.body.impuid,
		paymentAmt : req.body.payment,
		applyNum : req.body.applynum,
		paymentMethod : req.body.paymentmethod,
		orderDate : new Date()		
	}
	
	var data2 = {
		orderId : req.body.orderid,
		productId : req.body.productid,
		cost :req.body.payment
	}
		
	console.log(data)
	console.log(data2)
	
	models.OrderInfo.create(data)
	models.OrderProduct.create(data2)
	.then(function (result){
		res.end();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	})
})





module.exports=exRouter;
