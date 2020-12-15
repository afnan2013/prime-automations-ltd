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


//************** all the EventListener of This Admin Panel Is written here
(function (global){

  // *******************************************//
  //     Imortant File Locations of Snippets               
  //********************************************//
  // pal means Prime Automation Ltd
  var pal = {};
  var addProductHtml = "snippets/add-product-snippet.html";
  var allProductListHtml = "snippets/product-list-snippet.html";

  var addBrandHtml = "snippets/add-brand-snippet.html";
  var allBrandListHtml = "snippets/brand-list-snippet.html";

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
          //switchMenuToActive();
          var productListViewHtml = buildProductListViewHtml(snapshot, addProductHtmlRes, allProductListHtmlRes);
          insertHtml("#main-content", productListViewHtml);
          
      }, false);
    });
  }

  function buildProductListViewHtml(snapshot, addProductHtmlRes, allProductListHtmlRes){
    var finalHtml = addProductHtmlRes;
    finalHtml += '<div class="container"><section class="row">';
    
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

  pal.deleteProduct = (productId) => {
    db.collection('products').doc(productId).delete();
  };

  // *******************************************//
  //          Product Section JS Ends               
  //********************************************//


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
            imageUrl: url
          }).then(() => {
            productAddForm.reset();
            document.getElementById("brand_add_form").style.display = "none";
            //alert("Image Upload Successful");
          });
          
        });
    });
  };

  pal.deleteBrand = (brandId) => {
    db.collection('brands').doc(brandId).delete();
  };

  // *******************************************//
  //          Brand Section JS Ends               
  //********************************************//


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








