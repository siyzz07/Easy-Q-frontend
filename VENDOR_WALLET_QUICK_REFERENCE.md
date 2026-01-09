# Vendor Wallet - Quick Reference Guide

## 🚀 Quick Start

### Access the Wallet
1. **From Vendor Dashboard**: Navigate to wallet section
2. **Direct URL**: Navigate to `/vendor/wallet`

## 💰 Main Features

### 1. **View Balance**
- Large, prominent display at the top
- Real-time balance in rupees (₹)
- Refresh button to update balance
- Purple gradient theme

### 2. **Quick Stats Cards**
Three cards showing:
- **This Month**: Current month's earnings
- **Pending**: Pending transactions/amounts
- **Fees Deducted**: Total platform fees deducted

### 3. **Balance Card Stats**
Three stats within the balance card:
- **Total Earned**: All money received from bookings
- **Total Deducted**: All platform fees and deductions
- **Total Transactions**: Count of all transactions

### 4. **Transaction History**
- Scrollable list of all transactions
- Each transaction shows:
  - Type icon (Credit/Debit)
  - Description
  - Date and time
  - Amount (with +/- sign)
  - Status badge
  - Payment method (if applicable)

### 5. **Filter Transactions**
Three filter options:
- **All**: Show all transactions
- **Credit**: Show only money received
- **Debit**: Show only money deducted

### 6. **Search Transactions**
- Search by transaction description
- Real-time filtering as you type

## 🎨 Visual Guide

### Transaction Types

#### Credit (Money In) 🟢
- **Icon**: Green circle with down-left arrow
- **Amount**: Shows with + sign (e.g., +₹2500.00)
- **Color**: Emerald green
- **Examples**:
  - Booking payments
  - Customer payments
  - Refunds received

#### Debit (Money Out) 🔴
- **Icon**: Red circle with up-right arrow
- **Amount**: Shows with - sign (e.g., -₹500.00)
- **Color**: Rose red
- **Examples**:
  - Platform fees
  - Commission deductions
  - Service charges

### Transaction Status

| Status | Color | Icon | Meaning |
|--------|-------|------|---------|
| ✅ Success | Green | Checkmark | Transaction completed |
| ⏳ Pending | Amber | Clock | Processing |
| ❌ Failed | Red | X | Transaction failed |

## 📱 User Actions

### Viewing Balance
1. Balance is displayed prominently at the top
2. Click refresh icon to update
3. View breakdown in quick stats

### Viewing Transactions
1. Scroll through transaction list
2. Use filters to narrow down
3. Search for specific transactions
4. Click "Load More" for older transactions

### Understanding Earnings
- **This Month**: Shows current month's earnings
- **Total Earned**: All-time earnings from bookings
- **Fees Deducted**: Platform fees and commissions

### Refreshing Balance
- Click refresh icon on balance card
- Balance updates from server

## 🔧 Technical Details

### API Endpoints (To Be Implemented)
```
GET /transaction/vendor/wallet/balance
GET /transaction/vendor/wallet/transactions?page=1&limit=10
```

### Data Flow
1. Page loads → Fetch balance + transactions
2. User scrolls → Load more transactions
3. User filters → Client-side filtering
4. User searches → Client-side search

## 🎯 Best Practices

### For Vendors
- ✅ Check balance regularly
- ✅ Review transaction history for accuracy
- ✅ Monitor platform fees
- ✅ Track monthly earnings
- ⚠️ Verify transaction status
- ⚠️ Report discrepancies immediately

### For Developers
- ✅ Validate amounts on backend
- ✅ Implement transaction limits
- ✅ Add fraud detection
- ✅ Enable transaction receipts
- ✅ Implement proper error handling
- ✅ Add loading states
- ✅ Cache balance appropriately

## 🔐 Security Features

- ✅ Protected route (vendor authentication required)
- ✅ Secure API calls
- ✅ Transaction verification
- ⚠️ Consider adding 2FA for withdrawals
- ⚠️ Implement withdrawal limits

## 📊 Statistics Calculation

### Total Earned
```typescript
transactions
  .filter(t => t.type === 'credit' && t.status === 'success')
  .reduce((sum, t) => sum + t.amount, 0)
```

### Total Deducted
```typescript
transactions
  .filter(t => t.type === 'debit' && t.status === 'success')
  .reduce((sum, t) => sum + t.amount, 0)
```

### Total Transactions
```typescript
transactions.length
```

## 🐛 Troubleshooting

### Balance Not Updating
- Click refresh button
- Check network connection
- Verify API endpoint is working

### Transactions Not Loading
- Check console for errors
- Verify authentication token
- Check API response

### Stats Not Matching
- Verify transaction status filters
- Check date ranges
- Review calculation logic

## 🎨 Customization Options

### Colors
- Primary: Purple (#7C3AED)
- Credit: Emerald (#059669)
- Debit: Rose (#E11D48)
- Success: Green (#10B981)
- Pending: Amber (#F59E0B)
- Failed: Red (#F43F5E)

### Animations
- Framer Motion for smooth transitions
- Hover effects on interactive elements
- Loading spinners for async operations

## 📈 Future Enhancements

1. **Withdrawal System**
   - Request payouts
   - Set minimum withdrawal amount
   - Track withdrawal history
   - Multiple payout methods

2. **Analytics Dashboard**
   - Earnings charts
   - Monthly reports
   - Category breakdown
   - Performance metrics

3. **Advanced Features**
   - Auto-payout settings
   - Scheduled withdrawals
   - Tax documentation
   - Invoice generation

4. **Export Options**
   - PDF statements
   - CSV export
   - Email reports
   - Tax reports

5. **Notifications**
   - Payment alerts
   - Withdrawal confirmations
   - Monthly summaries
   - Fee notifications

## 💡 Key Differences from Customer Wallet

| Feature | Customer Wallet | Vendor Wallet |
|---------|----------------|---------------|
| **Color Theme** | Blue gradient | Purple gradient |
| **Primary Action** | Add Money | View Earnings |
| **Credit Label** | Total Credit | Total Earned |
| **Debit Label** | Total Debit | Total Deducted |
| **Focus** | Spending | Earning |
| **Quick Stats** | Credit/Debit/Count | Monthly/Pending/Fees |

## 🔄 Transaction Flow

### When Vendor Receives Payment
1. Customer completes booking payment
2. Amount credited to vendor wallet
3. Platform fee automatically deducted
4. Net amount shown in balance
5. Transaction recorded in history

### When Platform Fee is Deducted
1. Booking is completed
2. Platform calculates commission
3. Amount debited from wallet
4. Debit transaction recorded
5. Balance updated

## 📝 Mock Data (Current Implementation)

The current implementation uses mock data for demonstration:
- **Balance**: ₹15,750.50
- **Sample Transactions**: 3 transactions showing various types
- **This Month**: 60% of total earnings (demo calculation)

**Note**: Replace with actual API calls when backend is ready.

---

**Last Updated**: January 8, 2026
**Version**: 1.0.0 (UI Only)
**Status**: Ready for Backend Integration
