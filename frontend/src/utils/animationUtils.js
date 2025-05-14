/**
 * Initializes scroll reveal animations using Intersection Observer
 * Call this function in the useEffect of components where you want to enable scroll animations
 */
export function initScrollRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, 
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  // Return a cleanup function
  return () => {
    revealElements.forEach(element => {
      revealObserver.unobserve(element);
    });
  };
}

/**
 * Creates a staggered animation delay for child elements
 * @param {number} baseDelay - Base delay in milliseconds
 * @param {number} increment - Increment per element in milliseconds
 * @param {number} maxItems - Maximum number of items to apply delays to
 * @returns {Array} - Array of animation delay styles
 */
export function createStaggeredDelays(baseDelay = 100, increment = 100, maxItems = 10) {
  const delays = [];
  
  for (let i = 0; i < maxItems; i++) {
    const delay = baseDelay + (i * increment);
    delays.push({ animationDelay: `${delay}ms` });
  }
  
  return delays;
}

/**
 * Adds animated gradient effect to an element
 * @param {string} elementSelector - CSS selector for the element
 * @param {Array} colors - Array of color values for the gradient
 * @param {number} duration - Animation duration in seconds
 */
export function addAnimatedGradient(elementSelector, colors = ['#3b82f6', '#4f46e5', '#3b82f6'], duration = 5) {
  const element = document.querySelector(elementSelector);
  if (!element) return;
  
  element.style.background = `linear-gradient(90deg, ${colors.join(', ')})`;
  element.style.backgroundSize = '200% 200%';
  element.style.animation = `gradient ${duration}s ease infinite`;
}

/**
 * Creates a ripple effect on button click
 * Add this as an onClick handler for buttons with position: relative and overflow: hidden
 * @param {Event} event - The click event
 */
export function createRippleEffect(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.querySelector('.ripple');
  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
} 