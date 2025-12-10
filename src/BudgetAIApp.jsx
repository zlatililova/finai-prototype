import React, { useState, useEffect } from 'react';
import {
  Home,
  MessageSquare,
  PieChart,
  User,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Bell,
  Moon,
  ChevronRight,
  Wallet,
  TrendingUp,
  Newspaper,
  Send,
  CreditCard,
  DollarSign,
  Activity,
  LogOut,
  Users,
  Search,
  Plus,
  Image as ImageIcon,
  MoreVertical,
  MoreHorizontal,
  Sparkles,
  ShoppingBag,
  Coffee,
  Car,
  Zap,
  ArrowLeft
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line
} from 'recharts';

// --- Mock Data ---

const PORTFOLIO_DATA = [
  { name: 'Mon', value: 14200 },
  { name: 'Tue', value: 14350 },
  { name: 'Wed', value: 14100 },
  { name: 'Thu', value: 14500 },
  { name: 'Fri', value: 14789 },
  { name: 'Sat', value: 14900 },
  { name: 'Sun', value: 15100 },
];

const ASSET_ALLOCATION = [
  { name: 'Stocks', value: 55, color: '#3B82F6' }, // Blue-500
  { name: 'Crypto', value: 25, color: '#60A5FA' }, // Blue-400
  { name: 'Cash', value: 10, color: '#93C5FD' },   // Blue-300
  { name: 'Bonds', value: 10, color: '#BFDBFE' },   // Blue-200
];

const ASSETS_LIST = [
  { id: 1, name: 'Tere Slate', ticker: 'TSLA', value: 3335, change: 5.30, type: 'stock' },
  { id: 2, name: 'Seagila', ticker: 'SEGL', value: 3138, change: -1.20, type: 'crypto' },
  { id: 3, name: 'Ferwit Kicov', ticker: 'FWT', value: 333, change: 0.85, type: 'stock' },
  { id: 4, name: 'Coatalius', ticker: 'COAT', value: 1530, change: 12.5, type: 'crypto' },
];

const BUDGET_CATEGORIES = [
  { id: 1, name: 'Shopping', spent: 330, limit: 1000, color: 'bg-purple-500', icon: ShoppingBag },
  { id: 2, name: 'Food & Dining', spent: 580, limit: 800, color: 'bg-orange-500', icon: Coffee },
  { id: 3, name: 'Transportation', spent: 120, limit: 300, color: 'bg-blue-500', icon: Car },
  { id: 4, name: 'Entertainment', spent: 200, limit: 400, color: 'bg-pink-500', icon: Activity },
  { id: 5, name: 'Utilities', spent: 450, limit: 600, color: 'bg-cyan-500', icon: Zap },
];

const RECENT_TRANSACTIONS = [
  { id: 1, name: 'Whole Foods Market', date: 'Today, 10:23 AM', amount: -124.50, category: 'Food' },
  { id: 2, name: 'Uber Ride', date: 'Yesterday, 8:45 PM', amount: -24.00, category: 'Transport' },
  { id: 3, name: 'Salary Deposit', date: 'Nov 24, 9:00 AM', amount: 3200.00, category: 'Income' },
  { id: 4, name: 'Netflix Subscription', date: 'Nov 23, 11:00 AM', amount: -15.99, category: 'Entertainment' },
];

const FINANCIAL_MEDIA = [
  { id: 1, name: 'Bloomberg Markets', url: '#', icon: 'BB' },
  { id: 2, name: 'The Financial Times', url: '#', icon: 'FT' },
  { id: 3, name: 'Wall Street Journal', url: '#', icon: 'WSJ' },
  { id: 4, name: 'CoinDesk Daily', url: '#', icon: 'CD' },
];

const CHAT_HISTORY_INIT = [
  { id: 1, sender: 'ai', text: "Hello! I've analyzed your portfolio. Your 'Tere Slate' stock is performing exceptionally well today, up 5.3%. Would you like a breakdown of your spending?" },
  { id: 2, sender: 'user', text: "Yes, show me my monthly breakdown." },
  { id: 3, sender: 'ai', text: "Here is your spending analysis for November. You are slightly over budget in 'Food & Dining'.", type: 'chart' },
];

const USER_CHATS = [
  { id: 1, name: "Investment Group", lastMsg: "Has anyone seen the latest BTC charts?", time: "2m ago", unread: 3, avatar: "bg-purple-100 text-purple-600", type: 'group' },
  { id: 2, name: "Sarah J.", lastMsg: "Thanks for the transfer! Received it.", time: "1h ago", unread: 0, avatar: "bg-pink-100 text-pink-600", type: 'direct' },
  { id: 3, name: "Mike Trader", lastMsg: "Check out that new ETF launch.", time: "4h ago", unread: 1, avatar: "bg-green-100 text-green-600", type: 'direct' },
  { id: 4, name: "Crypto Enthusiasts", lastMsg: "HODL!", time: "1d ago", unread: 0, avatar: "bg-yellow-100 text-yellow-600", type: 'group' },
];

const PROGRESS_DATA = [
  { day: 1, savings: 0, label: 'Day 1' },
  { day: 4, savings: 15, label: 'Day 4' },
  { day: 7, savings: 30, label: 'Day 7' },
  { day: 10, savings: 45, label: 'Day 10' },
  { day: 14, savings: 50, label: 'Day 14' },
];


// --- Components ---

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'budget', icon: Home, label: 'Home' }, // Moved to first and renamed
    { id: 'investments', icon: TrendingUp, label: 'Invest' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'ai', icon: MessageSquare, label: 'Assistant' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex justify-between items-center z-50 pb-safe">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-200 w-1/5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
        >
          <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

const Header = ({ title, subtitle, rightIcon }) => (
  <div className="mb-6 flex justify-between items-start">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
    {rightIcon && (
      <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
        {rightIcon}
      </button>
    )}
  </div>
);

// --- Screen X: AI Insight Screen (New) ---

const AIInsightScreen = ({ goBack, goToChat }) => {
  return (
    <div className="space-y-6 pb-24 fade-in">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={goBack} className="text-gray-600 hover:text-gray-900 transition-colors p-2 -ml-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-900">AI Assistant</h1>
      </div>

      {/* Spending Analysis Card */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Spending Analysis</h3>

        <p className="text-gray-700 leading-relaxed mb-4">
          You spent <span className="font-bold text-red-500">25% more</span> on eating out this month compared to your average.
        </p>

        <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
          <p className="font-semibold text-blue-700 text-sm">
            AI suggests reducing eating out by 20% to save more.
          </p>
        </div>

        <p className="text-sm text-gray-600 mt-4 font-semibold">
          You could potentially save <span className="font-bold text-green-600">$50.00</span> over 2 weeks.
        </p>
      </div>

      {/* Potential Progress Chart Card */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Potential Progress</h3>
        <p className="text-sm text-gray-500 mb-4">Savings over 2 weeks if you apply the suggestion.</p>

        <div className="h-64 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PROGRESS_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke="#9ca3af" tickLine={false} />
              <YAxis
                stroke="#9ca3af"
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
                domain={[0, 60]}
                ticks={[0, 15, 30, 45, 60]}
              />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                labelFormatter={(label) => label}
                formatter={(value) => [`$${value.toFixed(2)}`, 'Savings']}
              />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ r: 5, fill: '#2563EB' }}
                activeDot={{ r: 8, fill: '#1D4ED8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4 pt-4 border-t border-gray-100">
          This recommendation is based on your spending patterns and designed to help you reach your goals faster.
        </p>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={goToChat}
          className="bg-green-600 text-white pl-6 pr-6 py-3 rounded-full shadow-lg shadow-green-200 flex items-center gap-2 hover:bg-green-700 transition-colors active:scale-95 duration-200"
        >
          <Sparkles size={18} />
          <span className="text-sm font-bold">Ask AI Assistant</span>
        </button>
      </div>
    </div>
  );
};


// --- Screen 1: Investments Dashboard ---

const InvestmentsScreen = () => {
  return (
    <div className="space-y-6 pb-24 fade-in">
      <Header title="Investments" subtitle="Portfolio Overview" rightIcon={<Bell size={20} />} />

      {/* Portfolio Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <div className="bg-blue-50 p-2 rounded-full">
            <ArrowUpRight className="text-blue-600" size={24} />
          </div>
        </div>
        <p className="text-gray-500 text-sm font-medium">Portfolio Value</p>
        <h2 className="text-4xl font-bold text-gray-900 mt-2">$14,789.00</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <ArrowUpRight size={12} /> +2.55%
          </span>
          <span className="text-gray-400 text-sm">Today</span>
        </div>

        {/* Mini Area Chart for Portfolio */}
        <div className="h-32 mt-6 -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PORTFOLIO_DATA}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Allocation Chart Section */}
      <div className="space-y-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Allocation</h3>
          <div className="flex items-center justify-between">
            <div className="h-40 w-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={ASSET_ALLOCATION}
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {ASSET_ALLOCATION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RePieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-bold text-gray-400">Total</span>
              </div>
            </div>
            <div className="space-y-3 flex-1 pl-4">
              {ASSET_ALLOCATION.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Gainers List */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Top Assets</h3>
          <div className="space-y-4">
            {ASSETS_LIST.map((asset) => (
              <div key={asset.id} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${asset.type === 'stock' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    {asset.type === 'stock' ? <Activity size={20} /> : <Wallet size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{asset.name}</p>
                    <p className="text-xs text-gray-400">{asset.ticker}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${asset.value.toLocaleString()}</p>
                  <p className={`text-xs font-medium ${asset.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {asset.change > 0 ? '+' : ''}{asset.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Screen 2: Community Chat ---

const CommunityScreen = () => {
  return (
    <div className="h-screen pb-24 flex flex-col fade-in">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Community</h1>
        <p className="text-gray-500 text-sm mt-1">Chat with other investors</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto space-y-4 -mx-2 px-2">
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Recent Chats</h3>
        {USER_CHATS.map((chat) => (
          <div key={chat.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors active:scale-95 duration-200">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${chat.avatar} relative`}>
              {chat.name.charAt(0)}
              {chat.type === 'group' && (
                <div className="absolute -bottom-1 -right-1 bg-white p-[2px] rounded-full">
                  <div className="bg-blue-500 p-1 rounded-full text-white">
                    <Users size={8} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-gray-900 text-sm truncate">{chat.name}</h4>
                <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
              </div>
              <p className={`text-xs truncate ${chat.unread > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                {chat.lastMsg}
              </p>
            </div>
            {chat.unread > 0 && (
              <div className="min-w-[20px] h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Action Button for New Chat */}
      <button className="absolute bottom-24 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors z-10">
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

// --- Screen 3: AI Assistant (Chat) ---

const AIAssistantScreen = () => {
  const [messages, setMessages] = useState(CHAT_HISTORY_INIT);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: messages.length + 1, sender: 'user', text: input };
    setMessages([...messages, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      const aiMsg = { id: messages.length + 2, sender: 'ai', text: "I've noted that. Is there anything else you'd like to adjust in your portfolio?" };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col bg-gray-50 pb-20">
      <div className="p-4 bg-white border-b border-gray-100 sticky top-0 z-10 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Activity size={16} className="text-white" />
          </div>
          FinAI
        </h1>
        <button className="text-gray-400"><MoreVertical size={20} /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>

              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                ? 'bg-blue-600 text-white rounded-tr-none'
                : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                }`}>
                {msg.text}
              </div>

              {/* Render Chart if message type is 'chart' */}
              {msg.type === 'chart' && (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm w-full h-48">
                  <p className="text-xs font-bold text-gray-500 mb-2">Weekly Spending</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={BUDGET_CATEGORIES}>
                      <XAxis dataKey="name" hide />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                      <Bar dataKey="spent" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <span className="text-[10px] text-gray-400 px-1">
                {msg.sender === 'user' ? 'You' : 'AI Assistant'} • 10:4{msg.id} AM
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 sticky bottom-0">
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <button className="text-gray-400 hover:text-blue-600 transition-colors">
            <ImageIcon size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask FinAI..."
            className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-gray-900 placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Screen 4: Budget/Home Screen (Renamed from BudgetScreen) ---

const BudgetScreen = () => {
  return (
    <div className="space-y-8 pb-24 fade-in">
      {/* Header Updated */}
      <Header title="FinAI" subtitle="Welcome back, Alex" rightIcon={<Settings size={20} />} />

      {/* Total Budget Summary */}
      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-200">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-sm font-medium">Total Spent</p>
            <h2 className="text-3xl font-bold mt-1">$2,130</h2>
          </div>
          <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Plus size={24} className="text-white" />
          </button>
        </div>
        <div className="mt-6">
          <div className="flex justify-between text-xs mb-2 text-blue-100">
            <span>Progress</span>
            <span>68% of $3,100</span>
          </div>
          <div className="h-2 bg-blue-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-white w-[68%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Categories (Top 5 with Bar Charts) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-gray-900 text-lg">Top 5 Categories</h3>
          <span className="text-xs text-blue-600 font-bold cursor-pointer">View All</span>
        </div>

        {BUDGET_CATEGORIES.slice(0, 5).map((cat) => (
          <div key={cat.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-blue-200">
            {/* Header: Icon + Name + Percentage */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${cat.color} bg-opacity-10 flex items-center justify-center`}>
                  <cat.icon size={18} className={cat.color.replace('bg-', 'text-')} />
                </div>
                <p className="font-bold text-gray-900 text-sm">{cat.name}</p>
              </div>
              <span className="text-xs font-bold text-gray-500">
                {Math.round((cat.spent / cat.limit) * 100)}%
              </span>
            </div>

            {/* Bar Chart Representation */}
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-2 relative">
              <div
                className={`h-full ${cat.color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${Math.min((cat.spent / cat.limit) * 100, 100)}%` }}
              />
            </div>

            {/* Amount Details */}
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span className="text-gray-900 font-bold">${cat.spent.toLocaleString()}</span>
              <span>Limit: ${cat.limit.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Removed Recent Transactions as requested */}
    </div>
  );
};

// --- Screen 5: Profile & Media ---

const ProfileScreen = () => {
  return (
    <div className="space-y-6 pb-24 fade-in">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
          AL
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">Alex Lewis</h2>
          <p className="text-gray-500 text-sm">alex.lewis@example.com</p>
        </div>
        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
          <Settings size={20} />
        </button>
      </div>

      {/* Quick Settings */}
      <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
        {[
          { icon: Bell, label: 'Notifications', toggle: true, active: true },
          { icon: Moon, label: 'Dark Mode', toggle: true, active: false },
          { icon: CreditCard, label: 'Payment Methods', toggle: false },
          { icon: LogOut, label: 'Log Out', toggle: false, color: 'text-red-500' }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.color ? 'bg-red-50' : 'bg-gray-100'}`}>
                <item.icon size={18} className={item.color || 'text-gray-600'} />
              </div>
              <span className={`text-sm font-medium ${item.color || 'text-gray-900'}`}>{item.label}</span>
            </div>
            {item.toggle ? (
              <div className={`w-11 h-6 rounded-full relative transition-colors ${item.active ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${item.active ? 'left-6' : 'left-1'}`} />
              </div>
            ) : (
              <ChevronRight size={16} className="text-gray-400" />
            )}
          </div>
        ))}
      </div>

      {/* Useful Media Links */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Useful Financial Media</h3>
        <div className="grid grid-cols-2 gap-4">
          {FINANCIAL_MEDIA.map((media) => (
            <a key={media.id} href={media.url} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-xs">
                  {media.icon}
                </div>
                <ArrowUpRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="font-bold text-gray-800 text-sm leading-tight">{media.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer / Version */}
      <div className="text-center py-6">
        <p className="text-xs text-gray-400">FinAI v2.0.1 • Mobile</p>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function BudgetAIApp() {
  const [activeTab, setActiveTab] = useState('budget');
  // New state for showing the deep-linked AI Insight screen
  const [showInsight, setShowInsight] = useState(false);

  // Logic to determine if the floating AI button should be shown
  // It is hidden on 'profile', 'community', 'ai' (chat), and when 'showInsight' is true
  const showAiButton = activeTab !== 'profile' && activeTab !== 'community' && activeTab !== 'ai' && !showInsight;

  const handleFloatingButtonClick = () => {
    // Clicking the floating button navigates to the specific AI Insight screen
    setShowInsight(true);
  };

  const handleGoToChat = () => {
    // Navigates from Insight screen to the main AI Chat tab
    setShowInsight(false);
    setActiveTab('ai');
  };

  const handleSetActiveTab = (tabId) => {
    // When switching main tabs, ensure the Insight screen is hidden
    setShowInsight(false);
    setActiveTab(tabId);
  }

  // Determine content to render
  const renderContent = () => {
    if (showInsight) {
      return <AIInsightScreen goBack={() => setShowInsight(false)} goToChat={handleGoToChat} />;
    }

    switch (activeTab) {
      case 'investments':
        return <InvestmentsScreen />;
      case 'community':
        return <CommunityScreen />;
      case 'ai':
        return <AIAssistantScreen />;
      case 'budget':
      default:
        return <BudgetScreen />;
    }
  }

  return (
    // Restricted max-width wrapper to force mobile layout on any screen size
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans selection:bg-blue-100">
      <div className="w-full max-w-md h-[100vh] bg-gray-50 relative shadow-2xl overflow-hidden flex flex-col">

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth no-scrollbar">
          {renderContent()}
        </main>

        {/* Global Floating AI Advisor Button (Conditional Rendering) */}
        {showAiButton && (
          <div className="absolute bottom-24 right-1/2 translate-x-1/2 z-40 w-full flex justify-center pointer-events-none">
            <button
              onClick={handleFloatingButtonClick}
              className="bg-gray-900 text-white pl-4 pr-5 py-3 rounded-full shadow-xl flex items-center gap-2 pointer-events-auto hover:scale-105 transition-transform border border-gray-700/50 backdrop-blur-md bg-opacity-90"
            >
              <Sparkles size={18} className="text-yellow-400" />
              <span className="text-sm font-bold">Get AI Advice</span>
            </button>
          </div>
        )}

        {/* Navigation is now sticky within this container */}
        <Navigation activeTab={activeTab} setActiveTab={handleSetActiveTab} />
      </div>
    </div>
  );
}