import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  documents: ['src/graphql/**/*.gql'],
  generates: {
    'src/graphql/generated/__generated_graphql.ts': {
      config: {
        useTypeImports: true
      },
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-document-nodes',
        'typescript-vue-apollo',
        {
          add: {
            content: '/* eslint-disable */\n// @ts-nocheck'
          }
        }
      ],
      overwrite: true
    }
  }
}

export default config
