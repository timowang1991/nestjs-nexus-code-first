import { makeSchema, queryField } from 'nexus';

const Query = queryField('helloWorldNexus', {
  type: 'String',
  resolve() {
    return 'hello world from nexus';
  },
});

const nexusSchemaPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve(
      makeSchema({
        types: [Query],
      }),
    );
  }, 5000);
});

export { nexusSchemaPromise };
