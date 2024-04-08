import { Routes as ReactRoutes, Route } from 'react-router-dom';
import { Base } from '../pages/base/Base';
import { Feature } from '../pages/features/Features';
import { FeatureComments } from '../pages/features/FeatureComments';

export function AppRoutes() {
    return (
        <ReactRoutes>
                <Route element={<Base />}>
                    <Route path="/" element={<Feature/>} />
                    <Route path="/info/:id" element={<FeatureComments/>} />
                </Route>
        </ReactRoutes>
    );
}