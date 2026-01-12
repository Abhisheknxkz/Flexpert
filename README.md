# Shopping Cart Billing System

A React + TypeScript + Vite application that demonstrates a shopping cart with special offers and automatic bill calculation.

## Application Overview

This is a shopping cart billing system that allows users to add products to their basket and automatically applies special offers to calculate the final bill. The application features a clean, responsive interface with real-time price calculations and discount applications.

## Architecture

### State Management
- **Redux Toolkit** for centralized state management
- **Basket Slice** handles cart operations and bill calculations
- **Typed Hooks** for type-safe Redux usage

### Key Components
- **ProductList**: Displays available products with add-to-basket functionality
- **Basket**: Shows cart items with quantity controls and removal options
- **BillSummary**: Displays detailed billing breakdown with applied offers

## Application Logic

### Product Catalog
The application offers 5 products:
- **Bread**: £1.10
- **Milk**: £0.50
- **Cheese**: £0.90
- **Soup**: £0.60
- **Butter**: £1.20

### Special Offers System

The application implements three special offers that are automatically applied:

#### 1. Cheese Buy One Get One Free
- **Condition**: Buy 2 or more cheeses
- **Benefit**: Get every second cheese free
- **Calculation**: `Math.floor(cheese_quantity / 2) * cheese_price`

#### 2. Soup and Bread Deal
- **Condition**: Buy soup and bread together
- **Benefit**: Get bread at half price for each soup purchased
- **Calculation**: `min(soup_quantity, bread_quantity) * (bread_price * 0.5)`

#### 3. Butter Third Off
- **Condition**: Buy any butter
- **Benefit**: Get 33% discount on all butter items
- **Calculation**: `butter_quantity * (butter_price * 1/3)`

### Cart Operations

#### Add to Basket
- Increments quantity if product already exists
- Adds new item with quantity 1 if not present
- Recalculates bill with all applicable offers

#### Remove from Basket
- Decrements quantity if more than 1
- Removes item completely if quantity is 1
- Recalculates bill with updated offers

#### Update Quantity
- Sets specific quantity for a product
- Removes item if quantity is 0 or less
- Recalculates bill with new quantities

#### Clear Basket
- Removes all items from cart
- Resets bill to zero

### Bill Calculation Logic

The bill calculation follows this process:

1. **Subtotal**: Sum of all items at regular price
   ```typescript
   subtotal = Σ(item.price × item.quantity)
   ```

2. **Apply Special Offers**: Each offer calculates potential savings
   - Offers are evaluated independently
   - Only offers with savings > 0 are applied

3. **Total Savings**: Sum of all applied offer savings
   ```typescript
   total_savings = Σ(offer_savings)
   ```

4. **Final Total**: Subtotal minus total savings
   ```typescript
   total = subtotal - total_savings
   ```

### Data Flow

1. **User Action** (add/remove/update item)
2. **Redux Action** dispatched to basket slice
3. **State Update** in basket reducer
4. **Bill Recalculation** with current items
5. **Component Re-render** with new state
6. **UI Update** showing updated cart and bill

### Type Safety

The application uses TypeScript for comprehensive type safety:
- **Product**: Product information (id, name, price)
- **BasketItem**: Product with quantity
- **SpecialOffer**: Offer configuration with calculation functions
- **BillCalculation**: Complete billing breakdown
- **BasketState**: Redux state structure

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **ESLint** for code quality

## Features

- ✅ Real-time cart updates
- ✅ Automatic special offer application
- ✅ Detailed bill breakdown
- ✅ Responsive design
- ✅ Type-safe implementation
- ✅ Clean, maintainable code structure
