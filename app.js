var state = {
    GOOGLE_CIVIC_URL: "https://www.googleapis.com/civicinfo/v2/representatives?",
    GOOGLE_MAP_URL: "https://maps.googleapis.com/maps/api/geocode/json?",
    GOOGLE_MAP_KEY: "AIzaSyApiQO-S3NrcwaJY_a6uicLg_gFWMio8Oc",
    query : {
        key: "AIzaSyCSXgDkOrHxRnDTU_MaYp06zvv7I0XL7tw",
        address: ""
    }
}

function getDataFromGoogleCivicAPI(callback) {
    //$.getJSON(state.GOOGLE_CIVIC_URL, state.query, callback);
    $.ajax({
        url: state.GOOGLE_CIVIC_URL,
        data : state.query,
        dataType: 'json',
        success: callback,
        error: function( data ) {
            var initialMessage = $('.initial-message');
            initialMessage.removeClass('hidden');
            initialMessage.html("No result");
            initialMessage.css('text-align', 'center');
            initialMessage.css('margin-top', '50px');
        }
    });
}

function renderGoogleCivicAPI(data) {
    $('.initial-message').addClass('hidden');
    var container = $('.result-container');
    container.removeClass('hidden');
    var title = ['', '', 'Senator ', 'Senator ', 'Congressperson '];
    for (var i = 2; i <= 4; i++) {
        var imageUrl = 'images/no-image-available.png';
        if(data.officials[i].photoUrl){
            imageUrl = data.officials[i].photoUrl;
        }

        var template = $(
        '<li class="profile-container">' +
            '<div class="profile">' +
                '<h2 class="title">' + title[i] + '<span class="name">' + data.officials[i].name + '</span><span class="party"></span></h2>' +
                '<div class="image-container"><img src="' + imageUrl + '" alt="profile-pic"></div>' +
                '<h3># <span class="phone">' + data.officials[i].phones + '</span></h3>' +
                '<a href="https://www.facebook.com/' + data.officials[i].channels[0].id + '" target="_blank"><img class="facebook logo" src="images/facebook.png"></a>' +
                '<a href="https://twitter.com/' + data.officials[i].channels[1].id + '" target="_blank"><img class="twitter logo" src="images/twitter.png"></a>' +
            '</div>' +
        '</li>'
        );
        
        if (data.officials[i].party === 'Democratic'){
            template.find('.party').text(' (D)');
            template.find('.profile').addClass('blue');
        }
        else if (data.officials[i].party === 'Republican'){
            template.find('.party').text(' (R)');
            template.find('.profile').addClass('red');
        }
        else
            template.find('.party').text(' (' + data.officials[i].party + ')');

        container.append(template);

        var normalizedAddress = data.normalizedInput.line1 + ', ' + data.normalizedInput.city +
            ', ' + data.normalizedInput.state + ', ' + data.normalizedInput.zip;
        
        if(normalizedAddress.charAt(0) == ',')
            normalizedAddress = normalizedAddress.substring(2);
        
        if(normalizedAddress.charAt(normalizedAddress.length - 1) == ' ')
            normalizedAddress = normalizedAddress.substring(0,normalizedAddress.length - 2);

        $('#search-input').val(normalizedAddress);
    }
}

/**********************Display contact*******************/

$('ul').on('click', 'li', function(event) {
    event.stopPropagation();
    $(this).find('.contact').toggleClass('hidden');
})

/**********************Search button *********************/

$('.search-form').submit(function(event) {
    event.preventDefault();
    state.query.address = $(this).find('#search-input').val();
    var header = $('header');
    $('.result-container').empty();
    header.addClass('headerAnimation');
    header.find('form').removeClass('hidden');
    header.find('form').addClass('opacityAnimation');
    header.find('a').addClass('logoAnimation');
    header.siblings().eq('0').addClass('hidden');
    header.parent().addClass('bodyAnimation');
    getDataFromGoogleCivicAPI(renderGoogleCivicAPI);
})

//*********************Current location********************/
$('.current-location').on('click', function(){
    var location = {
        latitude: '',
        longitude: ''
    };

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position){ 
        location.latitude = position.coords.latitude;
        location.longitude = position.coords.longitude;

        var mapURL = state.GOOGLE_MAP_URL + 'latlng=' + location.latitude + ',' + location.longitude +'&key=' + state.GOOGLE_MAP_KEY;

        $.getJSON(mapURL, function(data){
            state.query.address = data.results[0].formatted_address;
            $('.result-container').empty();
            getDataFromGoogleCivicAPI(renderGoogleCivicAPI);
            $('#search-input').val(data.results[0].formatted_address);
            //animation
            $('header').addClass('headerAnimation');
            $('header .search-form').removeClass('hidden');
            $('header .search-form').addClass('opacityAnimation');
            $('.logo-container').addClass('logoAnimation');
            $('.initial-message form').addClass('hidden');
            $('body').addClass('bodyAnimation');
        });
    } //showPosition
})

//*******************animation*****************/