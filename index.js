$(function () {
        

    var Router = Backbone.Router.extend({
        routes: {
            '': 'getIndex',
            'room(s)(/)': 'getRooms',
            'room(s)/:id(/)': 'getRoom',
            'user(s)(/)': 'getUsers',
            'user(s)/:id(/)': 'getUser',
            '*error': 'showError'
        },

        getRooms: function () {
            console.log('Success', 'Route: Rooms')
            // listHomesView.render()
        },

         getIndex: function () {
            console.log('Route: Index')
            $('body').html('http://localhost:8080')
        },

        getRoom: function (id) {
        console.log('At Last', 'Route: Room' + id)
        },

        getUsers: function () {
            console.log('Look', 'Route: Users')
            // listHomesView.render()
        },

        getUser: function (id) {
        console.log('We got', 'Route: User' + id)
        // homeDetailsView.render(id)
        },

        showError: function () {
            console.log('Error: 404 not found')
        }

    })

var router = new Router()

Backbone.history.start()

})