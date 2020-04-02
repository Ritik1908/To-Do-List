const today = new Date();

exports.getDate = function() {
    let option = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", option);
};

exports.getDay = function() {
    let option = {
    weekday: "long",
  };

  return today.toLocaleDateString("en-US", option);
};

exports.getDayType = function() {
  var currentDay = today.getDay();
  var day = "";
  if(currentDay == 6 || currentDay == 0) {
  	day = "Weekend";
  }
  else {
  	day = "Weekday";
  }
  return day;
}
// var currentDay = today.getDay();
// var day = "";
// switch(currentDay) {
// 	case 0 :
// 		day = "Sunday";
// 		break;
// 	case 1 :
// 		day = "Monday";
// 		break;
// 	case 2:
// 		day = "Tuesday";
// 		break;
// 	case 3 :
// 		day = "Wednesday";
// 		break;
// 	case 4:
// 		day = "Thursday";
// 		break;
// 	case 5 :
// 		day = "Friday";
// 		break;
// 	case 6:
// 		day = "Saturday";
// 		break;
// 	default:
// 	 	console.log("Error"+currentDay);
// }
