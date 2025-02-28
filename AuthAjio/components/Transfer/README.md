# Transfer Components

This directory contains components related to the money transfer functionality of the BanBajío mobile application.

## Components Overview

### 1. TransferScreen.tsx
The main controller component that manages the entire transfer flow, including:
- Selecting a contact
- Entering a transfer amount
- Confirming the transfer
- Displaying loading and success screens

#### Key Features:
- Manages multiple screens within the transfer flow
- Handles navigation between different transfer stages
- Updates the user's balance after a successful transfer
- Provides animated loading feedback during transfer processing
- Generates transaction references and timestamps

### 2. AddContactScreen.tsx
Allows users to add and select contacts for transfers.

#### Key Features:
- Input field for account number
- Bank selection dropdown
- Full name input field
- Form validation
- Contact selection functionality

### 3. TransferAmountScreen.tsx
Enables users to enter the amount they wish to transfer.

#### Key Features:
- Displays available balance
- Validates input to ensure it's a valid number
- Prevents transfers exceeding available balance
- Shows error messages for invalid inputs
- Continue button that's enabled only when input is valid

### 4. TransferConfirmationScreen.tsx
Shows a summary of the transfer details for user confirmation.

#### Key Features:
- Displays recipient details
- Shows transfer amount
- Generates and displays a reference number
- Provides options to confirm or cancel the transfer

## State Management
The transfer flow uses React's useState hooks to manage:
- Selected contact information
- Transfer amount
- Current screen in the flow
- Loading and completion states
- Transaction details

## Animations
- The loading screen features animated progress indicators
- Text animations provide visual feedback during processing

## Usage
These components are accessed from the MainPage when a user initiates a transfer. The flow is designed to be intuitive and provide clear feedback at each step of the process.

## Dependencies
- React Native core components
- React hooks for state management
- Expo Vector Icons
- React Native's Animated API for animations 