# Customer Wallet - Quick Reference Guide

## 🚀 Quick Start

### Access the Wallet
1. **From Profile Menu**: Click "Wallet" in the profile sidebar
2. **Direct URL**: Navigate to `/customer/wallet`

## 💰 Main Features

### 1. **View Balance**
- Large, prominent display at the top
- Real-time balance in rupees (₹)
- Refresh button to update balance

### 2. **Quick Stats**
Three cards showing:
- **Total Credit**: All money received
- **Total Debit**: All money spent
- **Total Transactions**: Count of all transactions

### 3. **Transaction History**
- Scrollable list of all transactions
- Each transaction shows:
  - Type icon (Credit/Debit)
  - Description
  - Date and time
  - Amount (with +/- sign)
  - Status badge
  - Payment method (if applicable)

### 4. **Filter Transactions**
Three filter options:
- **All**: Show all transactions
- **Credit**: Show only money received
- **Debit**: Show only money spent

### 5. **Search Transactions**
- Search by transaction description
- Real-time filtering as you type

### 6. **Add Money**
Click "Add Money" button to:
- Enter custom amount
- Use quick buttons (₹500, ₹1000, ₹2000)
- Confirm to add funds

## 🎨 Visual Guide

### Transaction Types

#### Credit (Money In) 🟢
- **Icon**: Green circle with down-left arrow
- **Amount**: Shows with + sign (e.g., +₹500.00)
- **Color**: Emerald green
- **Examples**:
  - Refunds
  - Cashback
  - Money added to wallet

#### Debit (Money Out) 🔴
- **Icon**: Red circle with up-right arrow
- **Amount**: Shows with - sign (e.g., -₹350.00)
- **Color**: Rose red
- **Examples**:
  - Service payments
  - Booking charges
  - Purchases

### Transaction Status

| Status | Color | Icon | Meaning |
|--------|-------|------|---------|
| ✅ Success | Green | Checkmark | Transaction completed |
| ⏳ Pending | Amber | Clock | Processing |
| ❌ Failed | Red | X | Transaction failed |

## 📱 User Actions

### Adding Money
1. Click "Add Money" button (top right)
2. Modal opens
3. Enter amount or click quick button
4. Click "Add Money" to confirm
5. Success toast appears
6. Balance updates automatically

### Viewing Transactions
1. Scroll through transaction list
2. Use filters to narrow down
3. Search for specific transactions
4. Click "Load More" for older transactions

### Refreshing Balance
- Click refresh icon on balance card
- Balance updates from server

## 🔧 Technical Details

### API Endpoints Used
```
GET /transaction/wallet/balance
GET /transaction/wallet/transactions?page=1&limit=10
POST /transaction/wallet/add-money
```

### Data Flow
1. Page loads → Fetch balance + transactions
2. User adds money → POST request → Update balance
3. User scrolls → Load more transactions
4. User filters → Client-side filtering
5. User searches → Client-side search

## 🎯 Best Practices

### For Users
- ✅ Check balance before booking
- ✅ Review transaction history regularly
- ✅ Use wallet for faster checkout
- ✅ Add money in advance for convenience
- ⚠️ Verify transaction status
- ⚠️ Report failed transactions

### For Developers
- ✅ Validate amounts on backend
- ✅ Implement transaction limits
- ✅ Add fraud detection
- ✅ Enable transaction receipts
- ✅ Implement proper error handling
- ✅ Add loading states
- ✅ Cache balance appropriately

## 🔐 Security Features

- ✅ Protected route (authentication required)
- ✅ Secure API calls
- ✅ Amount validation
- ✅ Transaction verification
- ⚠️ Consider adding 2FA for large amounts
- ⚠️ Implement transaction limits

## 📊 Statistics Calculation

### Total Credit
```typescript
transactions
  .filter(t => t.type === 'credit' && t.status === 'success')
  .reduce((sum, t) => sum + t.amount, 0)
```

### Total Debit
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

### Add Money Not Working
- Verify amount is valid (> 0)
- Check payment gateway integration
- Review error messages

## 🎨 Customization Options

### Colors
- Primary: Blue (#2563EB)
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

1. **Transaction Categories**
   - Bookings
   - Refunds
   - Cashback
   - Rewards

2. **Analytics Dashboard**
   - Spending charts
   - Monthly reports
   - Category breakdown

3. **Advanced Features**
   - Auto-reload when low
   - Scheduled payments
   - Wallet-to-wallet transfers
   - QR code payments

4. **Export Options**
   - PDF statements
   - CSV export
   - Email reports

5. **Notifications**
   - Transaction alerts
   - Low balance warnings
   - Monthly summaries

---

**Last Updated**: January 8, 2026
**Version**: 1.0.0
