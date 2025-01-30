import songs from '../../data/songs-data';
import { useMusicPlayerContext } from '../../context/audio-provider';
import { cn } from '../../lib/utils';

type Props = {
    song: (typeof songs)[number];
};

const SongCard = ({ song }: Props) => {
    const { playSong } = useMusicPlayerContext();
    const { playerState } = useMusicPlayerContext();

    return (
        <div
            id={song.id}
            onClick={() => playSong(song)}
            className="p-1.5 rounded-md gap-3  grid grid-cols-[2.5rem_1fr]"
        >
            <img src={song.image} className="border rounded-full size-10" />

            <div>
                <h3
                    className={cn(
                        'line-clamp-1 text-ellipsis',
                        playerState.currentSong?.id === song.id && 'text-primary'
                    )}
                >
                    {song.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1 text-ellipsis">
                    {song.album.name} - {song.artists[0].name}
                </p>
            </div>
        </div>
    );
};

export default SongCard;
