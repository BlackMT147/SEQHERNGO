import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
