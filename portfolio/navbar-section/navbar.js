function toggleNav() {
    let navMenu = document.querySelector('.ul');
    navMenu.style.display = (navMenu.style.display === 'block' || navMenu.style.display === '' ) ? 'none' : 'block';
    let navbtn = document.querySelector('.navbar-btn');
    let navCbtn = document.querySelector('.navbar-Cbtn');
    if(navMenu.style.display === 'block' || navMenu.style.display === '' || navbtn.style.display === 'block' || navCbtn.style.display === 'none')
      {
         navbtn.style.display = 'none';
         navCbtn.style.display = 'block';
      }
    else if(navMenu.style.display === 'none')
      {
         navbtn.style.display = 'block'
         navCbtn.style.display = 'none';
      }
    }

function sbtn(){
      window.scrollTo(0, 0);
    } 
    
    
    // window.scrollTo(0, document.getElementsByClassName('scroll-up').offsetTop);
  
    // let scrollUpButton = document.querySelector('.scroll-up');

    //     scrollUpButton.addEventListener('click', function() {
    //     window.scrollTo(0, 0);
    //     });

    // let scrollbtn =document.querySelector('.scroll-up');
    // scrollbtn.addEventListener('click', function() {
    //       window.scrollTo(0, 0);
    //       console.log("clicked");
    //       });