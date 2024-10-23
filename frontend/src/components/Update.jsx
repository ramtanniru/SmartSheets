import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { BACKEND_URL } from '@/utils/constants';

export default function Update({ isOpen, setOpen, id }) {
  // State to store user details
  const [userDetails, setUserDetails] = useState({
    id: '',
    name: '',
    role: '',
    team: '',
    status: '',
    age: '',
    avatar: '',
    email: ''
  });

  // Fetch the data when the modal opens
  useEffect(() => {
    if (isOpen && id) {
      fetchData(id);
    }
  }, [isOpen]);

  // Function to fetch user data by ID
  const fetchData = async (userId) => {
    try {
      const response = await fetch(`https://superjoin-be.onrender.com/api/data/${userId}`);
      const result = await response.json();
      setUserDetails(result); // Fill the form with user details
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Function to update data
  const updateData = async () => {
    try {
      // Update user details in the database
      const response = await fetch(`${BACKEND_URL}/api/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails),
      });
  
      const result = await response.json();
      console.log('User updated:', result);
  
      // Sync updated data to Google Sheets
      await fetch(BACKEND_URL+'/sync/db-to-sheet', {
        method: 'POST'
      });
  
      console.log('User data synced to Google Sheets');
      setOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };  

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Update User</ModalHeader>
            <ModalBody>
              {/* Form fields pre-filled with user data */}
              <Input label="Name" name="name" value={userDetails.name} onChange={handleChange} fullWidth />
              <Input label="Role" name="role" value={userDetails.role} onChange={handleChange} fullWidth />
              <Input label="Team" name="team" value={userDetails.team} onChange={handleChange} fullWidth />
              <Input label="Status" name="status" value={userDetails.status} onChange={handleChange} fullWidth />
              <Input label="Age" name="age" value={userDetails.age} onChange={handleChange} fullWidth />
              <Input label="Avatar URL" name="avatar" value={userDetails.avatar} onChange={handleChange} fullWidth />
              <Input label="Email" name="email" value={userDetails.email} onChange={handleChange} fullWidth />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => setOpen(false)}>
                Close
              </Button>
              <Button color="primary" onPress={updateData}>
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
