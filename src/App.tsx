import DashboardLayout from './layout/dashboard-layout';
import Home from './pages/home';
import LandingPage from './pages/landing';
import { BrowserRouter, Route, Routes } from 'react-router';
import SearchPage from './pages/search';
import Albums from './pages/albums';
import Album from './pages/album';
import Player from './pages/player';
import QueuePage from './pages/queue';
import ArtistPage from './pages/artist';
import { Toaster } from 'react-hot-toast';
import AudioProvider from './context/audio-provider';

function App() {
    return (
        <AudioProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LandingPage />} />

                    <Route element={<DashboardLayout />}>
                        <Route path="home" element={<Home />} />
                        <Route path="search" element={<SearchPage />} />
                        <Route path="artists/:id" element={<ArtistPage />} />
                        <Route path="albums" element={<Albums />} />
                        <Route path="albums/:id" element={<Album />} />

                        <Route path="queue" element={<QueuePage />} />

                        <Route path="player" element={<Player />} />
                    </Route>
                </Routes>
                <Toaster />
            </BrowserRouter>
        </AudioProvider>
    );
}

export default App;
