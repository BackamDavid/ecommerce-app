// Replace 'pk_test_...' with your actual Stripe publishable key
// Get your key from: https://dashboard.stripe.com/apikeys
export const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_...';

// Check if we have a valid Stripe key (not the placeholder)
export const hasValidStripeKey = STRIPE_PUBLIC_KEY && !STRIPE_PUBLIC_KEY.includes('...');

// Stripe configuration
export const stripeConfig = {
  // Enable Apple Pay by setting up your Apple Pay merchant identifier in the Stripe Dashboard
  // and configuring your domain in the Apple Developer Portal
  applePay: true,
  // You can add more payment methods here
  paymentMethods: ['card', 'apple_pay'],
  // Default currency
  currency: 'usd',
  // Appearance configuration
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#7c3aed',
      colorBackground: '#ffffff',
      colorText: '#1a1a1a',
      colorDanger: '#d32f2f',
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    rules: {
      '.Input': {
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        padding: '10px 12px',
      },
    },
  },
};

export default stripeConfig;
