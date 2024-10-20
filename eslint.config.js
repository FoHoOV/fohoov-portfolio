import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				extraFileExtensions: ['.spec.ts', '.test.ts', '.svelte']
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				svelteConfig
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'svelte/valid-compile': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			'@typescript-eslint/no-floating-promises': 'warn',
			'no-unused-expressions': 'off',
			'@typescript-eslint/no-misused-promises': [
				'error',
				{
					checksVoidReturn: {
						attributes: false
					}
				}
			],
			'@typescript-eslint/no-unused-expressions': [
				'warn',
				{
					allowShortCircuit: true,
					allowTernary: true
				}
			]
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
);
