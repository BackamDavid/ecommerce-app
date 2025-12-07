import React, { useState } from 'react';

// CheckoutForm component
const CheckoutForm = ({ amount, onSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock validation
    if (!cardNumber || !expiry || !cvc || !name) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate successful payment
    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          Card Information
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            marginBottom: '10px',
            fontSize: '16px'
          }}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
          Cardholder Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ 
            width: '40px', 
            height: '25px', 
            backgroundColor: '#000', 
            borderRadius: '4px',
            marginRight: '10px'
          }}></div>
          <span>Apple Pay</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '25px', 
            backgroundColor: '#4285f4', 
            borderRadius: '4px',
            marginRight: '10px'
          }}></div>
          <span>Google Pay</span>
        </div>
      </div>

      {error && (
        <div style={{ 
          color: '#d32f2f', 
          marginBottom: '15px', 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          borderRadius: '4px' 
        }}>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#7c3aed',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
};
const PaymentOptions = ({ amount, onSuccess }) => {
  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '20px', 
      border: '1px solid var(--border-color, #e2e8f0)', 
      borderRadius: '8px',
      backgroundColor: 'var(--bg-color, #ffffff)'
    }}>
      <h2 style={{ 
        fontSize: '20px', 
        marginBottom: '20px', 
        color: 'var(--text-color, #1a1a1a)' 
      }}>
        Payment Method
      </h2>
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#f0f9ff', 
        borderRadius: '4px', 
        marginBottom: '20px',
        border: '1px solid #bae6fd'
      }}>
        <p style={{ margin: 0, color: '#0369a1', fontSize: '14px' }}>
          <strong>Demo Mode:</strong> This is a mock payment form for demonstration purposes. No actual payments will be processed.
        </p>
      </div>
      <CheckoutForm amount={amount} onSuccess={onSuccess} />
    </div>
  );
};

export default PaymentOptions;
