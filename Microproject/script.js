var painting=false;
var ctx;
var coord={x:0,y:0};

// crazy welcome
// var name=prompt("Hey, what's your name?");
// if(name==" "){
// 	var txt="Hello unknown user!! 😜";
// }
// else{
// 	 txt="Hello, "+name+" ! 😄🎉❤";
// }

// alert(txt);

window.onbeforeunload=function(){
	return 'Drawing you made will be lost, are you sure you want to leave?';
};

window.onload=function(){

	// variables
	// let x;
	// let y;

	// clear button
	document.getElementById('btnClear').addEventListener('click',function(){
		// let ans=alert("Clearing canvas!!");
		// console.log(ans);
		if(index==-1){
			return;
		}
		else{
			var c=confirm("Resetting canvas! 🧐🧐🧐");
			if(c==true){
				ctx.fillStyle='white';
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillRect(0,0,canvas.width,canvas.height);
				restore_array=[];
				index=-1;
			}
			else{
				return false;
				// or
				// event.preventDefault();
			}
		}
		
	});

	function clearcanvas() {
		if(index<=-1){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			return;
		}
		else{
			ctx.fillStyle='white';
			ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillRect(0,0,canvas.width,canvas.height);
				restore_array=[];
				index=-1;
		}
		// else{

		// 	var c=confirm("Resetting canvas! 🧐🧐🧐");
		// 	if(c==true){
		// 		ctx.fillStyle='white';
		// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// 		ctx.fillRect(0,0,canvas.width,canvas.height);
		// 		restore_array=[];
		// 		index=-1;
		// 	}
		// 	else{
		// 		return false;
		// 		// or
		// 		// event.preventDefault();
		// 	}
		
		// }
		
	}

	// back button
	// document.getElementById('btnBack').addEventListener('click',function(){
	// 	document.getElementById('header').style.display='block';
	// 	document.getElementById('myCanvas').style.display='block';
	// 	document.getElementById('saveArea').style.display='none';
	// 	document.getElementById('wrapper').style.display='block';
	// });
	

	// color
	document.getElementById('colorChange').addEventListener('change',function(){
		ctx.strokeStyle=document.getElementById('colorChange').value;
	});

	// pen size
	document.getElementById('penSize').addEventListener('change',function(){
    	ctx.lineWidth=document.getElementById('penSize').value;
    });


	// pencil
	document.getElementById('btnPencil').addEventListener('change',function(){
    	ctx.lineWidth=document.getElementById('penSize').value;
    	ctx.strokeStyle=document.getElementById('colorChange').value;
    });


	// brush
	// document.getElementById('btnBrush').addEventListener('change',function(){
	// 	ctx.lineWidth=document.getElementById('penSize').value;
	// 	ctx.strokeStyle=document.getElementById('colorChange').value;
	// });

	// fill
	document.getElementById('btnBucket').addEventListener('click',function(){
		ctx.fillStyle=document.getElementById('colorChange').value;
		ctx.fillRect(0,0,canvas.width,canvas.height);
	});


	// eraser
	document.getElementById('btnEraser').addEventListener('click',function() {
		ctx.lineWidth=document.getElementById('penSize').value;
		// ctx.globalCompositeOperation='destination-out';
		// ctx.lineCap='butt';
		// ctx.lineCap='square';
		ctx.strokeStyle='white';
	});

	// undo
	document.getElementById('btnUndo').addEventListener('click',function(){
		undo_last();
	});

	// save button
	// document.getElementById('btnSave').addEventListener('click',function(){
	// 	document.getElementById('header').style.display='none';
	// 	document.getElementById('myCanvas').style.display="none";
	// 	document.getElementById('saveArea').style.display="block";
	// 	document.getElementById('wrapper').style.display="none";

	// 	 var dataURL=document.getElementById("canvasImg").src = canvas.toDataURL();
 //         document.getElementById('canvasImg').src=dataURL;
	
	// 	// var dataURL=document.getElementById('myCanvas').toDataURL();;
	// 	// document.getElementById('canvasImg').src=dataURL;
	// });

	function saveWindow(){
		//
	}



	const canvas=document.getElementById("myCanvas");
    ctx=canvas.getContext("2d");  

    // canvas height and width          
	ctx.canvas.width=window.innerWidth - 230;
	ctx.canvas.height=window.innerHeight - 70;


	// eventlisteners
	// document.onmousedown=startPos;
	// document.onmouseup=endPos;
	// document.onmousemove=draw;

	canvas.addEventListener('touchstart',startPos);
	canvas.addEventListener('touchmove',draw);
	canvas.addEventListener('touchend',endPos);

	canvas.addEventListener('mousedown',startPos);
	canvas.addEventListener('mouseup',endPos);
	canvas.addEventListener('mousemove',draw);
	canvas.addEventListener('mouseout',endPos);

	// styling line
	ctx.strokeStyle="black";
	ctx.lineJoin="round";
	ctx.lineWidth=1;
	ctx.lineCap='round';

	let restore_array=[];
	let index=-1;

	// save area
	// document.getElementById('saveArea').style.display='none';


	// coordinates of cursor
	function getPos(event){
		// coord.x=e.clientX-canvas.offsetLeft;
		// coord.y=e.clientY-canvas.offsetTop;
		
		coord.x=event.pageX- canvas.offsetLeft;
		coord.y=event.pageY- canvas.offsetTop;

		// const posx=event.clientX||event.touches[0].clientX;
		// const posy=event.clientY||event.touches[0].clientY;
		// const{offsetLeft,offsetTop}=event.target;

		// coord.x=posx- canvas.offsetLeft;
		// coord.y=posy- canvas.offsetTop;

	}

	// called when mousedown
	function startPos(event) {
		painting=true;
		// console.log(painting);
		getPos(event);

		draw(event);
	}

	// called when mouseup
	function endPos(event){
		if(painting){
			//ctx.stroke();
			ctx.closePath();
			painting=false;
		}
		//painting=false;
		// x=undefined;
		// y=undefined;

		// when we finish our position should change and new path should begin
		//ctx.beginPath();
		if (event.type!='mouseout') {
			restore_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
			index+=1;
			console.log(restore_array);
		}
			
		
	}

	// called when mousemoves
	function draw(event){

		//console.log(event.clientX+", "+event.clientY);

		//if not painting then return
		if (!painting) return;

	// get mouse positions by using events clientX and clientY
		// x=e.offsetX;
		// y=e.offsetY;

		// ctx.lineTo(e.clientX,e.clientY); // here e is event
		// ctx.lineTo(x,y); // here e is event

		// ctx.stroke();

		// to fix the problem and change position on mouse move
		// ctx.beginPath();

		// ctx.moveTo(e.clientX,e.clientY);
		//ctx.moveTo(x,y);	

		// changes => successful
		ctx.beginPath();
		ctx.moveTo(coord.x,coord.y);
		getPos(event);
		ctx.lineTo(coord.x,coord.y);
		ctx.stroke();
		
	}

	function undo_last(){
		if(index<=0){
			clearcanvas();
			//index=-1;
		}
		else{
			// index-=1;
			index--;
			restore_array.pop();
			ctx.putImageData(restore_array[index],0,0);
		}
	}
}
