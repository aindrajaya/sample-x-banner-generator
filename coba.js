let info_div=document.getElementById('info');


let form = document.forms['banner-data-form']; 
 
function formChanged(){
    let hexColour = document.getElementById("hexColor").value;
    let bannerText = document.getElementById("bannerText").value;

    var textXpos
    var textYpos
    var textColor

    var textPosition = []
    let canvas = document.getElementById('banner');
    let ctx = canvas.getContext('2d');

    if (document.getElementById("xcenter").checked) {
        textXpos = "center";
        textPosition[0] = canvas.width/2
      }
    else{
        textXpos = "right"; 
        textPosition[0] = canvas.width-50

    }

    if (document.getElementById("ycenter").checked) {
        textYpos = 'center';
        textPosition[1] = canvas.height/2
      }
    else{
        textYpos = 'bottom'; 
        textPosition[1] = canvas.height-50

    }

    if (document.getElementById("textBlack").checked) {
        textColor = '#000';
      }
    else{
        textYpos = 'bottom'; 
        textColor = '#FFF'
    }


    // info_div.innerHTML=`
    //     <h3>Hex Colour: `+hexColour+`</h3>
    //     <h3>Banner Text: `+bannerText+`</h3>
    //     <h3>Text X Position: `+textXpos+`</h3>
    //     <h3>Text Y Position: `+textYpos+`</h3>
    //     `;
    
    ctx.fillStyle = hexColour
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = textColor
    ctx.font = "50px Bree Serif";
    if(textXpos=='center'){
        ctx.textAlign = "center";
    }
    else{
        ctx.textAlign = "right";
    }
    ctx.fillText(bannerText, textPosition[0], textPosition[1]);


}


<label htmlFor="image" className="mt-4 block text-sm font-medium text-gray-600">Photo Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImagePhotoChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 block w-full sm:text-sm"
            />

            {image && (
              <button
                onClick={handleRemoveImagePhoto}
                className="mt-2 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              >
                Remove Photo
              </button>
            )}