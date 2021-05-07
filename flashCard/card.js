const buttonFlip = document.getElementById("buttonFlip");
const cardFlipper = document.getElementsByClassName("flipper");
let cardIsFlip=false;

const flipCard= () =>
{
    if(!cardIsFlip)
    {
        cardFlipper[0].classList.add("flipAllCard");
        cardIsFlip=true;

        soundCard();
        
    }else
    {
        cardFlipper[0].classList.remove("flipAllCard");
        cardIsFlip=false;
    }
   
}

const flipCardRestart= () =>
{
    if(cardIsFlip)
    {
        cardFlipper[0].classList.remove("flipAllCard");
        cardIsFlip=false;
        
    }
}

buttonFlip.addEventListener("click",  flipCard );

