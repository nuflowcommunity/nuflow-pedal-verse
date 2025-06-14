
import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link 
            to="#" 
            className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;
