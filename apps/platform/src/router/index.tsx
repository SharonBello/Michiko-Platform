import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppShell } from '../components/layout/AppShell/AppShell';
import SignInPage from '../pages/SignIn/SignIn';
import DashboardPage from '../pages/Dashboard/Dashboard';
import NotFoundPage from '../pages/NotFound/NotFound';
import GameWizard from '../pages/GameWizard/GameWizard';
import BlueprintGenerating from '../pages/Blueprint/BlueprintGenerating';
import BlueprintReview from '../pages/Blueprint/BlueprintReview';

export const router = createBrowserRouter([
    {
        path: '/sign-in',
        element: <SignInPage />,
    },
    {
        path: '/games/new',
        element: (
            <ProtectedRoute>
                <GameWizard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/blueprint/generating',
        element: (
            <ProtectedRoute>
                <BlueprintGenerating />
            </ProtectedRoute>
        ),
    },
    {
        path: '/blueprint/review',
        element: (
            <ProtectedRoute>
                <BlueprintReview />
            </ProtectedRoute>
        ),
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <AppShell />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'games', element: <DashboardPage /> },
            { path: 'games/new', element: <DashboardPage /> },
            { path: 'games/:id', element: <DashboardPage /> },
            { path: 'settings', element: <DashboardPage /> },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);