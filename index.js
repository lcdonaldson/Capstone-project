
$(function () {

    var teachersUrl = 'http://localhost:8080/teachers.html' 
    var policeUrl = 'http://localhost:8080/police.html' 
    var adminUrl = 'http://localhost:8080/admin.html' 
    var roomsUrl = 'http://localhost:3000/rooms'
    var usersUrl = 'http://localhost:3000/users'

    // ******************** NAV BAR SHADOW ON SCROLL ******************

    var roomDropdown = $('.room-dropdown')

    $(window).scroll(function() {    

        var scroll = $(window).scrollTop();

        if (scroll >= 650) {
            $(".clear").addClass("solid")
        } else if (scroll <= 650){
            $(".clear").removeClass("solid")
        } 
            
    })

    // ******* Only run this code if we need to populate the dropdown for rooms *******

    if (roomDropdown.length) {

        var txtinfo = $('#hbs').html()
        var template = Handlebars.compile(txtinfo)

        $.get(roomsUrl).done(function(rooms) {
            console.log(rooms)
            var htmlResult = template(rooms)
            roomDropdown.html(htmlResult)
        })

    }

    // ************** Login Page choosing the user **************

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

    // ****************** Teacher Page choosing the room *******************

    $('.room-teacher-options').on('submit', function (event) {


    //**************** Check to see if password field is empty *************

        if ($('.set-password').val() !== '') {
            var statusId = 3
        } else {
            var statusId = $('input:checked').val()
        }
    
        // var statusId = condition ? 3 : $('input:checked').val()


        var updateInfo = {
            statusId: statusId, //$('input:checked').val(),
            lastreportedtime: Date.now()
        }

        var roomId = $('.room-dropdown').val()
        // console.log(roomId);
        
        $.ajax({ 
            url:'http://localhost:3000/rooms/' + roomId,   
            type: 'PUT',
            data: updateInfo
        }).done(function (data) {
            // console.log(data)
        })
       
        location.href = 'http://localhost:8080/thank-you.html'

        event.preventDefault()
        
    }) 

    // *********** Thank you page button click ********************

    $('thank-you-btn').on('click', function () {
        location.href = 'http://localhost:8080/teachers.html'   
    })

    // *********** Police page ********************

    var datainfo = $('#output').html()
    var timeTemplate = Handlebars.compile(datainfo)

    if (policeUrl == location.href) {

        $.get(roomsUrl)
            .done(function (rooms) {
                var status = rooms.statusId
                
                rooms.forEach(function (room) {   
                    room.lastreportedtime = moment(room.lastreportedtime).format("h:mm:ss a")

                    if(room.statusId === 0) {
                        status = "unreported"
                    } else if (room.statusId === 1) {
                        status = "good"
                        $('#room-'+room.id).addClass('status-good')
                    } else if (room.statusId === 2) {
                        status = "missing student"
                        $('#room-'+room.id).addClass('status-missing-student')
                    } else if (room.statusId === 3) {
                        status = "help"
                        $('#room-'+room.id).addClass('status-help')
                    }
                    room.statusState = status
                    console.log(room)
                })
                var htmlResult = timeTemplate({rooms: rooms})
                
                $('.time').append(htmlResult) 

            })   
    }
     
            
})
    



