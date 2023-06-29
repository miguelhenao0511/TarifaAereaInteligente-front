import React from 'react';
import { Form } from 'react-bootstrap';

const UserForm = () => {
    const user = {firstName: '1', lastName: '2', email: '3', agreedToTerms: true}
  return (
    <Form>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" defaultValue={user.firstName} readOnly />
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" defaultValue={user.lastName} readOnly />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" defaultValue={user.email} readOnly />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Agree to Terms and Conditions" checked={user.agreedToTerms} readOnly />
      </Form.Group>
    </Form>
  );
};

export default UserForm;