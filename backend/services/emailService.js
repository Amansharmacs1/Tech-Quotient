import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Sends an OTP email via EmailJS REST API
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} otp - The 6-digit OTP
 */
export const sendOTPEmail = async (email, name, otp) => {
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY; // For REST API authentication

    if (!serviceId || !templateId || !publicKey) {
      console.warn('[Dev Mode] EmailJS credentials not found in backend .env. Skipping actual email send. OTP is:', otp);
      return true;
    }

    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      ...(privateKey && { accessToken: privateKey }),
      template_params: {
        to_email: email,
        to_name: name,
        otp_code: otp,
        otp: otp,
        email_subject: 'Your TechQuotient Verification Code',
        email_body: `Hello ${name},<br><br>Your TechQuotient verification code is: <strong>${otp}</strong><br><br>This code will expire in 5 minutes.<br><br>If you did not request this code, you can ignore this email.<br><br>TechQuotient`,
        name: name,
        email: email
      }
    };

    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    return response.status === 200;
  } catch (error) {
    console.error('EmailJS Error:', error?.response?.data || error.message);
    // Returning true in development allows testing without valid keys blocking flow
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Fallback] Bypassing EmailJS error for development. OTP is:', otp);
      return true;
    }
    throw new Error('Failed to send email');
  }
};
