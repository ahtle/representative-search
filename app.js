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
            $('.initial-message').removeClass('hidden');
            $('.initial-message h3').text("No result");
        }
    });
}

function renderGoogleCivicAPI(data) {
    $('.initial-message').addClass('hidden');
    var container = $('.result-container');
    container.removeClass('hidden');
    var title = ['', '', 'Senator ', 'Senator ', 'Congressperson '];
    for (var i = 2; i <= 4; i++) {
        var template = $(
        '<li class="profile-container">' +
            '<div class="profile">' +
                '<h2 class="title">' + title[i] + '<span class="name">' + data.officials[i].name + '</span><span class="party"></span></h2>' +
                '<img class="image" src="' + data.officials[i].photoUrl + '" alt="profile-pic">' +
            '</div>' +
            '<div class="contact hidden">' +
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
    $('.result-container').empty();
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
        });
    } //showPosition
})

//*******************animation*****************/