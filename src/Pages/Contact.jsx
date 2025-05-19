import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiSend, FiMoon, FiSun, FiUser, FiMail, FiMessageSquare } from 'react-icons/fi';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  subject: Yup.string().min(5, 'Too short').max(100, 'Too long').required('Required'),
  message: Yup.string().min(10, 'Minimum 10 characters').required('Required'),
});

const ContactPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      setSubmitted(true);
      resetForm();
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent"
        >
          Movie app
        </motion.h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-200 text-gray-800'}`}
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12 flex flex-col items-center"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`w-full max-w-2xl rounded-xl shadow-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className={`p-1 bg-gradient-to-r from-purple-500 to-red-500`}></div>
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Us</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>We'd love to hear from movie enthusiasts like you!</p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`p-4 mb-6 rounded-lg ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}
              >
                Message sent successfully! We'll get back to you soon.
              </motion.div>
            ) : (
              <Formik
                initialValues={{ name: '', email: '', subject: '', message: '' }}
                validationSchema={ContactSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-6">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="name">
                        Full Name
                      </label>
                      <div className="relative">
                        <Field
                          name="name"
                          type="text"
                          className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.name && touched.name ? 'border-red-500' : ''}`}
                          placeholder="Your name"
                        />
                        <FiUser className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      {errors.name && touched.name && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.name}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="email">
                        Email
                      </label>
                      <div className="relative">
                        <Field
                          name="email"
                          type="email"
                          className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                          placeholder="your@email.com"
                        />
                        <FiMail className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      {errors.email && touched.email && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.email}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="subject">
                        Subject
                      </label>
                      <Field
                        name="subject"
                        type="text"
                        className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.subject && touched.subject ? 'border-red-500' : ''}`}
                        placeholder="What's this about?"
                      />
                      {errors.subject && touched.subject && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.subject}
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} htmlFor="message">
                        Message
                      </label>
                      <div className="relative">
                        <Field
                          name="message"
                          as="textarea"
                          rows="5"
                          className={`w-full ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.message && touched.message ? 'border-red-500' : ''}`}
                          placeholder="Your cinematic thoughts..."
                        />
                        <FiMessageSquare className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
                      {errors.message && touched.message && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.message}
                        </motion.div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center shadow-lg"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FiSend className="mr-2" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </motion.div>
      </motion.main>

      <footer className={`container mx-auto px-4 py-6 text-center ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        © {new Date().getFullYear()} Cinematic. All rights reserved.
      </footer>
    </div>
  );
};

export default ContactPage;