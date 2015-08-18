
var RoomCollection = Backbone.Collection.extend({
    // model: App.Models.Room,
    model: RoomModel,
    url: 'http://localhost:3000/rooms'
})
// App.Collections.Rooms = RoomCollection