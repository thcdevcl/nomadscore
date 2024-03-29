import React, { Component } from "react";
import { PropTypes } from "prop-types";

import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Map from "@material-ui/icons/Map";
import Star from "@material-ui/icons/Star";
import { withStyles } from "@material-ui/core/styles";

import FavoritesTab from "../tabs/FavoritesTabLayout";
import MapTab from "../tabs/MapTabLayout";

const styles = theme => ({
  indicator: {
    color: theme.palette.custom.accent,
    backgroundColor: theme.palette.custom.accent
  },
  rootContainer: {
    flex: 1
  },
  tabs: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  }
});

class MobileLayout extends Component {
  state = {
    tab: 0
  };

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes, place, venues, refetch } = this.props;
    const { tab } = this.state;
    const renderTab = () => {
      switch (tab) {
        case 0:
          return <MapTab place={place} venues={venues} />;
        case 1:
          return <FavoritesTab />;
      }
    };
    return (
      <Grid
        container
        direction="column"
        classes={{ container: classes.rootContainer }}
      >
        <Tabs
          value={tab}
          onChange={this.handleTabChange}
          indicatorColor="secondary"
          fullWidth
          centered
          classes={{ root: classes.tabs, indicator: classes.indicator }}
        >
          <Tab label={<Map />} />
          <Tab label={<Star />} />
        </Tabs>
        <Grid
          container
          direction="column"
          classes={{ container: classes.rootContainer }}
        >
          {renderTab()}
        </Grid>
      </Grid>
    );
  }
}

MobileLayout.propTypes = {
  place: PropTypes.object.isRequired,
  hostels: PropTypes.array,
  cafes: PropTypes.array,
  refetch: PropTypes.func
};

export default withStyles(styles)(MobileLayout);
