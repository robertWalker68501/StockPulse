'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';
import { signInWithEmail } from '@/lib/actions/auth.actions';

const SignInPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signInWithEmail(data);

      if (response.success) router.push('/');
    } catch (error) {
      console.error('Error', error);
      toast.error('Sign in failed', {
        description:
          error instanceof Error ? error.message : 'Failed to sign in',
      });
    }
  };

  return (
    <>
      <h1 className='form-title'>Welcome Back </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-5'
      >
        <InputField
          type='email'
          name='email'
          label='Email'
          placeholder='johndoe@mail.com'
          register={register}
          error={errors.email}
          validation={{
            required: 'Email is required',
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format',
          }}
        />

        <InputField
          type='password'
          name='password'
          label='Password'
          placeholder='********'
          register={register}
          error={errors.password}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          }}
        />

        <Button
          type='submit'
          disabled={isSubmitting}
          className='yellow-btn mt-5 w-full'
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText='Sign Up'
          href='/sign-up'
        />
      </form>
    </>
  );
};

export default SignInPage;
