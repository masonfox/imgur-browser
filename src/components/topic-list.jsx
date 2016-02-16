var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      topics: []
    };
  },
  componentWillMount: function() {
    Actions.getTopics();
  },
  render: function() {
    return <div className="list-group">
      <div className="jumbotron">
      <h2>Welcome,</h2>
      <p>This is a small project I built using React and Flux for a class on Udemy! Check it out!</p>
      <button className="btn btn-primary">See All Topics</button>
      </div>
      {this.renderTopics()}
    </div>
  },
  renderTopics: function() {
    return this.state.topics.map(function(topic) {
      return <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
        <h4>{topic.name}</h4>
        <p>{topic.description}</p>
      </Link>
    });
  },
  onChange: function(event, topics) {
    this.setState({topics: topics});
  }
});
