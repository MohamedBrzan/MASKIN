// const ServerErrorMessage = (error) => {
//   if (error.response) {
//     return error.response;
//   }
//   if (error.response.data) {
//     return error.response.data;
//   }
//   if (error.response.data.message) {
//     return error.response.data.message;
//   }
//   if (error.data.message) {
//     return error.data.message;
//   } else {
//     return 'حدث خطأ مفاجىء نحن نعمل عل إصلاحه الأن من فضلك حاول مرة أخرى لاحقاً';
//   }
// };
// const ServerErrorMessage = (error) => {
//   if (error.response) {
//     return error.response;
//   } else if (error.response.data) {
//     return error.response.data;
//   } else if (error.response.data.message) {
//     return error.response.data.message;
//   } else {
//     return 'Something went wrong We Work On It, please try again later';
//   }
// };

const ServerErrorMessage = (error) =>
  error.data.message
    ? error.data.message
    : error.response
    ? error.response
    : error.response.data
    ? error.response.data
    : error.response.data.message
    ? error.response.data.message
    : 'Something Went Wrong! Please Try Again Later ';

export default ServerErrorMessage;
