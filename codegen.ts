/* eslint-disable import/no-default-export */
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  config: {
    namingConvention: { enumValues: 'change-case-all#upperCase' },
  },
  documents: ['./src/**/*Gql.ts', './src/app/common/graphql'],
  generates: {
    './src/generated/graphql/': {
      config: {
        scalars: {
          Date: 'string',
          DateTime: 'string',
          Decimal: 'number',
          BigInt: 'bigint',
        },
      },
      preset: 'client',
      presetConfig: { gqlTagName: 'gql' },
    },
  },
  noSilentErrors: true,
  schema: ['http://localhost:3000/graphql'],
};

export default config;
