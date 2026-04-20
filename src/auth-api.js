const API_URL = 'http://127.0.0.1:8000/api';

const authBlock = document.getElementById('authBlock');
const authModal = document.getElementById('authModal');
const postDonateBtn = document.getElementById('postDonateBtn');

let currentUser = null;

function updateHeaderUI() {
  if (!authBlock) return;

  if (!currentUser) {
    authBlock.innerHTML = `
      <button class="btn btn-header-light" onclick="showAuth()">Login</button>
    `;
  } else {
    authBlock.innerHTML = `
      <div class="auth-user-box">
        <span>${currentUser.username}</span>
        <span>$${currentUser.balance}</span>
        <button class="btn btn-header-light" onclick="logout()">Logout</button>
      </div>
    `;
  }
}

async function registerUser(username, email, password) {
  try {
    const res = await fetch(`${API_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    if (!res.ok) {
      alert('Register error');
      return;
    }

    alert('Registered! Now login.');
  } catch (error) {
    alert('Server error during registration.');
  }
}

async function loginUser(username, password) {
  try {
    const res = await fetch(`${API_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert('Login failed');
      return;
    }

    localStorage.setItem('token', data.access);

    await loadProfile();

    if (authModal) {
      authModal.style.display = 'none';
    }
  } catch (error) {
    alert('Server error during login.');
  }
}

async function loadProfile() {
  const token = localStorage.getItem('token');

  if (!token) {
    currentUser = null;
    updateHeaderUI();
    return;
  }

  try {
    const res = await fetch(`${API_URL}/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      localStorage.removeItem('token');
      currentUser = null;
      updateHeaderUI();
      return;
    }

    const data = await res.json();
    currentUser = data;
    updateHeaderUI();
  } catch (error) {
    currentUser = null;
    updateHeaderUI();
  }
}

function logout() {
  localStorage.removeItem('token');
  currentUser = null;
  updateHeaderUI();
}

function showAuth() {
  if (authModal) {
    authModal.style.display = 'block';
  }
}

function hideAuth() {
  if (authModal) {
    authModal.style.display = 'none';
  }
}

function handleRegister() {
  const u = document.getElementById('authUsername')?.value.trim();
  const e = document.getElementById('authEmail')?.value.trim();
  const p = document.getElementById('authPassword')?.value.trim();

  if (!u || !e || !p) {
    alert('Fill all fields for registration.');
    return;
  }

  registerUser(u, e, p);
}

function handleLogin() {
  const u = document.getElementById('authUsername')?.value.trim();
  const p = document.getElementById('authPassword')?.value.trim();

  if (!u || !p) {
    alert('Enter username and password.');
    return;
  }

  loginUser(u, p);
}

async function makeDonation(amount, campaignId) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login first.');
    showAuth();
    return;
  }

  try {
    const res = await fetch(`${API_URL}/donations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        amount,
        campaign: campaignId
      })
    });

    if (!res.ok) {
      alert('Donation failed');
      return;
    }

    alert('Donation successful');
    await loadProfile();
  } catch (error) {
    alert('Server error during donation.');
  }
}

async function createPost() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please login first.');
    showAuth();
    return;
  }

  const title = document.getElementById('postTitle')?.value.trim();
  const description = document.getElementById('postDesc')?.value.trim();
  const goal = document.getElementById('postGoal')?.value.trim();

  if (!title || !description || !goal) {
    alert('Fill all post fields.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/campaigns/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        goal
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert('Post failed');
      return;
    }

    renderCreatedPost({
      title: data.title || title,
      description: data.description || description,
      goal: data.goal || goal,
      author: data.author || currentUser?.username || 'User'
    });

    alert('Post created');

    const createPostModal = document.getElementById('createPostModal');
    if (createPostModal) {
      createPostModal.style.display = 'none';
    }

    document.getElementById('postTitle').value = '';
    document.getElementById('postDesc').value = '';
    document.getElementById('postGoal').value = '';
  } catch (error) {
    alert('Server error during post creation.');
  }
}

window.showAuth = showAuth;
window.hideAuth = hideAuth;
window.handleRegister = handleRegister;
window.handleLogin = handleLogin;
window.logout = logout;
window.createPost = createPost;

if (postDonateBtn) {
  postDonateBtn.addEventListener('click', () => {
    const selectedAmount = window.getSelectedAmount ? window.getSelectedAmount() : 25;
    makeDonation(selectedAmount, 1);
  });
}

loadProfile();
function renderCreatedPost(post) {
  const container = document.getElementById('userPostsList');
  if (!container) return;

  const postWrapper = document.createElement('div');
  postWrapper.className = 'post-layout';

  postWrapper.innerHTML = `
    <div class="post-card">
      <div class="post-meta">Posted by ${post.author || currentUser?.username || 'User'} • just now</div>
      <h3>${post.title}</h3>
      <p>${post.description}</p>

      <div class="mini-stats">
        <div class="mini-stat">
          <strong>$${post.goal}</strong>
          <span>Campaign goal</span>
        </div>
        <div class="mini-stat">
          <strong>$${window.getSelectedAmount ? window.getSelectedAmount() : 25}</strong>
          <span>Your selected donation</span>
        </div>
      </div>

      <div class="post-actions">
        <button class="btn btn-primary">Donate Selected Amount</button>
        <button class="btn btn-light">Share Post</button>
      </div>
    </div>

    <div>
      <div class="comment-form-card">
        <h3>Leave a comment</h3>
        <form class="comment-form">
          <input type="text" placeholder="Your name" />
          <textarea placeholder="Write your comment..."></textarea>
          <button type="button" class="btn btn-primary">Post Comment</button>
        </form>
      </div>
    </div>
  `;

  const donateBtn = postWrapper.querySelector('.btn.btn-primary');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      if (window.openPaymentModal) {
        window.openPaymentModal();
      }
    });
  }

  const shareBtn = postWrapper.querySelector('.btn.btn-light');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      alert('Demo: post shared');
    });
  }

  container.prepend(postWrapper);
}