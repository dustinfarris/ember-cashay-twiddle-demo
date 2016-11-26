export default function(graphql) {
  const {
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
  } = graphql;

  const User = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: {
      id: { type: GraphQLID },
      name: { type: GraphQLString }
    }
  });

  const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      },
      users: {
        type: new GraphQLList(User),
        resolve: (_parent, _args, { mirage }) => {
          return mirage.users.all().models.map(model => model.attrs);
        }
      }
    }
  });

  return new GraphQLSchema({ query });
}
