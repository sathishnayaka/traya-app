import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
const DataGridPage = lazy(() => import("./pages/DataGrid"));
const ModalStack = lazy(() => import("./pages/ModalStack"));
const MultiStepForm = lazy(() => import("./components/multiStepForm/MultiStepForm"));
const TreeHierarchucalTreePage = lazy(() => import("./pages/TreeHierarchucalTreePage"));
const DashboardLayout = lazy(() => import("./components/DashboardLayout/DashboardLayout"));
import './components/DashboardLayout/DashboardLayout.css';
import './App.css';
import { ThemeSwitcher } from "./components/theme/ThemeSwitcher";
function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <NavLink to="/data-grid" className="nav-item">Data Grid</NavLink>
          <NavLink to="/modal-stack" className="nav-item">Modal Stack</NavLink>
          <NavLink to="/multi-step-form" className="nav-item">Multi Step Form</NavLink>
          <NavLink to="/tree" className="nav-item">Hierarchical Tree</NavLink>
          <NavLink to="/dashboard"  className="nav-item">Dashboard Layout</NavLink>
        </nav>

        <div className="main-area">
          <header className="app-header">
            <h1 className="app-title">My Component Playground</h1>
            <ThemeSwitcher />
          </header>

          <main className="main-content">
            <Suspense fallback={<div className="loader">Loading...</div>}>
              <Routes>
                <Route path="/data-grid" element={<DataGridPage />} />
                <Route path="/modal-stack" element={<ModalStack />} />
                <Route path="/multi-step-form" element={<MultiStepForm />} />
                <Route path="/tree" element={<TreeHierarchucalTreePage />} />
                <Route path="/dashboard" element={<DashboardLayout />} />
                <Route path="*" element={<div>Select a page from the sidebar.</div>} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;