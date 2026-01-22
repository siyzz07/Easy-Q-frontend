import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Phone, ExternalLink, Download, AlertCircle, RefreshCw, Coins } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface PaymentSummaryProps {
  bookingData: any;
  onRetry?: () => void; 
  onPayContinue ?:()=>void
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ bookingData, onRetry, onPayContinue}) => {
 
  

  const status = bookingData.paymentStatus?.toLowerCase();
  const isFailed = status === "failed";
  const isPending = status === "pending";
  const isPaid = status === "paid" || status === "completed";

  // Dynamic Styles based on status
  const statusConfig = {
    paid: {
      bg: "bg-primary",
      icon: <ShieldCheck size={20} className="opacity-80" />,
      badge: "bg-white/20 text-white",
      label: "FULLY PAID"
    },
    failed: {
      bg: "bg-red-600",
      icon: <AlertCircle size={20} className="opacity-80" />,
      badge: "bg-white/20 text-white",
      label: "PAYMENT FAILED"
    },
    pending: {
      bg: "bg-amber-500",
      icon: <RefreshCw size={20} className="opacity-80 animate-spin-slow" />,
      badge: "bg-white/20 text-white",
      label: "PENDING"
    }
  };

  const currentConfig = isFailed ? statusConfig.failed : isPending ? statusConfig.pending : statusConfig.paid;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-none shadow-xl shadow-primary/5 bg-white rounded-[2rem] overflow-hidden">
        {/* Dynamic Header */}
        <CardHeader className={`${currentConfig.bg} text-white pb-6 pt-8 transition-colors duration-500`}>
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-lg font-bold tracking-tight">Payment Summary</CardTitle>
            {currentConfig.icon}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black">{bookingData.totalAmount}</span>
            <Badge variant="secondary" className={`${currentConfig.badge} border-none text-[8px] ml-2 font-black tracking-widest uppercase`}>
              {currentConfig.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6 pb-8 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Service Price</span>
              <span className="font-bold text-foreground">{bookingData.totalAmount}</span>
            </div>
            
            <div className="pt-3 border-t border-border/50 flex justify-between">
              <span className="font-black text-lg">Total Amount</span>
              <span className={`font-black text-lg ${isFailed ? "text-red-600" : "text-primary"}`}>
                {bookingData.totalAmount}
              </span>
            </div>
          </div>

          {/* Payment Method Info */}
          <div className="bg-secondary/40 p-4 rounded-2xl flex items-center justify-between border border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-border/50">
                {/* <Phone size={16} className={isFailed ? "text-red-600" : "text-primary"} /> */}
              </div>
              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Payment Via</p>
                <p className="text-sm font-bold">{bookingData.paymentMethod ||"pending"}</p>
              </div>
            </div>
            {/* <ExternalLink size={14} className="text-muted-foreground" /> */}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {isFailed && bookingData.status!="cancelled" ? (
              <Button 
                onClick={onRetry}
                className="w-full rounded-2xl h-12 gap-2 font-bold bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200"
              >
                <RefreshCw size={18} /> Retry Payment
              </Button>
            ) : isPaid ? (<></>
              // <Button className="w-full rounded-2xl h-12 gap-2 font-bold shadow-lg shadow-primary/10">
              //   <Download size={18} /> Download Receipt
              // </Button>
            ) : (
              <></>
              // <p className="text-center text-xs text-muted-foreground font-medium">
              //   Please wait while we verify your transaction...
              // </p>
            )}
            {!bookingData.paymentMethod &&(
               <Button 
                onClick={onPayContinue}
                className="w-full rounded-2xl h-12 gap-2 font-bold bg-yellow-500 hover:bg-yellow-600 shadow-lg shadow-red-200"
              >
                <Coins size={18} /> pay
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaymentSummary;