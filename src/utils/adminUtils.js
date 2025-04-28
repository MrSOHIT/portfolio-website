// src/utils/adminUtils.js
/**
 * Format date to a readable string
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  /**
   * Validate an email address format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether the email is valid
   */
  export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} - Whether the URL is valid
   */
  export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };
  
  /**
   * Truncate text to a specific length with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} - Truncated text
   */
  export const truncateText = (text, length = 100) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };