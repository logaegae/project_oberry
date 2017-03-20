var express = require('express');
var exRouter = express.Router();
var router = express.Router();  
var models = require('service/models');
var https = require('https');
var async = require('async');
var uuid = require('uuid');

exRouter.use("/front/auth", router);

router.all("/logout", function (req, res, next) {

	req.session.destroy();
	res.redirect('/');
	
});
router.all("/login", function (req, res, next) {
	
	models.Member.findOne({
		where : {
			userId : req.body.userId, 
			pwd : req.body.pwd
		},
		raw : true
	})
	.then(function (result) {

		if(result) {
			
			req.session.userInfo = result;
			models.Member.update({lastLoginDate : new Date()}, {
				where : {userId : req.body.userId}
			})
			.then(function (result) {
				res.redirect("/");
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
			
		} else {
			
			req.session.userInfo = result;
			res.redirect("/front/message.html?message=아이디 또는 비밀번호가 일치하지 않습니다.");
			
		}
		
	}).catch(function (err) {
		process.nextTick(function () {throw err});
	});
	
});

router.all("/checkId", function (req, res, next) {

	models.Member.findOne({
		where : {
			userId : req.query.userId
		},
		raw : true
	})
	.then(function (result) {
		
		if(result) {
			res.send({
				checked : true
			});
		} else {
			res.send({
				checked : false
			});
		}
		
	}).catch(function (err) {
		process.nextTick(function () {throw err});
	});
	
});

router.all("/join", function (req, res, next) {
	
	var data = req.body;
	data.registDate = new Date();
	
	models.Member.create(data)
	.then(function (result) {
		
		res.redirect("/front/join_confirm.html");
		
	}).catch(function (err) {
		process.nextTick(function () {throw err});
	});
	
});


router.all("/modify", function (req, res, next) {
	
	var data = req.body;
	
	if(data.pwd == "") {
		delete data.pwd;
	}
	
	models.Member.update(data, {
		where : {
			userId : req.session.userInfo.userId
		}
	})
	.then(function (result) {
		
		models.Member.findOne({
			where : {
				userId : req.session.userInfo.userId
			},
			raw : true
		})
		.then(function (result) {
			req.session.userInfo = result;
			res.redirect("/front/mypage.html");
		}).catch(function (err) {
			process.nextTick(function () {throw err});
		});
		
	}).catch(function (err) {
		process.nextTick(function () {throw err});
	});
	
});

router.all("/searchPw",  function (req, res, next) {
	
	models.Member.findOne({
		where : {
			userId : req.body.userId,
			name : req.body.name,
			hp : req.body.hp
		}
	})
	.then(function (result) {
		
		var email = result.email;
		
		if(result) {
			
			var expireDate = new Date();
			expireDate.setDate(expireDate.getDate()+1);
			var data = {
				initPwdUUID : uuid.v4(),
				initPwdExpire : expireDate
			}
			
			models.Member.update(data, {
				where : {userId : req.body.userId}
			})
			.then(function (result) {
				
				var nodemailer = require('nodemailer');
				var smtpTransport = nodemailer.createTransport('smtp://hankr@freeive.com:qwer!@34@smtp.cafe24.com:587');

				console.log(req.headers.origin);
				var mailOptions = {
					from: '오베리굿 <hankr@freeive.com>',
					to: email,
					subject: '오베리굿 비밀번호 초기화 메일',
					html: '안녕하세요.<br/>비밀번호 찾기에 의한 초기화 메일입니다.<br/>아래 링크를 클릭히시어 비밀번호를 변경해 주시기 바랍니다.<br/><br/><a href="'+req.headers.origin+'/front/pw_reset.html?initPwdUUID='+data.initPwdUUID+'&userId='+req.body.userId+'">오베리굿 비밀번호 초기화</a>'
				};
				console.log(email);

				smtpTransport.sendMail(mailOptions, function(error, response){
					if (error){
						process.nextTick(function () {throw error});
					} else {
						res.redirect("/front/search_pw_confirm.html");
					}
					smtpTransport.close();
				});				
				
				
				
			})
			.catch(function (err) {
				process.nextTick(function () {throw err});
			});
			
		} else {
			res.redirect("/front/message.html?message=회원님의 정보를 찾을 수 없습니다.");
		}
		
	}).catch(function (err) {
		process.nextTick(function () {throw err});
	});
	
});



module.exports = exRouter;