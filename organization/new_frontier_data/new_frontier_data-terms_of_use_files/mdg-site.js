var bundledForm = document.getElementsByClassName('bundle_form')[0];
// var bundledItems = document.getElementsByClassName('bundle_form')[0].childNodes;

var products = [];

var defaultProducts = [];

var newBundleList = document.createElement('div');
newBundleList.className = 'bundleRotate';

var mixedPrices = 0;
var noDiscount = 0;
var discountCount = 0;

jQuery('.bundled_product').each(function(index,element){
  if (jQuery(element).find('label.bundled_product_optional_checkbox').length != 0) {
    products.push(element);
    //element.parentNode.removeChild(element);
    //console.log('optional product');
  } else {
    defaultProducts.push(element);
    //console.log('default product');
  }

  if (jQuery(element).find('.price del .amount').length != 0) {
    discountCount++;
  }
});

if (discountCount != products.length) {
  mixedPrices = 1;
} else if (discountCount == 0) {
  noDiscount = 1;
}



//console.log(products);

for (var j=0; j<defaultProducts.length; j++) {
  bundledForm.appendChild(defaultProducts[j]);
}

for (var j=0; j<products.length; j++) {
  newBundleList.appendChild(products[j]);
}

bundledForm.appendChild(newBundleList);

var cart = jQuery('.bundle_form .cart');
jQuery('.bundle_form').append( cart );
// bundledForm.appendChild(cart);









var bundleItemsCount = defaultProducts.length;
var add_to_cart_button = jQuery('.bundle_add_to_cart_button');
var min_max_items = jQuery('.min_max_items');
var bundleError = jQuery('.bundle_error');
var bundlePrice = jQuery('.bundle_price');
var currencySymbol = jQuery('.woocommerce-Price-currencySymbol').first().text();
var pricehtml = '<p class="price"><span class="total">Total: </span><del><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">'+currencySymbol+'</span></span></del> <ins><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">'+currencySymbol+'</span></span></ins></p>'
var noDisPricehtml = '<p class="price"><span class="total">Total: </span><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">'+currencySymbol+'</span></span></p>'
var discountPrice = 0;
var regPrice = 0;
var errorText = "Please select some items.";

//console.log("Count:" + discountCount);
//console.log("Mixed?:" + mixedPrices);
//console.log("No Discount?:" + noDiscount);



jQuery('.bundled_product').on('click', function(e){
  e.preventDefault();
  var checkBoxes = jQuery(this).find('.bundled_product_checkbox');
    if (checkBoxes.prop('checked')) {
      checkBoxes.prop('checked', false);
      bundleItemsCount--;
      if (noDiscount || mixedPrices) {
        if (jQuery(this).find('.price del .amount').length == 0) {
          discountPrice = parseFloat(discountPrice) - parseFloat(jQuery(this).find('.price .amount').text().replace(currencySymbol, ''));
        }
      } else {
        discountPrice = parseFloat(discountPrice) - parseFloat(jQuery(this).find('.price ins .amount').text().replace(currencySymbol, ''));
        regPrice = parseFloat(regPrice) - parseFloat(jQuery(this).find('.price del .amount').text().replace(currencySymbol, ''));
      }
    } else {
      checkBoxes.prop('checked', true);
      bundleItemsCount++;
      if (noDiscount || mixedPrices) {
        if (jQuery(this).find('.price del .amount').length == 0) {
          discountPrice = parseFloat(discountPrice) + parseFloat(jQuery(this).find('.price .amount').text().replace(currencySymbol, ''));
        }
      } else {
        discountPrice = parseFloat(discountPrice) + parseFloat(jQuery(this).find('.price ins .amount').text().replace(currencySymbol, ''));
        regPrice = parseFloat(regPrice) + parseFloat(jQuery(this).find('.price del .amount').text().replace(currencySymbol, ''));
      }
    }

    if (noDiscount || mixedPrices) {
      bundlePrice.html(noDisPricehtml);
    } else {
      bundlePrice.html(pricehtml);
    }

    regPrice = parseFloat(Math.ceil(regPrice * 100) / 100).toFixed(2);
    discountPrice = parseFloat(Math.ceil(discountPrice * 100) / 100).toFixed(2);

    if (isNaN(discountPrice)) {
      discountPrice = jQuery('.single-product-summary .price ins .amount').text().replace(currencySymbol, '');
      
    }
    if (isNaN(regPrice)) {
      regPrice = jQuery('.single-product-summary .price del .amount').text().replace(currencySymbol, '');
      
    }

    if (noDiscount || mixedPrices) {
       bundlePrice.find('.amount').append(discountPrice);
    } else {
      bundlePrice.find('del .amount').append(regPrice);
      bundlePrice.find('ins .amount').append(discountPrice);
    }

    if (min_max_items.data( "min" ) != min_max_items.data( "max" )) {
      var minmaxText = min_max_items.data( "min" ) + " - " + min_max_items.data( "max" );
    } else {
      var minmaxText = min_max_items.data( "min" );
    }

    errorText = "You have selected " + bundleItemsCount + " items. Please select " + minmaxText + " items."
    bundleError.find('li').text(errorText);

    if (bundleItemsCount >= min_max_items.data( "min" ) && bundleItemsCount <= min_max_items.data( "max" )) {
      add_to_cart_button.removeClass('disabled').prop("disabled", false);
      bundleError.hide("fade");
      bundlePrice.show("fade");
    }

    if (bundleItemsCount < min_max_items.data( "min" ) || bundleItemsCount > min_max_items.data( "max" )) {
      add_to_cart_button.addClass('disabled').prop("disabled", true);
      bundleError.show("fade");
      bundlePrice.hide("fade");
      
    }
});


jQuery(document).ready(function(){
if (bundleError.find('li').length == 0) {
  bundleError.find('ul').html('<li></li>');

  if (min_max_items.data( "min" ) != min_max_items.data( "max" )) {
    var minmaxText = min_max_items.data( "min" ) + " - " + min_max_items.data( "max" );
  } else {
    var minmaxText = min_max_items.data( "min" );
  }

  errorText = "Please select " + minmaxText + " items.";
  bundleError.find('li').text(errorText);
}
  bundleError.show();
  bundlePrice.hide();


  jQuery('.bundleRotate').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
  });
});
