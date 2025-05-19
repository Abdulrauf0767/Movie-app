import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiLoader, FiCheckCircle } from 'react-icons/fi';
import AuthLayout from './Authlayout';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
});

const Login = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      console.log(values);
      setShowSuccess(true);
      setSubmitting(false);
      resetForm();
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to access your personalized movie experience"
      linkText="Don't have an account? Sign up"
      linkPath="/signup"
    >
      <Formik
        initialValues={{ email: '', password: '', remember: false }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <Field
                  name="email"
                  type="email"
                  className={`w-full bg-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 ${
                    errors.email && touched.email
                      ? 'focus:ring-red-500 border-red-500'
                      : 'focus:ring-red-500 border-gray-600'
                  }`}
                  placeholder="your@email.com"
                />
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              <AnimatePresence>
                {errors.email && touched.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type="password"
                  className={`w-full bg-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 ${
                    errors.password && touched.password
                      ? 'focus:ring-red-500 border-red-500'
                      : 'focus:ring-red-500 border-gray-600'
                  }`}
                  placeholder="••••••••"
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              <AnimatePresence>
                {errors.password && touched.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.password}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <Field
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-red-500 rounded bg-gray-700 border-gray-600 focus:ring-red-500"
                />
                <span className="ml-2 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-red-500 hover:text-red-400">
                Forgot password?
              </a>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </motion.button>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center text-green-500 text-sm mt-4"
                >
                  <FiCheckCircle className="mr-2" />
                  Logged in successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
