# BanBajío Mobile App

## Overview
This is a mobile banking application for BanBajío, built with React Native and Expo. The app provides a modern, user-friendly interface for customers to manage their accounts, make transfers, view credit card information, and more.

## Features
- **Account Management**: View account balances and transaction history
- **Money Transfers**: Send money to contacts with a streamlined, multi-step process
- **Credit Card Management**: View credit card balances, payment dates, and limits
- **Card Management**: Access and manage all cards in one place

## Project Structure
```
AuthAjio/
├── assets/              # Images, fonts, and other static assets
├── components/          # Reusable UI components
│   ├── Main/            # Main dashboard components
│   ├── Transfer/        # Money transfer flow components
│   └── Home/            # Home screen components
├── pages/               # Screen components that represent full pages
├── app/                 # Expo Router configuration
├── node_modules/        # Dependencies
├── package.json         # Project configuration and dependencies
└── app.json             # Expo configuration
```

## Key Components
- **MainPage**: The dashboard screen showing account information and main actions
- **TransferScreen**: Manages the entire transfer flow
- **AddContactScreen**: For adding and selecting transfer recipients
- **TransferAmountScreen**: For entering transfer amounts
- **TransferConfirmationScreen**: For confirming transfer details

## Getting Started

### Prerequisites
- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation
1. Clone the repository
2. Navigate to the project directory: `cd AuthAjio`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npx expo start`

### Running the App
- Use the Expo Go app on your physical device to scan the QR code
- Or press 'a' to open in an Android emulator
- Or press 'i' to open in an iOS simulator

## Design System
- **Colors**:
  - Primary Red: `#FF6B6B` (BANBAJIO_RED)
  - Primary Purple: `#7A40B9` (BANBAJIO_PURPLE)
  - Background: `#000000` (Black)
  - Text: White and gray shades
- **Typography**: Uses the system default fonts with various sizes for hierarchy
- **Components**: Custom buttons, cards, and input fields styled consistently

## Development Notes
- The app uses React's useState for state management
- Navigation is handled through conditional rendering based on state
- Form validation is implemented for transfer inputs
- Animations are used to enhance the user experience during loading states

## Future Enhancements
- Add authentication flow
- Implement biometric login
- Add transaction history
- Implement push notifications
- Add support for bill payments
