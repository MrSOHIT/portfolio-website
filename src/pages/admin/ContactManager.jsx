"use client"

import { useState, useEffect } from "react"
import { FaEnvelope, FaPhone, FaUser, FaTrash, FaReply, FaSearch, FaFilter, FaExclamationCircle, FaSave } from "react-icons/fa"

const ContactManager = () => {
  // Mock contact data
  const mockContacts = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      subject: "Website Redesign Inquiry",
      message: "Hello, I'm interested in discussing a potential redesign for our company website. Could you provide some information about your services and availability?",
      date: "2025-03-15",
      status: "Unread",
      replies: [],
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.w@company.org",
      phone: "+1 (555) 987-6543",
      subject: "Logo Design Project",
      message: "Hi there! We're launching a new product line and need a fresh logo. I'd like to discuss your design process and pricing. Looking forward to hearing from you!",
      date: "2025-03-18",
      status: "Read",
      replies: [],
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@tech.co",
      phone: "+1 (555) 234-5678",
      subject: "Mobile App Development",
      message: "I'm looking for a developer to help create a mobile app for my business. Could we schedule a call to discuss requirements and timeline?",
      date: "2025-03-20",
      status: "Replied",
      replies: [
        {
          id: 1,
          date: "2025-03-21",
          message: "Hi Michael, I'd be happy to discuss your mobile app project. How about a call tomorrow at 2pm? Let me know if that works for you.",
          sender: "Admin",
        }
      ],
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emily.j@startup.io",
      phone: "+1 (555) 345-6789",
      subject: "Consultation Request",
      message: "I'm launching a startup and need help with branding. I'd love to learn more about your services and see if we're a good fit to work together.",
      date: "2025-03-22",
      status: "Unread",
      replies: [],
    },
    {
      id: 5,
      name: "David Martinez",
      email: "d.martinez@email.com",
      phone: "+1 (555) 456-7890",
      subject: "Portfolio Review",
      message: "I really like your portfolio! I'm working on a non-profit project and was wondering if you'd be interested in collaborating. We have a limited budget but the cause is meaningful.",
      date: "2025-03-23",
      status: "Read",
      replies: [],
    }
  ];

  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentContact, setCurrentContact] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [contactInfo, setContactInfo] = useState({
    email: "contact@yourwebsite.com",
    phone: "+1 (555) 123-4567",
    heading: "Let's talk about your project",
    description: "Fill out the form and I'll get back to you as soon as possible.",
    formRecipient: "admin@yourwebsite.com",
    successMessage: "Thank you! Your message has been sent successfully."
  })
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setContacts(mockContacts)
      setLoading(false)
    }, 800)
  }, [])

  const handleViewContact = (contact) => {
    setCurrentContact(contact)
    setReplyText("")
    setShowModal(true)

    // If contact is unread, mark it as read
    if (contact.status === "Unread") {
      setContacts(contacts.map((c) => (c.id === contact.id ? { ...c, status: "Read" } : c)))
    }
  }

  const handleDeleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact submission?")) {
      setContacts(contacts.filter((contact) => contact.id !== id))
    }
  }

  const handleReply = () => {
    if (!replyText.trim()) return

    const reply = {
      id: currentContact.replies.length + 1,
      date: new Date().toISOString().split("T")[0],
      message: replyText,
      sender: "Admin",
    }

    // Update contact with new reply and change status
    setContacts(
      contacts.map((contact) =>
        contact.id === currentContact.id
          ? {
              ...contact,
              replies: [...contact.replies, reply],
              status: "Replied",
            }
          : contact,
      ),
    )

    setCurrentContact({
      ...currentContact,
      replies: [...currentContact.replies, reply],
      status: "Replied",
    })

    setReplyText("")
  }

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactInfoSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would save this to a database
    setIsSaved(true)
    
    setTimeout(() => {
      setIsSaved(false)
    }, 3000)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || contact.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e6596]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Contact Information Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Contact Information Settings</h2>
          
          {isSaved && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center">
              <FaSave className="mr-2" />
              Changes saved successfully!
            </div>
          )}
        </div>

        <form onSubmit={handleContactInfoSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e6596] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={contactInfo.phone}
                onChange={handleContactInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e6596] focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Contact Heading
              </label>
              <input
                type="text"
                name="heading"
                value={contactInfo.heading}
                onChange={handleContactInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e6596] focus:border-transparent"
                placeholder="Let's talk about your project"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Contact Description
              </label>
              <textarea
                name="description"
                value={contactInfo.description}
                onChange={handleContactInfoChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e6596] focus:border-transparent"
                placeholder="Fill out the form and I'll get back to you as soon as possible."
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Recipient
              </label>
              <input
                type="email"
                name="formRecipient"
                value={contactInfo.formRecipient}
                onChange={handleContactInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e6596] focus:border-transparent"
                placeholder="Where to send form submissions"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Success Message
              </label>
              <input
                type="text"
                name="successMessage"
                value={contactInfo.successMessage}
                onChange={handleContactInfoChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e6596] focus:border-transparent"
                placeholder="Thank you! Your message has been sent successfully."
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#1e6596] text-white px-6 py-3 rounded-lg hover:bg-[#e0202d] transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Contact Submissions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contact Submissions</h1>
          <p className="text-gray-600">Manage and respond to contact form submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1e6596] focus:border-[#1e6596]"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="status" className="sr-only">
              Status
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                id="status"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#1e6596] focus:border-[#1e6596]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {filteredContacts.length} {filteredContacts.length === 1 ? "Contact" : "Contacts"}
          </h2>
        </div>
        {filteredContacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <FaUser className="text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">{contact.subject}</div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">{contact.message}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(contact.date)}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          contact.status === "Unread"
                            ? "bg-red-100 text-red-800"
                            : contact.status === "Read"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="text-[#1e6596] hover:text-[#e0202d] mr-3"
                        title="View & Reply"
                      >
                        <FaReply />
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <FaExclamationCircle className="text-gray-400 text-4xl mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No contacts found</h3>
            <p className="text-gray-500">
              {searchTerm ? `No contacts matching "${searchTerm}"` : "There are no contact submissions yet"}
            </p>
          </div>
        )}
      </div>

      {/* Contact View/Reply Modal */}
      {showModal && currentContact && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                      <span>Contact Details</span>
                      <span
                        className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          currentContact.status === "Unread"
                            ? "bg-red-100 text-red-800"
                            : currentContact.status === "Read"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {currentContact.status}
                      </span>
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <FaUser className="text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-700">{currentContact.name}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <FaEnvelope className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{currentContact.email}</span>
                        </div>
                        {currentContact.phone && (
                          <div className="flex items-center mb-2">
                            <FaPhone className="text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700">{currentContact.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500">Submitted on {formatDate(currentContact.date)}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-md font-medium text-gray-700">{currentContact.subject}</h4>
                        <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{currentContact.message}</p>
                      </div>

                      {currentContact.replies.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-md font-medium text-gray-700 mb-2">Previous Replies</h4>
                          <div className="space-y-3">
                            {currentContact.replies.map((reply) => (
                              <div key={reply.id} className="bg-blue-50 p-3 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-medium text-blue-700">{reply.sender}</span>
                                  <span className="text-xs text-gray-500">{formatDate(reply.date)}</span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.message}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <label htmlFor="reply" className="block text-sm font-medium text-gray-700 mb-1">
                          Reply
                        </label>
                        <textarea
                          id="reply"
                          rows="4"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#1e6596] focus:border-[#1e6596]"
                          placeholder="Type your reply here..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#1e6596] text-base font-medium text-white hover:bg-[#e0202d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e6596] sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Reply
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactManager