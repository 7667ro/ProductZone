import Footer from "../components/Footer";

export default function About() {
  return (
    <div>
    <div className="py-16 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="container m-auto px-6 text-gray-700 md:px-12 xl:px-6 mb-16">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-10 lg:items-center">
          <div className="md:w-5/12 lg:w-5/12">
            <img 
              src="../download.png" 
              alt="About ProductZone" 
              className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="md:w-7/12 lg:w-6/12">
            <h1 className='text-4xl font-extrabold text-slate-800 italic mb-6'>Welcome to ProductZone!</h1>
            <p className='mb-6 text-lg leading-relaxed'>
              ProductZone is your go-to platform for managing products effortlessly. Whether you want to search for the latest gadgets, add new items, edit product details, or remove outdated listings, we've got you covered.
            </p>
            <p className='mb-6 text-lg leading-relaxed'>
              Our platform is designed for ease of use, featuring seamless Google Authentication and secure JWT-based access control, ensuring your data stays protected while you manage your products efficiently.
            </p>
            <p className='text-lg font-semibold text-slate-800 mb-4'>With ProductZone, you can:</p>
            <ul className='list-disc pl-6 space-y-3 text-gray-800 text-lg'>
              <li>🔍 Search for products quickly with advanced filtering options.</li>
              <li>📝 Add new products with detailed descriptions and images.</li>
              <li>✏️ Edit existing products to keep information up to date.</li>
              <li>🗑️ Delete unwanted products securely with authentication in place.</li>
              <li>⚡ Enjoy a fast, secure, and user-friendly experience.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-20"> 
        <Footer /> 
      </div>
    </div>

    </div>
  );
}