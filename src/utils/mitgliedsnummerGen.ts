// This function generates a member number based on the first letters of the forename and surname, a random 4-digit number, and a random lowercase letter.
export function mitgliedsnummerGen(forename: string, surname: string) {
  return (
    surname.charAt(0) +
    forename.charAt(0) +
    (1000 + Math.floor(Math.random() * Math.floor(9000))) +
    String.fromCharCode(97 + Math.floor(Math.random() * Math.floor(26)))
  );
}
