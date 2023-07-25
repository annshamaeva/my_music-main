import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  useGetTrackByIdQuery,
  useAddTrackInFavoriteMutation,
  useRemoveTrackFromFavoriteMutation,
} from '../../services/track';
import { setTrackId } from '../../store/slices/trackSlice';
import PlayerControls from '../playerControls/PlayerControls';
import TrackPlayerContain from '../trackPlayerContain/TrackPlayerContain';
import LikeDislike from '../likeDislike/LikeDislike';
import Volume from '../volume/Volume';
import SkeletonPlayerContain from '../skeletons/skeletonPlayerContain/SkeletonPlayerContain';
import s from './Bar.module.css';
/* eslint-disable jsx-a11y/media-has-caption */

export default function Bar() {
  const { source, trackId, favorite, allTracksId } = useSelector(
    (state) => state.track
  );
  const [songsId, setSongsId] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const { data, isLoading } = useGetTrackByIdQuery({ trackId });
  const [addTrackInFavorite] = useAddTrackInFavoriteMutation();
  const [removeTrackFromFavorite] = useRemoveTrackFromFavoriteMutation();
  const audio = useRef(new Audio(source));
  const isReady = useRef(false);
  const intervalRef = useRef();
  const dispatch = useDispatch();

  const { duration } = audio.current || 0;

  const currentPercentage = duration ? `${(progress / duration) * 100}%` : '0%';
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #B672FF), color-stop(${currentPercentage}, var(--background-progress)))
`;

  const togglePlay = () => setIsPlay(!isPlay);
  const toggleRepeat = () => setIsRepeat(!isRepeat);
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      setSongsId(
        allTracksId.slice().sort(() => Math.round(Math.random() * 100) - 50)
      );
    } else {
      setSongsId(allTracksId);
    }
  };

  const handleAddFavorite = () => {
    addTrackInFavorite({
      id: trackId,
    });
    dispatch(setTrackId({ favorite: true }));
  };

  const handleRemoveFavorite = () => {
    removeTrackFromFavorite({
      id: trackId,
    });
    dispatch(setTrackId({ favorite: false }));
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      return;
    }
    setTrackIndex(trackIndex - 1);
    dispatch(
      setTrackId({
        trackId: songsId[trackIndex - 1],
      })
    );
  };

  const toNextTrack = () => {
    if (trackIndex < songsId.length - 1) {
      setTrackIndex(trackIndex + 1);
      dispatch(
        setTrackId({
          trackId: songsId[trackIndex + 1],
        })
      );
    } else {
      setTrackIndex(0);
      dispatch(
        setTrackId({
          trackId: songsId[0],
        })
      );
    }
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    if (source) {
      intervalRef.current = setInterval(() => {
        if (audio.current.ended) {
          if (isRepeat) {
            audio.current.pause();
            audio.current = new Audio(data.track_file);
            setProgress(audio.current.currentTime);
            if (isReady.current) {
              audio.current.play();
              setIsPlay(true);
              startTimer();
            } else {
              isReady.current = true;
            }
          } else {
            toNextTrack();
          }
        } else {
          setProgress(audio.current.currentTime);
        }
      }, [1000]);
    }
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audio.current.currentTime = value;
    setProgress(audio.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlay) {
      setIsPlay(true);
    }
    startTimer();
  };

  useEffect(() => {
    setSongsId(allTracksId);
  }, [allTracksId]);

  useEffect(() => {
    if (isPlay) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  }, [isPlay]);

  useEffect(
    () => () => {
      audio.current.pause();
      clearInterval(intervalRef.current);
    },
    []
  );

  useEffect(() => {
    if (!isLoading) {
      setTrackIndex(songsId.indexOf(trackId));
      dispatch(
        setTrackId({
          source: data.track_file,
          favorite: data.stared_user.filter((user) => user.id === Number(192))
            .length,
        })
      );
      audio.current.pause();
      audio.current = new Audio(data.track_file);
      setProgress(audio.current.currentTime);
    }

    if (isReady.current) {
      audio.current.play();
      setIsPlay(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [data]);

  return (
    <div className={s.bar}>
      <div className={s.content}>
        <input
          className={s.progressLine}
          type="range"
          value={progress}
          step="1"
          min="0"
          max={duration || `${duration}`}
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        <div className={s.block}>
          <div className={s.player}>
            <PlayerControls
              onPlayPauseClick={togglePlay}
              onPrevClick={toPrevTrack}
              onNextClick={toNextTrack}
              onRepeatClick={toggleRepeat}
              onShuffleClick={toggleShuffle}
              isPlay={isPlay}
              isRepeat={isRepeat}
              isShuffle={isShuffle}
            />
            <div className={s.track__play}>
              {isLoading ? (
                <SkeletonPlayerContain />
              ) : (
                <TrackPlayerContain
                  title={data.name || ''}
                  author={data.author || ''}
                />
              )}

              <LikeDislike
                onLikeClick={handleAddFavorite}
                onDislikeClick={handleRemoveFavorite}
                isFavorite={favorite}
              />
            </div>
          </div>
          <Volume />
        </div>
      </div>
    </div>
  );
}
