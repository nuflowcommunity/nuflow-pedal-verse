
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';

const LoginAlerts = () => {
  const [searchParams] = useSearchParams();

  const successMessage = searchParams.get('message') === 'password_reset_success';
  const errorMessage = searchParams.get('error') === 'invalid_reset_link';

  if (!successMessage && !errorMessage) {
    return null;
  }

  return (
    <>
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-sm text-green-800">
              Senha redefinida com sucesso! Faça login com sua nova senha.
            </span>
          </div>
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-sm text-red-800">
              Link de redefinição inválido ou expirado.
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginAlerts;
