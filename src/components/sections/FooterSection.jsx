import { FaPhoneAlt, FaHome, FaEnvelope } from "react-icons/fa";

export default function FooterSection({ section }) {
  return (
    <div className="space-y-4">
      {section.content?.footerDesign === "Дизайн 2" ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative bg-white rounded-2xl shadow-lg p-8 w-72 text-center">
              <div className="mb-4 flex justify-center">
                <FaPhoneAlt className="text-4xl text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Phone</h3>
              <p className="text-neutral-600 whitespace-pre-line">{section.content?.phone || ""}</p>
            </div>
            <div className="relative bg-white rounded-2xl shadow-lg p-8 w-72 text-center">
              <div className="mb-4 flex justify-center">
                <FaHome className="text-4xl text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Address</h3>
              <p className="text-neutral-600 whitespace-pre-line">{section.content?.address || ""}</p>
            </div>
            <div className="relative bg-white rounded-2xl shadow-lg p-8 w-72 text-center">
              <div className="mb-4 flex justify-center">
                <FaEnvelope className="text-4xl text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Email</h3>
              <p className="text-neutral-600 whitespace-pre-line">{section.content?.email || ""}</p>
            </div>
          </div>
        </div>
      ) : (
        <footer className="w-full bg-gray-900 py-10 px-4 rounded-xl shadow-lg mt-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-400 mb-2">{section.content?.title || 'Холбоо барих'}</h2>
            {section.content?.description && <p className="text-center text-gray-300 mb-8">{section.content.description}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* И-мэйл */}
              {section.content?.email && (
                <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="bg-indigo-500 p-3 rounded-full mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">И-мэйл</div>
                  <div className="text-gray-400 text-sm">{section.content.email}</div>
                </div>
              )}
              {/* Утас */}
              {section.content?.phone && (
                <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="bg-green-500 p-3 rounded-full mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">Утас</div>
                  <div className="text-gray-400 text-sm">{section.content.phone}</div>
                </div>
              )}
              {/* Байршил */}
              {section.content?.address && (
                <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="bg-red-500 p-3 rounded-full mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 10c-4.418 0-8-4.03-8-9 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.97-3.582 9-8 9z" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">Байршил</div>
                  <div className="text-gray-400 text-sm">{section.content.address}</div>
                </div>
              )}
            </div>
            {(section.content?.facebook || section.content?.instagram) && (
              <div className="flex justify-center gap-4 mt-4">
                {section.content?.facebook && (
                  <a href={section.content.facebook} className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
                  </a>
                )}
                {section.content?.instagram && (
                  <a href={section.content.instagram} className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#fff"/></svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
} 