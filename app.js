var state = {
    GOOGLE_CIVIC_URL: "https://www.googleapis.com/civicinfo/v2/representatives?",
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

$('ul').on('click', 'li', function(event) {
    event.stopPropagation();
    $(this).find('.contact').toggleClass('hidden');
})

$('.search-form').submit(function(event) {
    event.preventDefault();
    state.query.address = $(this).find('#search-input').val();
    $('.result-container').empty();
    getDataFromGoogleCivicAPI(renderGoogleCivicAPI);
})

//geocode AIzaSyBcbrynp55QPVYxQqzZMU9zlclf9SNFA6Y
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBcbrynp55QPVYxQqzZMU9zlclf9SNFA6Y