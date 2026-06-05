const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// TODO: Define the Song model with sequelize.define("Song", { ... })
//
// Fields:
//   title:
//     - type: STRING(200)
//     - allowNull: false
//     - validate: notEmpty with message "Song title cannot be empty"
//
//   artist:
//     - type: STRING(100)
//     - allowNull: false
//     - validate: notEmpty with message "Artist name cannot be empty"
//
//   duration:
//     - type: INTEGER
//     - validate: min 1 with message "Duration must be at least 1 second"
const Song = sequelize.define("Song", {
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Song title cannot be empty"
      }
    }
    },
    artist: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Artist name cannot be empty"
            }
        }
    },
    duration: {
        type: DataTypes.INTEGER,
        validate: {
            min: {
                args: [1],
                msg: "Duration must be at least 1 second"
            }
        }
    }
});


// TODO: Export the Song model
module.exports = Song;