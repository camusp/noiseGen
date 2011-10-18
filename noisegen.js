(function($) {
  return $.fn.noiseGen = function(options) {
    var defaultOptions = {
      width: 32,
      height: 32,
      opacity: 0.2,
      fallbackImage: false,
      depth: 60
    },
    canvas = document.createElement("canvas"),
    options = $.extend(defaultOptions, options);
    if (!canvas.getContext || !canvas.getContext("2d")) {
      // Canvas not supported :(
      if (!!options.fallbackImage) {
        // Fallback image provided, set it as background
        return this.css("background-image", "url(" + options.fallbackImage + ")");
      } else {
        // Fallback background image not provided, just return maintaining chainability
        return this;
      }
    } else {
      // Canvas supported :)
      var ctx = canvas.getContext("2d"),
      x = 0,
      y = 0;
      canvas.width = options.width;
      canvas.height = options.height;
      while (x < canvas.width) {
        y = 0;
        while (y < canvas.height) {
          number = Math.floor(Math.random() * options.depth);
          ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + options.opacity + ")";
          ctx.fillRect(x, y, 1, 1);
          y++;
        }
        x++;
      }
      return this.css("background-image", "url(" + canvas.toDataURL("image/png") + ")");
    }
  };
})(jQuery);