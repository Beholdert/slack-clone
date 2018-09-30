export default resolver => {
  return async (parent, args, context) => {
    if (!context.user || !context.user.id) {
      throw new Error('unauthorized');
    }

    return resolver(parent, args, context);
  };
};
