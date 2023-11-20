import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
render(<ContactForm />);
const firstNameError = screen.queryByText(/Error: firstname must have/i)
expect(firstNameError).toBeNull()
const lastNameError = screen.queryByText(/Error: lastname is a required/i)
expect(lastNameError).toBeNull()
const emailError = screen.queryByText(/Error: email must be/i)
expect(emailError).toBeNull()
});

test('renders the contact form header', () => {
render(<ContactForm />)

const header = screen.getByText(/Contact Form/i)
expect(header).toBeVisible()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
render(<ContactForm />)
const firstNameInput = screen.getByLabelText(/first name/i)
userEvent.type(firstNameInput, 'wwww')
const firstNameError = screen.getByText(/Error: firstname must have/i)
expect(firstNameError).toBeVisible()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
render(<ContactForm />)
const submitButton = screen.getByRole('button')
userEvent.click(submitButton)
const firstNameError = screen.queryByText(/Error: firstname must have/i)
expect(firstNameError).toBeVisible()
const lastNameError = screen.queryByText(/Error: lastname is a required/i)
expect(lastNameError).toBeVisible()
const emailError = screen.queryByText(/Error: email must be/i)
expect(emailError).toBeVisible()
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
render(<ContactForm />)
const firstNameInput = screen.getByLabelText(/first name/i)
const lastNameInput = screen.getByLabelText(/last name/i)
userEvent.type(firstNameInput, 'Samuel')
userEvent.type(lastNameInput, 'Sanchez')
const submitButton = screen.getByRole('button')
userEvent.click(submitButton)
const emailError = screen.getByText(/Error: email must be/i)
expect(emailError).toBeVisible()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
render(<ContactForm />)
const emailInput = screen.getByLabelText(/email/i)
userEvent.type(emailInput, 'Samuel@samuel')
const emailError = screen.getByText(/Error: email must be/i)
expect(emailError).toBeVisible()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
render(<ContactForm />)
const submitButton = screen.getByRole('button')
userEvent.click(submitButton)
const lastNameError = screen.queryByText(/Error: lastname is a required/i)
expect(lastNameError).toBeVisible()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
render(<ContactForm/>)
const firstNameInput = screen.getByLabelText(/first name/i)
const lastNameInput = screen.getByLabelText(/last name/i)
const emailInput = screen.getByLabelText(/email/i)
const submitButton = screen.getByRole('button')

userEvent.type(firstNameInput, 'Samuel')
userEvent.type(lastNameInput, 'Sanchez')
userEvent.type(emailInput, 'thisemailworks@gmail.com')
userEvent.click(submitButton)

const displayFirstName = screen.getByText(/Samuel/i)
const displayLastName = screen.getByText(/Sanchez/i)
const displayEmailName = screen.getByText(/thisemailworks/i)

expect(displayFirstName).toBeVisible()
expect(displayLastName).toBeVisible()
expect(displayEmailName).toBeVisible()

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/Message/i)
    const submitButton = screen.getByRole('button')
    
    userEvent.type(firstNameInput, 'Samuel')
    userEvent.type(lastNameInput, 'Sanchez')
    userEvent.type(emailInput, 'thisemailworks@gmail.com')
    userEvent.type(messageInput, 'Hello World!')
    userEvent.click(submitButton)
    
    const displayFirstName = screen.getByText(/Samuel/i)
    const displayLastName = screen.getByText(/Sanchez/i)
    const displayEmailName = screen.getByText(/thisemailworks/i)
    const displayMessage = screen.getByText(/hello world/i)

    expect(displayFirstName).toBeVisible()
    expect(displayLastName).toBeVisible()
    expect(displayEmailName).toBeVisible()
    expect(displayMessage).toBeVisible()
});
