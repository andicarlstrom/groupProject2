module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Picture.associate = function(models) {
    Picture.belongsTo(models.Artist, {
      foreignKey: {
        allowNull: false
      }
    });

    Picture.hasMany(models.Tag, {
      onDelete: "cascade"
    });
  };
  return Picture;
};
console.log("Pictures");
