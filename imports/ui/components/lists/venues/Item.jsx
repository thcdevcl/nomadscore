import React from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Spinner from "../../utils/Spinner";

const styles = theme => ({
  rootContainer: {
    maxHeight: "100%",
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.spacing.unit * 2,
    padding: theme.spacing.unit,
    borderBottom: `1px solid ${theme.palette.grey[900]}`,
    borderRight: `1px solid ${theme.palette.grey[900]}`
  },
  accentButton: {
    border: `1px solid ${theme.palette.custom.accent} !important`,
    color: `${theme.palette.custom.accent} !important`
  },
  button: {
    fontSize: "0.65rem",
    color: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.secondary.light}`
  },
  headline: {
    color: theme.palette.common.white,
    fontWeight: 800
  },
  photo: {
    borderRadius: "16px 0px 0px 16px"
  }
});

const GET_VENUE = gql`
  query venue($providerid: ID!) {
    venue(providerid: $providerid) {
      _id
      photourl
      score {
        a
        b
      }
    }
  }
`;

const Item = ({ classes, name, loading, data, theme }) => {
  const { venue } = data;
  return (
    <Grid
      container
      component={Paper}
      elevation={5}
      classes={{ container: classes.rootContainer }}
    >
      <Grid item xs={4}>
        {!loading && (
          <Grid
            container
            alignItems="center"
            style={{ height: "100%", position: "relative" }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <img
                src={venue.photourl}
                style={{
                  maxWidth: "100%",
                  position: "absolute",
                  height: "100%"
                }}
                className={classes.photo}
              />
            )}
          </Grid>
        )}
      </Grid>
      <Grid
        item
        xs={8}
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        <Grid container justify="center">
          <Typography
            variant="h6"
            classes={{ root: classes.headline }}
            align="center"
            paragraph
          >
            {name}
          </Typography>
        </Grid>
        <Grid container justify="center" style={{ height: "100%" }}>
          <Grid item xs={8}>
            <Grid
              container
              style={{ height: "100%" }}
              direction="column"
              justify="space-evenly"
            >
              <Typography
                variant="caption"
                style={{ color: theme.palette.grey[500] }}
                align="center"
              >
                NOMADSCORE
              </Typography>
              {loading ? (
                <Spinner size={15} />
              ) : (
                <Typography variant="h4" align="center">
                  😃
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              style={{ height: "100%" }}
              direction="column"
              justify="space-around"
            >
              <Button
                variant="text"
                color="secondary"
                size="small"
                classes={{ textSecondary: classes.button }}
              >
                CHECK-IN
              </Button>
              <Button
                variant="text"
                color="secondary"
                size="small"
                classes={{
                  textSecondary: classNames(
                    classes.button,
                    classes.accentButton
                  )
                }}
              >
                RATE
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(
  ({ classes, providerid, name, theme }) => (
    <Query query={GET_VENUE} variables={{ providerid }}>
      {({ error, loading, data }) => {
        if (error) return `Error: ${error}`;
        return (
          <Item
            classes={classes}
            name={name}
            loading={loading}
            data={data}
            theme={theme}
          />
        );
      }}
    </Query>
  )
);
