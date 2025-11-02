// client/src/components/LoginPage.js
import React from 'react';

const LoginPage = () => {
  const backendURL = 'http://localhost:5000'; // change this to your deployed backend URL later

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f9fafb',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '2rem' }}>Login to Search Images</h1>

      {/* Google Login */}
      <a
        href={`${backendURL}/auth/google`}
        style={buttonStyle('#DB4437')}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
          alt="Google"
          style={iconStyle}
        />
        Continue with Google
      </a>

      {/* Facebook Login */}
      <a
        href={`${backendURL}/auth/facebook`}
        style={buttonStyle('#4267B2')}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
          alt="Facebook"
          style={iconStyle}
        />
        Continue with Facebook
      </a>

      {/* GitHub Login */}
      <a
        href={`${backendURL}/auth/github`}
        style={buttonStyle('#333')}
      >
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub"
          style={iconStyle}
        />
        Continue with GitHub
      </a>
    </div>
  );
};

// ✅ Inline styles for quick demo
const buttonStyle = (bgColor) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: 'white',
  backgroundColor: bgColor,
  padding: '12px 20px',
  borderRadius: '8px',
  width: '250px',
  margin: '10px 0',
  fontWeight: 'bold',
  fontSize: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s ease',
});

const iconStyle = {
  width: '24px',
  height: '24px',
  marginRight: '10px',
};

export default LoginPage;
