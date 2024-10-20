import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./views/settings-view/settings-view.component').then(m => m.SettingsViewComponent),
    },
    {
        path: 'battle',
        loadComponent: () => import('./views/battle-view/battle-view.component').then(m => m.BattleViewComponent),
    },
    {
        path: 'history',
        loadComponent: () => import('./views/history-view/history-view.component').then(m => m.HistoryViewComponent),
    },
];
