// src/utils/scrollUtils.js
/**
 * Scrolls to an element with the specified ID with a smooth animation
 * @param {string} id - The ID of the element to scroll to
 * @param {object} options - Scroll options
 */
export const scrollToElement = (id, options = {}) => {
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
    };
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        ...defaultOptions,
        ...options,
      });
    }
  };
  
  /**
   * Get the section that's currently in view
   * @param {Array} sections - Array of section IDs to check
   * @returns {string} - The ID of the section currently in view
   */
  export const getCurrentSection = (sections) => {
    const scrollPosition = window.scrollY + 100; // Add offset for navbar
  
    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;
      
      const offsetTop = element.offsetTop;
      const offsetBottom = offsetTop + element.offsetHeight;
      
      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        return section;
      }
    }
    
    // Default to first section if none are in view
    return sections[0];
  };
  