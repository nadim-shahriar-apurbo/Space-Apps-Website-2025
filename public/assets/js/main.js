/**
 * STELLAR STORIES - MAIN JAVASCRIPT FILE
 * 
 * Simplified version containing only essential functionality:
 * - Hero section navigation
 * - System items interaction (CME, Solar Flare, Solar Storm, Aurora)
 * - Tab functionality for system details
 * - Animation controls
 * - Preloader
 */

// Wait for DOM to be ready before accessing elements
document.addEventListener('DOMContentLoaded', function() {

// ============================================================================
// DOM ELEMENT SELECTION
// ============================================================================
// Select all the main DOM elements we'll be working with

const hero = document.querySelector(".hero-content");

// Check if hero element exists before proceeding
if (!hero) {
    return; // Exit early if we're not on the main page
}

// Main interactive elements
const expBtn = hero.querySelector(".explore-btn");
const systemItem = hero.querySelectorAll(".system-list-item"); // CME, Solar Flare, Solar Storm, Aurora items
const systemTabs = hero.querySelectorAll(".system-tab");        // Content tabs for each system
const featureTabs = hero.querySelectorAll(".feature-tab");      // Main feature tab container

// ============================================================================
// EXPLORE BUTTON FUNCTIONALITY
// ============================================================================
// When user clicks "Explore Stellar Chronicles" button, take them directly 
// to the system view (CME, Solar Flare, Solar Storm, Aurora)

expBtn.addEventListener("click", () => {
  // Clear any existing active states
  for (let i = 0; i < featureTabs.length; i++) {
    featureTabs[i].classList.remove("active");
  }
  
  // Activate the system view with smooth animations
  if (featureTabs.length > 0) {
    featureTabs[0].classList.add("active");
    hero.classList.add("animation-1");  // First animation phase
    
    // Small delay for smooth transition to second animation phase
    setTimeout(() => {
      hero.classList.add("animation-2");  // Second animation phase
    }, 100);
  }
});

// ============================================================================
// HOME BUTTON & RESET FUNCTIONALITY
// ============================================================================
// Handle returning to the main landing page and resetting all animations

// homeBtn.addEventListener("click", () => {
//   hero.classList.remove("animation-1");
//   resetWebAnimation();
// });

/**
 * Reset all animations and active states back to initial landing page
 * This function cleans up all CSS classes that control various animations
 * and active states throughout the application
 */
function resetWebAnimation() {
  // Remove all animation classes
  hero.classList.remove("animation-2");
  hero.classList.remove("animation-3");
  hero.classList.remove("animation-earth");
  hero.classList.remove("animation-system");
  hero.classList.remove("animation-connection");

  // Reset all system items (CME, Solar Flare, etc.) to inactive state
  for (let i = 0; i < systemItem.length; i++) {
    systemItem[i].classList.remove("active");
  }

  // Reset all feature tabs to inactive state
  for (let i = 0; i < featureTabs.length; i++) {
    featureTabs[i].classList.remove("active");
  }
}

// ============================================================================
// SYSTEM ITEMS INTERACTION (CME, Solar Flare, Solar Storm, Aurora)
// ============================================================================
// Handle clicking on individual system items to show detailed information
// Each system has its own tab with details and gallery sections

systemItem.forEach((item, index) => {
  item.addEventListener("click", () => {
    // First, deactivate all system items and tabs
    for (let i = 0; i < systemItem.length; i++) {
      systemItem[i].classList.remove("active");
    }
    for (let i = 0; i < systemTabs.length; i++) {
      systemTabs[i].classList.remove("active");
    }
    
    // Activate the clicked item and its corresponding tab
    systemTabs[index].classList.add("active");  // Show content for this system
    item.classList.add("active");               // Highlight the clicked item
    hero.classList.add("animation-system");     // Trigger system view animation
  });
});

// ============================================================================
// TAB FUNCTIONALITY FOR SYSTEM DETAILS/GALLERY
// ============================================================================
// Handle Details/Gallery tabs within each system

/**
 * Generic tab function - handles switching between tab panels
 * @param {NodeList} tabLinks - The clickable tab buttons
 * @param {NodeList} tabs - The content panels to show/hide
 */
function tabFunc(tabLinks, tabs) {
  tabLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
      // Deactivate all tabs and their content
      for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
        tabs[i].classList.remove("active");
      }
      
      // Activate the clicked tab and its content
      link.classList.add("active");
      tabs[index].classList.add("active");
    });
  });
}

// Initialize tab functionality for system tabs (Details/Gallery tabs within each system)
systemTabs.forEach((wrap) => {
  tabFunc(
    wrap.querySelectorAll(".system-inner-tab-links li"),    // Tab buttons (Details, Gallery)
    wrap.querySelectorAll(".system-inner-tab")              // Tab content panels
  );
});

// ============================================================================
// PAGE LOADING COMPONENTS
// ============================================================================

//========== PRELOADER ==========
// Remove preloader when page is fully loaded
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

//========== HEADER REMOVED ==========

// ============================================================================
// END OF MAIN JAVASCRIPT FILE
// ============================================================================

}); // End of DOMContentLoaded event listener