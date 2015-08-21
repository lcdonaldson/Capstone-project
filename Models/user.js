

var UserModel = Backbone.Model.extend({

  default: {
      id: 1,
      type: null,
      name: null
  },
  url: function () {
    var baseUrl = 'http://localhost:3000/users/'

    if (this.isNew()){
      // 'http://localhost:3000/homes/'
      return baseURl 
    } else {
      // 'http://localhost:3000/homes/1'
      return baseUrl + this.id
    }
  }
})