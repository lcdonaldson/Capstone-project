
$(function () {

    var teachersUrl = 'http://localhost:8080/teachers.html' 
    var policeUrl = 'http://localhost:8080/police.html' 
    var adminUrl = 'http://localhost:8080/admin.html' 
    var roomsUrl = 'http://localhost:3000/rooms'



    var roomDropdown = $('.room-dropdown')
    var police = $('.police')

    // Only run this code if we need to populate the dropdown for rooms
    if (roomDropdown.length) {

        var txtinfo = $('#hbs').html()
        var template = Handlebars.compile(txtinfo)

        $.get(roomsUrl).done(function(rooms) {
            console.log(rooms)
            var htmlResult = template(rooms)
            roomDropdown.html(htmlResult)
        })

    }



    // *********** login Page choosing the user **************

    $('.user-options').on('submit', function (event) {
        var value = $('.user-dropdown').val()
        if (value == 'Teacher') {
            location.href = teachersUrl
        } else if (value == 'Police') {
            location.href = policeUrl
        } else {
           location.href = adminUrl
        }
        event.preventDefault()
    })

    // *********** Teacher Page choosing the room **************

    $('.room-teacher-options').on('submit', function (event) {

        var updateInfo = {
            statusId: $('input:checked').val(),
            lastreportedtime: Date.now()
        }

        var roomId = $('.room-dropdown').val();
        // console.log(roomId);


        $.ajax({ 
            url:'http://localhost:3000/rooms/' + roomId,   
            type: 'PUT',
            data: updateInfo
        }).done(function (data) {
            console.log(data)
        })

        location.href = 'http://localhost:8080/thank-you.html'

        event.preventDefault()

    }) 

    // *********** Thank you page button click ********************

    $('thank-you-btn').on('click', function () {
        location.href = 'http://localhost:8080/teachers.html'
        
    })


    // *********** Police page ********************

    if (policeUrl == location.href) {
        $.get(roomsUrl)
            .done(function (rooms) {
                rooms.forEach(function (room) {
                    $('.time').append('<li>' + room.name + '</li>')
                })
            })
    }
            
})
    



