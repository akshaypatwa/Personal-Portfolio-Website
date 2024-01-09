$(document).ready(function() {
  var typed = new Typed('#typed-text', {
    strings: ['SERVICENOW ITSM', 'SERVICENOW CMDB','SERVICENOW DISCOVERY','SERVICENOW INTEGRATIONS','SERVICENOW SecOps','SERVICENOW GRC','SERVICENOW SERVICE PORTAL'],
    typeSpeed: 20, 
    backSpeed: 20, 
    backDelay: 500, 
    startDelay: 100, 
    loop: true, 
    showCursor: false,
    cursorChar: '|', 
    cursorColor: 'white', 
    OnComplete: function(self)
    {
      self.cursor.style.display = 'inline-block';
    },
  });

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

  // contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyvMIN1XY3bYoRRvhwUID42F8deSwY8e_OVYZW2Wrp9UD8ms8FbXumhnaeFRP4rB5kYSA/exec';
  const form = document.forms['contact-form']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            if (response.ok) {
                // Form submission successful, redirect to another page
                window.location.href = 'https://akshaypatwa.github.io/Personal-Portfolio-Website/';
            }
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "Error submitting the form";
        });
        
});
   
  $(document).ready(function() {
    $(window).scroll(function() {
        // Check if the skills section is in the viewport
        var skillsSection = $('.skills-section');
        if (isElementInViewport(skillsSection)) {
            // Animate the progress bars
            $('.progress').each(function() {
                var completion = $(this).data('completion');
                $(this).css('width', completion);
            });
        }
    });
});

function isElementInViewport(el) {
    var rect = el[0].getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}


  });

  function isElementInViewport(el) {
    var rect = el[0].getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
