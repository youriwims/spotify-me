import { getTopSongs } from '../../lib/utlities';

export default async (_, res) => {
  const response = await getTopSongs();
  const { items } = await response.json();

  // Build curated songs obeject
  const songs = items.map((song) => ({
    artist: song.artists[0].name,
    songUrl: song.external_urls.spotify,
    title: song.name,
    album: song.album.name,
    image: song.album.images[1].url
  }));

  console.log(songs)

  // TODO: Add error-handling

  return res.status(200).json({ songs });
};
