// src/pages/Dashboard.jsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, FileText, MessagesSquare, Clock } from 'lucide-react';
import Card from '../components/common/Card';
import useStore from '../store/useStore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { t } = useTranslation();
  const { stats, setStats } = useStore();
  
  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    setStats({
      documentCount: 12,
      queryCount: 45,
      avgResponseTime: 0.8,
      activityData: [
        { name: 'Mon', queries: 4 },
        { name: 'Tue', queries: 6 },
        { name: 'Wed', queries: 8 },
        { name: 'Thu', queries: 5 },
        { name: 'Fri', queries: 9 },
        { name: 'Sat', queries: 3 },
        { name: 'Sun', queries: 2 },
      ]
    });
  }, []);
  
  const statsCards = [
    {
      title: t('dashboard.totalDocuments'),
      value: stats.documentCount,
      icon: <FileText size={24} className="text-primary" />,
      change: '+3 this week',
      positive: true
    },
    {
      title: t('dashboard.totalQueries'),
      value: stats.queryCount,
      icon: <MessagesSquare size={24} className="text-secondary" />,
      change: '+12 this week',
      positive: true
    },
    {
      title: t('dashboard.avgResponseTime'),
      value: `${stats.avgResponseTime}s`,
      icon: <Clock size={24} className="text-accent" />,
      change: '-0.2s from last week',
      positive: true
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Overview of your documents and interactions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((card, index) => (
          <Card key={index} className="border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {card.title}
                </h3>
                <p className="text-3xl font-semibold mt-2">
                  {card.value}
                </p>
                <p className={`text-sm mt-1 ${card.positive ? 'text-success' : 'text-error'}`}>
                  {card.change}
                </p>
              </div>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {card.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Query Activity</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.activityData || []}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="queries" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;