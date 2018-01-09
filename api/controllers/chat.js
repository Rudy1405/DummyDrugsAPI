module.exports = (io,app) => {
    const User = require('../models/userModel')

    console.log("in chats prro")
      const path = require('path')
    
        let usernames = [];

        io.on('connection',(socket)=>{
            console.log('New Conecction, id: ',socket.id)
        
           socket.on('newUser',function(data, username, callback){
            let user = {};
            user.username = username
            user.msg= ''
            user.socketid= socket.id
            usernames.push(user)
            console.log("user::: \n",user,":::::: \n")
            console.log("usernames::: \n",usernames,":::::: \n")
            showUsers()      
                

            }) 
        
            function showUsers(){
          
                io.emit('usernames', usernames)
            }
        })
      
        
        async function chat_login(req, res){
            try {
                let userMail = req.body.nickname
                let user = await User.findOne({'email': userMail})
                if(user.role === 'Cheff'){
                    let userDealer = await User.find({'role': 'Dealer'}) // si regresa
                    let dealersArray
                    for (i in userDealer){
                        dealersArray = userDealer[i].name
                        console.log(i,':::  ',dealersArray)
                    }
                        
                    res.render('onlineList', { dealers : userDealer }); /// da undefined 
                    
                }else{
                    let userCheff = await User.find({'role': 'Cheff'})
                    let cheffArray
                    for (i in cheffArray){
                        cheffArray = userCheff[i].name
                        console.log(i,':::  ',cheffArray)
                    }
                    res.render('onlineList', { dealers : userCheff });
                }
            } catch (error) {
                console.log(error)
                res.sendFile(path.resolve('public/notFound.html'));
            }

        }
        return{
            chat_login
        }

  }///exports        