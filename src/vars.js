export const calculateAge = (birthDate) => {
    const currentDate = new Date(); // Get the current date
    const birthDateObj = new Date(birthDate); // Convert the birth date to a Date object
  
    // Calculate age based on the year difference
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDateObj.getMonth();
    
    // If the current month is before the birth month, or it's the birth month but before the birthday, subtract 1
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDateObj.getDate())) {
      age--;
    }
  
    return age;
  };

export const birthDate = "1882-12-19";      // Birthdate (Year-Month-Day)

export const emergencias = "1043";          // Numero total de emergências
export const kmperco = "52145";             // Kilometros percorridos
export const qab = "104";                   // Quantidade Atual de Bombeiros
export const viat = "41";                  // Quantidade Atual de Viaturas
export const age = calculateAge(birthDate); // Calculated Age