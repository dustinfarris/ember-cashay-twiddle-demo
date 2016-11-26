export default function(graphql) {
  const {
    GraphQLList,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
  } = graphql;

  const Blurb = new GraphQLObjectType({
    name: 'Blurb',
    description: 'A musing of a User',
    fields: () => ({
      id: { type: GraphQLID },
      user: { type: User },
      postedAt: { type: GraphQLString },
      content: { type: GraphQLString }
    })
  });

  const User = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      blurbs: {
        type: new GraphQLList(Blurb),
        resolve: ({ id }, _args, { mirage }) => {
          return mirage.blurbs.where({ userId: id }).models.map(model => model.attrs);
        }
      }
    })
  });

  const queryType = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
      users: {
        type: new GraphQLList(User),
        resolve: (_parent, _args, { mirage }) => {
          return mirage.users.all().models.map(model => model.attrs);
        }
      },
      user: {
        type: User,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The user ID for the desired user'
          }
        },
        resolve: (_parent, { id }, { mirage }) => {
          return mirage.users.find(id).attrs;
        }
      }
    })
  });

  return new GraphQLSchema({
    query: queryType
  });
}
