module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    link: {
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
  console.log("Pictures");
};
