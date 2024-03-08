// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from "formik";
// import * as yup from "yup";

// const ContactForm = () => {
//   const form = useRef();
//   const navigate = useNavigate();

//   const formSchema = yup.object().shape({
//     from_name: yup.string().required("Name is required"),
//     reply_to: yup.string().email().required("Email address is required"),
//     massage: yup.string().required("Message is required"),
//   })

//   const formik = useFormik({
//     initialValues: {
//       from_name:'',
//       reply_to:'',
//       message:'',
//     },
//     validationSchema: formSchema,
//     onSubmit: (values) => {
//     emailjs.send('service_jz3d31c', 'template_avspnq3', values, '2CBV5usGCJRMr4WbB')
//     .then((result) => {
//         alert("Your Message Has Been Sent")
//         navigate("/")
//     }, (error) => {
//         alert("Your Message Cannot Be Sent")
//     });
//     },
//   })



 return (
   <form className='ui form' ref={form} onSubmit={formik.onSubmit}>
     <div className='field'>
        <label>Name</label>
        <input type="text" name="from_name" />
     </div>
     <div className='field'>
        <label>Email</label>
        <input type="text" name="reply_to" />
     </div>   
     <div className='field'>
        <label>Message</label>
        <textarea rows="6" type="text" name="message" />
     </div>
     <button className="ui button teal" type="submit">Submit</button>
   </form>
 );
};

export default ContactForm;



// const sendEmail = (e) => {
//   e.preventDefault();
//   if(window.confirm("Are you sure you want to send this email?")){ 
//   emailjs.sendForm('service_jz3d31c', 'template_avspnq3', form.current, '2CBV5usGCJRMr4WbB')
//     .then((result) => {
//         alert("Your Message Has Been Sent")
//         navigate("/")
//     }, (error) => {
//         alert("Your Message Cannot Be Sent")
//     });
//   };
// };