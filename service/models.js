var Sequelize = require('sequelize');

//sequelize-auto -o "./service/models" -d ohberry -h freeive.com -u root -p 3306 -x acac1202 -e mysql


var host = process.platform === "win32" || process.platform === "darwin" ? "i-make.kr" : "localhost";
var sequelize = new Sequelize('mysql://root:acac1202@'+host+'/ohberry',{
	define : {
		timestamps: false
	},
	logging: true
});
var fs = require("fs");
var path = require("path");
var db = {};
fs.readdirSync(__dirname+"/"+"models").forEach(function(file) {
	if(file.indexOf(".js") > -1) {
		var name = file.replace(".js","");
		db[name] = sequelize.import(path.join(__dirname+"/models", file));
	}
});	
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.OrderInfo.belongsTo(db.Member, {foreignKey: 'buyerUserId', targetKey: 'userId'}); // Adds fk_companyname to User
db.OrderInfo.hasMany(db.OrderProduct, {foreignKey: 'orderId', useJunctionTable: false});
db.OrderInfo.hasMany(db.OrderContact, {foreignKey: 'orderId', useJunctionTable: false});
db.OrderProduct.belongsTo(db.Product, {foreignKey: 'productId', targetKey: 'productId'});

db.OrderProduct.belongsTo(db.OrderInfo, {foreignKey: 'orderId', targetKey: 'orderId'});

db.OrderContact.belongsTo(db.Member, {foreignKey: 'writer', targetKey: 'userId'});
db.OrderContact.belongsTo(db.OrderInfo, {foreignKey: 'orderId', targetKey: 'orderId'});
db.CartProduct.belongsTo(db.Member, {foreignKey: 'userId', targetKey: 'userId'});
db.CartProduct.belongsTo(db.Product, {foreignKey: 'productId', targetKey: 'productId'});
module.exports = db;


