var socket;
function startStreaming(responseCallback){
    
    responseCallback("text");
    // clear states
    // access media library, proceed to next if access enabled / throw error
    // if needed, connect to socket
    // set silence detector
    // stream processor(responseCallback)
}

function stopStreaming(callback){
    // revoke access to media library
    // if needed, disable socket
    // disable silence detector
    // disable stream processor
    // clear states
    callback("Ended");

}

function connect(socketURL, onSuccess, onError){
    // establish connection
    // emit connect event
    // listen on connect success
    // trigger onSuccess/onError depending on response 
}

function disconnect(onSuccess, onError){
    // emit disconnect event
    // trigger onSuccess/onError depending on response 
}