import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVerifyEmailQuery } from '../../api/AuthApi'; // adjust path if needed
import { Loader2, CheckCircle, XCircle, Mail } from 'lucide-react';

function Emailverification() {
  const { token } = useParams(); // ✅ get token from URL path
  const navigate = useNavigate();

  const [trigger, setTrigger] = React.useState(false);

  const { data, isLoading, isError, error } = useVerifyEmailQuery(token, {
    skip: !trigger,
  });

  React.useEffect(() => {
    if (data?.statusCode == 200) {
      navigate('/login');
    }
  }, [data, navigate]);

  const handleVerify = () => {
    if (token) {
      setTrigger(true);
    } else {
      alert('Invalid verification link.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs overflow-hidden">
        {/* Top colored section with icon */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 flex justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Mail className="w-8 h-8 text-white" />
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-5 text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-1">Email Verification</h1>
          <p className="text-xs text-gray-500 mb-5">Please confirm your email address to continue</p>
          
          {!data?.message && (
            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all duration-200 hover:shadow-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  Verifying...
                </>
              ) : (
                'Verify your email'
              )}
            </button>
          )}

          {data?.message === 'success' && (
            <div className="mt-4 mb-2 text-green-600 flex flex-col items-center gap-1">
              <CheckCircle className="w-10 h-10" />
              <span className="text-sm font-medium mt-2">Email verified!</span>
              <span className="text-xs text-gray-500">Redirecting to login...</span>
            </div>
          )}

          {isError && (
            <div className="mt-4 mb-2 text-red-500 flex flex-col items-center gap-1">
              <XCircle className="w-10 h-10" />
              <span className="text-sm font-medium mt-2">Verification failed</span>
              <span className="text-xs text-gray-500">
                {error?.data?.message || 'Verification failed.'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Emailverification;