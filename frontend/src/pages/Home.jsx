import React from 'react';

const Navbar = () => (
  <nav className="bg-indigo-600 text-white p-4 w-full">
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <a href="#features" className="mx-2 hover:text-gray-400">Features</a>
        <a href="#workflow" className="mx-2 hover:text-gray-400">Workflow</a>
        <a href="#faqs" className="mx-2 hover:text-gray-400">FAQs</a>
        <a href="#contact" className="mx-2 hover:text-gray-400">Contact</a>
      </div>
    </div>
  </nav>
);

const Landing = () => (
  <section className="bg-blue-50 text-center py-20 w-full">
    <h1 className="text-5xl font-bold mb-4">Blockchain for Aerospace Supply Chain Maintenance</h1>
    <p className="text-xl mb-6">Secure, Transparent, and Efficient Maintenance Tracking</p>
    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Get Started</button>
  </section>
);

const WorkflowDiagram = () => (
  <section id="workflow" className="py-20 bg-white w-full">
    <div className="container mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Maintenance Workflow Diagram</h2>
      <div className="flex justify-center">
        <svg width="100%" height="200" viewBox="0 0 1300 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10" fill="#3B82F6" />
            </marker>
          </defs>
          {[
            { x: 20, label: 'Asset Registration' },
            { x: 240, label: 'Inspection Scheduling' },
            { x: 460, label: 'Maintenance Execution' },
            { x: 680, label: 'Quality Verification' },
            { x: 900, label: 'Blockchain Recording' },
            { x: 1120, label: 'Reporting & Analytics' },
          ].map((step, idx) => (
            <React.Fragment key={idx}>
              <rect x={step.x} y="50" width="200" height="80" rx="10" fill="#E0F2FE" />
              <text x={step.x + 100} y="85" textAnchor="middle" fontSize="14" fontWeight="bold">{step.label}</text>
              {idx < 5 && (
                <line
                  x1={step.x + 200}
                  y1="90"
                  x2={step.x + 240}
                  y2="90"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  markerEnd="url(#arrow)"
                />
              )}
            </React.Fragment>
          ))}
        </svg>
      </div>
    </div>
  </section>
);

const FAQs = () => {
  const faqs = [
    { q: 'How does blockchain improve maintenance tracking?', a: 'Blockchain provides an immutable ledger for all maintenance records, ensuring transparency and trust.' },
    { q: 'Which blockchain platform is used?', a: 'AeroChain leverages Ethereum for its robust smart contract ecosystem.' },
    { q: 'Can I export maintenance logs?', a: 'Yes, logs can be exported as CSV or PDF for compliance and audits.' },
    { q: 'How are aircraft assets identified on-chain?', a: 'Each component has a unique digital ID linked to an immutable on-chain record.' },
    { q: 'Is real-time status tracking available?', a: 'You can view live updates of maintenance stages through the dashboard APIs.' },
    { q: 'What are the security measures?', a: 'Data is encrypted at rest and in transit, with P2P consensus securing ledger entries.' },
  ];
  return (
    <section id="faqs" className="bg-gray-50 py-20 w-full">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-2xl mx-auto">
          {faqs.map((item, idx) => (
            <details key={idx} className="border rounded-lg p-4 bg-white">
              <summary className="font-semibold cursor-pointer text-gray-800">{item.q}</summary>
              <p className="mt-2 text-gray-700">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="bg-gray-900 text-white py-12 w-full">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
      <div>
        <h3 className="text-lg font-semibold mb-2">Nimbus</h3>
        <p className="text-sm">Securing aerospace maintenance with blockchain innovation.</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
        <p className="text-sm">📧 <a href="mailto:support@aerochain.com" className="hover:underline">support@aerochain.com</a></p>
        <p className="text-sm">📞 <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
        <div className="flex justify-center md:justify-start space-x-4">
          <a href="https://twitter.com/aerochain" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com/company/aerochain" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/aerochain" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
    <div className="mt-8 text-center text-gray-500 text-xs">
      &copy; {new Date().getFullYear()} AeroChain. All rights reserved.
    </div>
  </footer>
);

const Home = () => (
  <>
    {/* <Navbar /> */}
    <Landing />
    <WorkflowDiagram />
    <FAQs />
    <Footer />
  </>
);

export default Home;