// import MySQL from 'mysql';
// // import crypto from 'crypto';

// const connection = MySQL.createConnection({
//     host: 'root',
//     port: '4430',
//     user: 'root',
//     password: '',
//     database: 'chu_test',
// });


// const MySQLService = {
//     connect: () => {
//         return new Promise((resolve, reject) => {
//             connection.connect((err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve();
//                 }
//             });
//         });
//     },

//     executeQuery: (query, params) => {
//         return new Promise((resolve, reject) => {
//             connection.query(query, params, (err, results) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(results);
//                 }
//             });
//         });
//     },

//     // Add more methods for executing specific queries or statements as needed

//     close: () => {
//         connection.end();
//     },
// };

// export default MySQLService;