
const urlDatos= "https://spreadsheets.google.com/feeds/cells/1KevBWDeo3SesPxtRU-fAZ-Y9oMuL4uXWCz4_g2n6eG4/1/public/full?alt=json";
let JsonDatWeb=[];
let arrayColunm=[];
let arraySecondColunm=[];
var palabraElegida="";
var keyPalabraElegida=0;

//paginas permitidas para la busqueda

//paginas permitidas para la busqueda

const textFront = document.getElementById("text-front");
const textBack= document.getElementById("text-back");
const audioSource= document.getElementById("audioSource");
const imageGen= document.getElementById("imageGen");
const randomWord = document.getElementById("randomWord");
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");

randomWord.addEventListener("click", function() {
  selectRandomWord();
});

btnNext.addEventListener("click", function() {
  nextWord();
});
btnPrev.addEventListener("click", function() {
  prevWord();
});


fetch(urlDatos)
.then(res => res.json())
.then((out) => {
  JsonDatWeb=out.feed.entry;
  console.info(JsonDatWeb);

  arrayColunm=selectColumn(JsonDatWeb, 1);
  arraySecondColunm=selectColumn(JsonDatWeb, 2);
  addTextInCard();
  findImage();

})
.catch(err => { throw err });

function selectColumn(array, column)
{
  let countArray=array.length;
  let arrayColumnSelect=[];
  for(let i=0;i<countArray;i++)
  {
    if(array[i].gs$cell.col==column)
    {
      arrayColumnSelect.push(array[i]);
    }
  }
  console.info(arrayColumnSelect);
  return arrayColumnSelect;
}

function addTextInCard()
{
  palabraElegida=arrayColunm[keyPalabraElegida].gs$cell.$t;
  textFront.innerHTML=palabraElegida;
}

function soundCard()
{
  let palabraParaAudio=palabraElegida.replace(" ", "+");
  let urlAudio="https://audio1.spanishdict.com/audio?lang=en&text="+palabraParaAudio;
  audioSource.src = urlAudio;
  audioSource.play();
}

function findImage()
{
  urlTenor=`https://api.tenor.com/v1/search?q=${palabraElegida}&key=50VSNFV0FFT1`;
  fetch(urlTenor)
  .then(res => res.json())
  .then((out) => {
    console.info(out.results);
    //console.info(out.results[0].media[0].tinygif.url);
    let cantResults=out.results.length;
    let imageRandom=parseInt(Math.random()*cantResults);
    let imagenEncontrada=out.results[imageRandom].media[0].tinygif.url;
    //let tituloEncontrado=out.items[imageRandom].htmlTitle;
    imageGen.src=imagenEncontrada;

    textBack.innerHTML=findIfExistText();
  })
}

function selectRandomWord()
{
  let cantidadPalabras=arrayColunm.length - 1;
  let newWordKey=parseInt(Math.random()*cantidadPalabras);
  keyPalabraElegida=newWordKey;

  flipCardRestart();
  addTextInCard();
  findImage();
}

function nextWord()
{
  let cantidadPalabras=arrayColunm.length - 1;
  if(keyPalabraElegida==cantidadPalabras)
  {
    keyPalabraElegida=0;
  }else{
    keyPalabraElegida++;
  }

  flipCardRestart();
  addTextInCard();
  findImage();
}

function prevWord()
{
  let cantidadPalabras=arrayColunm.length - 1;
  if(keyPalabraElegida==0)
  {
    keyPalabraElegida=cantidadPalabras;
  }else{
    keyPalabraElegida--;
  }

  flipCardRestart();
  addTextInCard();
  findImage();
}

function findIfExistText()
{
  let cantArray=arraySecondColunm.length;
  let finalWord="";
  for(let i=0; i<cantArray; i++)
  {
    if(arraySecondColunm[i].gs$cell.row==(keyPalabraElegida + 1))
    {
      finalWord=arraySecondColunm[i].gs$cell.$t;
    }
  }
  return finalWord;
}
