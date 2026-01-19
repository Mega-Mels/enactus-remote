import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Eswatini's Digital Generation
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Connecting you to global markets, remote skills, and a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/opportunities" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-md font-bold transition">
              View Job Openings
            </Link>
            <Link href="/e-learning" className="bg-white hover:bg-gray-100 text-black px-8 py-3 rounded-md font-bold transition">
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-yellow-500">500+</p>
            <p className="text-gray-600 uppercase text-sm tracking-wide">Students Trained</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-yellow-500">50+</p>
            <p className="text-gray-600 uppercase text-sm tracking-wide">Global Partners</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-yellow-500">E100k+</p>
            <p className="text-gray-600 uppercase text-sm tracking-wide">Impact Investment</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Enactus Remote?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">Remote Opportunities</h3>
              <p className="text-gray-600">
                Access curated remote job listings from international companies looking for Swati talent.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3">Skill Development</h3>
              <p className="text-gray-600">
                Industry-recognized certifications in tech, business, and digital skills to boost your profile.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Global Network</h3>
              <p className="text-gray-600">
                Connect with mentors, peers, and employers from around the world without leaving home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-500 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">Ready to Start Your Remote Career?</h2>
          <p className="text-black/80 text-lg mb-8">
            Join hundreds of Swati youth who are already building successful remote careers.
          </p>
          <Link href="/signup" className="bg-black text-white px-10 py-4 rounded-md font-bold text-lg hover:bg-gray-900 transition inline-block">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}