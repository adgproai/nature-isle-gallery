import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import logo from '@/assets/logo.png';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignUpFormValues = z.infer<typeof signUpSchema>;

const Auth = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [debugHit, setDebugHit] = useState<string>('');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  

  useEffect(() => {
    if (user) {
      navigate('/gallery');
    }
  }, [user, navigate]);

  // Debug instrumentation: detect click interception/overlays on signup fields.
  // (Visible in console AND on-page so you don't need DevTools.)
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (isLogin) return;
      const card = cardRef.current;
      if (!card) return;

      const target = e.target as HTMLElement | null;
      if (!target || !card.contains(target)) return;

      const topEl = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      const topStyle = topEl ? window.getComputedStyle(topEl) : null;

      const payload = {
        x: e.clientX,
        y: e.clientY,
        targetTag: target.tagName,
        targetId: target.id,
        topTag: topEl?.tagName,
        topId: topEl?.id,
        topPointerEvents: topStyle?.pointerEvents,
        topZIndex: topStyle?.zIndex,
        topClass: topEl?.className,
      };

      setDebugHit(JSON.stringify(payload, null, 2));
      // eslint-disable-next-line no-console
      console.log('[Auth Debug] pointerdown', payload);
    };

    document.addEventListener('pointerdown', handler, true);
    return () => document.removeEventListener('pointerdown', handler, true);
  }, [isLogin]);

  // Reset forms when switching between login and signup
  const handleToggleMode = () => {
    // Ensure no element is holding focus during switch
    (document.activeElement as HTMLElement | null)?.blur?.();
    loginForm.reset();
    signUpForm.reset();
    setIsLogin(!isLogin);
  };

  const onLoginSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    const { error } = await signIn(data.email, data.password);
    if (!error) {
      navigate('/gallery');
    }
    setLoading(false);
  };

  const onSignUpSubmit = async (data: SignUpFormValues) => {
    setLoading(true);
    const { error } = await signUp(data.email, data.password, data.fullName);
    if (!error) {
      navigate('/gallery');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist to-background">
      <Navigation />
      <div className="pt-32 pb-24 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card ref={cardRef} className="p-8 relative isolate z-10">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="EmeraldPics Logo" className="w-20 h-20 object-contain" />
            </div>
            
            <h1 className="font-serif text-3xl font-bold text-center mb-2 text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              {isLogin ? 'Sign in to upload photos' : 'Sign up to start uploading'}
            </p>

            {!isLogin && (
              <div className="mb-6 rounded-md border border-border bg-muted/40 p-3 text-left">
                <p className="text-xs font-medium text-foreground mb-2">Debug: click a field; this shows what element is on top.</p>
                <pre className="text-[11px] leading-snug whitespace-pre-wrap break-words text-muted-foreground">
                  {debugHit || 'Click Full Name or Email…'}
                </pre>
              </div>
            )}

            {isLogin ? (
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 relative z-10">
                <div className="space-y-2 text-left relative z-10">
                  <label htmlFor="login-email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="relative z-10 pointer-events-auto"
                    {...loginForm.register('email')}
                  />
                  {loginForm.formState.errors.email?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {String(loginForm.formState.errors.email.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-left relative z-10">
                  <label htmlFor="login-password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="relative z-10 pointer-events-auto"
                    {...loginForm.register('password')}
                  />
                  {loginForm.formState.errors.password?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {String(loginForm.formState.errors.password.message)}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : 'Sign In'}
                </Button>
              </form>
            ) : (
              <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="space-y-4 relative z-10">
                <div className="space-y-2 text-left relative z-10">
                  <label htmlFor="signup-name" className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    className="relative z-10 pointer-events-auto"
                    {...signUpForm.register('fullName')}
                  />
                  {signUpForm.formState.errors.fullName?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {String(signUpForm.formState.errors.fullName.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-left relative z-10">
                  <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="relative z-10 pointer-events-auto"
                    {...signUpForm.register('email')}
                  />
                  {signUpForm.formState.errors.email?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {String(signUpForm.formState.errors.email.message)}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-left relative z-10">
                  <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="relative z-10 pointer-events-auto"
                    {...signUpForm.register('password')}
                  />
                  {signUpForm.formState.errors.password?.message && (
                    <p className="text-sm font-medium text-destructive">
                      {String(signUpForm.formState.errors.password.message)}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : 'Sign Up'}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={handleToggleMode}
                className="text-sm text-primary hover:underline"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
