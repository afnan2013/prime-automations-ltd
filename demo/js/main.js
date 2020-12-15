var scroll = document.getElementById("scrollUp");

scroll.addEventListener('click', (e) => { // scroll to top
    e.preventDefault();
    $('html, body').animate({scrollTop:0}, 'slow');
        return false;
});

db.collection('settings').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    snapshot.docs.forEach(doc => {

        // Show tittle in tittle section from firestore
        var tittle_section = doc.data().tittle;
        $("#tittle").append(tittle_section);

        // Show Main tittle from firestore
        $("#company_tittle").append('<span class="js-count-particles"><p>'
                                    + tittle_section +'</p></span>');
        
        // Show Banner text from firestore
        $("#exploreSite").append(doc.data().banner);

        // Show Email and Mobile in a Div from firestore
        var email_text = doc.data().email;
        var mobile_text = doc.data().mobile;
        $("#email_mobile_div").append('<span id="info-email">'+email_text+'</span> <a href="'
                                        + mobile_text +'"><span>'+ mobile_text +'</span></a>');

        // Show About data from firestore
        $("#about_para").append(doc.data().about);

        // Show Video in iframe from firestore
        $("#video_div").append('<iframe width="100%" height="500px" src="'+doc.data().video
        + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;'
        + 'gyroscope; picture-in-picture" allowfullscreen></iframe>');

        // Show Address, Email, Mobile No of contact section from firestore
        $("#contact_div").append('<h1>'+doc.data().address+'</h1><h2>'
                                + doc.data().fullAddress +'</h2><h2>'
                                +email_text+'<br>'+mobile_text+'</h2>');

        // Add facebook, twitter, youtube, whatsapp link from firestore
        $("#testimonials").append("<a href='#' onclick=window.open('"+doc.data().facebook+'\')>'
                                + "<img src='images/logo-fb.PNG'></a>"
                                + "<a href='#' onclick=window.open('"+doc.data().twitter+'\')>'
                                + "<img src='images/logo-twit.PNG'></a>"
                                + "<a href='#' onclick=window.open('"+doc.data().youtube+'\')>'
                                + "<img src='images/logo-yt.PNG'></a>"
                                + "<a href='#' onclick=window.open('"+doc.data().whatsapp+'\')>'
                                + "<img src='images/logo-wa.PNG'></a>");

        // Show Copyright Text from firestore
        $("#copyright_text").append(doc.data().copyright);
    });
});

// Slider Show from Firestore
var flag = 1; // is used to separate class of active and not active class
db.collection('sliders').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    
    snapshot.docs.forEach(doc => {
        
        var image = doc.data().slider;
        // For first image classs is 'item active'
        if(flag == 1) {
            var imageName = '<div class="item active">'  
                            + '<img src="images/' + image + '"alt="...">'
                            + '<div class="carousel-caption">...</div>'
                            + '</div>';
        } else { // For first image classs is 'item'
            var imageName = '<div class="item">'  
                            + '<img src="images/' + image + '"alt="...">'
                            + '<div class="carousel-caption">...</div>'
                            + '</div>';}
        $("#catousel_div").append(imageName);
        flag = 0;
        
    });
});

// Show ALL Brands from firestore
db.collection('brands').orderBy('image').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    snapshot.docs.forEach(doc => {

       var brand = '<div class="column">'
                       + '<img src="images/' 
                       + doc.data().image + '" alt="Picture of Restaurent"></div>';

       $("#brandLogo").append(brand);
        
    });
});

// Show ALL Products from firestore
var number = 1; // is used for image & description combination
db.collection('products').orderBy('image').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    snapshot.docs.forEach(doc => {

    var isOdd = number % 2 == 1;
    var desp = doc.data().description;
    var image = doc.data().image;
    var imageString = '<div class="col-md-6 col-sm-6">'
                    + '<img src="images/' + image + '">'
                    + '</div>';
    var despString = '<div class="col-md-6 col-sm-6 productDetails">'
                    + '<p>' + desp + '</p>'
                    + '</div>';
    var image_and_desp_string =       
   '<div class="row">'
     + (isOdd ? despString : imageString)  //show value first image then description
     + (isOdd ? imageString : despString)   //show value first description then image
     + '</div>';

    $("#product_div").append(image_and_desp_string);
    number = number + 1; // to get different combination of image and description
    });
});

// Show ALL Services One by One from firestore
db.collection('services').orderBy('image').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    snapshot.docs.forEach(doc => {

       var serviceString = '<div class="col-md-3 column">'
                            +'<img src="images/'+ doc.data().image +'" class="img-responsive">'
                            +'<h2>'+doc.data().heading+'</h2>'
                            +'<p>'+doc.data().details+'</p></div>';

       $("#service_div").append(serviceString);
        
    });
});

// Show ALL Clients One by One from firestore
db.collection('clients').onSnapshot((snapshot) => {
    //insertHtml("#main-content", response);
    snapshot.docs.forEach(doc => {

       $("#client_para").append(doc.data().details);
        
    });
});

// Add animation in different section
const particles = document.querySelector("#particles-js");
const tittle = document.querySelector("#company_tittle");
const logoImage = document.querySelector("#sitelogo");
const siteText = document.querySelector("#exploreSite");
const about = document.querySelector("#aboutSection");
const brand = document.querySelector("#brandSection");
const client = document.querySelector("#clientSection");

// object of animation script
const t1 = new TimelineMax();

t1.fromTo(particles, 1, { x:"-90%" }, { x: "0%", ease: Power2.easeInOut })
.fromTo(tittle, 1.5, { y:"-100%" }, { y: "0%", ease: Power2.easeInOut })
.fromTo(logoImage, 1.2, { y:"-40%" }, { y: "0%", ease: Power2.easeInOut })
.fromTo(siteText, 1.2, { y:"-100%" }, { y: "0%", ease: Power2.easeInOut }, "-=1.2");

// Animation occure when particular section is reached
scrolledDown = false;
$(window).scroll(function () {

    // scrollUp Button appare, after some scrolling
    var current = $(this).scrollTop();
    if(current > 250) {
        document.getElementById("scrollUp").style.display = "block";
    } else {
        document.getElementById("scrollUp").style.display = "none";
    }

    // when about section is on view
    if ($(this).scrollTop() >= (about.offsetWidth-250) && !scrolledDown) {
        t1.fromTo(about, 1.2, { y:"45%", opacity: 0 }, { y: "0%", opacity: 1 });
        scrolledDown = true;
    }

});