import { albums, findArtists, findSongs } from '../utils/song';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import AlbumCard from '../components/song/album-card';
import { useWindowSize } from 'react-use';
import SongList from '../components/song/song-list';
import AartistCard from '../components/song/artist-card';

const Home = () => {
    const { width: windowWidth } = useWindowSize();

    return (
        <div className="grid gap-6">
            <div>
                <h2 className="text-2xl mt-5 font-[Raleway] md:text-4xl font-semibold text-foreground/90">
                    <span className="text-gradient">Hi there!</span>
                </h2>
                <p className="mb-2 text-muted-foreground font-medium md:text-xl font-[Raleway]">
                    What are you in the mood to listen to today?
                </p>
            </div>

            <Card className="bg-gradient">
                <CardHeader>
                    <CardTitle>Top Artists</CardTitle>
                    <CardDescription>Discover the most popular artists</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-x-8 gap-y-2 md:grid-cols-6 place-items-center items-center">
                    {findArtists()
                        .slice(0, 6)
                        .map(artist => (
                            <AartistCard key={artist.id} artist={artist as any} />
                        ))}
                </CardContent>
            </Card>

            <Card className="bg-gradient">
                <CardHeader>
                    <CardTitle>Top Albums</CardTitle>
                    <CardDescription>Discover the most popular albums</CardDescription>
                </CardHeader>

                <CardContent className="grid grid-cols-3 gap-2  md:grid-cols-7 place-items-center">
                    {albums.slice(0, windowWidth < 768 ? 3 * 3 : 7).map(album => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-gradient ">
                <CardHeader>
                    <CardTitle>Top Songs</CardTitle>
                    <CardDescription>Discover the most popular songs</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-1 gap-x-6 gap-y-1">
                    {findSongs(30).map(song => (
                        <SongList key={song.id} song={song} showAlbum={true} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
