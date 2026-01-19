// Paste this in your browser console (F12) to test login:

fetch('https://localhost:7113/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'password'
  })
})
.then(response => response.json())
.then(data => {
  console.log('✅ Login Response:');
  console.log(data);
  
  if (data.token) {
    console.log('✅ Token received:', data.token.substring(0, 50) + '...');
    console.log('✅ User:', data.user);
  } else {
    console.log('❌ NO TOKEN in response');
    console.log('❌ Response keys:', Object.keys(data));
  }
})
.catch(error => {
  console.log('❌ Login failed:');
  console.log('Error:', error);
})
