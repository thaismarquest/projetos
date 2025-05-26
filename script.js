$(window).ready(function() {
  // Get the container dimensions
  const container = $('.container');
  const containerWidth = container.width();
  const containerHeight = container.height();

  $('.flipbook').turn({
    width: containerWidth,
    height: containerHeight,
    autoCenter: true,
    gradients: true,
    acceleration: true,
    page: 1,
    display: 'single', // Show only one page at a time
    when: {
      turning: function(event, page, pageObject) {
        console.log('turning to page ' + page);
      },
      turned: function(event, page, pageObject) {
        console.log('now on page ' + page);
      }
    }
  });

  // Keyboard navigation
  $(document).keydown(function(e) {
    if (e.keyCode == 37) {
      $('.flipbook').turn('previous');
      e.preventDefault();
    } else if (e.keyCode == 39) {
      $('.flipbook').turn('next');
      e.preventDefault();
    }
  });

  // Touch swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  document.querySelector('.flipbook').addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  document.querySelector('.flipbook').addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        $('.flipbook').turn('previous');
      } else {
        $('.flipbook').turn('next');
      }
    }
  }

  // Handle window resize
  $(window).resize(function() {
    const width = container.width();
    const height = container.height();
    $('.flipbook').turn('size', width, height);
  });
});
