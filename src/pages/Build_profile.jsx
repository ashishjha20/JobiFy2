import React from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
const UserForm = () => {
  const initialValues = {
    name: '',
    phone_number: '',
    email: '',
    date_of_birth: '',
    gender: '',
    address: '',
    skills: [''],
    education: [{
      institution_name: '',
      degree: '',
      field_of_study: '',
      start_year: '',
      end_year: ''
    }],
    work_experience: [{
      company_name: '',
      position: '',
      start_year: '',
      end_year: '',
      description: ''
    }],
    availability: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    phone_number: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/adduserdetail`, values);
      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  return (
    <div>
        <NavBar/>
    
    <div>

    </div>
    <div className=" max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200 mt-10 ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Information Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="space-y-6">
            {/* Personal Information Fields */}
            <Field name="name" placeholder="Name" className="input-field" />
            <Field name="phone_number" placeholder="Phone Number" className="input-field" />
            <Field name="email" type="email" placeholder="Email" className="input-field" />
            <Field name="date_of_birth" type="date" placeholder="Date of Birth" className="input-field" />
            <Field name="gender" as="select" className="input-field">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Field>
            <Field name="address" placeholder="Address" className="input-field" />

            {/* Skills Section */}
            <FieldArray name="skills">
              {({ remove, push }) => (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Skills</h3>
                  {values.skills.map((_, index) => (
                    <div key={index} className="flex space-x-2 mb-2">
                      <Field name={`skills.${index}`} placeholder="Skill" className="input-field flex-grow" />
                      <button type="button" onClick={() => remove(index)} className="remove-button">Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push('')} className="add-button">Add Skill</button>
                </div>
              )}
            </FieldArray>

            {/* Education Section */}
            <FieldArray name="education">
              {({ remove, push }) => (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Educational Qualifications</h3>
                  {values.education.map((_, index) => (
                    <div key={index} className="space-y-4 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Field name={`education.${index}.institution_name`} placeholder="Institution Name" className="input-field" />
                      <Field name={`education.${index}.degree`} placeholder="Degree" className="input-field" />
                      <Field name={`education.${index}.field_of_study`} placeholder="Field of Study" className="input-field" />
                      <Field name={`education.${index}.start_year`} type="number" placeholder="Start Year" className="input-field" />
                      <Field name={`education.${index}.end_year`} type="number" placeholder="End Year" className="input-field" />
                      <button type="button" onClick={() => remove(index)} className="remove-button">Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ institution_name: '', degree: '', field_of_study: '', start_year: '', end_year: '' })} className="add-button">Add Education</button>
                </div>
              )}
            </FieldArray>

            {/* Work Experience Section */}
            <FieldArray name="work_experience">
              {({ remove, push }) => (
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Work Experience</h3>
                  {values.work_experience.map((_, index) => (
                    <div key={index} className="space-y-4 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Field name={`work_experience.${index}.company_name`} placeholder="Company Name" className="input-field" />
                      <Field name={`work_experience.${index}.position`} placeholder="Position" className="input-field" />
                      <Field name={`work_experience.${index}.start_year`} type="number" placeholder="Start Year" className="input-field" />
                      <Field name={`work_experience.${index}.end_year`} type="number" placeholder="End Year" className="input-field" />
                      <Field name={`work_experience.${index}.description`} placeholder="Job Description" className="input-field" />
                      <button type="button" onClick={() => remove(index)} className="remove-button">Remove</button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ company_name: '', position: '', start_year: '', end_year: '', description: '' })} className="add-button">Add Experience</button>
                </div>
              )}
            </FieldArray>

            {/* Availability */}
            <Field name="availability" placeholder="Availability (e.g., Full-time)" className="input-field" />

            <button type="submit" className="submit-button">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
    <div>
        <Footer/>
    </div>
    </div>
  );
};

export default UserForm;
