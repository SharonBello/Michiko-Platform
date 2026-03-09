import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppShell } from '../components/layout/AppShell/AppShell';
import SignInPage from '../pages/SignIn/SignIn';
import DashboardPage from '../pages/Dashboard/Dashboard';
import NotFoundPage from '../pages/NotFound/NotFound';
import GameWizard from '../pages/GameWizard/GameWizard';
import BlueprintGenerating from '../pages/Blueprint/BlueprintGenerating';
import BlueprintReview from '../pages/Blueprint/BlueprintReview';
import GamePage from '../pages/Game/GamePage';
import GameDetail from '../pages/GameDetail/GameDetail';
import PlayEntry from '../pages/Play/PlayEntry';
import PlayerGame from '../pages/Play/PlayerGame';

export const router = createBrowserRouter([
    // Public routes
    { path: '/sign-in', element: <SignInPage /> },
    { path: '/play/:code', element: <PlayEntry /> },
    { path: '/play/:code/game', element: <PlayerGame /> },

    // Fullscreen protected routes (no AppShell)
    {
        path: '/games/new',
        element: <ProtectedRoute><GameWizard /></ProtectedRoute>,
    },
    {
        path: '/games/:id',
        element: <ProtectedRoute><GameDetail /></ProtectedRoute>,
    },
    {
        path: '/game/:id',
        element: <ProtectedRoute><GamePage /></ProtectedRoute>,
    },
    {
        path: '/blueprint/generating',
        element: <ProtectedRoute><BlueprintGenerating /></ProtectedRoute>,
    },
    {
        path: '/blueprint/review',
        element: <ProtectedRoute><BlueprintReview /></ProtectedRoute>,
    },

    // App shell (sidebar + topbar)
    {
        path: '/',
        element: <ProtectedRoute><AppShell /></ProtectedRoute>,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'settings', element: <DashboardPage /> },
        ],
    },

    // 404
    { path: '*', element: <NotFoundPage /> },
]);