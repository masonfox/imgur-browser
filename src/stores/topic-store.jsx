var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getTopics: function() {
      return Api.get('topics/defaults')
      .then(function(json){
        this.topics = json.data;
        this.triggerChange();
        // console.log(this.topics);
      }.bind(this));
    },
    triggerChange: function() {
      this.trigger('change', this.topics);
    }
});