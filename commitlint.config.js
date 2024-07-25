module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'always', ['lower-case']], // 기본 설정으로 둡니다.
    'type-case': [2, 'always', 'lower-case'], // 기본 설정으로 둡니다.
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'merge', // 'merge' 타입을 추가합니다.
      ],
    ],
  },
};
