
var UserCollection = Backbone.Collection.extend({
    // model: App.Models.User
    model: UserModel,
    url: 'http://localhost:3000/users'
})
// App.Collections.Users = UserCollection