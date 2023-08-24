import React from 'react'

const CalculatedAge = ({ dob_year, dob_month, dob_day }) => {
  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(dob_year, dob_month - 1, dob_day); // Month is zero-based
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  return <span>{calculateAge()}</span>;
};

export default CalculatedAge;