'use client';

import { useForm } from 'react-hook-form';

import FooterLink from '@/components/forms/FooterLink';
import InputField from '@/components/forms/InputField';
import { Button } from '@/components/ui/button';

const SignInPage = () => {
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
      console.log(data);
    } catch (error) {
      console.error('Error', error);
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
          validation={{ required: 'Password is required', minLength: 8 }}
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
