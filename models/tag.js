module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define("Tag", {
    style: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bodypart: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Tag.associate = function(models) {
    Tag.belongsTo(models.Picture, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Tag;
};

console.log("Tag");
