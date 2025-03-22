import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';

import { InputField } from '@/components/Input';
import { SignInFormInputs, signInSchema } from '@/lib/validation';
import { loginUser } from '@/store/slices/authSlice';
import { useAppDispatch } from '@/store/store';

const SignInForm: FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    await dispatch(loginUser(data)).unwrap();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        id="email"
        label="Email address"
        type="email"
        className="mb-4"
        {...register('email')}
        error={errors.email?.message}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        className="mb-6"
        {...register('password')}
        error={errors.password?.message}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default SignInForm;
