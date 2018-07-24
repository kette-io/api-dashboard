/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import { withAuthenticator } from 'aws-amplify-react';
import { Auth, API } from "aws-amplify";

import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";

class App extends React.Component {

  state = {
    mobileOpen: false,
    apiKeys: [["loading..."]],
    users: [["loading..."]]
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  logout = async () => {
    await Auth.signOut();
    window.location.reload();
  };

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  async componentDidMount() {
    const apiKeys = await API.get("apiKeys", "/apiKeys");
    const firstApiKey = apiKeys[0];
    if (!firstApiKey) {
      this.setState({ apiKeys: [], users: [] });
      return;
    }

    const apiKey = firstApiKey.apiKey;
    const apiKeysTableData = apiKeys.map(apiKey => {
      return [apiKey.apiKey]
    })

    let userTableData;
    try {
      const init = {
        headers: {
          'x-api-key': apiKey
        }
      };
      const response = await fetch("https://api.kette.io/dev/users", init)
      const users = await response.json();


      userTableData = users.map(user => {
        return [user.UserAttributes[4].Value, user.UserAttributes[5].Value]
      })

    } catch (e) {
      console.log(e);
      userTableData = [];
    }

    this.setState({ apiKeys: apiKeysTableData, users: userTableData });
  }

  onClick = () => {
    //if (this.state.apiKeys.length > 0) return null;
    return async () => {
      await API.post("apiKeys", "/apiKeys");
      await this.componentDidMount();
    }
  }
  ApiKeyTableList = (props) => {
    return (
      <TableList
        tableData={this.state.apiKeys}
        tableHead={["API Key"]} b h b
        onClick={this.onClick()}
        title="Your API keys"
        {...props}
      />
    );
  }

  UsersTableList = (props) => {
    return (
      <TableList
        tableData={this.state.users}
        tableHead={["First Name", "Last Name"]}
        title="Users"
        subTitle="Users created with our API key"
        {...props}
      />
    );
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"KETTE"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          tableData={this.state.tableData}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            logout={this.logout}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{
              <Switch>
                {[
                  <Route path="/user" component={UserProfile} key={1} />,
                  <Route path="/clients" component={this.UsersTableList} key={2} />,
                  <Route path="/apiKeys" component={this.ApiKeyTableList} key={3} />,
                  <Redirect from="/" to="/apiKeys" key={4} />]
                })}
             </Switch>
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuthenticator(withStyles(dashboardStyle)(App));
