const donationButtons = document.querySelectorAll('.donation-option');
const selectedAmountText = document.getElementById('selectedAmountText');
const selectedPostAmount = document.getElementById('selectedPostAmount');
const customAmountInput = document.getElementById('customAmount');
const applyCustomAmountBtn = document.getElementById('applyCustomAmount');
const shareBtn = document.getElementById('shareBtn');
const themeToggle = document.getElementById('themeToggle');
const commentForm = document.getElementById('commentForm');
const commentName = document.getElementById('commentName');
const commentText = document.getElementById('commentText');
const commentsList = document.getElementById('commentsList');

const postFilterButtons = document.querySelectorAll('.post-filter-btn');
const bigPosts = document.querySelectorAll('.big-post');
const noPostsFound = document.getElementById('noPostsFound');

let selectedAmount = 25;

function updateSelectedAmount(amount) {
  selectedAmount = Number(amount);

  if (selectedAmountText) {
    selectedAmountText.textContent = `Selected donation: $${selectedAmount}`;
  }

  if (selectedPostAmount) {
    selectedPostAmount.textContent = `$${selectedAmount}`;
  }
}

window.getSelectedAmount = function () {
  return selectedAmount;
};

if (donationButtons.length) {
  donationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      donationButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      updateSelectedAmount(button.dataset.amount);
    });
  });
}

if (applyCustomAmountBtn) {
  applyCustomAmountBtn.addEventListener('click', () => {
    const customValue = Number(customAmountInput.value.trim());

    if (!customValue || customValue < 1) {
      alert('Please enter a valid custom amount.');
      return;
    }

    donationButtons.forEach((btn) => btn.classList.remove('active'));
    updateSelectedAmount(customValue);
  });
}

if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    alert('Demo: post shared');
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
  });
}

if (commentForm) {
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = commentName.value.trim();
    const text = commentText.value.trim();

    if (!name || !text) return;

    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';

    const today = new Date().toLocaleDateString();

    commentItem.innerHTML = `
      <div class="comment-top">
        <div class="comment-name"></div>
        <div class="comment-date">${today}</div>
      </div>
      <div class="comment-text"></div>
    `;

    commentItem.querySelector('.comment-name').textContent = name;
    commentItem.querySelector('.comment-text').textContent = text;

    if (commentsList) {
      commentsList.prepend(commentItem);
    }

    commentForm.reset();
  });
}

if (postFilterButtons.length && bigPosts.length) {
  postFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      postFilterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedCategory = button.dataset.category;
      let visibleCount = 0;

      bigPosts.forEach((post) => {
        const postCategory = post.dataset.category;

        if (selectedCategory === 'all' || postCategory === selectedCategory) {
          post.style.display = 'block';
          visibleCount++;
        } else {
          post.style.display = 'none';
        }
      });

      if (noPostsFound) {
        noPostsFound.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
}