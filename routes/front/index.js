var express = require('express');
var exRouter = express.Router();
var router = express.Router();  
var models = require('service/models')
var mysql = require('service/mysql');
var async = require('async');
var iamport = require('service/iamport');

exRouter.use("/front", router);

/**
 * 마이페이지 정보 보기
 */
router.all(["/mypage.html","/mypage_info.html"], function(req, res, next){
	
	if(!req.session.userInfo) {
		res.redirect("/front/login.html");
		return;
	}
	
	models.Member.findOne({
		where : {
			userId : req.session.userInfo.userId
		},
		raw : true
	})
	.then(function (result) {
		res.locals.member = result
		next();
	}).catch(function (err) {
		process.nextTick(function () {throw err});
	});
	
});


/**
 * 구매 정보
 */
router.all("/buy_info.html", function(req, res, next){
	
	if(!req.session.userInfo) {
		res.redirect("/front/login.html");
		return;
	}
	
	var page = req.query.page ? parseInt(req.query.page) : 1;
	var pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
	
	async.series([
		function(callback) {
			models.OrderInfo.count({
		    	where :  {buyerUserId : req.session.userInfo.userId} ,
		    	order : "orderDate DESC"
			})
			.then(function (result) {
				callback(null, result);
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
		},//조회수 DB문
		
		function(callback) {

			
			models.OrderInfo.findAll({
		    	where :  {buyerUserId : req.session.userInfo.userId} ,
		    	order : "orderDate DESC",
		    	include: [{ all: true, nested: true}],
				offset : (page-1)*pageSize,
				limit : pageSize
			})
			.then(function (result) {
				callback(null, result);
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
		} //리스트 DB문
		
	], function (err, result) { 
		if(err) next(err);
		res.locals.totalCount = result[0];
		res.locals.list = result[1];
		res.locals.currentPage = page;
		res.locals.pageSize = pageSize;
		next();
	});
		
		
});





/**
 * 뉴스
 */
router.all("/notice.html", function(req, res, next){
	
	var page = req.query.page ? parseInt(req.query.page) : 1;
	var pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
	
	async.series([
		function(callback) {
			models.Board.count({
				where : {boardId : 'news'}
			})
			.then(function (result) {
				callback(null, result);
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
		},//조회수 DB문
		
		function(callback) {

			
			models.Board.findAll({
				where : {boardId : 'news'},
				order : "boardSeq Desc",
				offset : (page-1)*pageSize,
				limit : pageSize
			})
			.then(function (result) {
				callback(null, result);
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
		} //리스트 DB문
		
	], function (err, result) { 
		if(err) next(err);
		res.locals.totalCount = result[0];
		res.locals.list = result[1];
		res.locals.currentPage = page;
		res.locals.pageSize = pageSize;
		next();
	});
		
});






/**
 *  1:1 문의
 */
router.all("/inquiry.html", function(req, res, next){
	
	if(!req.session.userInfo) {
		res.redirect("/front/login.html");
		return;
	}
	
	var page = req.query.page ? parseInt(req.query.page) : 1;
	var pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
	
	async.series([
		function(callback) {
			models.Contact.count({
				where : {userId : req.session.userInfo.userId}
			})
			.then(function (result) {
				callback(null, result);
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
		},//조회수 DB문
		
		function(callback) {

			
			models.Contact.findAll({
				where : {userId : req.session.userInfo.userId},
				order : "contactId Desc",
				offset : (page-1)*pageSize,
				limit : pageSize
			})
			.then(function (result) {
				callback(null, result);
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
		} //리스트 DB문
		
	], function (err, result) { 
		if(err) next(err);
		res.locals.totalCount = result[0];
		res.locals.list = result[1];
		res.locals.currentPage = page;
		res.locals.pageSize = pageSize;
		next();
	});
		
});



/**
 *  1:1 문의 보기
 */
router.all("/inquiry_answer.html", function(req, res, next){
	
	if(req.session.userInfo) {
		models.Contact.find({
			where : {contactId : req.query.contactId, userId : req.session.userInfo.userId},
			order : "contactId Desc"
		})
		.then(function (result) {
			res.locals.detail = result;
			next();
		})
		.catch(function (err) {
			process.nextTick(function () {throw err});
		});
	} else {
		res.redirect("/front/login.html");
	}
	

	
});

/**
 *  1:1 문의 작성
 */
router.all("/inquiry", function(req, res, next){
	if(req.session.userInfo) {
		var data = req.body;
		data.registDate = new Date();
		data.userId = req.session.userInfo.userId;
		data.replyYn = 'N';
			
		models.Contact.create(data)
		.then(function (result) {
			res.redirect("/front/inquiry.html");
		})
		.catch(function (err) {
			process.nextTick(function () {throw err});
		});
	} else {
		res.redirect("/front/login.html");
	}
	
});

/**
 * 뉴스 상세
 */
router.all("/notice_sub.html", function(req, res, next){
	
	models.Board.findOne({
		where : {boardSeq : req.query.boardSeq}
	})
	.then(function (result) {
		res.locals.detail = result;
		next();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
});


/**
 * 아이디 찾기
 */
router.all("/search_confirm.html", function(req, res, next){
	
	models.Member.findOne({
		where : {name : req.body.name, hp : req.body.hp}
	})
	.then(function (result) {
		if(result) {
			res.locals.userId = result.userId;
			res.locals.name = req.body.name;
		}
		next();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
});


/**
 * 쇼핑 리스트
 */
router.all("/shop.html", function(req, res, next){
	
	var where = {};
	if(req.query.categoryId) {
		where.categoryId = req.query.categoryId;
	}
	
    models.Product.findAll({
    	where :  where ,
    	order : "sortNo ASC, productId Desc"
	})
	.then(function (result) {
		
		res.locals.list = result;
		
		var where = [];
	    models.Category.findAll({
	    	where : where ,
	    	order : "categoryId ASC"
		})
		.then(function (result2) {
			res.locals.categorys = result2;
			next();
		})
		.catch(function (err) {
			process.nextTick(function () {throw err});
		});
	    
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
		
});

/**
 * 상품 상세
 */
router.all("/product.html", function(req, res, next){
	
	models.Product.find({
		where : {productId : req.query.productId}
	})
	.then(function (result) {
		res.locals.detail = result;
		
		models.Review.findAll({
			where : {productId : req.query.productId},
			order : "registDate Desc",
			raw : true
		})
		.then(function (result) {
			console.log(result);
			res.locals.reviews = result;
			next();
		})
		.catch(function (err) {
			process.nextTick(function () {throw err});
		});

	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
});


/**
 * 비밀번호 초기화
 */
router.all("/pw_reset.html", function(req, res, next){
	
	models.Member.find({
		where : {initPwdUUID : req.query.initPwdUUID, userId : req.query.userId}
	})
	.then(function (result) {
		if(result) {
			next();
		} else {
			res.redirect("/front/message.html?message=비밀번호 초기화 기간에 경과했거나 잘못된 정보입니다.");
		}
		
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
});

router.all("/resetPassword", function(req, res, next){
	
	models.Member.update({
		pwd : req.body.pwd, 
		initPwdUUID : null,
		initPwdExpire : null
	},{
		where : {initPwdUUID : req.body.initPwdUUID, userId : req.body.userId}
	})
	.then(function (result) {
		if(result) {
			res.redirect("/front/message.html?message=비밀번호가 변경되었습니다.");
		} else {
			res.redirect("/front/message.html?message=비밀번호 초기화 기간에 경과했거나 잘못된 정보입니다.");
		}
		
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
});


/**
 * 리뷰 쓰기
 */
router.all("/review", function(req, res, next){
	if(req.session.userInfo) {
		var data = req.body;
		
		
		data.registDate = new Date();
		data.userId = req.session.userInfo.userId;  
			
		models.Review.create(data)
			
		.then(function (result) {
			res.redirect("/front/product.html?productId="+req.body.productId);
		})
		.catch(function (err) {
			process.nextTick(function () {throw err});
		});
	} else {
		res.redirect("/front/login.html");
	}
	


})

/**
 * 구매 페이지
 */
router.all("/detail.html", function(req, res, next){
	
	if(!req.session.userInfo) {
		res.redirect("/front/login.html");
		return;
	}
	
	var data = [];
	var data = req.body;
/*	models.CartProduct.findAll({
		where : {userId : req.session.userInfo.userId},
		include: [{ all: true, nested: true}]
	})*/
	
	
	var items = [];
	if(Array.isArray(req.body.productId)) {
		for(var i = 0 ; i < req.body.productId.length; i++) {
			items.push({
				productId : req.body.productId[i],
				quantity : req.body.quantity[i]
			});
		}		
	} else {
		items.push({
			productId : req.body.productId,
			quantity : req.body.quantity
		});
		
	}
	
	
	async.map(items, function(item, callback) {
		
		models.Product.findAll({
			where : {productId : item.productId}, 
			raw : true
		})
		.then(function (result) {
			result[0].quantity = item.quantity;
			callback(null,result[0]);
		}) 
		.catch(function (err) {
			process.nextTick(function () {throw err});
		});
		
		
	},function(err, result) {
		if(err) {
			process.nextTick(function () {throw err});
			return;
		}
		
		res.locals.list = result;
		
		
		next();		
	});
	
});


/**
 * 장바구니
 */
router.all("/cart.html", function(req, res, next){		
		
		if(req.session.userInfo) {
			models.CartProduct.findAll({
				where : {userId : req.session.userInfo.userId},
				include: [{ all: true, nested: true}]
			})
			.then(function (result) {
				res.locals.detail = result;
				next();
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});				
		} else {
			next();
		}


})

/**
 * 장바구니 담기
 */
router.all("/addCart", function(req, res, next){
	if(req.session.userInfo) {
		var data = {
				userId : req.session.userInfo.userId,
				productId : req.query.productId,
				quantity : req.query.quantity,
				cost : req.query.price	
		}	
		models.CartProduct.create(data)
			
		.then(function (result) {
			res.redirect("/front/cart.html");
		})
		.catch(function (err) {
			process.nextTick(function () {throw err});
		});
	} else {
		res.redirect("/front/login.html");
	}
	


})

/**
 * 장바구니 삭제
 */
router.all("/delete", function(req, res, next){
	
	models.CartProduct.destroy({
		where : {cartId : req.body.cartId}
	})
	.then(function (result) {
		res.end();
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
});

/**
 * 장바구니 수정
 */
router.all("/cartUpdate", function(req, res, next){
	async.each(req.body.cartList, function(item, callback) {		
		models.CartProduct.update(item, {
			where : {cartId : item.cartId}
		})
		.then(function (result) {
			callback();
		})
		.catch(function (err) {
			process.nextTick(function () {throw err});
		});

	}, function(err) {
		if(err) throw err;
		res.end();
	});
	
});

/**
 * 주문 처리
 */
router.all("/order", function(req, res, next){


	async.waterfall([
	   function(callback) {
			iamport.validatePayment(req.body.impUid, req.body.paymentAmt,function (result) {
				if(result) {
					callback(null);
				} else {
					res.redirect("/front/message.html?message=결제정보 검증 오류");
				}
			});
	   },
	   function(callback) {
			var data = req.body;
			data.orderDate = new Date();
			data.paymentStatus = "02";
			
			if(req.session.userInfo) {
				data.buyerUserId = req.session.userInfo.userId;
			}
			
			models.OrderInfo.create(data)
			.then(function (result){
				callback(null);
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
	  			
	   },

	   function(callback) {  		   
		   
		   // 주소 변경 처리
		   
			var data = {};
			data.address1 = req.body.buyerAddr1;
			data.address2 = req.body.buyerAddr2;
			data.postCode = req.body.buyerPostCode;
			
			
			models.Member.update(data, {
				where : {userId : req.session.userInfo.userId}
			})
			.then(function (result){
				req.session.userInfo.address1 = req.body.buyerAddr1;
				req.session.userInfo.address2 = req.body.buyerAddr2;
				req.session.userInfo.postCode = req.body.buyerPostCode;
				callback(null);
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
	  			
	   },
	   function(callback) {

			
			var items = [];
			if(Array.isArray(req.body.productId)) {
				for(var i = 0 ; i < req.body.productId.length; i++) {
					items.push({
						productId : req.body.productId[i],
						quantity : req.body.quantity[i]
					});
				}		
			} else {
				items.push({
					productId : req.body.productId,
					quantity : req.body.quantity
				});
				
			}
			
			
			async.map(items, function(item, mapCallback) {
				
				models.Product.findOne({
					where : {productId : item.productId}
				})
				.then(function (result) {
					var data = {
						orderId : req.body.orderId,
						productId : item.productId,
						quantity : item.quantity,
						cost : result.price
					};
					
					
					models.OrderProduct.create(data)
					.then(function(result) {
						mapCallback(null);
					})
		  			.catch(function (err) {
		  				process.nextTick(function () {throw err});
		  			});
				}) 
				.catch(function (err) {
					process.nextTick(function () {throw err});
				});
				
				
			},function(err, result) {
				if(err) {
					process.nextTick(function () {throw err});
					return;
				}
				callback();
			});
			
	   }
	], function (err) {
		if(err) throw err;
		res.redirect("/front/cart_confirm.html");
	});
	

});


/**
 *  프렌차이즈 문의
 */
router.all("/writeFcContact", function(req, res, next){
	var data = req.body;
	data.registDate = new Date();
		
	models.FcContact.create(data)
	.then(function (result) {
		res.redirect("/front/message.html?message=문의 내용이 등록되었습니다.");
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
	
});


/**
 *  프렌차이즈 사업설명회 요청
 */
router.all("/writeFcRequest", function(req, res, next){
	var data = req.body;
	data.registDate = new Date();
		
	models.FcRequest.create(data)
	.then(function (result) {
		res.redirect("/front/message.html?message=사업설명회 요청이 등록되었습니다.");
	})
	.catch(function (err) {
		process.nextTick(function () {throw err});
	});
	
});



router.all("/*.html", function(req, res, next){
	var path = req.originalUrl.substring(1,req.originalUrl.indexOf(".html"));
	res.render(path, {
		menuUrl : req.path.substring(1),
		session : req.session,
		query : req.query,
		body : req.body
	});
});

module.exports = exRouter;