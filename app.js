var state = {
    GOOGLE_CIVIC_URL: "https://www.googleapis.com/civicinfo/v2/representatives?",
    query : {
        key: "AIzaSyCSXgDkOrHxRnDTU_MaYp06zvv7I0XL7tw",
        address: ""
    }
}

function getDataFromGoogleCivicAPI(callback) {
    $.getJSON(state.GOOGLE_CIVIC_URL, state.query, callback);
}

function renderGoogleCivicAPI(data) {
    if(data.officials) {
        $('.result-container').removeClass('hidden');

//*******************senator1 ************
        $('.senator-1-name').text(data.officials[2].name);
        $('#senator-1-image').attr('src', data.officials[2].photoUrl);
        $('.senator-1-number').text(data.officials[2].phones)
        $('.senator-1-facebook').attr('href', 'https://www.facebook.com/' + data.officials[2].channels[0].id);
        $('.senator-1-twitter').attr('href', 'https://twitter.com/' + data.officials[2].channels[1].id);
        if(data.officials[2].party === 'Democratic') {
            $('.senator-1-party').text(' (D)');
            $('.senator-1').removeClass('red');
            $('.senator-1').addClass('blue');
        }
        else if(data.officials[2].party === 'Republican') {
            $('.senator-1-party').text(' (R)');
            $('.senator-1').removeClass('blue');
            $('.senator-1').addClass('red');
        }
        else
            $('.senator-1-party').text(' (' + data.officials[3].party + ')')

//*******************senator 2*****************
        $('.senator-2-name').text(data.officials[3].name);
        $('#senator-2-image').attr('src', data.officials[3].photoUrl);
        $('.senator-2-number').text(data.officials[3].phones)
        $('.senator-2-facebook').attr('href', 'https://www.facebook.com/' + data.officials[3].channels[0].id);
        $('.senator-2-twitter').attr('href', 'https://twitter.com/' + data.officials[3].channels[1].id);
        if(data.officials[3].party === 'Democratic') {
            $('.senator-2-party').text(' (D)');
            $('.senator-2').removeClass('red');
            $('.senator-2').addClass('blue');
        }
        else if(data.officials[3].party === 'Republican') {
            $('.senator-2-party').text(' (R)');
            $('.senator-2').removeClass('blue');
            $('.senator-2').addClass('red');
        }
        else
            $('.senator-2-party').text(' (' + data.officials[3].party + ')')

//******************congressman*****************
        $('.congress-name').text(data.officials[4].name);
        $('#congress-image').attr('src', data.officials[4].photoUrl);
        $('.congress-number').text(data.officials[4].phones)
        $('.congress-facebook').attr('href', 'https://www.facebook.com/' + data.officials[4].channels[0].id);
        $('.congress-twitter').attr('href', 'https://twitter.com/' + data.officials[4].channels[1].id);
        if(data.officials[4].party === 'Democratic') {
            $('.congress-party').text(' (D)');
            $('.congress').removeClass('red');
            $('.congress').addClass('blue');
        }
        else if(data.officials[4].party === 'Republican') {
            $('.congress-party').text(' (R)');
            $('.congress').removeClass('blue');
            $('.congress').addClass('red');
        }
        else
            $('.congress-party').text(' (' + data.officials[4].party + ')')
    }
    else {
        $('.result-div').html("No result");
    }
}

$('.profile').on('click', function(event) {
    event.preventDefault();
    $(this).siblings().toggleClass('hidden');
})

$('.search-form').submit(function(event) {
    event.preventDefault();
    state.query.address = $(this).find('#search-input').val();
    getDataFromGoogleCivicAPI(renderGoogleCivicAPI);
})

//geocode AIzaSyBcbrynp55QPVYxQqzZMU9zlclf9SNFA6Y
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBcbrynp55QPVYxQqzZMU9zlclf9SNFA6Y