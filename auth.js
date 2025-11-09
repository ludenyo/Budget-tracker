// Simple authentication using localStorage (not secure for production)
const users = JSON.parse(localStorage.getItem('users')) || [];

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.includes('index.html')) {
        // User is logged in and on main page - allow access
        return true;
    } else if (!currentUser && window.location.pathname.includes('index.html')) {
        // User not logged in but trying to access main page - redirect to login
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Show message function
function showMessage(message, type) {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.className = type;
    setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = '';
    }, 3000);
}

// Signup functionality
if (document.getElementById('signup-form')) {
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validation
        if (password !== confirmPassword) {
            showMessage('Passwords do not match!', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long!', 'error');
            return;
        }

        // Check if user already exists
        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            showMessage('Username or email already exists!', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            username,
            email,
            password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        showMessage('Account created successfully! Redirecting to login...', 'success');

        // Redirect to login after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// Login functionality
if (document.getElementById('login-form')) {
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Find user
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Set current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMessage('Login successful! Redirecting...', 'success');

            // Redirect to main app after 1 second
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showMessage('Invalid username or password!', 'error');
        }
    });
}

// Logout functionality (to be added to main app)
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', checkAuth);
