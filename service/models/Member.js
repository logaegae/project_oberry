/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Member', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthDay: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    postCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    initPwdUUID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    initPwdExpire: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Member'
  });
};
