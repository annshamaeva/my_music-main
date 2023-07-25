import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSelectionByIdQuery } from '../../services/track';
import s from './Day.module.css';
import Navigation from '../../components/navigation/Navigation';
import Search from '../../components/search/Search';
import TrackList from '../../components/trackList/TrackList';
import Personal from '../../components/personal/Personal';
import Bar from '../../components/bar/Bar';

export default function PlayListDay() {
  const [loader, setLoader] = useState(true);
  const { data, isLoading } = useGetSelectionByIdQuery({ selectionId: 1 });
  const { source } = useSelector((state) => state.track);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 5000);
  });

  return (
    <div className={s.container}>
      <main className={s.main}>
        <Navigation />
        <div className={s.centerblock}>
          <Search />
          <h2 className={s.title}>Плейлист дня</h2>
          {!isLoading && <TrackList tracks={data.items} loader={loader} />}
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
