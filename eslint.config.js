import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['dist', 'coverage', 'node_modules'],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2022,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			// The game's sprite classes carry a handful of deliberately loose fields
			// (timer handles, keyboard event codes), and the rule fires on those alone.
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
	{
		files: ['**/*.{test,spec}.{ts,tsx}', 'src/setup-tests.ts'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
		},
	},
	{
		files: ['*.config.{ts,js}', 'eslint.config.js'],
		languageOptions: {
			globals: globals.node,
		},
	}
);
