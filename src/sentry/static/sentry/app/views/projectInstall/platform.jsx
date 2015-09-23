import React from "react";
import {Link} from "react-router";

import api from "../../api";
import ListLink from "../../components/listLink";
import LoadingIndicator from "../../components/loadingIndicator";
import RouteMixin from "../../mixins/routeMixin";

var ProjectInstallPlatform = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [RouteMixin],

  static: {
    platforms: {
      python: {
        display: "Python"
      },
      "python-bottle": {
        display: "Bottle"
      },
      "python-django": {
        display: "Django",
      },
      "python-flask": {
        display: "Flask"
      },
      "python-pylons": {
        display: "Pylons"
      },
      "python-pyramid": {
        display: "Pyramid"
      },
      "python-tornado": {
        display: "Tornado"
      },
      javascript: {
        display: "Javascript"
      },
      nodejs: {
        display: "Node JS"
      },
      php: {
        display: "PHP"
      },
      ruby: {
        display: "Ruby"
      },
      "objective-c": {
        display: "Objective-C"
      },
      "java": {
        display: "Java"
      },
      "c-sharp": {
        display: "C#"
      },
      "go": {
        display: "Go"
      }
    }
  },

  getInitialState() {
    return {
      isFramework: null,
      link: null,
      name: null,
      sdk: null,
      html: '',
      loading: true,
    };
  },

  componentDidMount() {
    this.fetchData();
  },

  routeDidChange() {
    this.setState({
      loading: true
    }, this.fetchData);
  },

  fetchData() {
    let {orgId, projectId, platform} = this.context.router.getCurrentParams();
    api.request(`/projects/${orgId}/${projectId}/docs/${platform}/`, {
      success: (data) => {
        this.setState(Object.assign({loading:false}, data));
      }
    });
  },

  getPlatformLink(platform, display) {
    let params = this.context.router.getCurrentParams();
    if (typeof display === "undefined") {
      display = this.static.platforms[platform].display;
    }
    return (
      <ListLink
        to="projectInstallPlatform"
        params={Object.assign({}, params, {platform: platform})}>
          {display}
      </ListLink>
    );
  },

  render() {
    let params = this.context.router.getCurrentParams();
    let {platform} = params;

    return (
      <div className="row">
        <div className="col-md-2">
          <h6 className="nav-header">Python</h6>
          <ul className="nav nav-stacked">
            {this.getPlatformLink('python', 'Generic')}
            {this.getPlatformLink('python-bottle')}
            {this.getPlatformLink('python-django')}
            {this.getPlatformLink('python-flask')}
            {this.getPlatformLink('python-pylons')}
            {this.getPlatformLink('python-pyramid')}
            {this.getPlatformLink('python-tornado')}
          </ul>
          <h6 className="nav-header">JavaScript</h6>
          <ul className="nav nav-stacked">
            <li><a href="#">Generic</a></li>
            <li><a href="#">Angular</a></li>
            <li><a href="#">Ember</a></li>
            <li><a href="#">React</a></li>
          </ul>
        </div>
        <div className="col-md-10">
          <div className="box">
            <div className="box-content with-padding">

              <div className="pull-right">
                <a href={this.state.link} className="btn btn-default">Full Documentation</a>
              </div>

              <h1>Configure {this.static.platforms[platform].display}</h1>

              {this.state.loading
                ? <LoadingIndicator/>
                : (
                  <div>
                    <p>
                      This is a quick getting started guide. For in-depth instructions on integrating Sentry with {this.state.name}, view <a href={this.state.link}>our complete documentation</a>.
                    </p>
                    <div dangerouslySetInnerHTML={{__html: this.state.html}}/>
                    <Link to="stream" params={params} className="btn btn-primary">Continue</Link>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default ProjectInstallPlatform;
