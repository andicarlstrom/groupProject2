module.exports = function(sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    pricing: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Artist.associate = function(models) {
    Artist.hasOne(models.Customer);

    Artist.hasMany(models.Picture, {
      onDelete: "cascade"
    });
  };

  return Artist;
};

console.log("Artist");