/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FcContact', {
    contactId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hp: {
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
    tableName: 'FcContact'
  });
};
