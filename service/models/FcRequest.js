/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FcRequest', {
    requestId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    requestY: {
      type: DataTypes.STRING,
      allowNull: true
    },
    requestM: {
      type: DataTypes.STRING,
      allowNull: true
    },
    requestD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'FcRequest'
  });
};
