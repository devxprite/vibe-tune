import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
    FastForwardIcon,
    LoaderCircleIcon,
    MinusCircle,
    PauseIcon,
    PlayIcon,
    PlusCircle,
    RepeatIcon,
    ShuffleIcon,
    SkipBack,
    SkipForward,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { findAlbumById } from '../utils/song';
import SongList from '../components/song/song-list';
import { formatDuration } from '../lib/utils';
import AartistCard from '../components/song/artist-card';
import { useMusicPlayerContext } from '../context/audio-provider';
import { Link } from 'react-router';

const Player = () => {
    const { playerState, handleSeek, togglePlayPause, playNext, playPrevious, addToPlaylist, removeFromPlaylist } =
        useMusicPlayerContext();
    const { currentSong: song, playlist } = playerState;

    if (!song) return <p></p>;
    const album = findAlbumById(song?.album.id);

    if (!album) return <p></p>;

    const isInPlaylist = playlist.some(s => s.id === song.id);

    return (
        <div className="grid gap-6 md:gap-10">
            {/* <h2 className="text-2xl font-semibold text-center mt-6">Player</h2> */}

            <Card className="flex flex-col md:flex-row overflow-hidden mx-auto p-6 md:p-6 gap-10 w-full mt-6">
                <div className=" md:h-56">
                    <img
                        className="size-full aspect-[5/4] border rounded-lg shadow-lg shadow-background/80 "
                        src={song.image}
                    />
                </div>

                <div className="flex-1 flex flex-col justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-semibold line-clamp-1 text-ellipsis">
                                {song.name}
                            </h3>

                            <p className="text-sm md:text-base text-muted-foreground ">
                                <Link className="text-primary hover:underline" to={`/albums/${song.album.id}`}>
                                    {song.album.name}
                                </Link>{' '}
                                • {song.releaseDate}
                            </p>
                        </div>

                        <div
                            role="button"
                            onClick={e => {
                                if (isInPlaylist) removeFromPlaylist(song);
                                else addToPlaylist([song]);
                                e.stopPropagation();
                            }}
                        >
                            {isInPlaylist ? (
                                <MinusCircle className="size-6  text-red-500" />
                            ) : (
                                <PlusCircle className="size-6   text-green-500" />
                            )}
                        </div>
                    </div>

                    <div>
                        <Slider
                            value={[playerState.progress]}
                            max={song.duration}
                            step={1}
                            onValueChange={value => handleSeek(value[0])}
                        />

                        <div className="flex text-xs md:text-sm justify-between items-center mt-1.5 md:mt-2 text-muted-foreground">
                            <span>{formatDuration(playerState.progress)}</span>
                            <span>{formatDuration(song.duration)}</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-6">
                        <ShuffleIcon className="size-4 text-muted-foreground" />
                        <div className="flex items-center justify-center gap-4 md:gap-8">
                            <Button size={'icon'} variant={'ghost'} onClick={playPrevious}>
                                <SkipBack className="" />
                            </Button>

                            <Button size={'icon'} variant={'ghost'} onClick={playPrevious} className="max-md:hidden">
                                <FastForwardIcon className="rotate-180" />
                            </Button>

                            {playerState.isReady && (
                                <Button
                                    size={'icon'}
                                    variant={'default'}
                                    onClick={togglePlayPause}
                                    className="rounded-full p-5"
                                >
                                    {playerState.isPlaying ? (
                                        <PauseIcon className="md:size-6 " />
                                    ) : (
                                        <PlayIcon className="md:size-6 " />
                                    )}
                                </Button>
                            )}

                            {!playerState.isReady && (
                                <Button size={'icon'} variant={'default'} className="rounded-full p-5" disabled>
                                    <LoaderCircleIcon className="animate-spin" />
                                </Button>
                            )}
                            <Button size={'icon'} variant={'ghost'} onClick={playPrevious} className="max-md:hidden">
                                <FastForwardIcon className="rotate-0" />
                            </Button>
                            <Button size={'icon'} variant={'ghost'} onClick={playNext}>
                                <SkipForward className="size-5" />
                            </Button>
                        </div>
                        <RepeatIcon className="size-4 text-muted-foreground" />
                    </div>

                    <div className="text-xs text-muted-foreground/75 text-center">
                        Playing <b>{playerState.currentSongIndex + 1}</b> of{' '}
                        <b>
                            {playlist.length} {playlist.length === 1 ? 'song' : 'songs'}
                        </b>{' '}
                        in the playlist
                    </div>
                </div>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Album Songs</CardTitle>
                    <CardDescription>Explore all the songs from the album {album.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {album.songs.map((song, i) => (
                        <SongList song={song} key={song.id} number={i + 1} />
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Artists</CardTitle>
                    <CardDescription>Explore all the artists who contributed in this song</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-4 md:grid-cols-7 justify-between gap-4 md:gap-8">
                    {song.artists.map(artist => (
                        <AartistCard key={artist.id} artist={artist as any} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default Player;
