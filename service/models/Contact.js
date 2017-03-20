/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Contact', {
    contactId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contactType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
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
    },
    replyDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    replyContent: {
      type: DataTypes.STRING,
      allowNull: true
    },
    replyYn: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Contact'
  });
};
