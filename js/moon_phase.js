/**
 * 
 * MoonPhase Web App for calculating and displaying the current Moon Phase, 
 * and the Lunar Day. For residents of Northern, and Southern Hemispheres.
 * 
 * Copyright (C) 2012,2017  A.V.T. Software (Sole Proprietorship Vita Tolstikova)
 * 
 * @author Andrei Tolstikov
 * @author Vita Tolstikova
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Includes Moving Boxes Content with jQuery
 *      (https://tympanus.net/codrops/2011/03/28/moving-boxes-content/) 
 *      by Mary Lou (https://tympanus.net/codrops/author/crnacura/)
 *      
 * For calculating the number of days since March 1, 1900, 
 * the current Moon Phase and the Lunar Day used algorithms from
 * Романовский Т. Б., Микрокалькуляторы в рассказах 
 * и играх. - Минск : Изд-во "Университетское", 1987. - 191 с. : ил.     
 *      
 * contact website: https://software.avt.dn.ua
 * contact E-mail: support@software.avt.dn.ua
 *      
 */


/**
 * Preloading Moon Phase images, depending on the 
 * northern or southern hemisphere
 * 
 * @param {String} hemisphereStr - Name of the hemisphere
 *                                 ('Northern' or 'Southern')
 * 
 */
function AddImages(hemisphereStr)
{ 
     
  var NumImg=25;
   
  document.imageArray = new Array(NumImg);
 
  for(var i=0; i<NumImg; i++)
  {
    document.imageArray[i] = new Image;
    if (hemisphereStr == 'Northern')
	 document.imageArray[i].src = "img/img_"+i+"_n.png";
	else
	 document.imageArray[i].src = "img/img_"+i+"_s.png";
  }
 
}
 
/**
 * 
 * Calculating the number of days since March 1, 1900
 * 
 * @param {Number} currDate - Current Date (XX)
 * @param {Number} currMonth - Current Month (XX)
 * @param {Number} currFullYear - Current Year (XXXX)
 * @returns {Number} The number of days since March 1, 1900
 * 
 */
 function N_DMY(currDate, currMonth, currFullYear)
  {

   var date,month,year;
   var s,p,n;
   
   date=currDate;
   month=currMonth;
   year=currFullYear;
     
   s=(22-month)/10;
   s=Math.floor(s);
  
   p=(s*12+month-14)*30.59+date;
   p=Math.floor(p);
   
   n=(year-1899-s)*365.25+p;
   n=Math.floor(n);
   
   return n;
  }
  
 
/**
 * 
 * Calculating the current Moon Phase and the Lunar Day.
 * And display them, depending on the Hemisphere
 * 
 * @param {String} hemisphereStr - Name of the hemisphere
 *                                 ('Northern' or 'Southern')
 * 
 */
function N_MoonPhase(hemisphereStr){

    var q,r,NumDay;
   
    //output current date
    var now = new Date();

    var currDate=now.getDate();
    var currMonth=now.getMonth()+1;
    var currFullYear=now.getFullYear();

    NumDay=N_DMY(currDate, currMonth, currFullYear);
   
   q=(NumDay-2)/29.53;
   q=Math.floor(q);
   
   r=-29.53*q+NumDay-2;
   r=Math.floor(r);
   
  
   AddImages(hemisphereStr);
   
   if (document.images)
    {
     if (r >= 1 && r <= 13)
	   document.images['moon'].src=document.imageArray[r-1].src;
	  else
	   if (r == 14 || r == 15)
	    document.images['moon'].src=document.imageArray[13].src;
	   else
	    if (r >= 16 && r <= 20)
		 document.images['moon'].src=document.imageArray[r-2].src;
		else 
	     if (r == 21 || r == 22)
	      document.images['moon'].src=document.imageArray[19].src;
	     else
		  if (r>=23 && r<=25)
		   document.images['moon'].src=document.imageArray[r-3].src;
		  else 
	       if (r == 26 || r == 27 || r == 28)
	        document.images['moon'].src=document.imageArray[23].src;
		   else 
	        if (r == 29 || r == 0)
	         document.images['moon'].src=document.imageArray[0].src;
    }
	
    // output Lunar Day
    var LunarDayObj=document.getElementById('num_lunar_day');

    //IE and FF differences	
    if(typeof(LunarDayObj.innerText)!== 'undefined') {
            LunarDayObj.innerText=r + " lunar day";
    } 
    else {
            LunarDayObj.textContent=r + " lunar day";
    }
	

    //output current date
    var monthStr='';	
    switch (currMonth){
     case 1:  monthStr='Jan';break;
     case 2:  monthStr='Feb';break;
     case 3:  monthStr='Mar';break;
     case 4:  monthStr='Apr';break;
     case 5:  monthStr='May';break;
     case 6:  monthStr='Jun';break;
     case 7:  monthStr='Jul';break;
     case 8:  monthStr='Aug';break;
     case 9:  monthStr='Sep';break;
     case 10:  monthStr='Oct';break;
     case 11: monthStr='Nov';break;
     case 12: monthStr='Dec';break;
    }

    var dateStr='Today is '+currDate+' '+monthStr+' '+currFullYear;
    var CurrDateObj=document.getElementById('curr_date');

    //IE and FF differences	
    if(typeof(CurrDateObj.innerText) !== 'undefined') {
            CurrDateObj.innerText=dateStr;
    } 
    else {
            CurrDateObj.textContent=dateStr;
    }

    // output Hemisphere
    var HemisphereObj=document.getElementById('hemisphere');

    //IE and FF differences	
    if(typeof(HemisphereObj.innerText) !== 'undefined') {
            HemisphereObj.innerText=hemisphereStr +" Hemisphere";
    } 
    else {
            HemisphereObj.textContent=hemisphereStr +" Hemisphere";
    }
}


/**
 * 
 * For obtaining basic location information with W3C Geolocation API 
 * when loading a document
 * 
 */
function getGeoPosition() {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure);
}

/**
 * 
 * handle success here
 *        
 * @param {number} position
 *        use: position.coords.latitude, position.coords.longitude
 *             position.coords.accuracy and position.timeStamp  
 * 
 */
function geoSuccess(position){ 

        var hemisphereStr;
	var latitude=(position.coords.latitude).toFixed(4);
	
        console.log(latitude);
        
	if (latitude < 0.0000) {
	   hemisphereStr='Southern'; //Southern hemisphere
	} 
	else {
            hemisphereStr='Northern'; //Northern hemisphere
	}
        
        //The calculation of the current Moon Phase and the Lunar Day
        N_MoonPhase(hemisphereStr);
}
	 
/**
 * handle failure here
 * 
 * @param {string} error
 *        use: error.code and error.message         
 * 
 */
function geoFailure(error){
	console.log(error.message);
}






 

