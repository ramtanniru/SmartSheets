import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { BACKEND_URL } from '@/utils/constants';

export default function Create({ setOpen, isOpen }) {
  const [newUser, setNewUser] = useState({
    name: '',
    role: '',
    team: '',
    status: '',
    age: '',
    avatar: '',
    email: ''
  });

  // Update the form data
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Function to submit the form data to the backend
  const createData = async () => {
    try {
      // Add new user data to the database
      const response = await fetch(BACKEND_URL+'/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
  
      const result = await response.json();
      console.log('User created:', result);
  
      // Sync database changes to Google Sheets
      await fetch(BACKEND_URL+'/sync/db-to-sheet', {
        method: 'POST'
      });
  
      console.log('User added to Google Sheets');
      setOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create New User</ModalHeader>
            <ModalBody>
              <Input label="Name" name="name" onChange={handleChange} value={newUser.name} fullWidth />
              <Input label="Role" name="role" onChange={handleChange} value={newUser.role} fullWidth />
              <Input label="Team" name="team" onChange={handleChange} value={newUser.team} fullWidth />
              <Input label="Status" name="status" onChange={handleChange} value={newUser.status} fullWidth />
              <Input label="Age" name="age" onChange={handleChange} value={newUser.age} fullWidth />
              <Input label="Avatar" name="avatar" onChange={handleChange} value={newUser.avatar} fullWidth />
              <Input label="Email" name="email" onChange={handleChange} value={newUser.email} fullWidth />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => setOpen(false)}>
                Close
              </Button>
              <Button color="primary" onPress={createData}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
