appendData(data)
function appendData(data) {
  // var d = document.getElementsByClassName("catalog_item")
  var names = document.getElementsByClassName("catalog__name");
  var names_mob = document.getElementsByClassName("catalog__name__mobile");
  var prices = document.getElementsByClassName("product__price");
  var prices1 = document.getElementsByClassName("cost__current");
  var buttons = document.getElementsByClassName("open-modal");
  var buttons1 = document.getElementsByClassName("open-modal-buy")
  // var imgs = document.getElementsByClassName("catalog_img");
  var dimensions = document.getElementsByClassName("dimensions");
  var widths = document.getElementsByClassName("width");
  var heights = document.getElementsByClassName("height");
  var depth = document.getElementsByClassName("depth");
  var depth1 = document.getElementsByClassName("depth1");

  for (var i = 1; i < 6; i++) {
    var containers = document.getElementById(`catalog_item${i}`)
    // console.log(containers, 18);
    // var item = document.createElement('div')
    // item.id = `catalog_item${i}`
    // item.className = `catalog_item`
    // var div0 = document.getElementById(`catalog_name_mobile0`)
    // clone0 = div0.cloneNode(true)
    // clone0.id= `catalog_name_mobile${i}`
    // containers.appendChild(clone0)
    // item.appendChild(clone0)
    // var div1 = document.getElementById(`catalog_itm_col_img0`)
    // clone1 = div1.cloneNode(true)
    // clone1.id= `catalog_itm_col_img${i}`
    // item.appendChild(clone1)
    // containers.appendChild(clone0)
    var div = document.getElementById(`catalog_itm_col0`)
    clone = div.cloneNode(true)
    clone.id= `catalog_itm_col${i}`
    // item.appendChild(clone)
    // containers.appendChild(clone)
    
    containers.appendChild(clone)
  }
  for (var i = 0; i < 6; i++) {
    var imgs =document.querySelectorAll(`#catalog_item${i} .catalog_img`)
    // console.log(imgs, 40);
    for(var k=0; k<imgs.length; k++){
      imgs[k].src=data[i].src[k]
      if(k>imgs.length/2-1){
        imgs[k].src=data[i].src[k-imgs.length/2]
      }
    }
    // imgs[i].src = data[i].src;
    names[i].innerHTML = "Диван "+data[i].name;
    names_mob[i].innerHTML = "Диван "+data[i].name;
    prices[i].innerHTML = Math.floor(data[i].price / 0.7).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " KZT";
    prices1[i].innerHTML = data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " KZT";
    buttons[i].setAttribute("data-name", data[i].name)
    buttons[i].setAttribute("data-price", data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
    buttons1[i].setAttribute("data-name", data[i].name)
    buttons1[i].setAttribute("data-price", data[i].price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '))
    data[i].depth == "-" ? depth[i].innerHTML = "-" : depth[i].innerHTML = data[i].depth+" см"
    data[i].depth1 == "-" ? depth1[i].innerHTML = "-" : depth1[i].innerHTML = data[i].depth1+" см"
    dimensions[i].innerHTML = data[i].height + "*"+data[i].width + "*"+data[i].depth
    widths[i].innerHTML = data[i].width+" см"
    heights[i].innerHTML = data[i].height+" см"
  }
}