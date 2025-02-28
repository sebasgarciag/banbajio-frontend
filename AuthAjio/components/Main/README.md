# Main Component

## Overview
The Main component serves as the primary dashboard of the BanBajío mobile application. It displays the user's account information, provides quick access to key banking functions, and serves as the navigation hub for the entire application.

## Key Features
- **Header with BanBajío Logo**: Displays the bank's logo in a white container against a red background for brand visibility.
- **Account Section**: Shows the user's current account balance.
- **Action Buttons**: 
  - **Recibir (Receive)**: For receiving money transfers.
  - **Transferir (Transfer)**: For initiating money transfers to other accounts.
- **Credit Card Section**: Displays credit card information including current balance, payment due date, and available credit limit.
- **My Cards Section**: Provides access to manage all cards associated with the account.

## State Management
- Tracks the current screen being displayed (`main` or `transfer`).
- Manages the user's available balance and updates it when transfers are completed.

## Navigation
- When the "Transferir" button is pressed, the app navigates to the TransferScreen component.
- The component handles returning to the main screen after a transfer is completed.

## Styling
- Uses a dark theme with a red accent color (BANBAJIO_RED: #FF6B6B).
- Implements consistent spacing, shadows, and rounded corners for a modern look.
- Features large, visually appealing action buttons with icons.

## Usage
This component is the entry point of the application after authentication. It should be rendered as the main screen in the app's navigation stack.

## Dependencies
- React Native core components
- Expo Vector Icons (Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons)
- TransferScreen component for handling money transfers 