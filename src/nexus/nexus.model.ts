import { makeSchema, queryField } from 'nexus';

const Query = queryField('helloWorldNexus', {
  type: 'String',
  resolve() {
    return 'hello world from nexus';
  },
});

const nexusSchema = makeSchema({
  types: [Query],
});

export { nexusSchema };
