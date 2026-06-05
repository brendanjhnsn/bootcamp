const { sequelize, User, Playlist, Song } = require("./models");

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables created!");

    // TODO: Create 3 users with User.create()
    //   - alice  / alice@example.com
    //   - bob    / bob@example.com
    //   - charlie / charlie@example.com
    // Save each to a variable so you can use their .id below

    const alice = await User.create({ 
      username: "alice", 
      email: "alice@example.com"
    });

    const bob = await User.create({ 
      username: "bob", 
      email: "bob@example.com"
    });

    const charlie = await User.create({ 
      username: "charlie", 
      email: "charlie@example.com"
    });


    // TODO: Create 3 playlists with Playlist.create()
    //   - "Chill Vibes" (genre: "Lo-fi") by alice
    //   - "Workout Mix" (genre: "Hip-Hop") by bob
    //   - "Road Trip" (genre: "Rock") by alice
    // Remember to include userId! Save to variables for songs.

    const chillVibes = await Playlist.create({
      name: "Chill Vibes",
      genre: "Lo-fi",
      userId: alice.id
    });

    const workoutMix = await Playlist.create({
      name: "Workout Mix",
      genre: "Hip-Hop",
      userId: bob.id
    });

    const roadTrip = await Playlist.create({
      name: "Road Trip",
      genre: "Rock",
      userId: alice.id
    });


    // TODO: Create songs with Song.bulkCreate([...])
    //   Chill Vibes songs:
    //     - "Sunset Drive" by "Lo-fi Beats" (195 sec)
    //     - "Rainy Day" by "Chillhop" (224 sec)
    //     - "Coffee Shop" by "Jazz Cats" (180 sec)
    //   Workout Mix songs:
    //     - "Lose Yourself" by "Eminem" (326 sec)
    //     - "Stronger" by "Kanye West" (312 sec)
    //   Road Trip songs:
    //     - "Hotel California" by "Eagles" (391 sec)
    //     - "Born to Run" by "Bruce Springsteen" (270 sec)
    // Each song needs: title, artist, duration, playlistId

    await Song.bulkCreate([
      {
        title: "Sunset Drive",
        artist: "Lo-fi Beats",
        duration: 195,
        playlistId: chillVibes.id
      },
      {
        title: "Rainy Day",
        artist: "Chillhop",
        duration: 224,
        playlistId: chillVibes.id
      },
      {
        title: "Coffee Shop",
        artist: "Jazz Cats",
        duration: 180,
        playlistId: chillVibes.id
      },
      {
        title: "Lose Yourself",
        artist: "Eminem",
        duration: 326,
        playlistId: workoutMix.id
      },
      {
        title: "Stronger",
        artist: "Kanye West",
        duration: 312,
        playlistId: workoutMix.id
      },
      {
        title: "Hotel California",
        artist: "Eagles",
        duration: 391,
        playlistId: roadTrip.id
      },
      {
        title: "Born to Run",
        artist: "Bruce Springsteen",
        duration: 270,
        playlistId: roadTrip.id
      }
    ]);


    console.log("Seed data inserted!");
    await sequelize.close();
  } catch (err) {
    console.error("Seed error:", err.message);
    await sequelize.close();
  }
}

seed();
