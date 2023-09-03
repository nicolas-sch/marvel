module.exports = {
    roots: ['src/tests'],

    moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],

    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.jsx$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
    },

    testEnvironment: 'jsdom',

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

    testPathIgnorePatterns: ['/node_modules/'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
  