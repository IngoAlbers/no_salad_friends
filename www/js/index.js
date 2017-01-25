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
  navigator.app.overrideButton("backbutton", true);
  document.addEventListener("pause", onPause, false);
  document.addEventListener("resume", onResume, false);
  document.addEventListener("backbutton", onBackKeyDown, false);


  $('.big-button').on("click", function () {
    src = $(this).data('audio-path');
    var country = $(this).data('country');
    playSound(src);
    changePage(country);
  });

  $('.back-button').on("click", function () {
    stopSound();
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

  // console.log("Media Status = " + status + " src = " + src + " my_media.src= "  +  my_media.src);
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

function onPause() {
  // Stop media on pause
  stopSound();
  console.log("onpause");
}

function onResume() {
  console.log("onresume");
  // Go to start-page if we are on a subpage
  if(!$(".main").hasClass("page-active")){
    changePage("main");
  }
}

function onBackKeyDown() {
  if(!$(".main").hasClass("page-active")){
    changePage("main");
  }
  else{
    console.log("Good Bye! :)");
    stopSound();
    navigator.app.exitApp();
  }  
}

function changePage(country) {
  if(country == "main"){
    $(".sub-page").addClass("pt-page-moveToRight");
    $(".main").addClass("page-active pt-page-moveFromLeft");
    clearTransitions($(".sub-page"), $(".main"));
  }
  else{
    $(".food-image").hide();
    $("#food-image-"+country+"-01").show();
    $(".main").addClass("pt-page-moveToLeft");    
    $(".sub-page").addClass("page-active pt-page-moveFromRight");  
    clearTransitions($(".main"), $(".sub-page"));
  }
}

function clearTransitions(page_old, page_new){
  setTimeout(function(){
    page_old.removeClassPrefix("pt-page");
    page_new.removeClassPrefix("pt-page");
    page_old.removeClass("page-active");
    page_old.removeClass("subpage-active");
  }, 600);  
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
