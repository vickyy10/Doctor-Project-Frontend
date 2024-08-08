import React,{useContext} from 'react';

import { AuthContext } from '../context/AuthContext';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';




const UserHome = () => {

  let {name} = useContext(AuthContext); 

  return (
    <div>
      <h2>hello {name}</h2>


      <div className="flex flex-wrap justify-center mt-8 w-full">
        {[...Array(3)].map((_, index) => (
          <MDBCard key={index} className="max-w-sm mx-4 mb-6">
            <MDBCardImage src='https://mdbootstrap.com/img/new/standard/nature/184.webp' position='top' alt='...' />
            <MDBCardBody>
              <MDBCardTitle>Card title</MDBCardTitle>
              <MDBCardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </MDBCardText>
              <MDBBtn href='#'>Button</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
