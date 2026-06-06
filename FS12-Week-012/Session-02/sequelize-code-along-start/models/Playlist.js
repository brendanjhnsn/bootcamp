const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Playlist = sequelize.define("Playlist", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Playlist name cannot be empty"
      }
    }
  },
  
  genre: {
    type: DataTypes.STRING(50)
  }
});

Playlist.belongsTo(require("./User"), { foreignKey: "userId" });
Playlist.hasMany(require("./Song"), { foreignKey: "playlistId", onDelete: "CASCADE" });

// TODO: Export the Playlist model
module.exports = Playlist;