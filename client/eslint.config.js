import nextConfig from 'eslint-config-next';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['.next/'],
  },
  ...tseslint.configs.recommended,
  nextConfig,
  prettierConfig
);
