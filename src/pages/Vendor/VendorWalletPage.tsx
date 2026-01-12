import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, Calendar, Filter, 
  Download, Search, CreditCard, CheckCircle2, XCircle, Clock, 
  IndianRupee, RefreshCw, DollarSign, TrendingDown
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { getVendorWalletBalance } from "../../Services/ApiService/WalletApiService";
import { getTransactions } from "../../Services/ApiService/TransactionApiService";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../../components/Shared/Pagination";

// Interfaces
interface Transaction {
  _id: string;
  flow: "credit" | "debit";
  amount: number;
  description: string;
  status: "success" | "pending" | "failed";
  createdAt: string;
  paymentMethod?: string;
}

const CONFIG = {
  types: {
    credit: { icon: ArrowDownLeft, color: "text-emerald-600", bg: "bg-emerald-50", label: "Credit" },
    debit: { icon: ArrowUpRight, color: "text-rose-600", bg: "bg-rose-50", label: "Debit" }
  },
  status: {
    success: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100/50", label: "Success" },
    pending: { icon: Clock, color: "text-amber-600", bg: "bg-amber-100/50", label: "Pending" },
    failed: { icon: XCircle, color: "text-rose-600", bg: "bg-rose-100/50", label: "Failed" }
  }
};

const VendorWalletPage = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  // Fetch data whenever page, filter, or search changes
  useEffect(() => {
    fetchWalletData();
  }, [page, debouncedSearch, filter]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      // Fetch balance and transactions in parallel
      const [walletRes, transRes] = await Promise.all([
        getVendorWalletBalance(),
        getTransactions(page, limit, debouncedSearch)
      ]);

      if (walletRes?.data?.data) {
        setBalance(walletRes.data.data.balance);
      }

      if (transRes?.data?.data) {
        setTransactions(transRes.data.data);
        setTotalPages(transRes.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Wallet Error:", error);
      toast.error("Failed to sync wallet data");
    } finally {
      setLoading(false);
    }
  };

  // Logic for filtered view (Local filtering for tabs, but data comes from backend)
  const displayedTransactions = useMemo(() => {
    return transactions.filter(t => filter === "all" || t.flow === filter);
  }, [transactions, filter]);

  if (loading && page === 1) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <Wallet size={32} className="text-purple-600" /> Wallet History
          </h1>
          {/* <button onClick={fetchWalletData} className="p-2.5 bg-white border rounded-xl hover:bg-gray-50 shadow-sm">
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          </button> */}
        </div>

        {/* Balance Card - Compact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-indigo-800 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <p className="text-purple-100 text-sm font-bold uppercase tracking-widest">Available Balance</p>
          <div className="flex items-center gap-2 mt-2">
            <IndianRupee size={36} className="opacity-70" />
            <h2 className="text-5xl font-black">{balance.toLocaleString("en-IN")}.00</h2>
          </div>
        </motion.div>

        {/* Transactions List Container */}
        <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
              {(["all", "credit", "debit"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => { setFilter(t); setPage(1); }}
                  className={`px-6 py-2 rounded-lg text-xs font-black uppercase transition-all ${filter === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
                >
                  {t}
                </button>
              ))}
            </div>
           
          </div>

          <div className="divide-y divide-gray-50 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {displayedTransactions.length > 0 ? (
                displayedTransactions.map((transaction, index) => {
                  const type = CONFIG.types[transaction.flow];
                  const status = CONFIG.status[transaction.status];
                  return (
                    <motion.div
                      key={transaction._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-2xl ${type.bg} ${type.color}`}>
                          <type.icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm truncate">{transaction.description}</p>
                          <div className="flex gap-3 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                            <span>{format(new Date(transaction.createdAt), "MMM dd, yyyy")}</span>
                            <span>{format(new Date(transaction.createdAt), "hh:mm a")}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <p className={`text-lg font-black ${type.color}`}>
                          {transaction.flow === "credit" ? "+" : "-"}₹{transaction.amount}
                        </p>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                   <Wallet size={48} className="opacity-20 mb-4" />
                   <p className="font-bold">No transactions found</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Corrected Pagination Placement */}
          <div className="p-6 border-t border-gray-100 flex justify-center bg-gray-50/30">
            <Pagination 
              page={page} 
              totalPages={totalPages} 
              onPageChange={setPage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
    <p className="font-black text-gray-800 uppercase tracking-widest text-xs">Syncing Ledger...</p>
  </div>
);

export default VendorWalletPage;  