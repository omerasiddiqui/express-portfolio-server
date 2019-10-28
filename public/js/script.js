/////////////////////////////////
//           wow.js          ///
///////////////////////////////

const wow = new WOW(
    {
        animateClass: 'animated',
        offset: 30,
        mobile: false,
        live: false
    }
)

wow.init();

/////////////////////////////////
//        smooth scroll      ///
///////////////////////////////

$('.smooth').smoothScroll({
    offset: -5,
    speed: 1000
  });

/////////////////////////////////
//   remove hover on mobile  ///
///////////////////////////////

function hasTouch() {
    return 'ontouchstart' in document.documentElement
           || navigator.maxTouchPoints > 0
           || navigator.msMaxTouchPoints > 0;
}

if (hasTouch()) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
}

/////////////////////////////////
//        skills modal       ///
///////////////////////////////

const open = $('#modal-open');
const close = $('#modal-exit');

const skills = $('#skills');

open.on("click", function() {
    skills.removeClass('visually-hidden zoomOutRight').addClass('animated zoomInLeft');
})

close.on("click", function() {
    skills.removeClass('zoomInLeft').addClass('animated zoomOutRight');
    setTimeout(function() {
        skills.addClass('visually-hidden');
    }, 700)
})

////////////
const api_key = 'AIzaSyC1enG5_1nkoR0vCWS3N3RGpDEuyfcfPeQ';
const url = `https://www.googleapis.com/books/v1/volumes?q=dorian+inauthor:wilde&key=${api_key}`;

let bookObj = null;

$.ajax({
    url: url,
    type: "GET",
    contentType: "application/json",
    success: function(data) {
        console.log(data);
        bookObj = data;
    },
    error: function(xhr, text, err) {
          console.log('error: ',err);
            console.log('text: ', text);
             console.log('xhr: ',xhr);
    }	
})

