module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    placement: {
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
  };
  return Picture;
};
console.log("Pictures");
