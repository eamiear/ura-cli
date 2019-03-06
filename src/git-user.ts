import { execSync } from 'child_process'

module.exports = (): string => {
  let name
  let email

  try {
    name = execSync('git config --get user.name')
    email = execSync('git config --get user.email')
  } catch (error) {}
  // name = "username", remove quotes
  name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
  email = email && (' <' + email.toString().trim() + '>')
  return (name || '') + (email || '')
}