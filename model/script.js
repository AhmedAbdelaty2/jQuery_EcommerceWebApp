let cart=[]

function myHelper(event) {
    return `<img src='${event.target.src}' class='itemimage'/>`;
  }

function render(){
$( ()=>{
    for(let element of items){
        const newitem=$(".item.hidden").clone()
        newitem.removeClass('hidden').appendTo(".menue").children(".itemname").html(`${element.name}`)
        newitem.children(".itemprice").html(`${element.price}`)
        newitem.children(".itemimage").attr("src",element.imagsrc)
        
        $("body").children(".container").children(".above").children(".menue").children(".item").children(".itemimage").draggable({
            stop: function (event, ui) {
                console.log("left: "+ui.position.left)
                console.log(ui.position.left/window.innerWidth)
                if((ui.position.left/window.innerWidth)>.3){
                movetocart($(this))
                billrender();
                }
                
            },
            helper:myHelper,
            containment:".above"
        });

    }
}

)}
$(()=>{
    $("body").on("click",".buybutton",function(){
        movetocart($(this))
        billrender();
    })
     $("body").on("click","#quantatiyplus",function(){
        increaseamount($(this))
    })
     $("body").on("click","#quantatiyminus",function(){
        decreaseamount($(this))
    })
    $("body").on("click",".removebutton",function(){
        remove($(this))
        
    })    
})

function movetocart(e){
   $(()=>{
        let carttool= $(".carttool.hiddentool").clone()
        carttool.removeClass('hiddentool')
        let pursheditem=e.parents(".item").clone()
        pursheditem.children(".buybutton").remove()
        $(carttool).appendTo(pursheditem)
        pursheditem.appendTo(".cart")
        let itemname=pursheditem.children(".itemname").html()
        let itemprice=pursheditem.children(".itemprice").html()
        let itemamount=1
        let item={
            name:itemname,
            price:itemprice,
            amount:itemamount
        }
        cart.push(item)

        billrender()

   })

}
function increaseamount(e){
    $(()=>{
        let name=e.parent("div").siblings(".itemname").html()
        let amount=Number(e.siblings(".quantatiy.value").html())
        for(let i=0; i<cart.length;i++){
            if(cart[i].name==name && cart[i].amount==amount) {
                cart[i].amount++ 
                break
            }
        }
        amount++
        e.siblings(".quantatiy.value").html(amount)
       
    })
    billrender()
}
function decreaseamount(e){
    $(()=>{
        let name=e.parent("div").siblings(".itemname").html()
        let amount=Number(e.siblings(".quantatiy.value").html())
        if(amount>1){
            
            for(let i=0; i<cart.length;i++){
                if(cart[i].name==name && cart[i].amount==amount) {
                    cart[i].amount-- 
                    break
                }
            }
            amount--
            e.siblings(".quantatiy.value").html(amount)
        }
    })
    billrender()
}
function remove(e){
    $(()=>{
        let name=e.parent("div").siblings(".itemname").html()
        let amount=Number(e.siblings(".quantatiy.value").html())
        e.parent("div").parent(".item").remove()
        for(let i=0; i<cart.length;i++){
            if(cart[i].name==name && cart[i].amount==amount) {
                if (i > -1) {
                    cart.splice(i, 1);
                } 
                break
            }
        }
    })
    billrender()
}
function billrender(){
    $(()=>{
        let subtotal=0
        cart.forEach(element => {
            subtotal+=(element.price*element.amount)
        });

        if(subtotal==0){
            $(".bill").children("#subtotal").html(subtotal+" LE")
            $(".bill").children("#delivery").html("0 LE")
            $(".bill").children("#VAT").html("0 LE")
            $(".bill").children("#ordertoal").html("0 LE")
        }else{
            $(".bill").children("#subtotal").html(subtotal+" LE")
            $(".bill").children("#delivery").html("15 LE")
            $(".bill").children("#VAT").html(Math.round(subtotal*(14/100)*100)/100+" LE")
            $(".bill").children("#ordertoal").html(Math.round(((subtotal*1.14)+15)*100)/100+" LE")
        }
    })
}

render()