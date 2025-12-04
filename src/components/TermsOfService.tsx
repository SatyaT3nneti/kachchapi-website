import React from 'react';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-dark-800 via-dark-700 to-purple-600 px-6 py-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-black text-white font-montserrat">
                Terms of Service
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
                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing and using the Kachchapi Technologies website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kachchapi Technologies provides online education and training services, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>AI/ML, Web Development, Mobile Development, and other technology courses</li>
                  <li>Project-based training and mentorship programs</li>
                  <li>Career guidance and interview preparation services</li>
                  <li>Corporate training and academic project mentorship</li>
                  <li>Innovation Hub programs and VR Academy experiences</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Accounts and Registration</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  To access certain services, you may be required to create an account or provide personal information. You agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Collection and Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We collect and maintain personal data that you share with us. By using our services, you acknowledge and consent to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Our collection, use, and storage of your personal information</li>
                  <li>The processing of your data as described in our Privacy Policy</li>
                  <li>Our commitment to keep your collected data protected as per our security policies</li>
                  <li>The use of your information to provide and improve our services</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  For detailed information about our data practices, please review our <strong>Privacy Policy</strong>.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">5. Payment and Refund Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  If you purchase any of our paid services:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>You agree to pay all fees associated with your purchase</li>
                  <li>All fees are non-refundable unless otherwise stated or required by law</li>
                  <li>We reserve the right to change our pricing at any time</li>
                  <li>Refund requests will be evaluated on a case-by-case basis</li>
                  <li>You are responsible for any applicable taxes</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">6. Intellectual Property Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  All content, materials, courses, and intellectual property on our platform are owned by Kachchapi Technologies or our licensors. You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Copy, reproduce, or distribute our content without authorization</li>
                  <li>Modify, adapt, or create derivative works from our materials</li>
                  <li>Use our content for commercial purposes without permission</li>
                  <li>Remove any copyright or proprietary notices</li>
                  <li>Share your account access with others</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">7. User Conduct</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  You agree to use our services only for lawful purposes and in accordance with these terms. You agree not to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit harmful, offensive, or inappropriate content</li>
                  <li>Interfere with or disrupt our services or servers</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated systems to access our services without permission</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">8. Course Enrollment and Completion</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  When you enroll in our courses:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>You gain access to course materials for the duration specified</li>
                  <li>Completion certificates may be issued upon successful course completion</li>
                  <li>We reserve the right to modify course content, schedules, or instructors</li>
                  <li>Access to courses may be revoked for violation of these terms</li>
                  <li>Placement assistance is provided subject to successful completion and availability</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">9. Disclaimer of Warranties</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or completely secure. While we strive to provide accurate and up-to-date information, we make no warranties regarding the accuracy, completeness, or reliability of our content.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">10. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the maximum extent permitted by law, Kachchapi Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">11. Indemnification</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree to indemnify, defend, and hold harmless Kachchapi Technologies, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services, violation of these terms, or infringement of any rights of another party.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">12. Termination</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We reserve the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Terminate or suspend your account at any time for violation of these terms</li>
                  <li>Discontinue or modify any service with reasonable notice</li>
                  <li>Refuse service to anyone for any reason at any time</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  You may terminate your account at any time by contacting us at <a href="mailto:support@kachchapi.com" className="text-primary-500 hover:underline">support@kachchapi.com</a>.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">13. Governing Law and Dispute Resolution</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Visakhapatnam, Andhra Pradesh, India.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">14. Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to modify these Terms of Service at any time. We will notify users of material changes by posting the updated terms on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">15. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-2">
                  If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfService;

