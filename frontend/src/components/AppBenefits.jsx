import React from 'react'

const AppBenefits = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {/* Left Card */}
      <div className="bg-gray-50 rounded-2xl flex flex-col justify-between overflow-hidden relative p-8 md:p-10">
        <div className="flex flex-col gap-4 text-center md:text-left">
          {/* Small heading */}
          <h4 className="text-sm font-semibold text-gray-500">
            Automated content
          </h4>
          {/* Main heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            A professional blog. Generated for you
          </h2>
          {/* Description */}
          <p className="text-base md:text-lg text-gray-500">
            Create a beautiful blog in just a few clicks using powerful AI.
            Fonts, colors, a blog homepage, polished layouts — all done for
            you in under a minute.
          </p>
          {/* Learn more link */}
          <div>
            <a
              href="#"
              className="inline-block mt-2 text-indigo-600 font-semibold hover:underline"
            >
              Learn more
            </a>
          </div>
        </div>
        {/* Example image (replace with your own) */}
        <div className="mt-6 w-full h-auto">
          <img
            src="https://via.placeholder.com/400x300"
            alt="AI Blog Preview"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right Card */}
      <div className="bg-gray-50 rounded-2xl flex flex-col justify-between overflow-hidden relative p-8 md:p-10">
        {/* Example “hero” or decorative image(s) up top — replace or remove as needed */}
        <div className="relative w-full h-auto mb-6">
          {/* Example big image */}
          <img
            src="https://via.placeholder.com/600x400"
            alt="Website essentials illustration"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 text-center md:text-left max-w-3xl mx-auto">
          {/* Small heading */}
          <h4 className="text-sm font-semibold text-gray-500">
            Website essentials
          </h4>
          {/* Main heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            More than a website
          </h2>
          {/* Description */}
          <p className="text-base md:text-lg text-gray-500">
            Your website comes with hosting, analytics, top-notch security
            protection, and a free custom domain name with every subscription plan.
          </p>
          {/* Learn more link */}
          <div>
            <a
              href="#"
              className="inline-block mt-2 text-indigo-600 font-semibold hover:underline"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBenefits
