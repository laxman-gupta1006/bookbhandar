var canvas=document.querySelector('canvas');
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;
var c=canvas.getContext('2d');
window.addEventListener('resize',function(){
    canvas.height=window.innerHeight;
    canvas.width=window.innerWidth;
});
    // window.addEventListener('mousemove',function(event)
    // {
    //     // c.clearRect;
    //     // c.beginPath();
    //     // c.arc(event.clientX,event.clientY,30,0,Math.PI*2,false);
    //     // c.stroke();
    // })
var color=['#F98866','#FF420E','#80BD9E','#89DA56','#F95700FF']
function Image_f(){
    this.x=Math.random()*innerWidth*0.8;
    this.y=Math.random()*innerHeight*0.8;
    this.dx=Math.random()*[+3,-2][Math.floor(Math.random()*2)];
    this.dy=Math.random()*[+2,-3][Math.floor(Math.random()*2)];
    this.draw=function(img_list,distance)
    {
        img=new Image();
        img.src='assits/person.png';
        img.height=20;
        img.width=20;
        c.drawImage(img,this.x,this.y,30,30);
        for(p=0;p<distance.length;p++)
        {
            if(distance[p]==0)
              continue;
            if(distance[p]<200)
            {
                c.beginPath();
                c.moveTo(this.x+15,this.y+15);
                c.lineTo(img_list[p].x+15,img_list[p].y+15);
                c.strokeStyle = "#1DDDD8";
                c.lineWidth='0.2';
                c.stroke();
            }
        }   
    }
    this.update=function(img_list,elem){
        if(this.x > innerWidth || this.x < 0)
        {
            this.dx=-this.dx;
        }else if(this.y > innerHeight || this.y < 0)
        {
            this.dy=-this.dy;
        }
        this.x=this.x+this.dx;
        this.y=this.y+this.dy;
        var distance=[];
        for(k=0;k<img_list.length;k++)
        {
            // if(k==elem)
            //    continue;
            var dis=Math.sqrt(Math.pow((img_list[k].x-this.x),2)+Math.pow((img_list[k].y-this.y),2));
            distance.push(dis);
        }
    this.draw(img_list,distance);
    }
    // this.draw();
}
var img_list=[];
for(i=0;i<=20;i++)
{
img_list.push(new Image_f);
}
function animate(){
    window.requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(i=0;i<img_list.length;i++){
    img_list[i].update(img_list,i);}
}
animate();
// cir.update()
// window.addEventListener('click',function(event)
// {  
//     // for(i=0;i<=Math.floor(Math.random()*10);i++)
//     for(i=0;i<=50;i++)
//     {col=color[Math.floor(Math.random() * color.length)];
//     circ.push(new Circle(event.clientX,event.clientY,Math.random()*5,col));}
// });
