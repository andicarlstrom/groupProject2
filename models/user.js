module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    password: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("user", "artist")
    }
  });
  return User;
};
console.log("User");
