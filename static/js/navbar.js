(function() {
  const hamburger = document.querySelector('.hamburger')
  const close = document.querySelector('.close')
  const nav = document.querySelector('.nav ul')

  let lastScrollY = window.scrollY
  let isMouseInNav = false

  // Function to handle scroll events
  function handleScroll() {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && !isMouseInNav) {
          // Scrolling down and mouse not in nav area, hide the nav element
          nav.classList.add('hidden')
      } else if (currentScrollY < lastScrollY) {
          // Scrolling up, show the nav element
          nav.classList.remove('hidden')
      }

      // Always apply .dark class unless at the top of the page
      if (currentScrollY > 0) {
          nav.classList.add('dark')
      } else {
          nav.classList.remove('dark')
      }

      lastScrollY = currentScrollY
  }

  window.addEventListener('scroll', handleScroll)

  function toggleMenu() {
      nav.classList.toggle('show')
      close.classList.toggle('show')
      hamburger.classList.toggle('hide')
      document.body.style.overflow = nav.classList.contains('show') ? 'hidden' : ''
  }

  hamburger.addEventListener('click', toggleMenu)
  close.addEventListener('click', toggleMenu)

  // Close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior
          const targetId = event.target.getAttribute('href'); // Get the target section id
          const targetElement = document.querySelector(targetId); // Select the target element

          // Scroll to the target element smoothly
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
          }

          toggleMenu(); // Close the menu after clicking a link
      });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !hamburger.contains(event.target) && nav.classList.contains('show')) {
          toggleMenu()
      }
  });
})();
