/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderInfo', {
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    orderName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buyerEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buyerName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buyerTel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buyerAddr1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buyerAddr2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buyerPostCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    buyerUserId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    impUid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentAmt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    applyNum: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unReadContactCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    OrderInfocol: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'OrderInfo'
  });
};
