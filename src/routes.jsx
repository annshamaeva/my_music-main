import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginScreen from './pages/login';
import RegistrationScreen from './pages/registration';
import MainTrackList from './pages/trackList';
import PlayListIndi from './pages/playListIndi';
import PlayListDay from './pages/playListDay';
import PlayList100 from './pages/playList100';
import MyTracks from './pages/myTracks';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

export default function AppRoutes() {
  const { access } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/registration" element={<RegistrationScreen />} />

      <Route element={<ProtectedRoute isAllowed={access} />}>
        <Route path="/main" element={<MainTrackList />} />
        <Route path="/my_tracks" element={<MyTracks />} />
        <Route path="/playlist_day" element={<PlayListDay />} />
        <Route path="/playlist_hundred" element={<PlayList100 />} />
        <Route path="/playlist_indi" element={<PlayListIndi />} />
      </Route>
    </Routes>
  );
}
