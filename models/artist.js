module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING(5),
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
