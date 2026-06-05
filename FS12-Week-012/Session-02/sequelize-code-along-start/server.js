const express = require("express");
const { sequelize, User, Playlist, Song } = require("./models");
require("dotenv").config();

const app = express();
app.use(express.json());

// ==================== USER ROUTES ====================

// TODO: GET /api/users — get all users
//   - Use User.findAll()
//   - Return the array as JSON

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/api/users", getAllUsers);

// TODO: POST /api/users — create a user
//   - Use User.create(req.body)
//   - Return 201 status with the new user
//   - Return 400 status on validation error
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ error: error.errors.map(e => e.message) });
    } else {
      res.status(500).json({ error: "Internal server error" });
    } 
  }
};

app.post("/api/users", createUser);

// ==================== PLAYLIST ROUTES ====================

// TODO: GET /api/playlists — get all playlists with user and songs
//   - Use Playlist.findAll() with include:
//     - User model (attributes: ["id", "username"])
//     - Song model
//   - Order by createdAt DESC

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username"]
        },
        {
          model: Song
        }
      ],
      order: [["createdAt", "DESC"]]
    });
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// TODO: POST /api/playlists — create a playlist
//   - Use Playlist.create(req.body)
//   - req.body should have: name, genre, userId
//   - Return 201 status
const createPlaylist = async (req, res) => {
  try {
    const newPlaylist = await Playlist.create(req.body);
    res.status(201).json(newPlaylist);
  } catch (error) {
    console.error("Error creating playlist:", error);
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ error: error.errors.map(e => e.message) });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

app.post("/api/playlists", createPlaylist);

// TODO: GET /api/playlists/:id — get one playlist with user and songs
//   - Use Playlist.findByPk(req.params.id) with same includes as above
//   - Return 404 if not found
const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username"]
        },
        {
          model: Song
        }
      ]
    });
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.json(playlist);
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

app.get("/api/playlists/:id", getPlaylistById);


// ==================== SONG ROUTES ====================

// TODO: POST /api/playlists/:id/songs — add a song to a playlist
//   - First find the playlist with Playlist.findByPk(req.params.id)
//   - Return 404 if playlist not found
//   - Create song with: title, artist, duration (from req.body), playlistId (from playlist)
//   - Return 201 status
const addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    const newSong = await Song.create({
      ...req.body,
      playlistId: playlist.id
    });
    res.status(201).json(newSong);
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ error: error.errors.map(e => e.message) });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

app.post("/api/playlists/:id/songs", addSongToPlaylist);

// ==================== START SERVER ====================

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
