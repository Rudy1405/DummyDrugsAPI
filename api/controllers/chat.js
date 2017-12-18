module.exports = (io,app) => {
      //  const express = require('express');
      //  const app = express();
        const path = require('path')

        let nicknames = {};

        async function chat(req, res) {
        
          //  res.sendfile(__dirname + '/public/index.html');
        
            io.sockets.on('connection', function(socket) {
                socket.on('send message', function(data) {
                    io.sockets.emit('new message', {msg: data, nick: socket.nickname});
                });
                
                socket.on('new user', function(data, callback) { /// here check it out for logs
                    if (data in nicknames) {
                        callback(false);
                    } else {
                        callback(true);
                        socket.nickname = data;
                        nicknames[socket.nickname] = 1;
                        updateNickNames();
                    }
                });
                
                socket.on('disconnect', function(data) {
                    if(!socket.nickname) return;
                    delete nicknames[socket.nickname];
                    updateNickNames();
                });
                
                function updateNickNames() {
                    io.sockets.emit('usernames', nicknames);
                }
                });
            }
            return {
                chat
            }

        }        