/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Category', {
	  categoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    registDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
  }, {
    tableName: 'Category'
  });
};
