module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pricing: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Artist.associate = function(models) {
    Artist.hasOne(models.User);

    Artist.hasMany(models.Picture, {
      onDelete: "cascade"
    });
  };

  return Artist;
};

console.log("Artist");
