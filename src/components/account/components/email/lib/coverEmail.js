/**
 * @param {String} email 
 * @returns {String} covered email
 */
export function coverEmail(email) {
  const [user, provider] = email.split('@');

  return `${user[0]}*****@${provider}`;
}