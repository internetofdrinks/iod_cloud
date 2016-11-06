import $ from 'jquery';

const users = [
  {"_id":"581e23f40f40952c4d58a225","userid":"4226da2e74980","firstname":"David","lastname":"Bauske","email":"david.bauske@googlemail.com","height":183,"weight":75,"gender":"male","age":23,"gametype":"sober","goal":"0.3","__v":0,"timegoal":"1478455200"},
  {"_id":"581e271de347000010f1a30b","userid":"4396da2e74980","firstname":"Sascha","lastname":"Sambale","email":"sascha.sambale@gmail.com","height":188,"weight":85,"gender":"male","gametype":"constant","__v":0,"age":35,"goal":"0.3","timegoal":"1478419200"},
  {"_id":"581e2743e347000010f1a30d","userid":"4386da2e74980","firstname":"Martin","lastname":"Aulich","email":"m.a@test.net","height":165,"weight":120,"gender":"male","gametype":"constant","__v":0,"goal":"0.5","age":27},
  {"_id":"581e5e54d003d7001020e056","userid":"4236da2e74980","firstname":"Max","lastname":"Partenfelder","gametype":"constant","goal":"1.3","__v":0,"age":23,"gender":"male","weight":65,"height":178,"email":"maxpartenfelder@gmail.com"}
];

export default {
  submitMartinBac() {
    $.ajax({
      method: 'POST',
      url: '/bac',
      contentType: 'application/json',
      data: JSON.stringify({
        userid: "4386da2e74980",
        baclevel: 0.95
      }),
      success: () => console.log("Successfully added Martin's data")
    });
  },

  // TODO update URL
  resetBacs() {
    $.ajax({
      method: 'POST',
      url: '/reset',
      success: () => alert("Successful reset"),
      error: () => alert("Reset failed")
    });
  }
};