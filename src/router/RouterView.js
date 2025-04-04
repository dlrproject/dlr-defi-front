import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '.';

const RouterView = () => {
  return (
    <Suspense fallback={<div className="loading">加载中...</div>}>
      <Routes>
        {routes.map((route, index) => {
          const { path, component: Component, redirect } = route;

          if (redirect) {
            return (
              <Route
                key={index}
                path={path}
                element={<Navigate to={redirect} replace />}
              />
            );
          }

          return (
            <Route
              key={index}
              path={path}
              element={<Component />}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default RouterView;