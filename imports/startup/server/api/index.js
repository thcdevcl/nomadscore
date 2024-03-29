import { ApolloServer } from "apollo-server-express";
import { WebApp } from "meteor/webapp";
import { getUser } from "meteor/apollo";
import merge from "lodash/merge";

import UserSchema from "../../../api/users/User.graphql";
import UserResolvers from "../../../api/users/resolvers";

import VenueSchema from "../../../api/venues/Venue.graphql";
import VenueResolvers from "../../../api/venues/resolvers";

import FoursquareAPI from "../../../api/data-sources/foursquare";

const typeDefs = [UserSchema, VenueSchema];
const resolvers = merge(UserResolvers, VenueResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      FoursquareAPI: new FoursquareAPI()
    };
  },
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: "/graphql"
});

WebApp.connectHandlers.use("/graphql", (req, res) => {
  if (req.method === "GET") {
    res.end();
  }
});
