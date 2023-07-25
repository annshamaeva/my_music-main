/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetAllTracksQuery } from '../../services/track';
import { setPerformersAndGenres } from '../../store/slices/filterSlice';
import s from './MainTrackList.module.css';
import Navigation from '../../components/navigation/Navigation';
import Search from '../../components/search/Search';
import Filter from '../../components/filter/Filter';
import TrackList from '../../components/trackList/TrackList';
import Personal from '../../components/personal/Personal';
import PlayListBlock from '../../components/playListBlock/PlayListBlock';
import Bar from '../../components/bar/Bar';
import SkeletonSideBar from '../../components/skeletons/skeletonSideBar/SkeletonSideBar';

export default function MainTrackList() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [tracks, setTracks] = useState('');
  const { data, isLoading } = useGetAllTracksQuery();
  const { trackId, source, favorite, allTracksId } = useSelector((state) => state.track);
  const { filterList, dateFilter } = useSelector((state) => state.filter);

  const performersAndGenresList = () => {
    const performersList = [];
    const genresList = [];
    data.map((track) => {
      track.author !== '-' && performersList.push(track.author);
      genresList.push(track.genre);
    });
    dispatch(
      setPerformersAndGenres({
        performers: Array.from(new Set(performersList)),
        genres: Array.from(new Set(genresList)),
      })
    );
  };

  const filteredTracks = () => {
    if (filterList.length === 0) {
      return data;
    }
    const result = [];
    filterList.map((filterItem) => {
      data.map((track) => {
        if (track.author === filterItem || track.genre === filterItem) {
          result.push(track);
        }
      });
    });
    return Array.from(new Set(result));
  };

  useEffect(() => {
    if (!isLoading) {
      performersAndGenresList();
      setTracks(filteredTracks());
      if (dateFilter === 'older') {
        setTracks(
          filteredTracks()
            .slice()
            .sort((a, b) =>
              (a.release_date || '').localeCompare(b.release_date || '')
            )
        );
      }
      if (dateFilter === 'newer') {
        setTracks(
          filteredTracks()
            .slice()
            .sort((a, b) =>
              (a.release_date || '').localeCompare(b.release_date || '')
            )
            .reverse()
        );
      }
    }
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  }, [filterList, dateFilter, isLoading, data]);

  return (
    <div className={s.container}>
      <main className={s.main}>
        <Navigation />
        <div className={s.centerblock}>
          <Search />
          <h2 className={s.title}>Треки</h2>
          <Filter />
          {!isLoading && <TrackList tracks={tracks} loader={loader} />}
        </div>

        {loader ? (
          <SkeletonSideBar />
        ) : (
          <div className={s.sidebar}>
            <Personal />
            <PlayListBlock />
          </div>
        )}
      </main>
      {source && <Bar trdackId={trackId} source={source} favorite={favorite} allTracksId={allTracksId} />}
      <footer className={s.footer} />
    </div>
  );
}
