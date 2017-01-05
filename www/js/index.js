/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener('deviceready', onDeviceReady, false);

var status = 1;
var my_media = '';
var src = '';

function onDeviceReady() {

  $('.big-button').on("click", function () {
    src = $(this).data('audio-path');
    var country = $(this).data('country');
    playSound(src);
    changePage(country);
  });

  $('.back-button').on("click", function () {
    stopSound(src);
    changePage('main');
  });
}

function playSound(src) {

  if(device.platform == 'Android'){
    src = '/android_asset/www/' + src;
  }

  if(status == 2 && src == my_media.src){
    my_media.pause();
  }
  else{
    if(my_media !== ''){
      my_media.pause();
    }
    my_media = new Media(src, onSuccess, onError, mediaStatus);
    my_media.play();
  }  

  console.log("Media Status = " + status + " src = " + src + " my_media.src= "  +  my_media.src);

}

function stopSound() {
  my_media.pause();
}

function mediaStatus(s){
  status = s;
}

function onSuccess() {
  playSound(src);
}

function onError(error) {
  console.log(error);
}

function changePage(country) {
  if(country == "main"){
    $(".sub-page").addClass("pt-page-moveToRight");
    $(".main").addClass("page-active pt-page-moveFromLeft");
    setTimeout(function(){
      $(".sub-page").removeClassPrefix("pt-page");
      $(".main").removeClassPrefix("pt-page");
      $(".sub-page").removeClass("page-active");
      $(".sub-page").removeClass("subpage-active");
    }, 600);      
  }
  else{
    $(".food-image").attr('src', 'img/food/'+country+'_01.jpg');
    $(".main").addClass("pt-page-moveToLeft");    
    $(".sub-page").addClass("page-active pt-page-moveFromRight");  
    setTimeout(function(){
      $(".main").removeClassPrefix("pt-page");
      $(".sub-page").removeClassPrefix("pt-page");
      $(".main").removeClass("page-active");
      $(".main").removeClass("subpage-active");
    }, 600);  
  }
  


}



$.fn.removeClassPrefix = function(prefix) {
  this.each(function(i, el) {
    var classes = el.className.split(" ").filter(function(c) {
      return c.lastIndexOf(prefix, 0) !== 0;
    });
    el.className = $.trim(classes.join(" "));
  });
  return this;
};
