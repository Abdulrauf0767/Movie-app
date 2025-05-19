import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLoader } from 'react-icons/fi';
import AuthLayout from './Authlayout';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short').required('Required'),
});

const Login = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
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
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;