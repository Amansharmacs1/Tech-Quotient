import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { verifySignupOTP } from '../../services/authService';
import { ArrowRight } from 'lucide-react';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeSignup } = useAuth();
  
  const signupData = location.state?.signupData;
  const email = signupData?.email;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (!signupData) {
      navigate('/signup');
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [signupData, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    
    const newOtp = [...otp];
    for(let i=0; i<pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && e.target.previousSibling) {
        e.target.previousSibling.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setErrorMessage('Please enter the 6-digit code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = { ...signupData, otp: otpValue };
      const response = await verifySignupOTP(data);
      if (response.success) {
        completeSignup(response.data);
        const dest = response.data.user.role === 'faculty' ? '/faculty/dashboard' : '/student/dashboard';
        navigate(dest, { replace: true });
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem 1rem', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '460px', backgroundColor: '#ffffff', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
        
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
          Verify Your Email
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '2rem' }}>
          We've sent a 6-digit verification code to <strong style={{ color: '#0f172a' }}>{email}</strong>.
        </p>

        {errorMessage && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: '10px', padding: '0.75rem', fontSize: '0.875rem', marginBottom: '1.25rem', textAlign: 'left' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                onPaste={handlePaste}
                style={{
                  width: '45px', height: '50px', fontSize: '1.25rem', fontWeight: 700, textAlign: 'center',
                  borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none'
                }}
              />
            ))}
          </div>

          <button type="submit" disabled={isLoading} style={{ width: '100%', backgroundColor: '#f26422', color: '#ffffff', border: 'none', padding: '0.85rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(242, 100, 34, 0.25)', opacity: isLoading ? 0.7 : 1 }}>
            {isLoading ? 'Verifying...' : 'Verify Email'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', fontSize: '0.875rem', color: '#64748b' }}>
          Didn't receive the code?{' '}
          {timer > 0 ? (
            <span>Resend OTP in {timer}s</span>
          ) : (
            <button onClick={() => navigate('/signup')} style={{ background: 'none', border: 'none', color: '#f26422', fontWeight: 700, cursor: 'pointer', padding: 0 }}>
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
