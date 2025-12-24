"use client";

import { useEffect } from 'react';

/**
 * ResponsiveEmbeds
 * This component finds all iframes within elements with the .prose class 
 * and wraps them in a responsive aspect-ratio container.
 */
export default function ResponsiveEmbeds() {
  useEffect(() => {
    // Look for all iframes within .prose content
    const allIframes = document.querySelectorAll('.prose iframe');

    allIframes.forEach((iframe) => {
      // Prevent double wrapping
      if (iframe.parentNode && iframe.parentNode.classList.contains('aspect-video')) return;
      
      // Remove fixed dimensions
      iframe.removeAttribute('width');
      iframe.removeAttribute('height');
      
      // Create the responsive wrapper (Magic Box)
      const wrapper = document.createElement('div');
      // Added 'relative' and 'overflow-hidden' to ensure absolute positioning of iframe works correctly
      wrapper.className = 'aspect-video w-full my-6 relative overflow-hidden';

      // Insert wrapper before iframe and then move iframe into it
      if (iframe.parentNode) {
        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);
        
        // Make iframe fill the wrapper completely
        iframe.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'border-0');
      }
    });
  }, []);

  return null;
}