const sequelize = require("../config/database");
const User = require("./User");
const Playlist = require("./Playlist");
const Song = require("./Song");

// ===== RELATIONSHIPS =====

// TODO: A User has many Playlists (foreignKey: "userId", onDelete: "CASCADE")
// TODO: A Playlist belongs to a User (foreignKey: "userId")

// TODO: A Playlist has many Songs (foreignKey: "playlistId", onDelete: "CASCADE")
// TODO: A Song belongs to a Playlist (foreignKey: "playlistId")

// const sequelize = new Sequelize(
//     process.env.DB_NAME || "playlist_app",
//     process.env.DB_USER || "",
//     process.env.DB_PASSWORD || "",
//     {
//         host: process.env.DB_HOST || "localhost",
//         dialect: "postgres",
//         logging: false,
//     }
// )

Playlist.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Playlist, { foreignKey: "userId", onDelete: "CASCADE" });
Song.belongsTo(Playlist, { foreignKey: "playlistId" });
Playlist.hasMany(Song, { foreignKey: "playlistId", onDelete: "CASCADE" });
Song.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Song, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = { sequelize, User, Playlist, Song };
