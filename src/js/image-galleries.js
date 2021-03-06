/**
 * Variant on the carousel function. Creates very simple carousels used for small image galleries.
 *
 * @type {{init: RCDL.features.ImageGallery.init, create: RCDL.features.ImageGallery.create, wrapAndRemoveDots: RCDL.features.ImageGallery.wrapAndRemoveDots}}
 */
RCDL.features.ImageGallery = {
  init: function (targetClass, options) {
    'use strict';

    var imageGalleries = document.querySelectorAll(targetClass);

    if (imageGalleries !== null && Object.keys(imageGalleries).length > 0) {
      if (Object.keys(imageGalleries).length > 1) {
        Object.keys(imageGalleries).forEach(function (imageGallery) {
          RCDL.features.Carousel.create(imageGalleries[imageGallery], options);
          RCDL.features.ImageGallery.wrapAndRemoveDots(imageGalleries[imageGallery].parentNode.parentNode);
        });
      }
      else {
        RCDL.features.ImageGallery.create(imageGalleries[0], options);
        RCDL.features.ImageGallery.wrapAndRemoveDots(imageGalleries[0]);
      }
    }
  },

  /**
   * Create an image gallery carousel from the supplied node item.
   *
   * @param {Node} imageGallery
   * Node item for converting.
   *
   * @param {Object} options
   * Object with options for tiny slider library.
   */
  create: function (imageGallery, options) {
    'use strict';

    options = typeof options === 'object' ? options : {
      container: imageGallery,
      items: 1,
      slideBy: 'page',
      autoplay: true,
      controlsText: [
        '<span class="navigation--prev"><span class="screen-reader-text">Previous</span></span>',
        '<span class="navigation--next"><span class="screen-reader-text">Next</span></span>'
      ],
      touch: true,
      autoplayTimeout: 4000,
      speed: 500
    };

    tns(options);
  },

  /**
   * With the lack of programmatic enable/disable of UI dots we have to remove these manually.
   *
   * @param {Node} item
   * Node item to have dots removed.
   */
  wrapAndRemoveDots: function (item) {
    'use strict';
    // Create an element to wrap the gallery with so we can easily target it later.
    // TNS wraps the markup so this is required to restrict the width etc.
    var wrapper = document.createElement('div');
    wrapper.classList.add('gallery-wrapper');
    RCDL.utilities.wrap(item.parentNode.parentNode, wrapper);

    var pager = item.parentNode.parentNode.querySelectorAll('[aria-label="Carousel Pagination"]');
    pager[0].parentNode.removeChild(pager[0]);

    // Trigger resize to make sure the gallery adjusts to the correct size.
    RCDL.utilities.triggerResize();
  }
};

RCDL.ready(RCDL.features.ImageGallery.init('.rc-carousel--gallery'));
