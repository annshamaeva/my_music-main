import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSelectionByIdQuery } from '../../services/track';
import s from './Hundred.module.css';
import Navigation from '../../components/navigation/Navigation';
import Search from '../../components/search/Search';
import TrackList from '../../components/trackList/TrackList';
import Personal from '../../components/personal/Personal';
import Bar from '../../components/bar/Bar';

export default function PlayList100() {
  const [loader, setLoader] = useState(true);
  const { source } = useSelector((state) => state.track);
  const { data, isLoading } = useGetSelectionByIdQuery({ selectionId: 2 });

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
          <h2 className={s.title}>100 Танцевальных хитов</h2>
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
