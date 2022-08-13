import React from "react";
var Tanggalan = () => {
    var showDate = new Date();
    var displaytodaysdate = showDate.getDate() + '/' + showDate.getMonth() + '/' + showDate.getFullYear();
    return displaytodaysdate;
  }

  export default Tanggalan;