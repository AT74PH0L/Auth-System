import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  alternativeLink: {
    text: string;
    to: string;
  };
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  alternativeLink,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
        <div className="text-center mt-4">
          <Link
            to={alternativeLink.to}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {alternativeLink.text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
