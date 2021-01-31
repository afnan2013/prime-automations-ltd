(function ($) {
  // USE STRICT
  "use strict";

  // Dropdown 
  try {
    var menu = $('.js-item-menu');
    var sub_menu_is_showed = -1;

    for (var i = 0; i < menu.length; i++) {
      $(menu[i]).on('click', function (e) {
        e.preventDefault();
        $('.js-right-sidebar').removeClass("show-sidebar");        
        if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = -1;
        }
        else {
          for (var i = 0; i < menu.length; i++) {
            $(menu[i]).removeClass("show-dropdown");
          }
          $(this).toggleClass('show-dropdown');
          sub_menu_is_showed = jQuery.inArray(this, menu);
        }
      });
    }
    $(".js-item-menu, .js-dropdown").click(function (event) {
      event.stopPropagation();
    });

    $("body,html").on("click", function () {
      for (var i = 0; i < menu.length; i++) {
        menu[i].classList.remove("show-dropdown");
      }
      sub_menu_is_showed = -1;
    });

  } catch (error) {
    console.log(error);
  }

  


  try {
    // Hamburger Menu
    $('.hamburger').on('click', function () {
      $(this).toggleClass('is-active');
      $('.navbar-mobile').slideToggle('500');
    });
    $('.navbar-mobile__list li.has-dropdown > a').on('click', function () {
      var dropdown = $(this).siblings('ul.navbar-mobile__dropdown');
      $(this).toggleClass('active');
      $(dropdown).slideToggle('500');
      return false;
    });
  } catch (error) {
    console.log(error);
  }
})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  // Load more
  try {
    var list_load = $('.js-list-load');
    if (list_load[0]) {
      list_load.each(function () {
        var that = $(this);
        that.find('.js-load-item').hide();
        var load_btn = that.find('.js-load-btn');
        load_btn.on('click', function (e) {
          $(this).text("Loading...").delay(1500).queue(function (next) {
            $(this).hide();
            that.find(".js-load-item").fadeToggle("slow", 'swing');
          });
          e.preventDefault();
        });
      })

    }
  } catch (error) {
    console.log(error);
  }

})(jQuery);
(function ($) {
  // USE STRICT
  "use strict";

  try {
    
    $('[data-toggle="tooltip"]').tooltip();

  } catch (error) {
    console.log(error);
  }

  // Chatbox
  try {
    var inbox_wrap = $('.js-inbox');
    var message = $('.au-message__item');
    message.each(function(){
      var that = $(this);

      that.on('click', function(){
        $(this).parent().parent().parent().toggleClass('show-chat-box');
      });
    });
    

  } catch (error) {
    console.log(error);
  }

})(jQuery);


  // -------------------------------------------------------------------------------------------------------------------------------
//************** all the EventListener of This Admin Panel Is written here
(function (global){

  // *******************************************//
  //     Imortant File Locations of Snippets               
  //********************************************//
  // pal means Prime Automation Ltd
  var pal = {};

  var addServiceHtml = "snippets/add-service-snippet.html";
  var allServiceListHtml = "snippets/service-list-snippet.html";
  var updateServiceHtml = "snippets/update-service-snippet.html";

  var addProductHtml = "snippets/add-product-snippet.html";
  var allProductListHtml = "snippets/product-list-snippet.html";
  var updateProductHtml = "snippets/update-product-snippet.html";

  var addBrandHtml = "snippets/add-brand-snippet.html";
  var allBrandListHtml = "snippets/brand-list-snippet.html";

  var aboutHtml = "snippets/about-snippet.html";
  var addSliderImagesHtml = "snippets/add-slider-image-snippet.html";
  var allSliderImageListHtml = "snippets/slider-image-list-snippet.html";
 
  var dashboardHtml = "snippets/dashboard-snippet.html"; 

  // Convenience function for inserting innerHTML for 'select'
  function insertHtml(selector, html) {
    var targetElement = document.querySelector(selector);
    targetElement.innerHTML = html;
  }

  // Show loading icon inside element identified by 'selector'.
  function showLoader(selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  }

  // Return substitute of '{{propName}}'
  // with propValue in given 'string'
  function insertProperty(string, propName, propValue) {
    var propToReplace = "{{" + propName +"}}";
    string = string.replace(new RegExp(propToReplace, 'g'), propValue);
    return string;
  }

  // -------------------------------------------------------------------------------------------------------------------------------
  // *******************************************//
  //          Dashboard Section JS Starts               
  //********************************************//
  //**** Loading the Dashboad Section Starts ***** 
  pal.loadDashboardSection = () => {
    // On first load, show loader view
    showLoader("#main-content");
    // Load dashboard snippet
    $ajaxUtils.sendGetRequest(dashboardHtml, function (response){
      //Real-Time Data from firebase db => put settings data in all input fields
      db.collection('settings').onSnapshot((snapshot) => {
        // inserting the dashboard full template before updating values  
        insertHtml("#main-content", response);
        snapshot.docs.forEach(doc => {
          var title_input = document.getElementById("settings_title");
          var banner_input = document.getElementById("settings_bannerText");
          var address_input = document.getElementById("settings_address");
          var fulladdress_input = document.getElementById("settings_fullAddress");
          var email_input = document.getElementById("settings_email");
          var mobile_input = document.getElementById("settings_mobile");
          var copyright_input = document.getElementById("settings_copyright");
      
          title_input.value = doc.data().title;
          banner_input.value = doc.data().banner;
          address_input.value = doc.data().address;
          fulladdress_input.value = doc.data().fullAddress;
          email_input.value = doc.data().email;
          mobile_input.value = doc.data().mobile;
          copyright_input.value = doc.data().copyright;
          updateSettings(doc.id);
          });
      });
      
    }, false);

    // function to update the about section textArea to firebase Db
    function updateSettings(id){
      const updateSettingsForm = document.querySelector("#update_settings_form");
      // Event for submiting the Add Product Form
      updateSettingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (confirm("Are you sure to update?")) {
          //console.log(inputImage.name);
          db.collection("settings").doc(id).update({ 
            title: updateSettingsForm['title'].value,
            banner: updateSettingsForm['bannerText'].value,
            address: updateSettingsForm['address'].value,
            fullAddress: updateSettingsForm['fullAddress'].value,
            email: updateSettingsForm['email'].value,
            mobile: updateSettingsForm['mobile'].value,
            copyright: updateSettingsForm['copyright'].value,
          }).then(function () {
            //alert("Yeah Updated!!");
          }).catch(function (error) {
            console.log('Update failed: ' + error.message);
          });
        }
      });
    }
  };
  // *******************************************//
  //          Dashboard Section JS Ends               
  //********************************************//
  // -------------------------------------------------------------------------------------------------------------------------------
  // *******************************************//
  //          About Section JS Starts               
  //********************************************//
  //**** Loading the About Section Starts ***** 
  pal.loadAboutSection = () => {
    // On first load, show loader view
    showLoader("#main-content");
    // Load about snippet
    $ajaxUtils.sendGetRequest(aboutHtml, buildAndShowAboutHTML , false);
  };

  function buildAndShowAboutHTML(aboutHtmlRes){

    $ajaxUtils.sendGetRequest(addSliderImagesHtml, function (addSliderImagesHtmlRes) {
      // Real-Time Data => retreiving about from firebase and store it in textArea
      db.collection('settings').onSnapshot((settings_snapshot) => {

        $ajaxUtils.sendGetRequest(allSliderImageListHtml, function (allSliderImageListHtmlRes) {

          db.collection('slider-images').orderBy('serial').onSnapshot((snapshot) => {
            var aboutAndSliderImageListViewHtml = buildAboutAndSliderImageListViewHtml(snapshot, aboutHtmlRes, addSliderImagesHtmlRes, allSliderImageListHtmlRes);

            insertHtml("#main-content", aboutAndSliderImageListViewHtml);
            settings_snapshot.docs.forEach(doc => {
              var aboutTextArea = document.getElementById("aboutSectionTextArea");
              var aboutVideoLink = document.getElementById("aboutSectionVideo");
              aboutTextArea.value = doc.data().about;
              aboutVideoLink.value = doc.data().video;
              updateAboutText(doc.id);
            });
          });
        }, false);
      });
    } , false);
  }

  function buildAboutAndSliderImageListViewHtml(snapshot, aboutHtmlRes, addSliderImagesHtmlRes, allSliderImageListHtmlRes){
    var finalHtml = aboutHtmlRes + addSliderImagesHtmlRes;
    finalHtml += '<div id="sliderListSection" class="container"><section class="row">';

    snapshot.docs.forEach(doc => {
      //console.log(doc.data().name);
      //if (snap.type == 'added'){
        var html = allSliderImageListHtmlRes;
        //console.log(snap.doc.data().imageUrl);
        html = insertProperty(html, "name", doc.data().name);
        html = insertProperty(html, "imageUrl", doc.data().imageUrl); 
        html = insertProperty(html, "imageId", doc.id);
      //}
      console.log(html);
      finalHtml += html;
    });

    finalHtml += '</section></div>';

    return finalHtml;
  }
  //**** Loading the about Section Ends ***** 

  // function to update the about section textArea to firebase Db
  function updateAboutText(id){
    const updateAboutTextForm = document.querySelector("#update_about_texarea_form");
    // Event for submiting the Add Product Form
    updateAboutTextForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (confirm("Are you sure to update?")) {
        const aboutSectionTextArea = updateAboutTextForm['aboutSectionTextArea'].value;
        const aboutSectionVideo = updateAboutTextForm['aboutSectionVideo'].value;
        //console.log(inputImage.name);
        db.collection("settings").doc(id).update({ 
          about: aboutSectionTextArea,
          video: aboutSectionVideo
        }).then(function () {
          //alert("Yeah Updated!!");
        }).catch(function (error) {
          console.log('Update failed: ' + error.message);
        });
      }
    });
  }
  

  // Addition of a product to the FireBase FireStore and Stores the image in the Storage
  pal.addMoreSliderImage = () => {
    document.getElementById("slider_image_add_form").style.display = "block";
    const sliderImageAddForm = document.querySelector("#slider_image_add_form");

    // Event for submiting the Add Product Form
    sliderImageAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const imageName = sliderImageAddForm['imageNameSlider'].value;
      const imageStatus = sliderImageAddForm['imageStatusSlider'].value;
      const imageSerial = sliderImageAddForm['imageSerialSlider'].value;
      const inputImage = document.getElementById('inputFileSlider').files[0];

      const fileName = new Date() + "-"+ inputImage.name; 
      console.log(inputImage.name);

      const metaData = {
        contentType: inputImage.type
      }

      storage.child(fileName).put(inputImage, metaData)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          //console.log(url);
          db.collection('slider-images').add({
            name: imageName,
            status: imageStatus,
            serial: imageSerial,
            imageUrl: url
          }).then(() => {
            sliderImageAddForm.reset();
            document.getElementById("slider_image_add_form").style.display = "none";
            //alert("Image Upload Successful");
          });
          
        });
    });
  };

  // *******************************************//
  //          About Section JS Ends               
  //********************************************//
  // -------------------------------------------------------------------------------------------------------------------------------
  // *******************************************//
  //          Product Section JS Starts               
  //********************************************//
  //**** Loading the product Section Starts ***** 
  pal.loadProductSection = () => {
    // On first load, show home view
    showLoader("#main-content");
    // Load add product snippet
    $ajaxUtils.sendGetRequest(addProductHtml, buildAndShowProductsHTML, false);
  };

  function buildAndShowProductsHTML(addProductHtmlRes){
    // Retrieving Real-time Data All Product Lists From firebase firestore db
    db.collection('products').orderBy('name').onSnapshot((snapshot) => {
      //console.log(snapshot);
      //let changes = snapshot.docChanges();
      //console.log(changes);
      // Retrieve single product snippet
      $ajaxUtils.sendGetRequest(allProductListHtml, 
        function (allProductListHtmlRes) {
          // Switch CSS class active to menu button
          //switchMenuToActive(); updateProductHtml
          $ajaxUtils.sendGetRequest(updateProductHtml, function(updateProductHtmlRes) {
            var productListViewHtml = buildProductListViewHtml(snapshot, addProductHtmlRes, allProductListHtmlRes, updateProductHtmlRes);
            insertHtml("#main-content", productListViewHtml);
          }, false);
          
      }, false);
    });
  }

  function buildProductListViewHtml(snapshot, addProductHtmlRes, allProductListHtmlRes, updateProductHtmlRes){
    var finalHtml = addProductHtmlRes;
    finalHtml += '<div id="productListSection" class="container"><section class="row">';
    
    snapshot.docs.forEach(doc => {
      console.log(doc.id);
      //if (snap.type == 'added'){
        var html = allProductListHtmlRes;
        //console.log(snap.doc.data().imageUrl);
        html = insertProperty(html, "name", doc.data().name);
        html = insertProperty(html, "imageUrl", doc.data().imageUrl); 
        html = insertProperty(html, "productId", doc.id);
      //}
      finalHtml += html;
    });

    finalHtml += '</section></div>';
    finalHtml+= updateProductHtmlRes;

    return finalHtml;
  }

  //**** Loading the product Section Ends ***** 

  // Addition of a product to the FireBase FireStore and Stores the image in the Storage
  pal.addMoreProduct = () => {
    document.getElementById("product_add_form").style.display = "block";
    const productAddForm = document.querySelector("#product_add_form");

    // Event for submiting the Add Product Form
    productAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const productName = productAddForm['productName'].value;
      const productDesc = productAddForm['productDesc'].value;
      const inputImage = document.getElementById('inputFile').files[0];

      const fileName = new Date() + "-"+ inputImage.name; 
      console.log(inputImage.name);

      const metaData = {
        contentType: inputImage.type
      }

      storage.child(fileName).put(inputImage, metaData)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          //console.log(url);
          db.collection('products').add({
            name: productName,
            description: productDesc,
            imageUrl: url
          }).then(() => {
            productAddForm.reset();
            document.getElementById("product_add_form").style.display = "none";
            //alert("Image Upload Successful");
          });
          
        });
    });
  };

  // Update of a product to the FireBase FireStore and Stores the image in the Storage
  pal.updateProduct = (id) => {
    document.getElementById("product_update_form").style.display = "block";
    const productUpdateForm = document.querySelector("#product_update_form");
    window.scrollTo(0,document.body.scrollHeight);
    var imageName = document.getElementById("updateProductName");
    var imageDesc = document.getElementById("updateProductDesc");

  
    // show value of description and image in input field
    db.collection('products').doc(id).get().then((doc) => {
      
      imageName.value = doc.data().name;
      imageDesc.value = doc.data().description;
      
    });


    // Event for submiting the Add Product Form
    productUpdateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (confirm("Are you sure to update?")) {
        //console.log(inputImage.name);
        db.collection("products").doc(id).update({ 
          name: productUpdateForm['updateProductName'].value,
          description: productUpdateForm['updateProductDesc'].value

        }).then(function () {
          document.getElementById("product_update_form").style.display = "none";
          //alert("Yeah Updated!!");
        }).catch(function (error) {
          console.log('Update failed: ' + error.message);
        });
      }

    });
  };

  pal.deleteProduct = (productId) => {
    if (confirm("Are you sure to update?")) {
      db.collection('products').doc(productId).delete();
    }
  };

  // *******************************************//
  //          Product Section JS Ends               
  //********************************************//
  // -------------------------------------------------------------------------------------------------------------------------------

  // *******************************************//
  //          Brand Section JS Starts               
  //********************************************//
  //**** Loading the Brand Section Starts ***** 
  pal.loadBrandSection = () => {
    // On first load, show home view
    showLoader("#main-content");
    // Load add brand snippet
    $ajaxUtils.sendGetRequest(addBrandHtml, buildAndShowBrandsHTML, false);
  };

  function buildAndShowBrandsHTML(addBrandHtmlRes){
    // Retrieving Real-time Data All Brand Lists From firebase firestore db
    db.collection('brands').orderBy('name').onSnapshot((snapshot) => {
      //console.log(snapshot);
      //let changes = snapshot.docChanges();
      //console.log(changes);
      // Retrieve single brand snippet
      $ajaxUtils.sendGetRequest(allBrandListHtml, 
        function (allBrandListHtmlRes) {
          // Switch CSS class active to menu button
          //switchMenuToActive();
          var brandListViewHtml = buildBrandListViewHtml(snapshot, addBrandHtmlRes, allBrandListHtmlRes);
          insertHtml("#main-content", brandListViewHtml);
          
      }, false);
    });
  }

  function buildBrandListViewHtml(snapshot, addBrandHtmlRes, allBrandListHtmlRes){
    var finalHtml = addBrandHtmlRes;
    finalHtml += '<div class="container"><section class="row">';
    
    snapshot.docs.forEach(doc => {
      console.log(doc.id);
      //if (snap.type == 'added'){
        var html = allBrandListHtmlRes;
        //console.log(snap.doc.data().imageUrl);
        html = insertProperty(html, "name", doc.data().name);
        html = insertProperty(html, "imageUrl", doc.data().imageUrl); 
        html = insertProperty(html, "brandId", doc.id);
      //}
      finalHtml += html;
    });

    finalHtml += '</section></div>';

    return finalHtml;
  }

  //**** Loading the Brand Section Ends ***** 

  // Addition of a Brnad to the FireBase FireStore and Stores the image in the Storage
  pal.addMoreBrand = () => {
    document.getElementById("brand_add_form").style.display = "block";
    const brandAddForm = document.querySelector("#brand_add_form");

    // Event for submiting the Add Brnad Form
    brandAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const brandName = brandAddForm['brandName'].value;
      const brandDesc = brandAddForm['brandDesc'].value;
      const brandLink = brandAddForm['brandLink'].value;
      const brandSerial = brandAddForm['brandSerial'].value;
      const inputImage = document.getElementById('inputFile').files[0];

      const fileName = new Date() + "-"+ inputImage.name; 
      console.log(inputImage.name);

      const metaData = {
        contentType: inputImage.type
      }

      storage.child(fileName).put(inputImage, metaData)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          //console.log(url);
          db.collection('brands').add({
            name: brandName,
            description: brandDesc,
            link: brandLink,
            imageUrl: url,
            serial: brandSerial
          }).then(() => {
            productAddForm.reset();
            document.getElementById("brand_add_form").style.display = "none";
            //alert("Image Upload Successful");
          });
          
        });
    });
  };

  pal.deleteBrand = (brandId) => {
    if (confirm("Are you sure to update?")) {
      db.collection('brands').doc(brandId).delete();
    }
  };

  // *******************************************//
  //          Brand Section JS Ends               
  //********************************************//
  // -------------------------------------------------------------------------------------------------------------------------------
  // *******************************************//
  //          Servic Section JS Starts               
  //********************************************//
  pal.loadServicesSection = () => {
    // On first load, show home view
    showLoader("#main-content");
    // Load add product snippet
    $ajaxUtils.sendGetRequest(addServiceHtml, buildAndShowServicesHTML, false);
  };

  function buildAndShowServicesHTML(addServiceHtmlRes){
    // Retrieving Real-time Data All Product Lists From firebase firestore db
    db.collection('services').orderBy('name').onSnapshot((snapshot) => {
      //console.log(snapshot);
      //let changes = snapshot.docChanges();
      //console.log(changes);
      // Retrieve single product snippet
      $ajaxUtils.sendGetRequest(allServiceListHtml, 
        function (allServiceListHtmlRes) {
          // Switch CSS class active to menu button
          //switchMenuToActive(); updateProductHtml
          $ajaxUtils.sendGetRequest(updateServiceHtml, function(updateServiceHtmlRes) {
            var serviceListViewHtml = buildServiceListViewHtml(snapshot, addServiceHtmlRes, allServiceListHtmlRes, updateServiceHtmlRes);
            insertHtml("#main-content", serviceListViewHtml);
          }, false);
          
      }, false);
    });
  }


  function buildServiceListViewHtml(snapshot, addServiceHtmlRes, allServiceListHtmlRes, updateServiceHtmlRes){
    var finalHtml = addServiceHtmlRes;
    finalHtml += '<div id="servicetListSection" class="container"><section class="row">';
    
    snapshot.docs.forEach(doc => {
      console.log(doc.id);
      //if (snap.type == 'added'){
        var html = allServiceListHtmlRes;
        //console.log(snap.doc.data().imageUrl);
        html = insertProperty(html, "name", doc.data().name);
        html = insertProperty(html, "imageUrl", doc.data().imageUrl); 
        html = insertProperty(html, "serviceId", doc.id);
      //}
      finalHtml += html;
    });

    finalHtml += '</section></div>';
    finalHtml+= updateServiceHtmlRes;

    return finalHtml;
  }


  //**** Loading the Service Section Ends ***** 

  // Addition of a Service to the FireBase FireStore and Stores the image in the Storage
  pal.addMoreService = () => {
    document.getElementById("service_add_form").style.display = "block";
    const serviceAddForm = document.querySelector("#service_add_form");

    // Event for submiting the Add Product Form
    serviceAddForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const serviceSerial = serviceAddForm['serviceSerial'].value;
      const serviceName = serviceAddForm['serviceName'].value;
      const serviceDesc = serviceAddForm['serviceDesc'].value;
      const inputImage = document.getElementById('inputFile').files[0];

      const fileName = new Date() + "-"+ inputImage.name; 
      //console.log(inputImage.name);

      const metaData = {
        contentType: inputImage.type
      }

      storage.child(fileName).put(inputImage, metaData)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          //console.log(url);
          db.collection('services').add({
            serial: serviceSerial,
            name: serviceName,
            description: serviceDesc,
            imageUrl: url
          }).then(() => {
            serviceAddForm.reset();
            document.getElementById("service_add_form").style.display = "none";
            //alert("Image Upload Successful");
          });
          
        });
    });
  };


  // Update of a product to the FireBase FireStore and Stores the image in the Storage
  pal.updateService = (id) => {
    document.getElementById("service_update_form").style.display = "block";
    const serviceUpdateForm = document.querySelector("#service_update_form");
    window.scrollTo(0, document.body.scrollHeight);

    var serviceSerial = document.getElementById("exampleInputServiceSerial1");
    var serviceName = document.getElementById("updateServiceName");
    var serviceDesc = document.getElementById("updateServiceDesc");
  
    // show value of description and image in input field
    db.collection('services').doc(id).get().then((doc) => {
      //console.log(doc.data().serial);
      //serviceSerial.value = "1";
      serviceName.value = doc.data().name;
      serviceDesc.value = doc.data().description;
    });


    // Event for submiting the Add Product Form
    serviceUpdateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (confirm("Are you sure to update?")) {
        //console.log(inputImage.name);
        db.collection("services").doc(id).update({ 
          serial: serviceUpdateForm['updateServiceSerial'].value,
          name: serviceUpdateForm['updateServiceName'].value,
          description: serviceUpdateForm['updateServiceDesc'].value
        }).then(function () {
          document.getElementById("service_update_form").style.display = "none";
          //alert("Yeah Updated!!");
        }).catch(function (error) {
          console.log('Update failed: ' + error.message);
        });
      }
    });
  };

  pal.deleteProduct = (servideId) => {
    if (confirm("Are you sure to update?")) {
      db.collection('services').doc(servideId).delete();
    }
  };
  // *******************************************//
  //          Service Section JS Ends               
  //********************************************//

  // -------------------------------------------------------------------------------------------------------------------------------
  // load Account Wrapper in the Header section 
  pal.loadAccountWrap = (user) => {
    const cardAccount = document.querySelector('#card-account');
    const photoAccount = document.querySelector('#photo-account');
    const nameAccount = document.querySelector('#name-account');

    if (user) {
      
      let html = '';
      const li = `
        <div class="image">
            <a href="#">
                <img src="images/icon/${user.imageUrl}" alt="${user.username}" />
            </a>
        </div>
        <div class="content">
            <h5 class="name">
                <a href="#">${user.username}</a>
            </h5>
            <span class="email">${user.email}</span>
        </div>
      `;
      html += li;
      cardAccount.innerHTML = html;
      photoAccount.innerHTML = `<img src="images/icon/${user.imageUrl}" alt="${user.username}" />`;
      nameAccount.innerHTML = `<a class="js-acc-btn" href="#">${user.username}</a>`;
    } else {
      cardAccount.innerHTML = '<h5 class="center-align">Please Login First</h5>';
    }

  };

  document.addEventListener("DOMContentLoaded", function (event) {
      // listen for auth status changes
      auth.onAuthStateChanged(user => {
        if (user) {
          document.querySelector(".checkifLoggedIn").style.display = "block";
          //console.log(user);
          //location.replace("../dashboard.html");

          db.collection("users").doc(user.uid).get().then(function(doc) {
              if (doc.exists) {
                  //console.log("Document data:", doc.data());
                  pal.loadAccountWrap(doc.data());
                  pal.loadDashboardSection();
              } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });

          
          
        } else {
          location.replace("index.html");
          console.log("user logged out");
        }
      });

      logout = document.querySelector('#logout-user');
      logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
      });
  });

  


  global.$pal = pal;

})(window);








