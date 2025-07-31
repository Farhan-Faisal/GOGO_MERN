import { color } from "storybook/internal/theming";

// app/login/login.styles.ts
export const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
    maxWidth: 400,
    bgcolor: '#2e2e2e',
    p: 4,
    borderRadius: 2,
  },
  title: {
    color: '#AD03DE',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textField: {
    input: { color: '#fff' },
  },
  loginButton: {
    backgroundColor: '#AD03DE',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#df6cff',
    },
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  divider: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  orText: {
    color: '#fff',
  },
  socialButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: 16,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    borderColor: '#fff',
    '&:hover': {
      borderColor: '#df6cff',
    },
    color: '#fff',
  },
  googleButton: {
    backgroundColor: '#34A853;',
    borderColor: '#fff',
    '&:hover': {
      borderColor: '#df6cff',
    },
    color: '#fff',
  },
  signUpPrompt: {
    textAlign: 'center',
    color: '#fff',
  },
  signUpButton: {
    color: '#df6cff',
  },
};
