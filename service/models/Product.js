/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product', {
    productId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoryId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbLocalPath: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbPath: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbSize: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    thumbName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sortNo: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Product'
  });
};
