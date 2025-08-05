  const toggleButton = document.getElementById('mobile-menu-toggle');
  const closeButton = document.getElementById('mobile-menu-close');
  const sidebar = document.getElementById('mobile-menu-sidebar');

  toggleButton.addEventListener('click', () => {
    sidebar.classList.remove('-translate-x-full');
  });

  closeButton.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
  });

  // Optional: Close on outside click
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
      sidebar.classList.add('-translate-x-full');
    }
  });