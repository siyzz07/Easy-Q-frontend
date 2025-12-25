
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, ExternalLink, Download } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface PaymentSummaryProps {
  bookingData: any;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ bookingData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-none shadow-xl shadow-primary/5 bg-white rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-primary text-white pb-6 pt-8">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-lg font-bold tracking-tight">Payment Summary</CardTitle>
            <ShieldCheck size={20} className="opacity-80" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black">{bookingData.totalAmount}</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-none text-[8px] ml-2 font-black tracking-widest uppercase">FULLY PAID</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 pb-8 space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Service Price</span>
              <span className="font-bold text-foreground">{bookingData.totalAmount}</span>
            </div>
            {/* <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Estimated Tax</span>
              <span className="font-bold text-foreground">{bookingData.tax}</span>
            </div> */}
            <div className="pt-3 border-t border-border/50 flex justify-between">
              <span className="font-black text-lg">Total Amount</span>
              <span className="font-black text-lg text-primary">{bookingData.totalAmount}</span>
            </div>
          </div>

          <div className="bg-secondary/40 p-4 rounded-2xl flex items-center justify-between border border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-border/50">
                <Phone size={16} className="text-primary" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-widest font-black text-muted-foreground">Payment Via</p>
                <p className="text-sm font-bold">{bookingData.paymentMethod}</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-muted-foreground" />
          </div>
              
          <Button className="w-full rounded-2xl h-12 gap-2 font-bold shadow-lg shadow-primary/10">
            <Download size={18} /> Download Receipt
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaymentSummary;
