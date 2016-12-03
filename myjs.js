$(document).ready(function(){
    
    //regex for each input
    var regExUser = /^[a-zA-Z0-9]{8,15}$/;
    var regExImg = /\.(jpg|png|gif)$/;
    var regExMovie = /^[a-zA-Z ]{1,50}$/;
    var regExComment = /^[a-zA-Z0-9 \?\!\,\.]{1,100}$/;
    
    //inputs
    var imgLink = document.getElementById('img_link');
    var userName = document.getElementById('username');
    var movieInp = document.getElementById('movie');
    var commentInp = document.getElementById('comments');
    
    //objects & divs
    var subBut = document.getElementById('submit');
    var displayDiv = document.getElementById('bottom_base');
    
    
    //check username on key up
    userName.onkeyup = function(){
        if(regExUser.test(userName.value) == true){
            userName.style.backgroundColor = '#F5F6CE';
        }
        else{
            userName.style.backgroundColor = '#F5A9A9';
        }
    }
    
    //check image link on key up
    imgLink.onkeyup = function(){
        if(regExImg.test(imgLink.value) == true){
            imgLink.style.backgroundColor = '#F5F6CE';
        }
        else{
            imgLink.style.backgroundColor = '#F5A9A9';
        }
    }
    
    //check movie title on key up
    movieInp.onkeyup = function(){
        if(regExMovie.test(movieInp.value) == true){
            movieInp.style.backgroundColor = '#F5F6CE';
        }
        else{
            movieInp.style.backgroundColor = '#F5A9A9';
        }
    }
    
    //check comments on key up
    //check all inputs if true to enable button
    commentInp.onkeyup = function(){
        if((regExUser.test(userName.value) == true) &&
            (regExImg.test(imgLink.value) == true) &&
            (regExMovie.test(movieInp.value) == true) &&
            (regExComment.test(commentInp.value) == true)){
            
            commentInp.style.backgroundColor = '#F5F6CE';
            subBut.disabled = false;
            
            subBut.onclick = function(){
            
            //create elements
            var outputBox = document.createElement('div');
            outputBox.id = 'output_box'
            
            var commentBox = document.createElement('div');
            commentBox.id = 'comment_box';
                
            var imageDiv = document.createElement('div');
            imageDiv.id = 'img_div';
                
            var posterDiv = document.createElement('div');
            posterDiv.id = 'poster_div';
            
            var photo = document.createElement('img');
            photo.id = 'image';
                
            var posterImg = document.createElement('img');
            posterImg.id = 'poster';
                
            var userDiv = document.createElement('div');
            userDiv.id = 'user_div';
            
            
            //append to bottom base
            displayDiv.appendChild(outputBox);
            outputBox.appendChild(commentBox);
            outputBox.appendChild(imageDiv);
            imageDiv.appendChild(photo);
            outputBox.appendChild(posterDiv);
            posterDiv.appendChild(posterImg);
            outputBox.appendChild(userDiv);
            
            //assign values
            photo.src = imgLink.value;
            commentBox.innerHTML = commentInp.value;
            userDiv.innerHTML = userName.value;
            
            //ajax call for movie poster
            $.ajax({
                url:"http://www.omdbapi.com/?t="+movieInp.value+"",
                dataType:"jsonp",
                success:function(resp){
                    console.log(resp);
                    posterImg.src = resp.Poster;
                }
            })
            
            //empty inputs
            userName.value = "";
            commentInp.value = "";
            imgLink.value = "";
            movieInp.value = "";
                
            //disable button again
            subBut.disabled = true;
        }
    }
        else{
            commentInp.style.backgroundColor = '#F5A9A9';
        }
    }
    
    
})