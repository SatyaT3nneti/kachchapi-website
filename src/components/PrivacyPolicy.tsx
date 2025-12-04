import React from 'react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-dark-800 via-dark-700 to-purple-600 px-6 py-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-black text-white font-montserrat">
                Privacy Policy
              </h1>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 transition-colors p-2"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-200px)] font-montserrat">
            <div className="prose prose-sm md:prose-base max-w-none">
              <p className="text-gray-600 mb-4">
                <strong>Last Updated:</strong> December 2025
              </p>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kachchapi Technologies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, use our services, or interact with us.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We collect and maintain personal data that you share with us, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Demographic information (country, city)</li>
                  <li>Information provided when you request a callback or book a demo session</li>
                  <li>Information provided when you enroll in our courses or programs</li>
                  <li>Communication records and correspondence</li>
                  <li>Technical information (IP address, browser type, device information)</li>
                  <li>Usage data and website interaction information</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process your requests, enrollments, and transactions</li>
                  <li>To communicate with you about our services, updates, and promotional offers</li>
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To personalize your experience and deliver relevant content</li>
                  <li>To analyze usage patterns and improve our website functionality</li>
                  <li>To comply with legal obligations and protect our rights</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Protection and Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We are committed to keeping your collected data protected as per our security policies. We implement appropriate technical and organizational measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure data storage and backup procedures</li>
                  <li>Employee training on data protection and privacy</li>
                  <li>Compliance with industry-standard security practices</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal data, we will securely delete or anonymize it in accordance with our data retention policies.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>With service providers who assist us in operating our website and conducting our business</li>
                  <li>When required by law or to respond to legal processes</li>
                  <li>To protect our rights, property, or safety, or that of our users</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete information</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to or restrict the processing of your data</li>
                  <li>Data portability (receive your data in a structured format)</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  To exercise these rights, please contact us at <a href="mailto:support@kachchapi.com" className="text-primary-500 hover:underline">support@kachchapi.com</a>.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">8. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">9. Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">10. Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">11. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">12. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-2">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-1">
                    <strong>Kachchapi Technologies</strong>
                  </p>
                  <p className="text-gray-700 mb-1">
                    Ahub, Andhra University North Gate,<br />
                    Andhra University, Maddilapalem,<br />
                    Visakhapatnam, AP, INDIA 530013
                  </p>
                  <p className="text-gray-700 mb-1">
                    <strong>Email:</strong> <a href="mailto:support@kachchapi.com" className="text-primary-500 hover:underline">support@kachchapi.com</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> +91 93912 56768
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t">
            <button
              onClick={onClose}
              className="w-full md:w-auto px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors font-montserrat"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

