var express = require('express');
var exRouter = express.Router();
var router = express.Router();  

var async = require('async');
var models = require('service/models');
var upload = require('service/upload');

exRouter.use("/admin/api", router);

/**
 * 관리자 로그인
 */
router.all("/upload", upload.array('files'), function (req, res, next) {
	
	var result = [];
	for(var i = 0; i < req.files.length ; i++) {
		result.push({
			path : "/uploads/"+req.files[i].filename
		})
	}

	res.send(result);
	
});
module.exports = exRouter;