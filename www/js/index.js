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

function onDeviceReady() {
  var my_media = '';

  $('.big-button').on("click", function () {
    src = $(this).data('audio-path');

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
      my_media.play({ numberOfLoops: 100 });
    }
  });
}

function mediaStatus(s){
  status = s;
}

function onSuccess() {

}

function onError(error) {
  console.log(error);
}
