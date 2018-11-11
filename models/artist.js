module.exports = function(sequelize, DataTypes) {
    var Artist = sequelize.define ("Artist", {   
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
    };
    Artist.associate = function(models) {
        Artist.hasMany(models.Picture, {
            onDelete : "cascade"
        });
    }
         return Artist;
    };
console.log("artist is running")