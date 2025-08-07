// app/login/login.styles.ts
export const styles = {
  container: {
    bgcolor: '#000',
    minHeight: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: { xs: 2, sm: 3, md: 4 }, // responsive padding
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 1, sm: 1.5 },
    minHeight: '85%',
    width: '100%',
    maxWidth: { xs: '100%', sm: 420, md: 480 },
    bgcolor: '#2e2e2e',
    p: { xs: 1, sm: 2, md: 3 },
    borderRadius: 2,
    boxSizing: 'border-box',

    // allow scrolling when height is tight
    maxHeight: 'min(95%, 600px)',
    overflowY: 'auto',
  },

  title: {
    color: '#AD03DE',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
  },

  textField: {
    input: { color: '#fff' },
    width: '100%',
  },

  loginButton: {
    mt: 1,
    width: '100%',
    minHeight: 44,
    backgroundColor: '#AD03DE',
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#df6cff' },
  },

  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  divider: { flexGrow: 1, bgcolor: '#fff' },
  orText: { color: '#fff', fontSize: '0.9rem' },

  socialButtons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',             // <-- wrap on small screens
    gap: { xs: 1, sm: 2 },
    '> *': {
      flex: { xs: '1 1 45%', sm: '0 0 auto' }, // two-per-row on mobile, inline on larger
      minWidth: { xs: 'auto', sm: 140 },
    },
  },

  facebookButton: {
    bgcolor: '#1877F2',
    borderColor: '#fff',
    borderRadius: 7,
    color: '#fff',
    '&:hover': { borderColor: '#df6cff' },
  },

  googleButton: {
    bgcolor: '#34A853', // removed stray semicolon
    borderColor: '#fff',
    color: '#fff',
    '&:hover': { borderColor: '#df6cff' },
  },

  signUpPrompt: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
  },
  signUpButton: { color: '#df6cff' },
};
