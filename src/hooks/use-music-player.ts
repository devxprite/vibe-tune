import { useState, useRef, useEffect } from 'react';
import { getRandomIndex } from '../lib/utils';
import { songs } from '../utils/song';
import toast from 'react-hot-toast';
import _, { uniqBy } from 'lodash';

type Song = (typeof songs)[number];

type PlayerState = {
    isPlaying: boolean;
    isShuffle: boolean;
    isRepeat: boolean;
    isReady: boolean;
    volume: number;
    progress: number;
    playlist: Song[];
    currentSong: Song | null;
};

const defaultPlayerState: PlayerState = {
    isPlaying: false,
    volume: 1,
    isShuffle: false,
    isRepeat: false,
    progress: 0,
    isReady: false,
    playlist: songs,
    currentSong: songs[0],
};

const useMusicPlayer = () => {
    const [state, setState] = useState<PlayerState>(defaultPlayerState);
    const audioRef = useRef<HTMLAudioElement>(new Audio());
    const audio = audioRef.current;

    const updateState = (updates: Partial<PlayerState>) => setState(prev => ({ ...prev, ...updates }));

    useEffect(() => {
        if (state.isPlaying) audio.play();
        else audio.pause();
    }, [state.currentSong, state.isPlaying]);

    const togglePlayPause = () => {
        updateState({ isPlaying: !state.isPlaying });
    };

    const playSong = (song: Song) => updateState({ currentSong: song, progress: 0, isPlaying: true });
    const toggleShuffle = () => updateState({ isShuffle: !state.isShuffle });
    const toggleRepeat = () => updateState({ isRepeat: !state.isRepeat });

    const handleSeek = (value: number) => {
        if (!audioRef.current) return;
        updateState({ progress: value });
        audioRef.current.currentTime = value;
    };

    const playNext = () => {
        const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong?.id);
        let nextIndex;

        if (state.isShuffle) nextIndex = getRandomIndex(0, state.playlist.length);
        else nextIndex = (currentIndex + 1) % state.playlist.length;

        playSong(state.playlist[nextIndex]);
    };

    const playPrevious = () => {
        const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong?.id);
        const prevIndex = (currentIndex - 1 + state.playlist.length) % state.playlist.length;

        playSong(state.playlist[prevIndex]);
    };

    const addToPlaylist = (songs: Song[], replace = false) => {
        toast.success(`${songs.length} songs added to playlist`);

        setState(prev => ({
            ...prev,
            playlist: replace ? songs : uniqBy([...prev.playlist, ...songs], 'id'),
        }));

        if (replace) playSong(songs[0]);
    };

    const removeFromPlaylist = (song: Song) => {
        const updatedPlaylist = state.playlist.filter(s => s.id !== song.id);
        toast.success('Song removed from playlist');
        setState(prev => ({ ...prev, playlist: updatedPlaylist }));
    };

    return {
        playerState: state,
        updatePlayerState: updateState,
        audioRef,
        togglePlayPause,
        playSong,
        toggleShuffle,
        toggleRepeat,
        handleSeek,
        playNext,
        playPrevious,
        addToPlaylist,
        removeFromPlaylist,
    };
};

export default useMusicPlayer;
