import _ from 'lodash';
import songsData from '../data/songs-data';

const findAlbums = () => {
    const albums = _.chain(songsData)
        .groupBy('album.id')
        .map((songs, album) => ({
            id: album,
            name: songs[0].album.name,
            image: songs[0].image,
            songs: songs.length,
        }))
        .filter(album => album.songs > 1)
        .orderBy('songs', 'desc')
        .value();

    return albums;
};

const findAlbumById = (id: string) => {
    const albumSong = _.find(songsData, song => song.album.id === id);
    if (!albumSong) return null;

    const albumSongs = _.filter(songsData, song => song.album.id === id);

    return {
        id: albumSong.album.id,
        name: albumSong.album.name,
        url: albumSong.album.url,
        releaseDate: albumSong.releaseDate,
        language: albumSong.language,
        image: albumSong.image,
        duration: _.sumBy(albumSongs, 'duration'),
        artists: _.uniqBy(_.flatMap(albumSongs, 'artists'), 'id'),
        songs: albumSongs,
    };
};

const findSongs = (count = 25) => {
    return _.sampleSize(songsData, count);
};

const albums = findAlbums();
const songs = findSongs();

export { albums, songs, findAlbums, findSongs, findAlbumById };
