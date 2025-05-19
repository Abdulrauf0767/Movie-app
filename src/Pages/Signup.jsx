import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiLoader } from 'react-icons/fi';
import AuthLayout from './Authlayout';

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short').max(50, 'Too long').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const Signup = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Join StreamFlix"
      subtitle="Create your account to start your movie journey"
      linkText="Already have an account? Log in"
      linkPath="/login"
    >
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <Field
                  name="name"
                  type="text"
                  className={`w-full bg-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 ${errors.name && touched.name ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500 border-gray-600'}`}
                  placeholder="John Doe"
                />
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
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
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <Field
                  name="email"
                  type="email"
                  className={`w-full bg-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 ${errors.email && touched.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500 border-gray-600'}`}
                  placeholder="your@email.com"
                />
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
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
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type="password"
                  className={`w-full bg-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 ${errors.password && touched.password ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500 border-gray-600'}`}
                  placeholder="••••••••"
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              {errors.password && touched.password && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.password}
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type="password"
                  className={`w-full bg-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 ${errors.confirmPassword && touched.confirmPassword ? 'focus:ring-red-500 border-red-500' : 'focus:ring-red-500 border-gray-600'}`}
                  placeholder="••••••••"
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.confirmPassword}
                </motion.div>
              )}
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
                  Creating account...
                </>
              ) : (
                'Sign up'
              )}
            </motion.button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Signup;