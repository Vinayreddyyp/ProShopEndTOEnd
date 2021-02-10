import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'admin user',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'vinay',
		email: 'vinay@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'reddy',
		email: 'reddy@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	}
];

export default users;
