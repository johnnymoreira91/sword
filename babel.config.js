module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@infra': './src/infra',
        '@entities': './src/entities',
        '@repositories': './src/repositories',
        '@providers': './src/providers',
        '@useCases': './src/useCases',
        '@utils': './src/utils',
        '@shared': './src/shared',
        '@database': './src/infra/database'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
