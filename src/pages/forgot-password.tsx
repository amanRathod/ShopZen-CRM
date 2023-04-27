import * as y from "yup";
import LinkedItem from "@elements/LinkedItem";
import AuthPage from "@layouts/page/AuthPage";
import Form from '@components/form';
import Input from '@elements/form/Input';

const forgotPasswordSchema = y.object().shape({
   email: y.string().email("Invalid email").required("Email is required"),
 });
 
 const ForgotPassword = () => {
 
   return (
     <AuthPage
       pageTitle="Forgot Password"
       title="Forgot your Password?"
       text="We'll send a link to your email to reset your password."
     >
       <Form
         className="space-y-6"
         schema={forgotPasswordSchema}
         initialValues={{
           email: "",
         }}
         submitButton={{ title: "Send Reset Link" }}
       >
         <Input name="email" label="Email" type="email" required />
 
         <div className="text-sm text-right">
           <LinkedItem
             href="/login"
             className="font-medium text-info-500 hover:text-info-400"
           >
             Know your password? <span className='text-info-700 hover:underline'>Login</span>
           </LinkedItem>
         </div>
       </Form>
     </AuthPage>
   );
 };
 
 export default ForgotPassword;
 