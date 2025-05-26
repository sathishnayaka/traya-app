import React, { useState, useEffect, useRef } from 'react';


const KeyMetricsContent: React.FC = () => (
  <ul>
    <li><strong>Visitors Today:</strong> 1,324</li>
    <li><strong>New Signups:</strong> 57</li>
    <li><strong>Bounce Rate:</strong> 43%</li>
    <li><strong>Revenue:</strong> $2,193.45</li>
  </ul>
);

const SalesChartContent: React.FC = () => (
  <div>
    📊 Placeholder for a chart library like Recharts or Chart.js
    <p>Bar chart showing monthly sales revenue across 12 months.</p>
  </div>
);

const RecentActivityContent: React.FC = () => (
  <ul>
    <li>User John Doe signed up</li>
    <li>Order #1234 completed</li>
    <li>Server restarted at 3:45 PM</li>
    <li>Admin updated pricing rules</li>
  </ul>
);

const ToDoListContent: React.FC = () => (
  <ul>
    <li>✅ Deploy new marketing site</li>
    <li>⏳ Review Q2 budget proposal</li>
    <li>📌 Fix dashboard scroll bug</li>
    <li>📩 Email user feedback survey</li>
  </ul>
);

interface Panel {
  id: string;
  title: string;
  contentType: string;
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
  collapsed: boolean;
}

const STORAGE_KEY = 'dashboard-layout';

const initialPanels: Panel[] = [
  {
    id: 'stats',
    title: 'Key Metrics',
    contentType: 'KeyMetrics',
    colStart: 1,
    colEnd: 2,
    rowStart: 1,
    rowEnd: 2,
    collapsed: false,
  },
  {
    id: 'chart',
    title: 'Sales Chart (Monthly)',
    contentType: 'SalesChart',
    colStart: 3,
    colEnd: 4,
    rowStart: 1,
    rowEnd: 3,
    collapsed: false,
  },
  {
    id: 'activity',
    title: 'Recent Activity',
    contentType: 'RecentActivity',
    colStart: 4,
    colEnd: 5,
    rowStart: 1,
    rowEnd: 3,
    collapsed: false,
  },
  {
    id: 'tasks',
    title: 'To-Do List',
    contentType: 'ToDoList',
    colStart: 5,
    colEnd: 6,
    rowStart: 1,
    rowEnd: 3,
    collapsed: false,
  },
];


const PanelContentComponents: { [key: string]: React.FC } = {
  KeyMetrics: KeyMetricsContent,
  SalesChart: SalesChartContent,
  RecentActivity: RecentActivityContent,
  ToDoList: ToDoListContent,
};


export const DashboardLayout: React.FC = () => {
  const [panels, setPanels] = useState<Panel[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialPanels;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(panels));
  }, [panels]);

  const resizingPanelId = useRef<string | null>(null);
  const startX = useRef(0);
  const startColEnd = useRef(0);

  const onMouseDownResize = (e: React.MouseEvent, panelId: string) => {
    e.preventDefault();
    resizingPanelId.current = panelId;
    startX.current = e.clientX;
    const panel = panels.find(p => p.id === panelId);
    startColEnd.current = panel ? panel.colEnd : 0;
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!resizingPanelId.current) return;
    const deltaX = e.clientX - startX.current;
    const gridColumnWidth = 100;

    let deltaCols = Math.round(deltaX / gridColumnWidth);
    if (deltaCols === 0) return;

    setPanels(prev =>
      prev.map(panel => {
        if (panel.id !== resizingPanelId.current) return panel;
        let newColEnd = startColEnd.current + deltaCols;
        if (newColEnd <= panel.colStart) newColEnd = panel.colStart + 1;
        if (newColEnd > 6) newColEnd = 6;
        return { ...panel, colEnd: newColEnd };
      })
    );
  };

  const onMouseUp = () => {
    resizingPanelId.current = null;
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mousemove', onMouseMove);
  };

  const toggleCollapse = (panelId: string) => {
    setPanels(prev =>
      prev.map(panel =>
        panel.id === panelId ? { ...panel, collapsed: !panel.collapsed } : panel
      )
    );
  };

  return (
    <div className="dashboard-grid">
      {panels.map(panel => {
        const ContentComponent = PanelContentComponents[panel.contentType];
        return (
          <div
            key={panel.id}
            className={`dashboard-panel ${panel.collapsed ? 'collapsed' : ''}`}
            style={{
              gridColumnStart: panel.colStart,
              gridColumnEnd: panel.colEnd,
              gridRowStart: panel.rowStart,
              gridRowEnd: panel.rowEnd,
            }}
          >
            <div className="panel-header">
              <span>{panel.title}</span>
              <button onClick={() => toggleCollapse(panel.id)}>
                {panel.collapsed ? 'Expand' : 'Collapse'}
              </button>
            </div>
            {!panel.collapsed && (
              <div className="panel-content">
                {ContentComponent ? <ContentComponent /> : <div>Content Not Found</div>}
              </div>
            )}
            <div
              className="resize-handle"
              onMouseDown={e => onMouseDownResize(e, panel.id)}
              title="Drag to resize horizontally"
            />
          </div>
        );
      })}
    </div>
  );
};