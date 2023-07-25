/* eslint-disable array-callback-return */

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllTracksQuery } from '../../services/track';
import s from './MyTracks.module.css';
import Navigation from '../../components/navigation/Navigation';
import Search from '../../components/search/Search';
import TrackList from '../../components/trackList/TrackList';
import Personal from '../../components/personal/Personal';
import Bar from '../../components/bar/Bar';

export default function MyTracks() {
  const [loader, setLoader] = useState(true);
  const { userID } = useSelector((state) => state.user);
  const { source } = useSelector((state) => state.track);
  const { data, isLoading } = useGetAllTracksQuery();
  const [tracks, setTracks] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 5000);

    if (!isLoading) {
      const favorite = [];
      data.filter((track) => {
        track.stared_user.map((user) => {
          if (user.id === Number(userID)) {
            favorite.push(track);
          }
        });
      });
      setTracks(favorite);
    }
  }, [data]);

  return (
    <div className={s.container}>
      <main className={s.main}>
        <Navigation />
        <div className={s.centerblock}>
          <Search />
          <h2 className={s.title}>Мои треки</h2>
          {!isLoading && <TrackList tracks={tracks} loader={loader} />}
        </div>
        <div className={s.sidebar}>
          <Personal />
        </div>
      </main>
      {source && <Bar />}
      <footer className={s.footer} />
    </div>
  );
}
