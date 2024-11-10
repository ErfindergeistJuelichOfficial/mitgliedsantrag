export function mitgliedsnummerGen(vorname: string, nachname: string) {
  return (
    nachname.charAt(0) +
    vorname.charAt(0) +
    (1000 + Math.floor(Math.random() * Math.floor(9000))) +
    String.fromCharCode(97 + Math.floor(Math.random() * Math.floor(26)))
  );
}
