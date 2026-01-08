import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Search,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  IndianRupee,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import {
  getCustomerWalletBalance,
  getWalletTransactions,
  addMoneyToWallet
} from '../../Services/ApiService/WalletApiService';

// Transaction type
interface Transaction {
  _id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'success' | 'pending' | 'failed';
  createdAt: string;
  bookingId?: string;
  paymentMethod?: string;
}

const TRANSACTION_TYPE_CONFIG = {
  credit: {
    icon: <ArrowDownLeft size={18} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    label: 'Credit'
  },
  debit: {
    icon: <ArrowUpRight size={18} />,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    label: 'Debit'
  }
};

const STATUS_CONFIG = {
  success: {
    icon: <CheckCircle2 size={14} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-100/50',
    label: 'Success'
  },
  pending: {
    icon: <Clock size={14} />,
    color: 'text-amber-600',
    bg: 'bg-amber-100/50',
    label: 'Pending'
  },
  failed: {
    icon: <XCircle size={14} />,
    color: 'text-rose-600',
    bg: 'bg-rose-100/50',
    label: 'Failed'
  }
};

const WalletPage = () => {
  const called = useRef(false);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(false)
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  console.log('reached')


  useEffect(() => {
    if (called.current) return;
    called.current = true;
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      let [walletResponse] =  await Promise.all([getCustomerWalletBalance()]);
      if(walletResponse?.data){
         setBalance(walletResponse.data.data.balance )
      }

    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };






  const fetchBalance = async () => {
    try {
      const response = await getCustomerWalletBalance();
      if (response?.data?.data) {
        setBalance(response.data.data.balance || 0);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error('Failed to fetch wallet balance');
      }
    }
  };




  

  const fetchTransactions = async (pageNum: number = 1) => {
    try {
      setLoadingTransactions(true);
      const response = await getWalletTransactions(pageNum, 10);
      if (response?.data?.data) {
        const newTransactions = response.data.data.transactions || [];
        if (pageNum === 1) {
          setTransactions(newTransactions);
        } else {
          setTransactions(prev => [...prev, ...newTransactions]);
        }
        setHasMore(newTransactions.length === 10);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error('Failed to fetch transactions');
      }
    } finally {
      setLoadingTransactions(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalCredit: transactions
      .filter(t => t.type === 'credit' && t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0),
    totalDebit: transactions
      .filter(t => t.type === 'debit' && t.status === 'success')
      .reduce((sum, t) => sum + t.amount, 0),
    totalTransactions: transactions.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <h3 className="mt-6 text-lg font-bold text-gray-800">Loading wallet...</h3>
          <p className="text-gray-500 text-sm">Please wait</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-[900] text-gray-900 tracking-tight flex items-center gap-3">
              <Wallet size={32} className="text-blue-600" />
              My Wallet
            </h1>
            <p className="text-gray-500 font-medium mt-1">Manage your balance and transactions</p>
          </div>
        </div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Wallet size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm font-semibold">Available Balance</p>
                  <p className="text-white text-xs opacity-75">Easy-Q Wallet</p>
                </div>
              </div>
              <button
                onClick={fetchBalance}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <RefreshCw size={20} className="text-white" />
              </button>
            </div>
            
            <div className="flex items-baseline gap-2 mb-8">
              <IndianRupee size={32} className="text-white" />
              <h2 className="text-5xl font-black text-white">{balance.toFixed(2)}</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowDownLeft size={16} className="text-emerald-300" />
                  <p className="text-xs font-semibold text-blue-100">Total Credit</p>
                </div>
                <p className="text-xl font-black text-white">₹{stats.totalCredit.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowUpRight size={16} className="text-rose-300" />
                  <p className="text-xs font-semibold text-blue-100">Total Debit</p>
                </div>
                <p className="text-xl font-black text-white">₹{stats.totalDebit.toFixed(2)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-blue-300" />
                  <p className="text-xs font-semibold text-blue-100">Transactions</p>
                </div>
                <p className="text-xl font-black text-white">{stats.totalTransactions}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transactions Section */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Controls */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-black text-gray-900">Transaction History</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all">
                  <Filter size={18} />
                  <span className="hidden sm:inline">Filter</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all">
                  <Download size={18} />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-2 p-1 bg-gray-100/80 rounded-xl w-fit">
                {(['all', 'credit', 'debit'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      filter === tab
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 sm:max-w-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="divide-y divide-gray-100">
            <AnimatePresence mode="popLayout">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction, index) => {
                  const typeConfig = TRANSACTION_TYPE_CONFIG[transaction.type];
                  const statusConfig = STATUS_CONFIG[transaction.status];

                  return (
                    <motion.div
                      key={transaction._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`p-3 rounded-xl ${typeConfig.bg} ${typeConfig.color}`}>
                            {typeConfig.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-sm truncate">
                              {transaction.description}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Calendar size={12} />
                                <span>{format(new Date(transaction.createdAt), 'MMM dd, yyyy')}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Clock size={12} />
                                <span>{format(new Date(transaction.createdAt), 'hh:mm a')}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={`text-lg font-black ${typeConfig.color}`}>
                              {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                            </p>
                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusConfig.bg} ${statusConfig.color}`}>
                              {statusConfig.icon}
                              <span>{statusConfig.label}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {transaction.paymentMethod && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                          <CreditCard size={12} />
                          <span className="capitalize">{transaction.paymentMethod}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })
              ) : (
                <div className="p-20 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 mb-3">
                      <Wallet size={32} />
                    </div>
                    <p className="text-gray-900 font-bold text-sm">No transactions found</p>
                    <p className="text-gray-400 text-xs mt-1">Your transaction history will appear here</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Load More */}
          {hasMore && filteredTransactions.length > 0 && (
            <div className="p-6 border-t border-gray-100">
              <button
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  fetchTransactions(nextPage);
                }}
                disabled={loadingTransactions}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingTransactions ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
