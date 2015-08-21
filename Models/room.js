
var RoomModel = Backbone.Model.extend({

  default: {
      id: null,
      status: null,
      "last reported time": null,
      confirmation: null
  },
  url: function () {
    var baseUrl = 'http://localhost:3000/rooms/'

    if (this.isNew()){
      // 'http://localhost:3000/homes/'
      return baseURl 
    } else {
      // 'http://localhost:3000/homes/1'
      return baseUrl + this.id
    }
  }
})

// App.Models.Room = RoomModel