(function() {
  // Get the nav element
  const nav = document.querySelector('.nav')
  const navButton = document.getElementById('nav-button')
  const navMenu = document.querySelector('.nav ul')

  let lastScrollY = window.scrollY
  let isMouseInNav = false

  navButton.addEventListener('click', function() {
    // Toggle the 'open' class on the ul
    navMenu.classList.toggle('open')
  })

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

  // Add scroll event listener to the window object
  window.addEventListener('scroll', handleScroll)

  // Add an event listener to the window object to detect mouse movement
  window.addEventListener('mousemove', e => {
    const y = e.clientY
    const navRect = nav.getBoundingClientRect()

    // Check if the mouse is within the nav area
    isMouseInNav = y >= navRect.top && y <= navRect.bottom;

    if (isMouseInNav) {
      nav.classList.remove('hidden')
    }
  });

  // Prevent nav from hiding when the mouse enters the nav area
  nav.addEventListener('mouseenter', () => {
    isMouseInNav = true
    nav.classList.remove('hidden')
  });

  // Allow nav to hide when the mouse leaves the nav area
  nav.addEventListener('mouseleave', () => {
    isMouseInNav = false
  })

  // Initial check for .dark class
  if (window.scrollY > 0) {
    nav.classList.add('dark');
  }
})()