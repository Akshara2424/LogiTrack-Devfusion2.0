export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">LogiTrack</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Smart Supply Chain & Delivery Management Platform
        </p>
        
        <div className="space-x-4">
          <a 
            href="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Go to Login
          </a>
          <a 
            href="/dashboard" 
            className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition"
          >
            View Dashboard
          </a>
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Project is running successfully 
        </p>
      </div>
    </div>
  );
}