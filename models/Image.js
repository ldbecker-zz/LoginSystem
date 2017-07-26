'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    id: {type: DataTypes.INTEGER, primaryKey: true}, 
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    accountType: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};