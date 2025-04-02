export default function SuccessComponent() {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white w-full max-w-md rounded-xl shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-600">Success!</h2>
          <p className="text-gray-700">Your action was successful. You can now proceed with the next steps.</p>
          <div className="mt-8">
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  